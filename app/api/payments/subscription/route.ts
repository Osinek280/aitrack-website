import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const email = req.headers.get("Authorization");

  try {
    if (email) {
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

      NextResponse.json({ permission: sub[0].status === 'active' ? true : false })

    } else {
      return NextResponse.json({ error: "Email is missing in the request headers" });
    }
  }catch(err) {
    return NextResponse.json({ error: `Internal Server Error: ${err}` })
  }

  return NextResponse.json({ success: false, message: 'stripe error' });
}
