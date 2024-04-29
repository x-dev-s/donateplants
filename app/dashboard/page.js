'use client'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

export default function UserDashboard() {
    const auth = useAuth()
    return (
        <div className="container mx-auto">
            {auth ?
                (
                    <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-4">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-2xl">Welcome to your dashboard</h2>
                            <p className="text-lg">Here you can manage your account</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-2xl">Your Orders</h2>
                            <p className="text-lg">View your order history</p>
                        </div>
                    </div>
                ) : (
                    <div className='text-center h-screen w-full flex items-center'>
                        <div className='m-auto'>
                            <h1 className='text-4xl font-bold mb-2'>You are not logged in</h1>
                            <p className='text-md text-gray-500'>Please login to view this page</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}