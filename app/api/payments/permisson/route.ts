import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const email = req.headers.get("Authorization");

  try {
    if (!email) {
      return NextResponse.json({ error: "Email is missing in the request headers" });
    }
    
    const client = await clerkClient();
      
    const userList = await client.users.getUserList({
      emailAddress: [email],
      limit: 1
    })

    if (userList.data.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userList.data[0];
    const subscriptionId = user.privateMetadata.subscription_id as string;

    if (!subscriptionId) {
      return NextResponse.json({ error: "User does not have an active subscription (system fault)" }, { status: 404 });
    }
      
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["items.data.price.product"],
    });
    
    const hasPermission = subscription.status === "active";
    const message = !hasPermission ? 'User does not have an active subscription' : ""
    return NextResponse.json({ permission: hasPermission, message: message }, { status: 200 });
  } catch {
    return NextResponse.json({ error: `User does not have an active subscription` }, { status: 500 });
  }
}
