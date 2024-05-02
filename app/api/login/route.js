import User from "@/models/user"
import connect from "@/utils/db"
import bcrypt from "bcryptjs"
import { NextResponse } from 'next/server';
import { login } from '@/lib';
import { cookies } from "next/headers";

export async function POST(request) {
  const credentials = await request.json();
  await connect();
  try {
    const user = await User.findOne({ email: credentials.email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (isPasswordCorrect) {
        await login({ email: credentials.email, name: user.name.replace(/\s/g, ''), id: user._id });
        return new NextResponse("Login Successful", { status: 200 });
      }
      else {
        return new NextResponse("Password is incorrect", { status: 400 });
      }
    }
    else {
      return new NextResponse("This email is not registered", { status: 400 });
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }

}