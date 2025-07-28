import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    console.log("Received email:", email);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Sprawdź czy istnieje klient w Stripe o podanym emailu
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return NextResponse.json(
        { subscribed: false, message: "Customer not found" },
        { status: 404 }
      );
    }

    const customer = customers.data[0];

    // 2. Pobierz subskrypcje klienta
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    });

    const isSubscribed = subscriptions.data.length > 0;
    const subscription = isSubscribed ? subscriptions.data[0] : null;

    console.log({
      subscribed: isSubscribed,
      subscriptionId: subscription?.id || null,
      currentPeriodEnd: subscription?.current_period_end || null,
      plan: subscription?.items.data[0]?.plan.id || null,
    });

    return NextResponse.json({
      subscribed: isSubscribed,
      subscriptionId: subscription?.id || null,
      currentPeriodEnd: subscription?.current_period_end || null,
      plan: subscription?.items.data[0]?.plan.id || null,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
