import React, { useEffect, useRef } from "react";
import { GetCurencyExchangeRate } from "@/app/server";
export default function Paypal({ product, price, toConvert, selector, email }) {
    const paypal = useRef();
    useEffect(() => {
        GetCurencyExchangeRate("PKR", "USD").then((rate) => {
            if (!toConvert) rate = 1;
            window.paypal
                .Buttons({
                    createOrder: (data, actions, err) => {
                        return actions.order.create({
                            style: {
                                layout: 'horizontal',
                                color: 'silver',
                                shape: 'rect',
                                label: 'Checkout'
                            },
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
                        console.log(order);
                        try {
                            if (selector == "paypalBuyDiv") {
                                document.getElementById("paypalBuyDiv").classList.add("hidden");
                                document.getElementById('paymentMethodsWrapper').classList.add("hidden");
                                document.getElementById("paymentMethods").classList.remove("hidden");
                                document.getElementById('paymentMethodsIndicator').classList.remove("hidden");
                            }
                            const res = await fetch("/api/updatebalance", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    email,
                                    type: "add",
                                    amount: price.unit_amount_decimal
                                }),
                            });
                            if (res.status == 200) {
                                console.log("Balance updated");
                                window.location.reload();
                            }
                        } 
                        catch (err) {
                            // const clientID = process.env.PAYPAL_CLIENT_ID;
                            // const payerId = order.payer.payer_id;
                            // const auth1 = Buffer.from('{"alg":"none"}').toString("base64");
                            // const auth2 = Buffer.from(`{"iss":${clientID},"payer_id":${payerId}}`).toString("base64");
                            // const authAssertionHeader = `${auth1}.${auth2}.`;
                            // const refund = await fetch("https://api-m.sandbox.paypal.com/v2/payments/captures/" + order.id + "/refund", {
                            //     method: "POST",
                            //     headers: {
                            //         "Content-Type": "application/json",
                            //         "Authorization": "Basic AbEPveF6QGjzRzmt6jhFuPj7bU0TFQK7miDV6g5HMuBPPQ2d1RiGe60072Oh-5HE3lvVeXs8v6gQGYEX:EO-Ro5-U9PvHfUtDZ24pctS6VciPxh7NeFFHkWIRtfwrm3TizNfsyhhtiPArJaZpEMEeG6dHhZQyq13e",
                            //         "PayPal-Request-Id": order.id,
                            //         "PayPal-Auth-Assertion": authAssertionHeader,
                            //     },
                            //     body: JSON.stringify({}),
                            // });
                            // if (refund.status == 201 || refund.status == 200) {
                            //     alert("Payment refunded");
                            // } else {
                            //     console.error(refund);
                            // }
                            console.error(err);
                        }
                    },
                    onError: (err) => {
                        console.error(err);
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