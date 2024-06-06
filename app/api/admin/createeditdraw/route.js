import connect from "@/utils/db";
import Draw from "@/models/draws";
import User from "@/models/user";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";
import { SendEmailToAdmin, SendEmailToUser } from "@/app/server";

export async function POST(request) {
    try {
        const { action, data } = await request.json();
        await connect();

        const drawExists = await Draw.findOne({ drawName: data.drawName });
        if (drawExists && action === 'edit') {
            if (`${drawExists.active}` !== `${data.active}`) {
                if (drawExists.active) {
                    const Res = await fetch(process.env.DOMAIN + 'api/admin/changedrawstatus', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ action: 'deactivate', name: data.drawName })
                    });
                    if (Res.status !== 200) return NextResponse.json('Error deactivating draw', { status: 500 });
                } else {
                    const Res = await fetch(process.env.DOMAIN + 'api/admin/changedrawstatus', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ action: 'activate', name: data.drawName })
                    });
                    if (Res.status !== 200) return NextResponse.json('Error activating draw', { status: 500 });
                }
            }
            drawExists.drawName = data.drawName;
            drawExists.drawType = data.drawType;
            data.numbers.length > 0 ? drawExists.numbers = data.numbers : null;
            if (data.winningNumbers.join('') !== drawExists.winningNumbers.join('') && data.winningNumbers.length > 0 && drawExists.active) {
                await handleWinningNumbers(drawExists.drawName, data.winningNumbers);
            }
            data.winningNumbers.length > 0 ? drawExists.winningNumbers = data.winningNumbers : null;
            drawExists.prizes = data.prizes;
            drawExists.enddate = new Date(data.enddate);
            const admin = await Admin.findOne({ id: 'admin' });
            if (!admin) return NextResponse.json('Admin not found', { status: 404 });
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
        else if (drawExists && action === 'delete') {
            await Draw.deleteOne({ drawName: data.drawName });
            const admin = await Admin.findOne({ id: 'admin' });
            if (!admin) return NextResponse.json('Admin not found', { status: 404 });
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

const handleWinningNumbers = async (drawName, winNums) => {
    const winningNumbers = winNums.map(num => parseInt(num));
    const targetDraw = await Draw.findOne({ drawName });
    if (!targetDraw) return;
    const users = (await User.find({})).filter(user => user.draws.filter(draw => draw.drawName == drawName && draw.numbers.length > 0 && draw.active));
    let winners = {
        first: [],
        second: [],
        third: []
    }
    const sendEmailtoUser = async (email, prize) => {
        SendEmailToUser({
            email,
            context: 'Draw Results',
            message: `Congratulations! You have won the ${prize} in the ${drawName} draw. Your prize money will be transferred to your account shortly. For more details, please contact the admin at <a href="mailto:${global.email}">${global.email}</a> or <a href="tel:${global.phone}">${global.phone}</a>`,
        })
    }
    for (const user of users) {
        const draws = user.draws.filter(draw => draw.drawName == drawName && draw.numbers.length > 0 && draw.active);
        for (const draw of draws) {
            const matches = draw.numbers.filter(num => winningNumbers.includes(num));
            if (matches.length > targetDraw.toSelect - 3 && user.drawsWon.filter(won => won.drawId == draw._id).length == 0) {
                user.drawsWon.push({ drawId: draw._id, prize: matches.length == targetDraw.toSelect ? "First Prize" : matches.length == targetDraw.toSelect - 1 ? "Second Prize" : matches.length == targetDraw.toSelect - 2 ? "Third Prize" : null, amount: matches.length == targetDraw.toSelect ? targetDraw.prizes[0] : matches.length == targetDraw.toSelect - 1 ? targetDraw.prizes[1] : matches.length == targetDraw.toSelect - 2 ? targetDraw.prizes[2] : 0 })
                if (matches.length == targetDraw.toSelect && !winners.first.includes(user.email)) {
                    winners.first.push(user.email);
                    await sendEmailtoUser(user.email, "First Prize");
                } else if (matches.length == targetDraw.toSelect - 1 && !winners.second.includes(user.email)) {
                    winners.second.push(user.email);
                    await sendEmailtoUser(user.email, "Second Prize");
                } else if (matches.length == targetDraw.toSelect - 2 && !winners.third.includes(user.email)) {
                    winners.third.push(user.email);
                    await sendEmailtoUser(user.email, "Third Prize");
                }
            }
        }
        await user.save();
    }
    console.log(winners);
    const admin = await Admin.findOne({ id: 'admin' });
    if (!admin) return;
    admin.notifications.push({
        context: 'Draw',
        message: `Winners for ${drawName} have been announced - First Prize: ${winners.first.join(', ') || 'No winner'}, Second Prize: ${winners.second.join(', ') || 'No winner'}, Third Prize: ${winners.third.join(', ') || 'No winner'}`,
        date: new Date().toISOString(),
    });
    admin.unreadNotifications += 1;
    await admin.save();
    SendEmailToAdmin({ context: 'Draw Winners', message: `Winners for ${drawName} have been announced<br><h3>First Prize</h3><p>${winners.first.join(', ') || 'No winner'}</p><h3>Second Prize</h3><p>${winners.second.join(', ') || 'No winner'}</p><h3>Third Prize</h3><p>${winners.third.join(', ') || 'No winner'}</p>` });
    targetDraw.active = false;
    await targetDraw.save();
}