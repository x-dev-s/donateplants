import connect from "@/utils/db";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connect();
        const {data} = await request.json();
        const adminExists = await Admin.findOne({id: data.id});
        if(adminExists) {
            return NextResponse.json('Admin already exists', { status: 400 });
        }
        const newAdmin = new Admin(data);
        await newAdmin.save();
        return NextResponse.json('Admin created successfully', { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, { status: 500 });
    }
}