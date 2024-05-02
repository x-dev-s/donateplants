import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const { priceId, type } = await request.json()
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            submit_type: type,
            mode: 'payment',
            success_url: 'http://localhost:3000',
            cancel_url: 'http://localhost:3000',
        })
        return NextResponse.json(session.url)
    } catch (error) {
        return NextResponse.error(error)
    }
}