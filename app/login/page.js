'use client'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!isValidEmail(email)) {
                setError("Email is invalid");
                return;
            }
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (res.status === 200) {
                setError('Success! Redirecting...');
                let next = window.location.search.split('next=')[1];
                setTimeout(() => {
                    window.location.assign(next ? decodeURIComponent(next) : '/');
                }, 2000);
            }
            else if (res.status === 400) {
                setError(res.text());
            }
            else {
                const data = await res.json();
                setError(data.message);
            }
        } catch (error) {
            console.error('An unexpected error happened:', error);
            setError('An unexpected error happened');
        }
        setLoading(false);
    };

    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <Link href="/forgotpassword" className="text-[12px] mt-1 text-green-600">Forgot password?</Link>
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-800 text-white text-center p-2 rounded"
                        disabled={loading}
                    >
                        {loading ? (<Image className="mx-auto" width={20} height={20} src="/images/loading.gif" alt="Loading..."/>) : 'Login'}
                    </button>
                    {error && <p className={!error.includes("Success") ? "text-red-500 mt-2 text-sm" : "text-green-500 mt-2 text-sm"}>* {error}</p>}
                </form>
                <p className="text-center text-lg my-3 text-gray-300">- OR -</p>
                <p className="text-center text-sm">Don&apos;t have an account? <Link href="/register" className="text-green-600">Register</Link></p>
            </div>
        </div>
    );
}