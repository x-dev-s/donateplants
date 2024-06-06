import connect from '@/utils/db';
import User from '@/models/user';
import Draw from '@/models/draws';
import Admin from '@/models/admin';
import { SendEmailToAdmin } from '@/app/server';
import { NextResponse } from 'next/server';
import { GetCurencyExchangeRate } from '@/app/server';

export async function POST(request) {
    try {
        const { email, type, amount, method = "Stripe", data = {} } = await request.json();
        await connect();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        if (type == 'add') {
            let rate = await GetCurencyExchangeRate('USD', 'PKR');
            user.balance += amount * rate;
            user.deposits.push({ amount: amount * rate, method, date: new Date().toISOString('en-CA') });
            const admin = await Admin.findOne({ id: "admin" });
            if (!admin) {
                return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
            }
            admin.notifications.push({
                context: 'Money Deposit',
                message: `${user.email} deposited PKR ${amount * rate} via ${method}`,
                date: new Date().toISOString('en-CA')
            });
            admin.unreadNotifications += 1;
            await admin.save();
            SendEmailToAdmin({ context: 'Money Deposit', message: `${user.email} deposited PKR ${((amount * rate)/100).toFixed(2)} via ${method}<br><br/><h3>Current Balance: PKR ${(user.balance / 100).toFixed(2)}</h3>` });
        } else if (type == 'subtract') {
            if (user.balance < amount) {
                console.log('Insufficient balance');
                return NextResponse.json({ message: 'Insufficient balance' }, { status: 400 });
            }
            user.balance -= amount;
            user.draws.push({ active: true, drawName: data.drawName, drawType: data.type, numbers: [], date: new Date().toISOString('en-CA') });
            const draw = await Draw.findOne({ drawName: data.drawName });
            if (!draw) {
                return NextResponse.json({ message: 'Draw not found' }, { status: 404 });
            }
            !draw.users.includes(user.email) ? draw.users.push(user.email) : null;
            await draw.save();
            const admin = await Admin.findOne({ id: "admin" });
            if (!admin) {
                return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
            }
            if (data?.type == 'Standard') {
                admin.notifications.push({
                    context: 'Donation Made',
                    message: `${user.email} donated PKR ${amount / 100} and entered the Epic 8 Draw`,
                    date: new Date().toISOString('en-CA')
                });
                admin.unreadNotifications += 1;
                admin.drawsBought += 1;
                admin.totalDonations += amount;
                admin.donationsCount += 1;
                SendEmailToAdmin({ context: 'Donation Made', message: `${user.email} donated PKR ${amount / 100} and entered the Epic 8 Draw<br><br/><h3>Current Balance: PKR ${(user.balance / 100).toFixed(2)}</h3>` });
                user.donations.push({ donationType: 'Standard', amount, date: new Date().toISOString('en-CA'), plantStatus: false, plantedOn: null, plantLocation: null });
            }
            else if (data?.type == 'Farmer') {
                user.draws.push({ active: true, drawName: data.drawName, drawType: data.type, numbers: [], date: new Date().toISOString('en-CA') });
                user.donations.push({ donationType: 'Farmer', amount, date: new Date().toISOString('en-CA') });
                const draw = await Draw.findOne({ drawName: data.drawName });
                if (!draw) {
                    return NextResponse.json({ message: 'Draw not found' }, { status: 404 });
                }
                !draw.users.includes(user.email) ? draw.users.push(user.email) : null;
                await draw.save();
                admin.notifications.push({
                    context: 'Donation Made',
                    message: `${user.email} donated PKR ${amount / 100} and entered the Farmers Special Draw`,
                    date: new Date().toISOString('en-CA')
                });
                admin.unreadNotifications += 1;
                admin.drawsBought += 2;
                admin.totalDonations += amount;
                admin.donationsCount += 1;
                SendEmailToAdmin({ context: 'Donation Made', message: `${user.email} donated PKR ${amount / 100} and entered the Farmers Special Draw and the Epic 8 Draw<br><br/><h3>Current Balance: PKR ${(user.balance / 100).toFixed(2)}</h3>` });
            }
            await admin.save();
        }
        await user.save();
        return NextResponse.json({ message: 'Balance updated' }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, { status: 500 });
    }
}