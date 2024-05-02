import connect from '@/utils/db';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, type, amount } = await request.json();
        await connect();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.error(new Error('User not found'), 400);
        }
        if (type == 'add') {
            user.balance += amount;
            user.deposits.push({ amount, date: new Date().toISOString('en-CA').split('T')[0] });
        } else if (type == 'subtract') {
            user.balance -= amount;
        }
        await user.save();
        return NextResponse.json({ message: 'Balance updated' }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, 500);
    }
}