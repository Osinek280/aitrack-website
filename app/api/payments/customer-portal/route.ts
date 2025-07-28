// import { clerkClient } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// export async function POST(req: NextRequest) {
//   const { userId, email, priceId, subscription } = await req.json();

//   const client = await clerkClient();

//   const userList = await client.users.getUserList({
//     emailAddress: [email],
//     limit: 1,
//   });

//   if (userList.data.length === 0) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   const user = userList.data[0];

//   try {
//     const huj = await stripe.billingPortal.sessions.create({
//       customer: userId,
//       return_url: `${process.env.FRONTEND_URL}`,
//     });

//     return NextResponse.json({ sessionId: "dfsjgbndfj" });
//   } catch (error) {
//     console.error("Error creating billing portal session:", error);
//     return NextResponse.json({
//       error: "Failed to create billing portal session",
//     });
//   }
// }
