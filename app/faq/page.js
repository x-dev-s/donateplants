import FAQs from "@/components/faq/faq";

export const metadata = {
    title: "FAQs - " + process.env.WEBSITE_NAME,
    description: "Frequently asked questions",
    image: "/images/logo.png",
    openGraph: {
        title: "FAQs - " + process.env.WEBSITE_NAME,
        description: "Frequently asked questions",
        image: "/images/logo.png",
    },
    twitter: {
        title: "FAQs - " + process.env.WEBSITE_NAME,
        description: "Frequently asked questions",
        image: "/images/logo.png",
    },
}

export default function FAQsPage(){
    return (
        <FAQs />
    )
}