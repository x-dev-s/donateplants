import Home from "@/components/home/home";

export const metadata = {
  title: "Home - " + process.env.WEBSITE_NAME,
  description: "Donate plants to save the environment",
  image: "/images/logo.png",
  openGraph: {
    title: "Home - " + process.env.WEBSITE_NAME,
    description: "Donate plants to save the environment",
    image: "/images/logo.png",
  },
  twitter: {
    title: "Home - " + process.env.WEBSITE_NAME,
    description: "Donate plants to save the environment",
    image: "/images/logo.png",
  },
};

export default function HomePage() {
  return <Home />;
}
