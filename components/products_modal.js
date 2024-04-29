'use client'
import axios from "axios";
import Paypal from "./paypal";
import { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function PricingModal({ data, method }) {
    const { products, prices } = data;
    let pkr = Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
    });

    return (
        <div id={method + "PricingModal"} className="hidden fixed h-full w-full top-0 left-0 z-20 backdrop-blur bg-black/50">
            <div className="bg-gray-100 relative w-full md:w-[80%] h-full md:h-[80%] mx-auto md:my-[5%] p-4 rounded-lg">
                <button onClick={() => { HideModal(method) }} className="absolute top-0 right-0 p-2 text-2xl text-black">&times;</button>
                <h2 className="text-2xl text-center pb-3">Choose the amount you want to donate</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-y-scroll gap-4 min-h-[300px] max-h-[90%]">
                    {products && prices && products.map((product, index) => (
                        <div key={product.id} className={index == 1 ? "bg-green-600 px-3 pt-3 pb-0 rounded-lg text-center" : "mt-3"}>
                            <div className="bg-white overflow-hidden relative p-4 rounded-lg text-center">
                                <h3 className="text-xl font-semibold">{product.name}</h3>
                                <p className="text-sm">{product.description}</p>
                                <img className="w-auto h-[250px] object-contain my-3 mx-auto" src={product.images[0]} alt={product.name} />
                                {
                                    method == "stripe" && prices[index] ? (<StripeButton price={prices[index]} currency={pkr} />)
                                        : method == "paypal" && prices[index] ? (<PaypalButton product={product} price={prices[index]} index={index} />)
                                            : null
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function PaypalButton({ product, price, index }) {
    return (
        <button id={"paypalBtn" + index} className="bg-green-600 text-sm text-white p-2 absolute bottom-0 left-0 w-full" onClick={() => { handlePaypalSubscription(event, product, price) }}>Donate {price.unit_amount_decimal / 100} USD</button>
    )
}

export function StripeButton({ price, currency }) {
    return (
        <button className="bg-green-600 text-sm text-white p-2 absolute bottom-0 left-0 w-full" onClick={() => { handleStripeSubscription(event, price.id) }}>Donate {currency.format(price.unit_amount_decimal / 100)}</button>
    )
}


const HideModal = (method) => {
    document.getElementById(method + "PricingModal").classList.add("hidden");
}

export const handlePaypalSubscription = (e, product, price, selector=event.target.id) => {
    e.target.innerHTML = "Processing...";
    ReactDOM.render(<Paypal key={product.id} product={product} price={price} selector={selector} />, document.getElementById(selector));
}


export const handleStripeSubscription = async (e, priceId) => {
    e.target.innerHTML = "Processing...";
    e.preventDefault();
    const { data } = await axios.post('/api/stripepayment',
        {
            priceId: priceId
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    window.location.assign(data)
}