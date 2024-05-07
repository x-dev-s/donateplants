import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req) {
  try {
    const body = await req.text();
    
    const signature = headers().get("stripe-signature");
    
    const event = stripe.webhooks.constructEvent(body, signature, secret);
    
    if (event.type === "checkout.session.completed") {
      if(!event.data.object.customer_details.email) return NextResponse.json({ message: "No email found", ok: false }, { status: 400 });
      if(!event.data.object.amount_total) return NextResponse.json({ message: "No amount found", ok: false }, { status: 400 }); 
      const res = await fetch(`http://localhost:3000/api/updatebalance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: event.data.object.customer_details.email,
          type: "add",
          amount: event.data.object.amount_total,
          method: "Stripe",
        }),
      });
    }
    
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}