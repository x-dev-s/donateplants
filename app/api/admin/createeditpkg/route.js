import Package from "@/models/packages";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connect();
        const { action, data } = await request.json();
        console.log(action, data);
        const packageExists = await Package.findOne({ name : data.name });
        if(packageExists && action === 'edit') {
            packageExists.active = data.active;
            packageExists.name = data.name;
            packageExists.type = data.type;
            packageExists.description = data.description;
            packageExists.price = data.price;
            await packageExists.save();
            return NextResponse.json('Package updated successfully', { status: 200 });
        }
        else if(packageExists && action === 'delete') {
            await Package.deleteOne({ name: data.name });
            return NextResponse.json('Package deleted successfully', { status: 200 });
        }
        else if(packageExists && action === 'create') {
            return NextResponse.json('Package already exists', { status: 400 });
        }
        else if((action === 'edit' || action === 'delete') && !packageExists) {
            return NextResponse.json('Package does not exist', { status: 400 });
        }
        const newPackage = new Package(data);
        await newPackage.save();
        return NextResponse.json('Package created successfully', { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, { status: 500 });
    }
}