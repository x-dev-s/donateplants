import User from "@/models/user"
import connect from "@/utils/db"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, phone, email, password } = await request.json()
    console.log(name, phone, email, password)

  await connect()

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 5)
  const newUser = new User({
    name,
    phone,
    email,
    password: hashedPassword,
    isVerified: false,
    isAdmin: false,
    forgotPasswordToken: null,
    forgotPasswordTokenExpiry: null,
    verifyToken: null,
    verifyTokenExpiry: null
  })

  try {
    const savedUser = await newUser.save()
    await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
    return new NextResponse("user is registered", { status: 200 })
  } catch (err) {
    return new NextResponse(err, {
      status: 500
    })
  }
}
