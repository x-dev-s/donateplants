import connect from '@/utils/db';
import User from '@/models/user';
import Draw from '@/models/draws';
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
        } else if (type == 'subtract') {
            if (user.balance < amount) {
                console.log('Insufficient balance');
                return NextResponse.json({ message: 'Insufficient balance' }, { status: 400 });
            }
            user.balance -= amount;
            user.draws.push({ active: true, drawName: 'Epic 8 Draw', drawType: 'Standard', numbers: [], date: new Date().toISOString('en-CA') });
            const draw = await Draw.findOne({ drawName: 'Epic 8 Draw' });
            if (!draw) {
                return NextResponse.json({ message: 'Draw not found' }, { status: 404 });
            }
            !draw.users.includes(user.email) ? draw.users.push(user.email) : null;
            await draw.save();
            if (data?.type == 'Standard') {
                user.donations.push({ donationType: 'Standard', amount, date: new Date().toISOString('en-CA') });
            }
            else if (data?.type == 'Farmer') {
                user.draws.push({ active: true, drawName: 'Farmers Special Draw', drawType: 'Farmer', numbers: [], date: new Date().toISOString('en-CA') });
                user.donations.push({ donationType: 'Farmer', amount, date: new Date().toISOString('en-CA') });
                const draw = await Draw.findOne({ drawName: 'Farmers Special Draw' });
                if (!draw) {
                    return NextResponse.json({ message: 'Draw not found' }, { status: 404 });
                }
                !draw.users.includes(user.email) ? draw.users.push(user.email) : null;
                await draw.save();
            }
        }
        await user.save();
        return NextResponse.json({ message: 'Balance updated' }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, { status: 500 });
    }
}