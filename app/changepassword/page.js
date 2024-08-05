import ChangePassword from "@/components/changepassword/changepassword"

export const metadata = {
    title: "Change Password - " + process.env.WEBSITE_NAME,
    description: "Change your password here",
    image: "/images/logo.png",
    openGraph: {
        title: "Change Password - " + process.env.WEBSITE_NAME,
        description: "Change your password here",
        image: "/images/logo.png",
    },
    twitter: {
        title: "Change Password - " + process.env.WEBSITE_NAME,
        description: "Change your password here",
        image: "/images/logo.png",
    },
};

export default function ChangePasswordPage() {
    return <ChangePassword />
}