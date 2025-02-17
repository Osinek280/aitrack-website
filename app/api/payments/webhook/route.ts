// import { clerkClient } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
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
      case "customer.subscription.deleted":
        return handleSubscriptionEvent(event, "deleted");

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
  const session = event.data.object as Stripe.Checkout.Session;

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  let data, error;

  const client = await clerkClient();

  const customerId = session.customer as string
  const customer = await stripe.customers.retrieve(customerId)
  const userId = (customer as Stripe.Customer).metadata.userId;

  if (type === "deleted" && userId) {
    console.log("test")  
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        subscription_id: null
      }
    })
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

  const client = await clerkClient();

  await client.users.updateUserMetadata(metadata.userId, {
    privateMetadata: {
      subscription_id: session.subscription
    }
  })

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