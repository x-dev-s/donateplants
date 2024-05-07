'use client'

import { useEffect } from "react";

export default function PricingModal({ pkgs, type, user, drawName }) {
    useEffect(() => {
        console.log(pkgs, type, user, drawName);
    }, [pkgs, type, user, drawName]);
    let pkr = Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
    });

    return (
        <div id={type + "PricingModal"} className="fixed flex h-full w-full top-0 left-0 z-20 backdrop-blur bg-black/50">
            <div className="bg-gray-100 relative w-full md:w-[350px] h-full md:h-[80%] mx-auto md:my-[5%] p-4 rounded-lg">
                <button id="backbtn" onClick={() => { document.getElementById("pricingModal").classList.add("hidden"); document.getElementById('buyDonate').classList.remove('hidden'); }} className="absolute top-0 left-0 p-2 text-lg text-black">&larr;</button>
                <button onClick={() => { document.getElementById("pricingModal").classList.add("hidden")}} className="absolute top-0 right-0 p-2 text-2xl text-black">&times;</button>
                <h2 className="text-2xl text-center pb-3">Confirm your donation</h2>
                <div className="grid grid-cols-1 overflow-y-scroll gap-4 min-h-[300px] max-h-[90%]">
                    {pkgs && pkgs.filter(pkg => pkg.type == type).map((pkg, index) => (
                        <div key={index} className={index == 1 ? "bg-green-600 px-3 pt-3 pb-0 rounded-lg text-center" : "mt-3"}>
                            <div className="bg-white overflow-hidden relative rounded-lg text-center">
                                <div className="p-3">
                                    <h3 className="text-xl pb-1 font-semibold">{pkg.name.replace(/[0-9]/g, '')}</h3>
                                    <p className="text-sm">{pkg.description}</p>
                                </div>
                                <img className="w-auto h-[200px] object-contain my-3 mx-auto" src={pkg.images[0] || type == 'Standard' ? '/images/p1.png' : '/images/p4.png'} alt={pkg.name} />
                                <button onClick={(e) => handlePayment(e, type, pkg, user.email)} className="bg-green-600 hover:bg-green-800 text-white p-2 w-full">Donate {pkr.format(pkg.price / 100)}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const handlePayment = async (e, type, pkg, email) => {
    try {
        e.preventDefault();
        e.target.disabled = true;
        e.target.innerText = "Processing...";
        const res = await fetch("/api/updatebalance", {
            method: "POST",
            body: JSON.stringify({
                email,
                type: 'subtract',
                amount: pkg.price,
                data: { type, pkg }
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status === 400) {
            alert('Insufficient balance');
            window.location.assign('/dashboard')
            return;
        }
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
}