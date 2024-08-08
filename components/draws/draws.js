'use client'
import { useEffect, useState } from "react"
import BuyDonate from "../buyDonate";
import DRAW from "./draw";

export default function Draws() {
    const [user, setUser] = useState(null);
    const [draws, setDraws] = useState(null);
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
    const getDraws = async () => {
        const res = await fetch('/api/admin/getdraw',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (res.status !== 200) {
            console.error('Error fetching draws')
            return
        }
        const data = await res.json()
        setDraws(data)
    }
    useEffect(() => {
        getDraws();
        if (window.location.href.includes('?token')) {
            let token = window.location.href.split('?')[1].split('=')[1];
            token = decodeURIComponent(token);
            document.cookie = `session=${token}`;
        }
        if (document.cookie.includes('session')) {
            getUserData();
        }
    }, [])

    return (
        <div className="container mx-auto">
            {draws ?
                (
                    <>
                        {
                            draws.filter(Draw => Draw.active).length > 0 ?
                                (
                                    <>
                                        {draws.filter(Draw => Draw.active).map((Draw, mainindex) => (
                                            <div key={mainindex}>
                                                {user && user.draws.filter(draw => draw.drawName == Draw.drawName && draw.active && draw.numbers.length == 0).length > 0 ?
                                                    (
                                                        <DRAW user={user} Draw={Draw} mainindex={mainindex} />
                                                    ) :
                                                    mainindex == 0 && (!user || (user.draws.filter(draw => draw.drawType == 'Standard' && draw.active && draw.numbers.length == 0).length == 0 && user.draws.filter(draw => draw.drawType == 'Farmer' && draw.active && draw.numbers.length == 0).length == 0)) ?
                                                        (
                                                            <DRAW user={user} Draw={Draw} mainindex={mainindex} />
                                                        )
                                                        : null
                                                }
                                            </div>
                                        )
                                        )
                                        }
                                    </>
                                ) : (
                                    <div className="text-center h-screen flex justify-center items-center">
                                        <h1>No active draws</h1>
                                    </div>
                                )
                        }
                    </>
                ) : (
                    <div className='text-center h-screen w-full flex items-center'>
                        <div className='m-auto flex items-center'>
                            <h2 className='text-4xl'>Please wait</h2><span className='ml-2 mt-[12px]'><img src='/images/loading2.gif' className='w-[30px] h-[30px]' alt='loading' /></span>
                        </div>
                    </div>
                )}
            <div id="buyDonate" className="hidden">
                <BuyDonate />
            </div>
            <div id='pricingModal' className='hidden'></div>
        </div>

    )
} 