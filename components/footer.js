'use client'
import axios from "axios";
import { useState, useEffect } from "react";
import PricingModal, { handlePaypalSubscription, handleStripeSubscription } from "./products_modal";
import Image from "next/image";

export function Footer() {
    const [products, setProducts] = useState([]);
    const [prices, setPrices] = useState([]);
    useEffect(() => {
        fetchProducts();
        fetchPrices();
    }, []);
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
            
            <PricingModal data={{ products: products, prices: prices }} method="stripe" />
            <PricingModal data={{ products: products, prices: prices }} method="paypal" />
            <PricingModal data={{ products: products, prices: prices }} method="jazzcash" />
            <PricingModal data={{ products: products, prices: prices }} method="easypaisa" />
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
