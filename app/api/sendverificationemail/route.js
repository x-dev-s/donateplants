import { sendEmail } from "@/utils/mailer";

export async function POST(request) {
    const { email, userId } = await request.json()
    console.log(email)

    try {
        await sendEmail({email, emailType: "VERIFY", userId})
        return new NextResponse("Email sent", { status: 200 })
    } catch (err) {
        return new NextResponse(err, {
            status: 500
        })
    }
}