import VerifyEmail from "@/components/verifyemail/verifyemail";

export const metadata = {
    title: "Verify Email - " + process.env.WEBSITE_NAME,
    description: "Verify your email",
    image: "/images/logo.png",
    openGraph: {
        title: "Verify Email - " + process.env.WEBSITE_NAME,
        description: "Verify your email",
        image: "/images/logo.png",
    },
    twitter: {
        title: "Verify Email - " + process.env.WEBSITE_NAME,
        description: "Verify your email",
        image: "/images/logo.png",
    },
}

export default function VerifyEmailPage(){
    return (
        <VerifyEmail />
    )
}