import Register from "@/components/register/register";

export const metadata = {
    title: "Register - " + process.env.WEBSITE_NAME,
    description: "Register to donate and win exciting prizes",
    image: "/images/logo.png",
    openGraph: {
        title: "Register - " + process.env.WEBSITE_NAME,
        description: "Register to donate and win exciting prizes",
        image: "/images/logo.png",
    },
    twitter: {
        title: "Register - " + process.env.WEBSITE_NAME,
        description: "Register to donate and win exciting prizes",
        image: "/images/logo.png",
    },
};

export default function RegisterPage() {
    return <Register />;
}