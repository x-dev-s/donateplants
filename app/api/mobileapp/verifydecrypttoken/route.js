import { verifyJwtToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { token } = await request.json();
        const payload = await verifyJwtToken(token);
        if (payload) {
            return NextResponse.json(payload);
        }
        return new NextResponse("Token is not verified", { status: 400 });
    }
    catch (error) {
        return new NextResponse("Token is not verified", { status: 400 });
    }
}