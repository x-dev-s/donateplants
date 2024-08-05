import Draws from "@/components/draws/draws"

export const metadata = {
    title: "Draws - " + process.env.WEBSITE_NAME,
    description: "Play the draws and win exciting prizes",
    image: "/images/logo.png",
    openGraph: {
        title: "Draws - " + process.env.WEBSITE_NAME,
        description: "Play the draws and win exciting prizes",
        image: "/images/logo.png",
    },
    twitter: {
        title: "Draws - " + process.env.WEBSITE_NAME,
        description: "Play the draws and win exciting prizes",
        image: "/images/logo.png",
    },
}

export default function DrawsPage() {
    return <Draws />
} 