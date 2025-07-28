import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { userId, email, priceId, subscription } = await req.json();

  const customers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (customers.data.length === 0) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { userId, email, subscription },
      customer_email: email,
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL}`,
      cancel_url: `${process.env.FRONTEND_URL}`,
    });
    return NextResponse.json({ type: "checkout", sessionId: session.id });
  }
  const customer = customers.data[0];

  // 2. Pobierz subskrypcje klienta
  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id,
    status: "active",
    limit: 1,
  });

  const isSubscribed = subscriptions.data.length > 0;

  try {
    if (!isSubscribed) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: { userId, email, subscription },
        customer_email: email,
        mode: "subscription",
        success_url: `${process.env.FRONTEND_URL}`,
        cancel_url: `${process.env.FRONTEND_URL}`,
      });
      return NextResponse.json({ type: "checkout", sessionId: session.id });
    } else {
      const session = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${process.env.FRONTEND_URL}`,
      });

      return NextResponse.json({
        type: "billingPortal",
        sessionId: session.url,
      });
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Failed to create checkout session" });
  }
}
