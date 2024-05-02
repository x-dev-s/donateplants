import connect from "@/utils/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId, property, value } = await request.json();
        await connect();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.error(new Error("User not found"), 400);
        }
        user[property] = value;
        await user.save();
        return NextResponse.json({ message: "User data updated" }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.error(error, 500);
    }
}