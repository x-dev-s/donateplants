import User from "@/models/user"
import connect from "@/utils/db"
import { verifyJwtToken } from "@/utils/auth";
import { NextResponse } from 'next/server';

export async function GET(request) {
    const {cookies} = request;
    const { value: token } = cookies.get("session") ?? { value: null };
    const user = token && (await verifyJwtToken(token));
    const id = user.id;
    await connect();
    try {
        const user = await User.findOne({ id });
        if (user) {
            return new NextResponse(JSON.stringify(user), { status: 200 });
        }
        else {
            return new NextResponse("Unknown User", { status: 400 });
        }
    } catch (err) {
        throw new Error(err);
    }

}