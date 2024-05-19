import { GetCurencyExchangeRate } from "@/app/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { from, to } = await request.json();
        return NextResponse.json({ rate: await GetCurencyExchangeRate(from, to) }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}