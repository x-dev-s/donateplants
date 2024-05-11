import connect from "@/utils/db";
import Draw from "@/models/draws";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";
import { SendEmailToAdmin } from "@/app/server";

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
            drawExists.prizes = data.prizes;
            drawExists.enddate = new Date(data.enddate);
            const admin = await Admin.findOne({ id: 'admin' });
            if(!admin) return NextResponse.json('Admin not found', { status: 404 });
            admin.notifications.push({
                context: 'Draw',
                message: `Draw ${data.drawName} updated`,
                date: new Date().toISOString(),
            });
            admin.unreadNotifications += 1;
            await drawExists.save();
            await admin.save();
            SendEmailToAdmin({ context: 'Draw Updated', message: `${drawExists.drawName} has been updated<br><h3>New Details</h3><p>Draw Status: ${drawExists.active ? 'Active' : 'Inactive'}</p><p>Draw Type: ${drawExists.drawType}</p><p>End Date: ${drawExists.enddate}</p><p>Numbers: ${drawExists.numbers.length > 0 ? drawExists.numbers.join(', ') : 'Not submitted'}</p><p>Winning Numbers: ${drawExists.winningNumbers.length > 0 ? drawExists.winningNumbers.join(', ') : 'TBD'}` });
            return NextResponse.json('Draw updated successfully', { status: 200 });
        }
        else if(drawExists && action === 'delete') {
            await Draw.deleteOne({ drawName: data.drawName });
            const admin = await Admin.findOne({ id: 'admin' });
            if(!admin) return NextResponse.json('Admin not found', { status: 404 });
            admin.notifications.push({
                context: 'Draw',
                message: `Draw ${data.drawName} deleted`,
                date: new Date().toISOString(),
            });
            admin.unreadNotifications += 1;
            await admin.save();
            SendEmailToAdmin({ context: 'Draw Deleted', message: `${data.drawName} has been deleted` });
            return NextResponse.json('Draw deleted successfully', { status: 200 });
        }
        else if (drawExists && action === 'create') {
            return NextResponse.json('Draw already exists', { status: 400 });
        }
        else if ((action === 'edit' || action === 'delete') && !drawExists) {
            return NextResponse.json('Draw does not exist', { status: 400 });
        }
        const newDraw = new Draw(data);
        const admin = await Admin.findOne({ id: 'admin' });
        if (!admin) return NextResponse.json('Admin not found', { status: 404 });
        admin.notifications.push({
            context: 'Draw',
            message: `Draw ${data.drawName} created`,
            date: new Date().toISOString(),
        });
        admin.unreadNotifications += 1;
        await newDraw.save();
        await admin.save();
        SendEmailToAdmin({ context: 'Draw Created', message: `${data.drawName} has been created<br><h3>Details</h3><p>Draw Status: ${newDraw.active ? 'Active' : 'Inactive'}</p><p>Draw Type: ${newDraw.drawType}</p><p>End Date: ${newDraw.enddate}</p><p>Numbers: ${newDraw.numbers.length > 0 ? newDraw.numbers.join(', ') : 'Not submitted'}</p><p>Winning Numbers: ${newDraw.winningNumbers.length > 0 ? newDraw.winningNumbers.join(', ') : 'TBD'}` });
        return NextResponse.json('Draw created successfully', { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, { status: 500 });
    }
}