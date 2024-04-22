"use client"
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Head from "next/head";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>

      </Head>

      <body className={inter.className}>
        <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></Script>
        <header className="grid">

          <nav className="h-fit z-10">
            <div className="bg-green-800 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button onClick={() => { Array.from(document.getElementById("navbarClose").classList).includes("hidden") ? document.getElementById("mobileMenu").style.height = "100px" : document.getElementById("mobileMenu").style.height = "0px"; document.getElementById("navbarOpen").classList.toggle("hidden"); document.getElementById("navbarClose").classList.toggle("hidden") }} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                    <svg id="navbarOpen" className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <svg id="navbarClose" className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img className="h-12" src="/images/logo.png" alt="logo" />
                  </div>
                  <div className="hidden sm:block mx-auto ">
                    <div className="flex space-x-4">
                      <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a>
                      <a href="/draws" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Draws</a>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <div>
                  <img width="24" height="24" src="/images/search.svg" alt="search" />
                </div> */}
                  <div className="hidden md:block bg-gray-700 hover:bg-black text-sm font-medium animate-pulse rounded-md ml-3">
                    <button className="donateBtn p-2 pl-1 flex items-center"><span><img style={{ height: "24px" }} src="/images/donate_white.png" alt="donate" /></span> <span className="pl-1">Donate Now</span></button>
                  </div>
                  <div className="md:hidden text-sm font-medium hover:bg-gray-700 animate-pulse rounded-md">
                    <button className="donateBtn p-2"><img style={{ height: "24px" }} src="/images/donate.png" alt="donate" /></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-0 bg-green-800 overflow-hidden transition-all" id="mobileMenu">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <a href="/" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</a>
                <a href="/drawss" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Draws</a>
              </div>
            </div>
          </nav>
        </header>
        <div className="min-h-screen">{children}</div>
        <div className="max-w-7xl sm:px-16">
          <div className="mx-auto grid mb-3">
            <h3 className="text-2xl text-center mb-3">Choose Payment Method</h3>
            <div className="bg-green-600 animate-bounce mx-auto text-white text-center text-2xl h-[48px] w-[48px] p-2 rounded-full">
              &darr;
            </div>
          </div>
          <div id="paymentMethods" className="mx-auto w-fit flex items-center mb-12 gap-2">
            <a href="#"><img className="mix-blend-darken m-auto" src="/images/paypal.png" style={{ height: "30px" }} alt="paypal" /></a>
            <a href="#"><img className="mix-blend-darken m-auto" src="/images/stripe.png" style={{ height: "30px" }} alt="stripe" /></a>
            <a href="#"><img className="mix-blend-darken m-auto" src="/images/jazzcash.png" style={{ height: "30px" }} alt="jazzcash" /></a>
            <a href="#"><img className="mix-blend-darken m-auto" src="/images/easypaisa.png" style={{ height: "30px" }} alt="easypaisa" /></a>
          </div>
        </div>
        <footer className="bg-gray-700 text-white text-xs">
          <div className="mx-auto max-w-7xl py-4 px-2 sm:px-6 lg:px-8">
            <div className="flex justify-between">
              <div>
                <p>© 2022 Plants. All rights reserved.</p>
              </div>
              <div>
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
        </footer>
      <script async src="/js/script.js" type="text/javascript"></script>
      </body>
    </html>
  );
}
