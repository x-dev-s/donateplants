'use client'
import Image from 'next/image';
import { useEffect } from 'react';

export default function Card({ title, description, image }) {
    useEffect(() => {
        let interval = setInterval(() => {
            if(document.getElementById('pageloading').classList.contains('hidden')) {
                let cards = document.querySelectorAll('.bg-gray-100');
                for(let card of cards) {
                    card.classList.add('animate-[slideUpFadeIn_1s_ease]');
                }
                clearInterval(interval);
            }
        }, 200);
    }, []);
    return (
        <div>
            <div className="bg-gray-100 rounded-lg w-full h-full relative p-3">
                <div className="absolute left-1/2 -top-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center">
                    <Image width={80} height={80} src={image} alt={title} />
                </div>
                <p className="pt-[20px] font-semibold text-gray-700">{title}</p>
                <p className="text-2xl text-green-600 font-semibold">{description}</p>
            </div>
        </div>
    )
}