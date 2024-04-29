import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();
    const priceId = data.priceId;
    const type = data.type;
    console.log(type, priceId);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prices = await stripe.prices.update(
        priceId,
        {
            metadata: {
                type: data.type
            }
        }
    );
    return NextResponse.json(prices);
}