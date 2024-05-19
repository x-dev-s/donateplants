'use client'
import { logout } from "@/lib"
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { handleBuyDonate } from "./draws/draws";
import { useEffect } from "react";

export function Header() {
    const auth = useAuth();
    useEffect(() => {
        console.log(auth)
        if(auth) document.getElementById('userDropdown').classList.add('hidden');
    }, [auth])
    return (
        <>
            <header className="grid">
                <nav className="h-fit z-10">
                    <div className="bg-green-800 mx-auto">
                        <div className="container relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:justify-start">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <button onClick={handleNavbar} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
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
                                <Link href="/">
                                    <img className="h-12" src="/images/logo.png" alt="logo" />
                                </Link>
                                <div className="hidden sm:block mx-auto ">
                                    <div className="flex">
                                        <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</Link>
                                        <Link href="/draws" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Draws</Link>
                                        <Link href="/howtoplay" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">How to Play</Link>
                                        {/* <Link href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About Us</Link> */}
                                        {/* <Link href="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Contact Us</Link> */}
                                        <Link href="/faq" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">FAQs</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* <div>
                  <img width="24" height="24" src="/images/search.svg" alt="search" />
                </div> */}
                                <div className="hidden bg-gray-800 hover:bg-black text-gray-300 hover:text-white text-sm font-medium rounded-md ml-3">
                                    <button className="donateBtn p-2 pl-1 flex items-center"><span><img className=" animate-pulse" style={{ height: "24px" }} src="/images/donate.png" alt="donate" /></span> <span className="pl-1">Donate Now</span></button>
                                </div>
                                <div title="Donate" className="text-sm font-medium hover:bg-gray-700 animate-pulse rounded-md h-[40px] w-[40px] flex">
                                    <Link href="/draws" className="donateBtn p-2"><img style={{ height: "24px" }} src="/images/donate.png" alt="donate" /></Link>
                                </div>
                                {
                                    auth ? (
                                        <div className="relative">
                                            <div id="user" className="relative hover:bg-gray-700 cursor-pointer rounded-md p-2" onClick={handleProfileClick}>
                                                <a role="button"><img style={{ height: "24px" }} src="/images/person.png" alt="logout" /></a>
                                            </div>
                                            <div id="userDropdown" className="hidden absolute top-[100%] right-[-8px] p-2" style={{ width: "max-content" }}>
                                                <div className="bg-gray-700 text-gray-300 text-sm font-medium rounded-md ml-3 overflow-hidden">
                                                    {/* <button className="p-2 w-full flex items-center hover:bg-gray-900 hover:text-white"><span><img style={{ height: "18px" }} src="/images/profile.png" alt="profile" /></span> <span className="pl-2">Profile</span></button> */}
                                                    <Link className="p-2 w-full flex items-center text-gray-300 hover:bg-gray-900 hover:text-white" href="/dashboard"><span><img style={{ height: "18px" }} src="/images/dashboard.png" alt="dashboard" /></span> <span className="pl-2">Dashboard</span></Link>
                                                    <button onClick={handleLogout} className="p-2 w-full flex items-center hover:bg-gray-900 hover:text-white"><span><img style={{ height: "18px" }} src="/images/logout.png" alt="logout" /></span> <span className="pl-2">Logout</span></button>
                                                </div>
                                            </div>
                                        </div>) : (<div id="loginLink" title="Login" className="hover:bg-gray-700 cursor-pointer rounded-md p-2">
                                            <Link href="/login"><img style={{ height: "24px" }} src="/images/login.png" alt="login" /></Link>
                                        </div>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="h-0 bg-green-800 overflow-hidden transition-all" id="mobileMenu">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            <Link href="/" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</Link>
                            <Link href="/draws" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Draws</Link>
                            <Link href="/howtoplay" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">How to Play</Link>
                            {/* <Link href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">About Us</Link> */}
                            {/* <Link href="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Contact Us</Link> */}
                            <Link href="/faq" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">FAQs</Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

const handleNavbar = () => {
    Array.from(document.getElementById("navbarClose").classList).includes("hidden") ? document.getElementById("mobileMenu").style.height = "185px" : document.getElementById("mobileMenu").style.height = "0px"; document.getElementById("navbarOpen").classList.toggle("hidden"); document.getElementById("navbarClose").classList.toggle("hidden")
}

const handleProfileClick = () => {
    document.getElementById("userDropdown").classList.toggle("hidden");
}

const handleLogout = async () => {
    await logout();
    window.location.assign('/login');
}