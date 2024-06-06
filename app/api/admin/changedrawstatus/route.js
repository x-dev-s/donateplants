import Draw from '@/models/draws';
import User from '@/models/user';
import connect from '@/utils/db';
import Admin from '@/models/admin';
import { NextResponse } from 'next/server';
import { SendEmailToAdmin } from '@/app/server';

export async function POST(request) {
    const { action, name } = await request.json();
    console.log(action, name);
    await connect();
    try {
        const draw = await Draw.findOne({ drawName: name });
        global.draw = draw;
        if (draw) {
            if (action === 'activate') {
                draw.active = true;
                await draw.save();
                // filter users who have this draw by name and check whether the buy date is in between the draw start and end date
                const Users = (await User.find()).filter(user => user.draws.some(draw => draw.drawName === name && new Date(draw.date) >= new Date(global.draw.createddate) && new Date(draw.date) <= new Date(global.draw.enddate)));
                Users.forEach(async user => {
                    user.draws = user.draws.map(draw => draw.drawName === name ? { ...draw, active: true } : draw);
                    await user.save();
                });
            } else if (action === 'deactivate') {
                draw.active = false;
                await draw.save();
                const Users = (await User.find()).filter(user => user.draws.some(draw => draw.drawName === name && new Date(draw.date) >= new Date(global.draw.createddate) && new Date(draw.date) <= new Date(global.draw.enddate)));
                Users.forEach(async user => {
                    user.draws = user.draws.map(draw => draw.drawName === name ? { ...draw, active: false } : draw);
                    await user.save();
                });
            }
            const admin = await Admin.findOne({ id: 'admin' });
            if (!admin) return NextResponse.json('Admin not found', { status: 404 });
            admin.notifications.push({
                context: 'Draw',
                message: `${draw.drawName} is now ${draw.active ? 'Active' : 'Inactive'}`,
                date: new Date().toISOString(),
            });
            admin.unreadNotifications += 1;
            await admin.save();
            SendEmailToAdmin({ context: 'Draw Status Updated', message: `${draw.drawName} is now ${draw.active ? 'Active' : 'Inactive'}` });
            return NextResponse.json('Draw status updated', { status: 200 });
        }
        return NextResponse.json('Draw not found', { status: 404 });
    }
    catch (err) {
        console.error(err);
        throw new Error(err);
    }
}