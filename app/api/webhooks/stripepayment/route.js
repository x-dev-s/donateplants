
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import connect from "@/utils/db"
import User from "@/models/user"
import Stripe from "stripe"

const stripe = await Stripe(process.env.STRIPE_SECRET_KEY)

const secret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(req) {
  try {
    const body = await req.text()

    const signature = headers().get("stripe-signature")

    const event = stripe.webhooks.constructEvent(body, signature, secret)

    if (event.type == "checkout.session.completed") {
        await connect();
        const email = event.data.object.customer_details.email;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.error(new Error('User not found'), 400);
        }
        user.balance += event.data.object.amount_total;
        user.deposits.push({ amount: event.data.object.amount_total, date: new Date().toISOString('en-CA').split('T')[0] });
        await user.save();
        console.log("Payment was successful!")

    //   updateDatabase(event.data.object.metadata.itinerary_id)
    //   sendEmail(event.data.object.customer_details.email)
    }
    else if(event.type === "payment_intent.succeeded") {
        console.log("Payment was successful!")
        alert("Payment was successful!")
    }

    return NextResponse.json({ result: event, ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false
      },
      { status: 500 }
    )
  }
}
