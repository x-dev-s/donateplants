'use client'
import axios from "axios";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import PricingModal, { handlePaypalSubscription, handleStripeSubscription } from "./products_modal";
import Image from "next/image";

export function Footer() {
    const router = useRouter();
    const pagePath = usePathname();
    const [products, setProducts] = useState([]);
    const [prices, setPrices] = useState([]);
    useEffect(() => {
        fetchProducts();
        fetchPrices();
        if (pagePath.includes('login') || pagePath.includes('register') || pagePath.includes('forgotpassword') || pagePath.includes('dashboard')) {
            document.getElementById('paymentMethodsWrapper').classList.add('hidden');
        }
    }, [pagePath, router]);
    const fetchProducts = async () => {
        const { data } = await axios.get("/api/searchproducts?type=donate")
        setProducts(data);
    }
    const fetchPrices = async () => {
        const { data } = await axios.get("/api/searchprices?type=donate")
        setPrices(data);
        // const arr = ["price_1P9IPs024oc1LVnl0AdgJ53C", "price_1P9IOc024oc1LVnlR4zrHHEX", "price_1P9IMS024oc1LVnl9XUcJGdF"]
        // for(let i = 1; i < data.length; i++) {
        //     let type = "donate";
        // if(i > 2) type = "buy";
        //     await axios.post("/api/updateprice", {
        //         priceId: data[i].id,
        //         type: type
        //     });
        // }
    }
    return (
        <>
            <div id="paymentMethodsWrapper" className="container hidden">
                <div className="mx-auto grid mb-3">
                    <h3 className="text-lg text-center mb-3">Choose Payment Method</h3>
                    <div className="bg-green-600 animate-bounce mx-auto text-white text-center text-lg h-[30px] w-[30px] p-[2px] rounded-full">
                        &darr;
                    </div>
                </div>
                <div id="paymentMethods" className="mx-auto w-fit flex items-center mb-12 gap-2">
                    <button onClick={ShowPricing}><img className="mix-blend-darken m-auto" src="/images/stripe.png" style={{ height: "30px" }} alt="stripe" /></button>
                    <button onClick={ShowPricing}><img className="mix-blend-darken m-auto" src="/images/paypal.png" style={{ height: "30px" }} alt="paypal" /></button>
                    <button onClick={ShowPricing}><img className="mix-blend-darken m-auto" src="/images/jazzcash.png" style={{ height: "30px" }} alt="jazzcash" /></button>
                    <button onClick={ShowPricing}><img className="mix-blend-darken m-auto" src="/images/easypaisa.png" style={{ height: "30px" }} alt="easypaisa" /></button>
                </div>
                <PricingModal data={{ products: products, prices: prices }} method="stripe" />
                <PricingModal data={{ products: products, prices: prices }} method="paypal" />
                <PricingModal data={{ products: products, prices: prices }} method="jazzcash" />
                <PricingModal data={{ products: products, prices: prices }} method="easypaisa" />
                <div id="paypalBuyDiv" className="mx-auto max-w-[200px]"></div>
            </div>
            <footer className="bg-gray-700 text-white text-xs">
                <div className="container mx-auto py-4">
                    <div className="flex justify-between">
                        <div>
                            <p>© 2024 Plants. All rights reserved.</p>
                        </div>
                        <div>
                            <p>Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

const ShowPricing = async (e) => {
    e.preventDefault();
    if (window.location.hash == "#donate" || window.location.hash == "") {
        document.getElementById(e.target.alt + "PricingModal").classList.remove("hidden");
    }
    else if (window.location.hash == "#buy") {
        var { data } = await axios.get("/api/searchprices?type=buy");
        let prices = data;
        var { data } = await axios.get("/api/searchproducts?type=buy");
        let products = data;
        if (e.target.alt == "stripe") {
            handleStripeSubscription(event, prices[0].id);
        }
        else if (e.target.alt == "paypal") {
            handlePaypalSubscription(event, products[0], prices[0], "paypalBuyDiv");
        }
    }
}
