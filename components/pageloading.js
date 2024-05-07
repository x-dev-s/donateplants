'use client'
import { useEffect } from "react";

export default function PageLoading() {
    useEffect(() => {
        setTimeout(() => {
            document.getElementById('pageloading').classList.add('hidden');
        }, 2000);
    }, []);
    return (
        <div id="pageloading" className="h-screen w-screen fixed top-0 left-0 z-50 bg-gray-100">
            <div className="flex h-full w-full items-center mx-auto justify-center">
                <img className="animate-pulse mix-blend-darken h-[200px]" src="/images/logo.png" alt="loading" />
            </div>
        </div>
    );
}