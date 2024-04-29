"use client";
import { useState, useEffect } from "react";
import IntlTelInput from 'intl-tel-input/react';
import "intl-tel-input/build/css/intlTelInput.min.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
];

const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [errorCode, setErrorCode] = useState(null);
    const [notice, setNotice] = useState(null);
    const router = useRouter();

    const handlePhoneValidation = () => {
        if (isValid) {
            setNotice(`Valid number: ${phone}`);
        } else {
            const errorMessage = errorMap[errorCode || 0] || "Invalid number";
            setNotice(`* ${errorMessage}`);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!isValid) { setError('Invalid phone number'); setLoading(false); return }
            if (!isValidEmail(email)) {
                setError("Email is invalid");
                return;
            }

            if (!password || password.length < 8) {
                setError("Password is invalid");
                return;
            }
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, phone, email, password }),
            });
            if (res.status === 200) {
                setError("");
                router.push('/login');
            }
            else if (res.status === 400) {
                setError("This email is already registered");
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
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
        <div className="flex h-screen container">
            <div className="m-auto">
                <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    {/* <select
                        name="type"
                        id="type"
                        className="p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="farmer">Farmer</option>
                        <option value="general">General</option>
                    </select> */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <div className="flex flex-wrap gap-2 items-center">
                        <IntlTelInput
                            // initialValue={value}
                            onChangeNumber={setPhone}
                            onChangeValidity={setIsValid}
                            onChangeErrorCode={setErrorCode}
                            initOptions={{
                                initialCountry: "pk",
                                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@21.2.7/build/js/utils.js",
                            }}
                        />
                        <button className="button bg-gray-700 hover:bg-gray-900 py-2 px-3 text-white rounded-md" type="button" onClick={handlePhoneValidation}>&#10004;</button>
                        {notice && <div className={notice.includes("Valid") ? "notice text-sm text-green-500" : "notice text-sm text-red-500"}>{notice}</div>}
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-800 text-white p-2 rounded"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                    {error && <p className="text-red-500 text-sm">* {error}</p>}
                </form>
                <p className="text-center text-xl my-3 text-gray-300">- OR -</p>
                <p className="text-center text-sm">Already have an account? <Link href="/login" className="text-green-600">Login</Link></p>
            </div>
        </div>
    );
}