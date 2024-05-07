'use client'
import { useEffect, useState } from "react"
import BuyDonate from "@/components/buyDonate"
import { Draws } from "@/components/draws/draws";

export default function DrawsPage() {
    const [user, setUser] = useState(null);
    const [draws, setDraws] = useState([]);
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
        if (document.cookie.includes('session')) {
            getUserData();
        }
    }, [])

    return (
        <div className="container mx-auto">
            {draws && draws.filter(draw => draw.active).map((Draw, mainindex) => (
                <div key={mainindex}>
                    {user && user.draws.filter(draw => draw.drawName == Draw.drawName && draw.active && draw.numbers.length == 0).length > 0 ?
                        (
                            <Draws user={user} Draw={Draw} mainindex={mainindex} />
                        ) :
                        mainindex == 0 && (!user || (user.draws.filter(draw => draw.drawType == 'Standard' && draw.active && draw.numbers.length == 0).length == 0 && user.draws.filter(draw => draw.drawType == 'Farmer' && draw.active).length == 0)) ?
                            (
                                <Draws user={user} Draw={Draw} mainindex={mainindex} />
                            )
                            : null
                    }
                </div>
            ))}
            <div id="buyDonate" className="hidden">
                <BuyDonate />
            </div>
            <div id='pricingModal' className='hidden'></div>
        </div>

    )
} 