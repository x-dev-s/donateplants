import React, { useEffect, useRef } from "react";
import { GetCurencyExchangeRate } from "@/app/server";
export default function Paypal({ product, price, selector}) {
    const paypal = useRef();
    useEffect(() => {
        GetCurencyExchangeRate("PKR", "USD").then((rate) => {
            console.log(rate);
            window.paypal
                .Buttons({
                    createOrder: (data, actions, err) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description: product.description,
                                    amount: {
                                        currency_code: "USD",
                                        value: ((price.unit_amount_decimal / 100) * rate).toFixed(2),
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        if(selector == "paypalBuyDiv"){
                            document.getElementById("paypalBuyDiv").classList.add("hidden");
                            document.getElementById("drawBlurBg").classList.add("hidden");
                        }
                        console.log(order);
                    },
                    onError: (err) => {
                        alert("Error occured while processing payment");
                    },
                })
                .render(paypal.current);
        }, [product, price]);
    });

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}