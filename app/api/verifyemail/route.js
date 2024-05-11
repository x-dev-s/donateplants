import connect from "@/utils/db"
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Admin from "@/models/admin";

await connect()


export async function POST(request){

    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        console.log(user);
        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        user.isVerified = true;
        user.verifyToken = null;
        user.verifyTokenExpiry = null;
        const admin = await Admin.findOne({id: "admin"});
        if (!admin) {
            return NextResponse.json({error: "Admin not found"}, {status: 404})
        }
        admin.verifiedUsers += 1;
        await admin.save();
        await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}