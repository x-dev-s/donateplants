import connect from "@/utils/db";
import Draw from "@/models/draws";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {action, data} = await request.json();
        console.log(action, data);
        await connect();

        const drawExists = await Draw.findOne({ drawName: data.drawName });
        if (drawExists && action === 'edit') {
            drawExists.active = data.active;
            drawExists.drawName = data.drawName;
            drawExists.drawType = data.drawType;
            data.numbers.length > 0 ? drawExists.numbers = data.numbers : null;
            data.winningNumbers.length > 0 ? drawExists.winningNumbers = data.winningNumbers : null;
            drawExists.enddate = new Date(data.enddate);
            await drawExists.save();
            return NextResponse.json('Draw updated successfully', { status: 200 });
        }
        else if(drawExists && action === 'delete') {
            await Draw.deleteOne({ drawName: data.drawName });
            return NextResponse.json('Draw deleted successfully', { status: 200 });
        }
        else if (drawExists && action === 'create') {
            return NextResponse.json('Draw already exists', { status: 400 });
        }
        else if ((action === 'edit' || action === 'delete') && !drawExists) {
            return NextResponse.json('Draw does not exist', { status: 400 });
        }
        const newDraw = new Draw(data);
        await newDraw.save();
        return NextResponse.json('Draw created successfully', { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, { status: 500 });
    }
}