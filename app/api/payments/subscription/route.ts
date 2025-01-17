import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const email = req.headers.get("Authorization");

  try {
    if (email) {
      const client = await clerkClient();
      
      const { data } = await client.users.getUserList({
        emailAddress: ["szymon.osinski.2009@gmail.com"]
      });


      const subscription_id = data[0].publicMetadata.subscription_id as string

      if(!subscription_id) {
        return NextResponse.json({ permission: false, error: 'does not have required subscription' })
      }

      const subscription = await stripe.subscriptions.retrieve(subscription_id)

      console.log(subscription);

      const customers = await stripe.customers.list({
        email: email
      });

      if(customers.data.length === 0) {
        return NextResponse.json({ permission: false, error: 'does not have required subscription' })
      }

      const customer = customers.data[0];

      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
      });


      if(subscriptions.data.length === 0) {
        return NextResponse.json({ permission: false, error: 'does not have required subscription' })
      }

      const sub = subscriptions.data.map((sub) => ({
        id: sub.id,
        status: sub.status,
      }))

      return NextResponse.json({ permission: sub[0].status === 'active' ? true : false });
    } else {
      return NextResponse.json({ error: "Email is missing in the request headers" });
    }
  }catch(err) {
    return NextResponse.json({ error: `Internal Server Error: ${err}` })
  }
}
