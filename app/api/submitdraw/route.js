import connect from "@/utils/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email, type, numbers } = await request.json();
        await connect();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.error(new Error("User not found"), 404);
        }
        if (user.draws.length == 0) {
            return NextResponse.error(new Error("No draws to submit"), 400);
        }
        for (let draw of user.draws) {
            if (draw.active && draw.numbers.length == 0 && draw.drawType == type) {
                draw.numbers = numbers.slice(0, 8);
                break;
            }
        }
        await user.save();
        return NextResponse.json({ message: "Draw submitted" }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, 500);
    }
}