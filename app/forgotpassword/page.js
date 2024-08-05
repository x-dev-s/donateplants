import ForgotPassword from "@/components/forgotpassword/forgotpassword";

export const metadata = {
    title: "Forgot Password - " + process.env.WEBSITE_NAME,
    description: "Forgot your password? No worries! Reset your password here",
    image: "/images/logo.png",
};

export default function ForgotPasswordPage() {
    return <ForgotPassword />;
}