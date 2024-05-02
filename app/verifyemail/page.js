"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function VerifyEmailPage() {
    const [error, setError] = useState(false);
    const [status, setStatus] = useState(false);
    const [token, setToken] = useState("");
    const router = useRouter();
    
    useEffect(() => {
        let urlToken = window.location.search.split("=")[1];
        if (!urlToken) {alert("Invalid Token"); router.back(); return;}
        urlToken = decodeURIComponent(urlToken);
        setToken(urlToken);
        verifyUserEmail(urlToken);
    }, [router]);

    const verifyUserEmail = async (token) => {
        try {
            await axios.post('/api/verifyemail', {token})
            setError(false);
            setStatus(true);
        } catch (error) {
            setError(true);
            setStatus(true);
            console.log(error?.response?.data);   
        }
    }


    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            {
                status ? (
                    error ? (
                        <div className="text-red-500 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> There was an error verifying your email. Please try again.</span>
                        </div>
                    ) : (
                        <div className="text-green-500 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Success!</strong>
                            <span className="block sm:inline"> Your email has been verified successfully.</span>
                            <Link href="/login"className="text-blue-500 text-sm mt-3">Login
                            </Link>
                        </div>
                    )
                ) : (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Verifying your email...</h1>
                    </div>
                )
            }
        </div>
    )
}