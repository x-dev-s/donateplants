'use client'
import { useEffect, useState } from 'react'
import DashboardCard from '@/components/dashboardCard'
import Link from 'next/link'
import axios from 'axios'
import { SendEmail } from '../server'
import ReactDOM from 'react-dom'
import Paypal from '@/components/paypal'
import IntlTelInput from 'intl-tel-input/react';
import "intl-tel-input/build/css/intlTelInput.min.css";
import { useRouter } from 'next/navigation'

const errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
];

export default function UserDashboard() {
    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [balance, setBalance] = useState(0)
    const [verified, setVerified] = useState(false)
    const [draws, setDraws] = useState([])
    const [donations, setDonations] = useState([])
    const [deposits, setDeposits] = useState([])
    const [drawsWon, setDrawsWon] = useState([])
    const [notice, setNotice] = useState(null);
    const [errorCode, setErrorCode] = useState(null);
    const [isValid, setIsValid] = useState(null);
    const [changedPhone, changePhone] = useState(null);
    const router = useRouter();

    const handlePhoneValidation = () => {
        if (isValid) {
            setNotice(`Valid number: ${changedPhone}`);
        } else {
            const errorMessage = errorMap[errorCode || 0] || "Invalid number";
            setNotice(`* ${errorMessage}`);
        }
    };

    let pkr = Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
    });

    const getUserData = async () => {
        const res = await fetch('/api/user',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        if (!res.ok) {
            return
        }
        const data = await res.json()
        // console.log(data)
        if (data.isAdmin) {
            router.push('/admin/dashboard')
            return
        }
        setUserId(data._id)
        setName(data.name)
        setEmail(data.email)
        setPhone(data.phone)
        setBalance((data.balance / 100).toFixed(2) || 0)
        setVerified(data.isVerified)
        setDraws(data.draws || [])
        setDonations(data.donations || [])
        setDeposits(data.deposits || [])
        setDrawsWon(data.drawsWon || [])
    }

    useEffect(() => {
        if (document.cookie.includes('session')) {
            getUserData();
        }
    }, [])

    return (
        <div className="container my-5 mx-auto">
            {name ?
                (
                    <>
                        <div className='flex items-center justify-between bg-gray-100 p-2 rounded-lg'>
                            <div>
                                <div className='items-baseline flex flex-wrap'>
                                    <h1 className='text-lg md:text-3xl font-bold p-1'>Welcome <span className='text-green-600'>{name.split(' ')[0]}</span></h1>
                                    {verified ? (
                                        <div>
                                            <img src='/images/verified.png' className='w-4 h-4' alt='verified' />
                                        </div>
                                    ) : (
                                        <p className='text-xs text-red-500 p-1'>Not verified</p>
                                    )}
                                </div>
                                <p className='text-sm text-gray-500 p-1'>{email}</p>
                                <p className='text-sm text-gray-500 p-1'>{phone}</p>
                                <div className='flex flex-wrap items-center'>
                                    <a role='button' onClick={() => handleChangePassword(email)}>
                                        <span className='text-xs text-green-500 p-1'>Change Password</span>
                                    </a>
                                    <span className='text-xs text-gray-500 p-1'>|</span>
                                    {!verified ? (
                                        <>
                                            <a role='button' onClick={() => handleEmailVerification(email, userId)}>
                                                <span className='text-xs text-green-500 p-1'>Verify Account</span>
                                            </a>
                                            <span className='text-xs text-gray-500 p-1'>|</span>
                                        </>
                                    ) : null
                                    }
                                    <a role='button' onClick={() => document.getElementById('changeNameModal').classList.remove('hidden')}>
                                        <span className='text-xs text-green-500 p-1'>Change Name</span>
                                    </a>
                                    <span className='text-xs text-gray-500 p-1'>|</span>
                                    <a role='button' onClick={() => document.getElementById('changePhoneModal').classList.remove('hidden')}>
                                        <span className='text-xs text-green-500 p-1'>Change Phone Number</span>
                                    </a>
                                </div>
                                <div id='changeNameModal' className='hidden fixed flex items-center justify-center top-0 left-0 h-screen w-full z-40'>
                                    <div className='bg-black/50 w-full h-screen fixed top-0 left-0 backdrop-blur'></div>
                                    <div className='bg-white p-3 rounded-lg fixed w-full h-full sm:w-[350px] sm:h-[250px] z-50'>
                                        <button className='absolute top-0 right-0 p-2 text-2xl' onClick={() => document.getElementById('changeNameModal').classList.add('hidden')}>&times;</button>
                                        <div className='w-[250px] flex flex-col items-center justify-center h-full mx-auto gap-3'>
                                            <h1 className='text-lg font-bold'>Change Name</h1>
                                            <form onSubmit={(e) => handleChangeName(e, userId)}>
                                                <input type='text' name='name' className='border p-2 rounded-lg w-full' placeholder='Enter new name' />
                                                <button type='submit' className='bg-green-600 mt-3 w-full text-white p-2 rounded-lg'>Change</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div id='changePhoneModal' className='hidden fixed flex items-center justify-center top-0 left-0 h-screen w-full z-40'>
                                    <div className='bg-black/50 w-full h-screen fixed top-0 left-0 backdrop-blur'></div>
                                    <div className='bg-white p-3 rounded-lg fixed w-full h-full sm:w-[350px] sm:h-[250px] z-50'>
                                        <button className='absolute top-0 right-0 p-2 text-2xl' onClick={() => document.getElementById('changePhoneModal').classList.add('hidden')}>&times;</button>
                                        <div className='w-[300px] flex flex-col items-center justify-center h-full mx-auto gap-3'>
                                            <h1 className='text-lg font-bold'>Change Phone Number</h1>
                                            <form onSubmit={(e) => handleChangePhone(e, userId, changedPhone)}>
                                                <div className="flex flex-wrap gap-2 items-center">
                                                    <IntlTelInput
                                                        // initialValue={value}
                                                        onChangeNumber={changePhone}
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
                                                <button type='submit' className='bg-green-600 mt-3 w-full text-white p-2 rounded-lg'>Change</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='hidden sm:block text-end text-sm md:text-base'>
                                <p id='accountBalance' className='font-bold p-1'>Account Balance: {pkr.format(balance)}</p>
                                <button onClick={handleDeposit} className='bg-green-600 text-white p-2 rounded-lg'>Deposit</button>
                            </div>
                            <div title='Deposit' className='block sm:hidden text-end text-sm md:text-base'>
                                <p className='font-bold p-0'>Balance:</p>
                                <p id='accountBalance' className='font-bold p-1'>{pkr.format(balance)}</p>
                                <button onClick={handleDeposit} className='rounded-lg animate-pulse'><img className='w-10 h-10' src='/images/deposit.png' alt='deposit' /></button>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-between mt-3'>
                            <DashboardCard image='/images/donations.png' name='Total Donations' value={donations.length} />
                            <DashboardCard image='/images/draws.png' name='Total Draws' value={draws.length} />
                            <DashboardCard image='/images/activedraws.png' name='Active Draws' value={draws.filter(draw => draw.active).length || 0} />
                            <DashboardCard image='/images/drawswon.png' name='Draws Won' value={drawsWon.length} />
                        </div>
                        <div className='grid grid-cols-1 gap-3 text-center justify-between mt-3'>
                            <div className='bg-gray-100 rounded-lg p-2'>
                                <h1 className='text-xl font-bold mb-3'>Draws</h1>
                                {draws.length === 0 ? (
                                    <div className='flex items-center justify-center h-[200px] overflow-auto'>
                                        <div className='m-auto'>
                                            <h2 className='text-2xl'>No draws bought</h2>
                                            <Link href='/draws' className='text-green-500'>Buy Now</Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='overflow-auto max-h-[400px] bg-white rounded-lg'>
                                        <table className='table text-sm w-full h-full text-gray-500'>
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Date</th>
                                                    <th>Name</th>
                                                    <th>Type</th>
                                                    <th>Numbers</th>
                                                    <th>Active</th>
                                                    <th>Won</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {draws.toReversed().map((draw, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{draw.date.split('T')[0]}</td>
                                                        <td>{draw.drawName}</td>
                                                        <td>{draw.drawType}</td>
                                                        <td>{draw.numbers.length > 0 ? draw.numbers.join(', ') : 'Not submitted'}</td>
                                                        <td>{draw.active ? (<span className="text-green-500">&#10004;</span>) : (<span className="text-red-500">&#10006;</span>)}</td>
                                                        <td>{drawsWon.find(drawWon => drawWon.drawId === draw._id) ? (<span className="text-green-500">&#10004;</span>) : (<span className="text-red-500">&#10006;</span>)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div className='bg-gray-100 rounded-lg p-2'>
                                <h1 className='text-xl font-bold mb-3'>Donations</h1>
                                {donations.length === 0 ? (
                                    <div className='flex items-center justify-center h-[200px] overflow-auto'>
                                        <div className='m-auto'>
                                            <h2 className='text-2xl'>No donations made</h2>
                                            <Link href='/draws' className='text-green-500'>Donate Now</Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='overflow-auto max-h-[400px] bg-white rounded-lg'>
                                        <table className='table text-sm w-full h-full text-gray-500'>
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Date</th>
                                                    <th>Type</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {donations.toReversed().map((donation, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{donation.date.split('T')[0]}</td>
                                                        <td>{donation.donationType}</td>
                                                        <td>{pkr.format(donation.amount / 100)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='bg-gray-100 rounded-lg p-2 mt-3 text-center'>
                            <h1 className='text-xl font-bold mb-3'>Deposits</h1>
                            {deposits.length === 0 ? (
                                <div className='flex items-center justify-center h-[200px] overflow-auto'>
                                    <div className='m-auto'>
                                        <h2 className='text-2xl'>No deposits made</h2>
                                        <Link href='/draws' className='text-green-500'>Deposit Now</Link>
                                    </div>
                                </div>
                            ) : (
                                <div className='overflow-auto max-h-[400px] bg-white rounded-lg'>
                                    <table className='table text-sm w-full h-full text-gray-500'>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Method</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {deposits.toReversed().map((deposit, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{deposit.date.split('T')[0]}</td>
                                                    <td>{pkr.format(deposit.amount / 100)}</td>
                                                    <td>{deposit.method}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        <div id="paymentMethodsWrapper" className="hidden fixed flex items-center justify-center top-0 left-0 h-screen w-full z-40">
                            <div className='bg-black/50 w-full h-screen fixed top-0 left-0 backdrop-blur'></div>
                            <div className=" bg-white p-3 rounded-lg fixed grid items-center justify-center w-full h-full sm:w-[500px] sm:h-[300px] z-50">
                                <div>
                                    <button id='backbtn' className='hidden absolute top-0 left-0 p-2 text-lg' onClick={() => { document.getElementById('paymentMethods').classList.remove('hidden'); document.getElementById('customAmountForm').classList.add('hidden'); document.getElementById('paymentMethodsIndicator').classList.remove('hidden'); document.getElementById('paypalBuyDiv').classList.add('hidden'); document.getElementById('backbtn').classList.add('hidden') }}>&larr;</button>
                                    <button className='absolute top-0 right-0 p-2 text-2xl' onClick={() => document.getElementById('paymentMethodsWrapper').classList.add('hidden')}>&times;</button>
                                    <div id='paymentMethodsIndicator' className="mx-auto grid">
                                        <h3 className="text-lg text-center mb-3">Choose Payment Method</h3>
                                        <div className="bg-green-600 animate-bounce mx-auto text-white text-center text-lg h-[30px] w-[30px] p-[2px] rounded-full">
                                            &darr;
                                        </div>
                                    </div>
                                    <div id="paymentMethods" className="mx-auto w-fit flex items-center my-3 gap-2">
                                        <button onClick={(e) => { handlePaymentMethod(e, email) }}><img className="mix-blend-darken m-auto" src="/images/stripe.png" style={{ height: "30px" }} alt="stripe" /></button>
                                        <button onClick={(e) => { handlePaymentMethod(e, email) }}><img className="mix-blend-darken m-auto" src="/images/paypal.png" style={{ height: "30px" }} alt="paypal" /></button>
                                        <button onClick={(e) => { handlePaymentMethod(e, email) }}><img className="mix-blend-darken m-auto" src="/images/jazzcash.png" style={{ height: "30px" }} alt="jazzcash" /></button>
                                        <button onClick={(e) => { handlePaymentMethod(e, email) }}><img className="mix-blend-darken m-auto" src="/images/easypaisa.png" style={{ height: "30px" }} alt="easypaisa" /></button>
                                    </div>
                                    <form id='customAmountForm' onSubmit={(e) => handleCustomAmount(e, email)} className='hidden mx-auto max-w-[200px]'>
                                        <div className='flex items-center justify-between gap-2'>
                                            <input type='number' name='amount' className='border p-2 rounded-lg w-full' placeholder='Enter amount' /> <span>USD</span>
                                        </div>
                                        <button type='submit' className='bg-green-600 mt-3 w-full text-white p-2 rounded-lg'>Deposit</button>
                                        <p id='customAmountError' className="text-center text-sm text-red-500 hidden">Minimum deposit amount is 10 USD</p>
                                    </form>
                                    <div id="paypalBuyDiv" className="mx-auto text-center max-w-[200px]"></div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='text-center h-screen w-full flex items-center'>
                        <div className='m-auto flex items-center'>
                            <h2 className='text-4xl'>Please wait</h2><span className='ml-2 mt-[12px]'><img src='/images/loading2.gif' className='w-[30px] h-[30px]' alt='loading' /></span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

const handleChangePassword = async (email) => {
    const res = await axios.post('/api/forgotpassword', { email })
    console.log(res)
    if (res.status !== 200) {
        console.error('Error changing password')
        return
    }
    const data = res.data.message;
    console.log(data)
    alert('Check your email for the password reset link');
}

const handleEmailVerification = async (email, userId) => {
    await SendEmail({ email, emailType: "VERIFY", userId });
    alert('Check your email for the verification link');
}

const handleChangeName = async (e, userId) => {
    e.preventDefault()
    const name = e.target.name.value
    const res = await axios.post('/api/changeuserdata', { userId, property: 'name', value: name })
    if (res.status !== 200) {
        console.error('Error changing name')
        return
    }
    window.location.reload();
}

const handleChangePhone = async (e, userId, phone) => {
    e.preventDefault()
    const res = await axios.post('/api/changeuserdata', { userId, property: 'phone', value: phone })
    if (res.status !== 200) {
        console.error('Error changing phone number')
        return
    }
    window.location.reload();
}

const handleDeposit = () => {
    document.getElementById('paymentMethodsWrapper').classList.remove('hidden')
}

const handlePaymentMethod = async (e, email) => {
    e.preventDefault();
    if (e.target.alt == "stripe") {
        document.getElementById('paymentMethodsWrapper').classList.add('hidden');
        window.open(`https://buy.stripe.com/test_8wM03Yb4taZQdBScMM?prefilled_email=${email}`, "Deposit Amount", "popup");
        return
    }
    else if (e.target.alt == "paypal") {
        document.getElementById('customAmountForm').classList.remove('hidden');
        document.getElementById('paymentMethods').classList.add('hidden');
        document.getElementById('paymentMethodsIndicator').classList.add('hidden');
        document.getElementById('paypalBuyDiv').classList.remove('hidden');
        document.getElementById('backbtn').classList.remove('hidden');
        return
    }
    // if (window.location.hash == "#donate" || window.location.hash == "") {
    //     document.getElementById('paymentMethodsWrapper').classList.add('hidden');
    //     document.getElementById(e.target.alt + "PricingModal").classList.remove("hidden");
    // }
    // else if (window.location.hash == "#buy") {
    //     var { data } = await axios.get("/api/searchprices?type=buy");
    //     let prices = data;
    //     var { data } = await axios.get("/api/searchproducts?type=buy");
    //     let products = data;
    //     if (e.target.alt == "stripe") {
    //         handleStripeSubscription(event, prices[0].id);
    //     }
    //     else if (e.target.alt == "paypal") {
    //         handlePaypalSubscription(event, products[0], prices[0], "paypalBuyDiv");
    //     }
    // }
}

const handleCustomAmount = async (e, email) => {
    e.preventDefault()
    const amount = e.target.amount.value
    if (amount < 10) {
        document.getElementById('customAmountError').classList.remove('hidden');
        return
    }
    if (document.querySelector('.paypal-buttons')) return;
    let product = { id: "123212", description: "Deposit amount to your account" };
    let price = { unit_amount_decimal: amount * 100 };
    let selector = "paypalBuyDiv";
    ReactDOM.render(<Paypal key={product.id} product={product} price={price} toConvert={false} selector={selector} email={email} />, document.getElementById(selector));
    document.getElementById('customAmountForm').classList.add('hidden');

}