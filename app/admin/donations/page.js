'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ReactDOM from 'react-dom'
import CreateEditPkg from '@/components/admin/createEditPkg'
import axios from 'axios'
import DeleteModal from '@/components/admin/deleteModal'

export default function AdminDrawsPage() {
    const [Donations, setDonations] = useState(null)
    const [Pagination, setPagination] = useState({ start: 1, end: 10 })
    let pkr = Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
    });

    const getUsers = async () => {
        const res = await fetch('/api/user/?all=true',
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
        setDonations(data.users.filter(user => user.donations.length > 0))
    }

    useEffect(() => {
        if (document.cookie.includes('session')) {
            getUsers();
        }
    }, [])

    const handlePagination = (e) => {
        e.preventDefault();
        if (e.target.id.includes('prev')) {
            if (Pagination.start === 1) {
                return;
            }
            if (Pagination.start - 10 <= 1) {
                e.target.style.display = 'none'
                document.getElementById('next').style.display = 'block'
            }
            else {
                e.target.style.display = 'block'
                document.getElementById('next').style.display = 'block'
            }
            setPagination({ start: Pagination.start - 10, end: Pagination.end - 10 })
        }
        else {
            if (Pagination.end >= Donations.length) {
                return;
            }
            if (Pagination.end + 10 >= Donations.length) {
                e.target.style.display = 'none'
                document.getElementById('prev').style.display = 'block'
            }
            else {
                e.target.style.display = 'block'
                document.getElementById('prev').style.display = 'block'
            }
            setPagination({ start: Pagination.start + 10, end: Pagination.end + 10 })
        }
    }

    return (
        <>
            {Donations ? (
                <div className='relative text-center rounded-lg pt-2'>
                    <h1 className='text-4xl font-bold pb-3'>Donations</h1>
                    {Donations.length === 0 ? (
                        <div className='flex items-center justify-center h-[200px] overflow-auto'>
                            <div className='m-auto'>
                                <h2 className='text-2xl'>No donations made</h2>
                                <Link href='/draws' className='text-green-500'>Donate Now</Link>
                            </div>
                        </div>
                    ) : (
                        <div className='overflow-auto rounded-lg min-h-screen'>
                            <table className='table text-sm w-full h-full text-gray-500 min-h-[90vh]'>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Date</th>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Donations.sort((a, b) => b.donations.reduce((acc, donation) => acc + donation.amount, 0) - a.donations.reduce((acc, donation) => acc + donation.amount, 0)).slice(Pagination.start - 1, Pagination.end).map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + Pagination.start}</td>
                                            <td>{new Date(user.donations.sort((a, b) => new Date(a.date) - new Date(b.date))[0].date).toDateString().split(' ').slice(1).join(' ')} - {new Date(user.donations.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date).toDateString().split(' ').slice(1).join(' ')}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.donations.map(donation => donation.donationType).removeDuplicates().join(', ')}</td>
                                            <td>{pkr.format(user.donations.reduce((acc, donation) => acc + donation.amount, 0) / 100)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {Donations.length > 10 && (
                                <div className='pagination flex justify-center items-center gap-2 pb-2'>
                                    <a role='button' id='prev' style={{ display: "none" }} onClick={handlePagination} className='text-center text-gray-500 hover:transform hover:scale-125'>&larr;</a>
                                    <p className='text-center text-xs text-gray-500'>{Pagination.start < 1 ? 1 : Pagination.start} - {Pagination.end > Donations.length ? Donations.length : Pagination.end} of {Donations.length}</p>
                                    <a role='button' id='next' onClick={handlePagination} className='text-center text-gray-500 hover:transform hover:scale-125'>&rarr;</a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className='text-center h-screen w-full flex items-center'>
                    <div className='m-auto flex items-center'>
                        <h2 className='text-4xl'>Please wait</h2><span className='ml-2 mt-[12px]'><img src='/images/loading2.gif' className='w-[30px] h-[30px]' alt='loading' /></span>
                    </div>
                </div>
            )
            }
        </>
    )
}
