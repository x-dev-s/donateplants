import connect from "@/utils/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/mailer";

await connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json(
        { error: "Please Provide an Email!" },
        { status: 400 }
      );
    }

    const user = await User.findOne({email});

    if(!user){
        return NextResponse.json(
            {error: "User Does Not Exist!"},
            {status : 400}
        )
    }

    await sendEmail({email, emailType: "RESET", userId: user._id});
    
    return NextResponse.json({
      message: "Email Sent",
      success: true
  })


  } catch (error) {
    return NextResponse.json({error:error.message},{status:500})

  }
}