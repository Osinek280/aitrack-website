import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  console.log("Received email:", email);

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
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

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.FRONTEND_URL}`,
    });

    return NextResponse.json({ sessionId: session.url });
  } catch (error) {
    console.error("Error creating billing portal session:", error);
    return NextResponse.json({
      error: "Failed to create billing portal session",
    });
  }
}
