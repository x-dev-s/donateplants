import Login from "@/components/login/login";

export const metadata = {
    title: "Login - " + process.env.WEBSITE_NAME,
    description: "Login to donate and win exciting prizes",
    image: "/images/logo.png",
    openGraph: {
        title: "Login - " + process.env.WEBSITE_NAME,
        description: "Login to donate and win exciting prizes",
        image: "/images/logo.png",
    },
    twitter: {
        title: "Login - " + process.env.WEBSITE_NAME,
        description: "Login to donate and win exciting prizes",
        image: "/images/logo.png",
    },
};

export default function LoginPage() {
    return <Login />;
}