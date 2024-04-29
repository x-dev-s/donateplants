import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Head from "next/head";
import Script from "next/script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import PageLoading from "@/components/pageloading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Donate Plants",
  description: "Donate plants to save the environment",
  image: "/images/logo.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      </Head>

      <body className={inter.className}>
        <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></Script>
        <Script src="https://www.paypal.com/sdk/js?client-id=AbEPveF6QGjzRzmt6jhFuPj7bU0TFQK7miDV6g5HMuBPPQ2d1RiGe60072Oh-5HE3lvVeXs8v6gQGYEX&currency=USD"></Script>
        <PageLoading />
        <Header />
        <div className="min-h-screen">{children}</div>
        <Footer />
        <script async src="/js/script.js" type="text/javascript"></script>
      </body>
    </html>
  );
}