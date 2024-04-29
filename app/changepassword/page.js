"use client";

import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function ChangePassword() {
    const router = useRouter()
    const [token, setToken] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (newpassword === "" || confirmpassword === "") {
                setError("Please Fill All Fields");
                setLoading(false);
                return;
            } else if (newpassword !== confirmpassword) {
                setError("Passwords Do Not Match");
                setLoading(false);
                return;
            } else if (!newpassword || newpassword.length < 8) {
                setError("Password is invalid");
                setLoading(false);
                return;
            }
            await axios.post("/api/changepassword", { token, newpassword, confirmpassword});
            setError("Password Changed Successfully");
            setLoading(false);
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error) {
            setError("Error Changing Password");
            setLoading(false);
            console.log(error?.response?.data);
        }
    };

    useEffect(() => {
        let urlToken = window.location.search.split("=")[1];
        if (!urlToken) router.push("/forgotpassword");
        urlToken = decodeURIComponent(urlToken);
        console.log(urlToken)
        setToken(urlToken);
    }, [router]);

    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <h1 className="text-3xl font-bold text-center mb-4">Change Password</h1>
                <form className="flex flex-col space-y-4">
                    <input
                        type="password"
                        name="newpassword"
                        placeholder="New Password"
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border p-2"
                        required
                    />
                    <input
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border p-2"
                        required
                    />
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-green-600 text-white p-2 rounded"
                    >
                        {loading ? (<Image className="mx-auto" width={20} height={20} src="/images/loading.gif" alt="Loading..."/>) : "Change Password"}
                    </button>
                </form>
                <div className={!error.includes("Successfully") ? "text-red-500 mt-2 text-sm" : "text-green-500 mt-2 text-sm"}>* {error}</div>
            </div>
        </div>
    );
}