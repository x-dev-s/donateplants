import connect from "@/utils/db";
import Admin from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function POST(request) {
    try {
        const { notificationId, action } = await request.json();
        console.log(notificationId, action);
        const admin = await Admin.findOne({ id: "admin" });
        if (!admin) {
            return NextResponse.json({ message: "Admin not found" }, { status: 404 });
        }
        if(notificationId == "all") {
            if(action == "deleteAll") {
                admin.notifications = [];
                admin.unreadNotifications = 0;
            }
            else if(action == "readAll") {
                admin.notifications.forEach((n) => n.read = true);
                admin.unreadNotifications = 0;
            }
            await admin.save();
            return NextResponse.json({ message: "All notifications updated successfully" }, { status: 200 });
        }
        const notification = admin.notifications.find((n) => n._id == notificationId);
        console.log(notification);
        if (!notification) {
            return NextResponse.json({ message: "Notification not found" }, { status: 404 });
        }
        if (action == "read") {
            notification.read = true;
            admin.unreadNotifications -= 1;
        } else if (action == "delete") {
            if (!notification.read) admin.unreadNotifications -= 1;
            admin.notifications = admin.notifications.filter((n) => n._id != notificationId);
        }
        await admin.save();
        return NextResponse.json({ message: "Notification updated successfully" }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}