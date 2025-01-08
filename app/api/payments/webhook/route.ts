import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  const reqText = await req.text();
  const sig = req.headers.get("Stripe-Signature");

  if (!sig) {
    return NextResponse.json({
      status: 400,
      error: "Missing Stripe-Signature header",
    });
  }

  try {
    const event = await stripe.webhooks.constructEventAsync(
      reqText,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log(`Received event: ${event.type}`);

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        return handleSubscriptionEvent(event, event.type.split(".")[2] as "created" | "updated" | "deleted");

      case "checkout.session.completed":
        return handleCheckoutSessionCompleted(event);

      default:
        console.warn(`Unhandled event type: ${event.type}`);
        return NextResponse.json({
          status: 400,
          error: "Unhandled event type",
        });
    }
  } catch (err) {
    console.error("Error constructing Stripe event:", err);
    return NextResponse.json({
      status: 500,
      error: "Webhook Error: Invalid Signature",
    });
  }
}

async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return (customer as Stripe.Customer).email || null;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "deleted",
) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerEmail = await getCustomerEmail(subscription.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  let data, error;
  if (type === "deleted") {
  } else {
  }

  if (error) {
    console.error(`Error during subscription ${type}:`, error);
    return NextResponse.json({
      status: 500,
      error: `Error during subscription ${type}`,
    });
  }

  return NextResponse.json({
    status: 200,
    message: `Subscription ${type} success`,
    data,
  });
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const metadata = session.metadata || {};
  const subscriptionId = session.subscription;

  if (!subscriptionId) {
    return NextResponse.json({
      status: 400,
      error: "Subscription ID is missing in the session",
    });
  }

  try {
    await stripe.subscriptions.update(subscriptionId as string, { metadata });

    console.log(`Updated metadata for subscription: ${subscriptionId}`);
    return NextResponse.json({
      status: 200,
      message: "Subscription metadata updated successfully",
    });
  } catch (error) {
    console.error("Error updating subscription metadata:", error);
    return NextResponse.json({
      status: 500,
      error: "Error updating subscription metadata",
    });
  }
}
