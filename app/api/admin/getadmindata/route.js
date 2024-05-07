import connect from "@/utils/db";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connect();
        const admins = await Admin.find({});
        if (!admins) {
            return NextResponse.json('No admins found', { status: 400 });
        }
        return NextResponse.json(admins, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, { status: 500 });
    }
}