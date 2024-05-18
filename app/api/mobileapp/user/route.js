import User from "@/models/user"
import connect from "@/utils/db"
import { verifyJwtToken } from "@/utils/auth";
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export async function GET(request) {
    await connect();
    try {
        let token = request.url.split('?')[1];
        if (!token) {
            return new NextResponse("User not logged in", { status: 401 });
        }
        token = token.split('=')[1];
        const tokendata = token && (await verifyJwtToken(token));
        const user = await User.findOne({ _id: tokendata.user.id });
        if (user) {
            let prop = await request.url.split('?')[1];
            if (user.isAdmin && prop && prop.includes('all=true')) {
                const users = await User.find();
                if (!users) {
                    return new NextResponse("No users found", { status: 400 });
                }
                return new NextResponse(JSON.stringify({ user, users }), { status: 200 });
            }
            return new NextResponse(JSON.stringify(user), { status: 200 });
        }
        else {
            return new NextResponse("Unknown User", { status: 400 });
        }
    } catch (err) {
        throw new Error(err);
    }

}