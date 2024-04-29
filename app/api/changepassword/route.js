import connect from "@/utils/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

await connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const user = reqBody;
    
    
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(user.confirmpassword, salt);

    
    const userr = await User.findOne({forgotPasswordToken: user.token, forgotPasswordTokenExpiry: {$gt: Date.now()}});
    console.log(userr)

    if (!userr) {
      return NextResponse.json({error: "Invalid token"}, {status: 400})
  }

    if(userr.password === hashedPassword){
        return NextResponse.json({error: "New password cannot be the same as the old password"}, {status: 400})
    }

    userr.password = hashedPassword;
    await userr.save();

    return NextResponse.json(
      { message: "Updated Successfully" },
      { status: 200 }
    );
    

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}
