"use client";

import axios from "axios";
import toast from "react-hot-toast";
import React from "react";
import { useState } from "react";
import Image from "next/image";

const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

export default function ForgotPasswordPage() {
    const [user, setUser] = useState({
        email: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            if (user.email === "" || !isValidEmail(user.email)) {
                setError("Invalid Email!");
                toast.error("Invalid Email!");
                return;
            }
            setLoading(true);
            const response = await axios.post('/api/forgotpassword', user);
            console.log("Forgot Password Response", response.data);
            toast.success('Email Sent!');
            setError("Email Sent!");
        } catch (error) {
            setError("Error Sending Email!");
            console.log("Error Sending Email", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <h1 className="text-3xl font-bold text-center mb-4">Forgot Password</h1>
                <form className="flex flex-col space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="border p-2"
                        required
                    />
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-green-600 text-white p-2 rounded"
                    >
                        {loading ? (<Image className="mx-auto" width={20} height={20} src="/images/loading.gif" alt="Loading..." />) : "Send Email"}
                    </button>
                </form>
                {error && <p className={!error.includes("Email Sent") ? "text-red-500 mt-2 text-sm" : "text-green-500 mt-2 text-sm"}>* {error}</p>}
            </div>
        </div>
    )
}