import Draw from "@/models/draws";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'
export async function GET(request) {
    try {
        await connect();
        let prop = await request.url.split('?')[1];
        if (!prop || prop == '') {
            const draws = await Draw.find({});
            if(!draws) return NextResponse.json('No draw found', { status: 400 });
            return NextResponse.json(draws, { status: 200 });
        }
        prop = prop.split('=')[0];
        const searchParams = new URLSearchParams(request.url.split('?')[1]);
        const value = searchParams.get(prop);
        const draw = await Draw.find({ [prop]: value });
        if (!draw) {
            return NextResponse.json('No draw found', { status: 400 });
        }
        return NextResponse.json(draw, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, { status: 500 });
    }
}