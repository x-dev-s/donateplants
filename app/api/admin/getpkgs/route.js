import Package from "@/models/packages";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'
export async function GET(request) {
    try {
        await connect();
        let prop = await request.url.split('?')[1];
        if (!prop) {
            const packages = await Package.find({});
            if (!packages) {
                return NextResponse.json('No packages found', { status: 400 });
            }
            return NextResponse.json(packages, { status: 200 });
        }
        const searchParams = new URLSearchParams(request.url.split('?')[1]);
        prop = prop.split('=')[0];
        const value = searchParams.get(prop);
        const packages = await Package.find({ [prop]: value });
        if (!packages) {
            return NextResponse.json('No packages found', { status: 400 });
        }
        return NextResponse.json(packages, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, { status: 500 });
    }
}