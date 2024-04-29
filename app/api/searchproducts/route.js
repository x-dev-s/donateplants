import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = new URLSearchParams(request.url.split('?')[1]);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const products = await stripe.products.search({
    query: `active:'true' AND metadata['type']:"${searchParams.get('type')}"`
  });
  return NextResponse.json(products.data.reverse());
}