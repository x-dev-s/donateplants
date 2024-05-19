'use client'
import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import Paypal from "@/components/paypal"



export default function PaypalPage() {
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const amount = e.target.amount.value
            if (amount < 10) {
                setError(true)
                return
            }
            if (document.querySelector('.paypal-buttons')) return;
            let product = { id: "123212", description: "Deposit amount to your account" };
            let price = { unit_amount_decimal: amount * 100 };
            let selector = "paypalDiv";
            let email = window.location.href.split('?')[1].split('=')[1];
            email = decodeURIComponent(email)
            console.log(email)
            ReactDOM.render(<Paypal key={product.id} product={product} price={price} toConvert={false} selector={selector} email={email} />, document.getElementById(selector));
            document.getElementById('amountForm').classList.add('hidden');
        } catch (error) {
            alert("An error occurred. Please try again later.")
            console.error(error)
        }
    }

    useEffect(() => {
        document.querySelector('header').classList.add('hidden')
        document.querySelector('footer').classList.add('hidden')
        return () => {
            document.querySelector('header').classList.remove('hidden')
            document.querySelector('footer').classList.remove('hidden')
        }
    }, [])

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="w-[200]">
                <form id="amountForm" onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center justify-center">
                        <span><input type="number" name="amount" placeholder="Amount" required step={0.01} /></span><span> USD</span>
                    </div>
                    <button type="submit" className="bg-green-600 hover:bg-green-800 p-2 rounded-lg text-white">Deposit</button>
                </form>
                <p className="text-red-500 text-sm pt-2">{error ? "* Minimum deposit amount is $10" : ""}</p>
                <div id="paypalDiv"></div>
            </div>
        </div>
    )
}
