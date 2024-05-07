'use client'
import axios from 'axios';
import ReactDOM from 'react-dom';
import PricingModal from './pricingModal';
import { useState, useEffect } from "react";

export default function BuyDonate() {
    const [pkgs, setPkgs] = useState([]);
    const [user, setUser] = useState(null);
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
        setUser(data)
    }
    useEffect(() => {
        if (document.cookie.includes('session')) {
            getUserData();
        }
        fetchPkgs();
        // createDraw();
        // createPackage();
    }, []);
    // const createPackage = async () => {
    //     const data = {
    //         name: "Standard Package 1",
    //         type: "Standard",
    //         description: "Donate a tree to get a draw",
    //         images: [],
    //         price: 100000
    //     }
    //     const res = await axios.post("/api/admin/createpkg", data);
    // }

    // const createDraw = async () => {
    //     const data = {
    //         drawName: "Epic 8 Draw",
    //         drawType: "Standard",
    //         enddate: new Date('2024-05-30')
    //     }
    //     const res = await axios.post("/api/admin/createdraw", data);
    // }
    const fetchPkgs = async () => {
        const { data } = await axios.get("/api/admin/getpkgs")
        setPkgs(data);
    }
    return (
        <>
        <div className="fixed flex items-center justify-center top-0 left-0 h-screen w-full z-40">
            <div className='bg-black/50 w-full h-screen fixed top-0 left-0 backdrop-blur'></div>
            <div className=" bg-gray-100 p-3 rounded-lg fixed grid items-center justify-center w-full sm:w-[300px] h-auto max-h-[500px] z-50">
                <button onClick={() => {document.getElementById('buyDonate').classList.add('hidden');document.getElementById('confirmDraw').classList.add('hidden');document.getElementById('buyDonateOpts').classList.remove('hidden');}} className="p-2 absolute top-0 right-0 text-2xl">&times;</button>
                <div className="flex items-center justify-between w-full">
                    <div id="buyDonateOpts">
                        <h2 className="text-xl font-semibold">Select a package</h2>
                        <div className="grid grid-cols-2 gap-2 mt-5">
                            <button onClick={(e) => {handleBuyDonateOpts(e, pkgs, user)}} className="p-2 rounded-md bg-green-600 hover:bg-green-800 text-white">Standard</button>
                            <button onClick={(e) => {handleBuyDonateOpts(e, pkgs, user)}} className="p-2 rounded-md bg-green-600 hover:bg-green-800 text-white">Farmer</button>
                        </div>
                    </div>
                    <div id='confirmDraw' className='hidden text-center'>
                        <h2 className="text-xl font-semibold">Choose a Draw</h2>
                        <div className="grid grid-cols-2 gap-2 mt-5"></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

const handleBuyDonateOpts = async (e, pkgs, user) => {
    try {
        e.preventDefault();
        let btn = e.target;
        // if (btn.tagName !== 'BUTTON') btn = btn.parentElement;
        const res = await axios.get('/api/admin/getdraw');
        if (res.status === 200) {
            if (res.data.filter(d => d.drawType === btn.textContent).length > 1) {
                document.getElementById('confirmDraw').classList.remove('hidden');
                document.querySelector('#confirmDraw div').innerHTML = '';
                document.getElementById('buyDonateOpts').classList.add('hidden');
                let draw = document.querySelector('#confirmDraw div');
                res.data.filter(d => d.drawType === btn.textContent).map((d, index) => {
                    let drawBtn = document.createElement('button');
                    drawBtn.textContent = d.drawName;
                    drawBtn.className = 'p-2 rounded-md bg-green-600 hover:bg-green-800 text-white';
                    drawBtn.onclick = () => {
                        document.getElementById('confirmDraw').classList.add('hidden');
                        document.getElementById('buyDonate').classList.add('hidden');
                        document.getElementById('buyDonateOpts').classList.remove('hidden');
                        ReactDOM.render(<PricingModal pkgs={pkgs} user={user} drawName={d.drawName} type={d.drawType} />, document.getElementById('pricingModal'));
                        document.getElementById('pricingModal').classList.remove('hidden');
                    }
                    draw.appendChild(drawBtn);
                });
                return;
            }
            else if (res.data.filter(d => d.drawType === btn.textContent).length === 1) {
                document.getElementById('buyDonate').classList.add('hidden');
                ReactDOM.render(<PricingModal pkgs={pkgs} user={user} drawName={res.data.filter(d => d.drawType === btn.textContent)[0].drawName} type={btn.textContent} />, document.getElementById('pricingModal'));
                document.getElementById('pricingModal').classList.remove('hidden');
                return;
            }
        }
    } catch (error) {
        console.error(error);
        return;
    }
}