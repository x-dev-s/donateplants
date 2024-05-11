import connect from "@/utils/db";
import User from "@/models/user";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";
import { SendEmailToAdmin } from "@/app/server";

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
        let drawName = "";
        for (let draw of user.draws) {
            if (draw.active && draw.numbers.length == 0 && draw.drawType == type) {
                drawName = draw.drawName;
                draw.numbers = numbers.slice(0, 8);
                break;
            }
        }
        await user.save();
        const admin = await Admin.findOne({ id: "admin" });
        admin.notifications.push({
            context: "Draw Submitted",
            message: `User ${user.email} has submitted their draw`,
            date: new Date().toISOString()
        });
        admin.unreadNotifications += 1;
        await admin.save();
        SendEmailToAdmin({ context: "Draw Submitted", message: `<h3>Details</h3><p>User Email: ${user.email}</p><p>Draw Name: ${drawName}</p><p>Draw Type: ${type}</p><p>Numbers: ${numbers.slice(0, 8).join(", ")}</p>` });
        return NextResponse.json({ message: "Draw submitted" }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, 500);
    }
}