import nodemailer from "nodemailer";
import User from "@/models/user"
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "98c5d56d0532c223a088211458145f8b",
      },
    });

    const mailOptions = {
      from: "mailtrap@demomailtrap.com",
      to: "electricalera2023@gmail.com",
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<div style="background-color: #f4f4f4; padding: 20px; display: grid; align-items: center; gap: 20px; font-family: Arial, sans-serif; color: #333; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 0 auto; margin-top: 20px; justify-content: center; text-align: center;"><div><h1>${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</h1><p>Click on the button below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p></div><div><a role="button" style="background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;" href="${emailType === "VERIFY" ? process.env.DOMAIN + "verifyemail?token=" + hashedToken : process.env.DOMAIN + "changepassword?token=" + hashedToken}" target="_blank">${emailType === "VERIFY" ? "Verify email" : "Reset password"}</a></div></div>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const sendEmailToAdmin = async ({ context, message }: any) => {
  try {
    var transport = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "98c5d56d0532c223a088211458145f8b",
      },
    });

    const mailOptions = {
      from: "mailtrap@demomailtrap.com",
      to: "electricalera2023@gmail.com",
      subject: context,
      html: `<div style="background-color: #f4f4f4; padding: 20px; display: grid; align-items: center; gap: 20px; font-family: Arial, sans-serif; color: #333; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 0 auto; margin-top: 20px; justify-content: center; text-align: center;"><h1>${context}</h1><div>${message}</div></div>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  }
  catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}