'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardCard from '@/components/dashboardCard'
import DeleteModal from '@/components/admin/deleteModal'
import CreateEditDraw from '@/components/admin/createEditDraw'
import ReactDOM from 'react-dom'
import { SendEmail } from '@/app/server'
import Link from 'next/link'
import axios from 'axios'
import CreateEditPkg from '@/components/admin/createEditPkg'

export default function AdminDashboard() {
    const router = useRouter()
    const [User, setUser] = useState({})
    const [Users, setUsers] = useState([])
    const [Draws, setDraws] = useState([])
    const [Packages, setPackages] = useState([])
    const [AdminData, setAdminData] = useState([])

    let pkr = Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
    });

    let pkrShort = Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 0,
    });

    let numShort = Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 0,
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
        // console.log(data)
        if (!data.user && data.isAdmin == false) {
            router.push('/user/dashboard')
            return
        }
        setUser(data.user)
        setUsers(data.users)
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

    const getPackages = async () => {
        const { data } = await axios.get("/api/admin/getpkgs")
        setPackages(data);
    }

    // const createAdmin = async () => {
    //     const res = await fetch('/api/admin/createadmindata',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         body: JSON.stringify({ data: { id: '123456789', notifications: [] } })
    //         })
    //     if (!res.ok) {
    //         console.error('Error creating admin')
    //         return
    //     }
    //     const data = await res.json()
    //     console.log(data)
    // }

    const getAdminData = async () => {
        const res = await fetch('/api/admin/getadmindata',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        if (res.status !== 200) {
            console.error('Error fetching admin data')
            return
        }
        const data = await res.json()
        setAdminData(data[0])
    }


    useEffect(() => {
        if (document.cookie.includes('session')) {
            getUsers();
        }
        (async () => {

            getDraws();
            getPackages();
            getAdminData();
        })()
    }, [])
    return (
        <div className="container mx-auto">
            {User && User.name && AdminData && AdminData.drawsBought ?
                (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-between mt-3'>
                            <DashboardCard image='/images/user.png' name='Total Users' value={Users.length} />
                            <DashboardCard image='/images/vuser.png' name='Verified Users' value={AdminData.verifiedUsers} />
                            <DashboardCard image='/images/package.png' name='Active Packages' value={Packages.length} />
                            <DashboardCard image='/images/activedraws.png' name='Active Draws' value={Draws.filter(draw => draw.active).length} />
                            <DashboardCard image='/images/drawsbought.png' name='Draws Bought' value={AdminData.drawsBought} />
                            <DashboardCard image='/images/donationcount.png' name='Donations Count' value={AdminData.donationsCount} />
                            <DashboardCard image='/images/donations.png' name='Total Donations' value={pkrShort.format(AdminData.totalDonations / 100)} />
                            <DashboardCard image='/images/notifications_colored.png' name='Unread Notifications' value={AdminData.unreadNotifications} />
                        </div>

                        <div className='grid grid-cols-1 gap-3 text-center justify-between mt-3 mb-5'>
                            
                            
                            
                            <div className='bg-gray-100 rounded-lg p-2'>
                                <h1 className='text-xl font-bold pb-3'>Donations</h1>
                                {Users.filter(user => user.donations.length > 0).length === 0 ? (
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
                                                    <th>User</th>
                                                    <th>Email</th>
                                                    <th>Type</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Users.filter(user => user.donations.length > 0).sort((a, b) => b.donations.reduce((acc, donation) => acc + donation.amount, 0) - a.donations.reduce((acc, donation) => acc + donation.amount, 0)).map((user, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{new Date(user.donations.sort((a, b) => new Date(a.date) - new Date(b.date))[0].date).toDateString().split(' ').slice(1).join(' ')} - {new Date(user.donations.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date).toDateString().split(' ').slice(1).join(' ')}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.donations.map(donation => donation.donationType).removeDuplicates().join(', ')}</td>
                                                        <td>{pkr.format(user.donations.reduce((acc, donation) => acc + donation.amount, 0) / 100)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div id='notificationsTable' className='bg-gray-100 relative rounded-lg p-2'>
                                <h1 className='text-xl font-bold pb-3'>Notifications</h1>
                                <div className='absolute top-1 right-2 text-right'>
                                    <div className='flex flex-col flex-1 md:gap-2 sm:w-full'>
                                        <span><a role='button' onClick={(e) => { handleReadDeleteNotifications(e, 'all', null, true, "readAll") }} className='text-green-500 text-xs'>Mark All as Read</a></span>
                                        <span className='flex gap-2 justify-items-end'>
                                            <a role='button' onClick={(e) => { handleReadDeleteNotifications(e, 'all', null, true, "deleteRead") }} className='text-red-500 text-xs'>Delete Read</a>
                                            <span className='text-red-500 text-xs'>|</span>
                                            <a role='button' onClick={(e) => { handleReadDeleteNotifications(e, 'all', null, true, "deleteAll") }} className='text-red-500 text-xs'>Delete All</a>
                                        </span>
                                    </div>
                                </div>
                                {AdminData.notifications.length === 0 ? (
                                    <div className='flex items-center justify-center h-[200px] overflow-auto'>
                                        <div className='m-auto'>
                                            <h2 className='text-2xl'>No notifications found</h2>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='overflow-auto max-h-[400px] bg-white rounded-lg'>
                                        <table className='table text-sm w-full h-full text-gray-500'>
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Message</th>
                                                    <th>Read</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {AdminData.notifications.sort((a, b) => new Date(b.date) - new Date(a.date)).map((notification, index) => (
                                                    <tr key={index} id={'tableNotification' + index}>
                                                        <td>{index + 1}</td>
                                                        <td>{new Date(notification.date).toDateString().split(' ').slice(1).join(' ')}</td>
                                                        <td>{new Date(notification.date).toLocaleTimeString()}</td>
                                                        <td>{notification.message}</td>
                                                        <td>{notification.read ? (<span className='text-green-500'>&#10004;</span>) : (<span className='text-red-500'>&#10006;</span>)}</td>
                                                        <td className='flex gap-2 h-full justify-center items-center'>{!notification.read ? <a role='button' onClick={(e) => { handleReadDeleteNotifications(e, notification._id, index, true) }} className='text-center'><img className='mx-auto w-[15px] h-[15px]' src='/images/markread.png' alt='read' /></a> : null}<a role='button' onClick={(e) => { handleReadDeleteNotifications(e, notification._id, index, true) }} className='text-center'><img className='mx-auto w-[15px] h-[15px]' src='/images/delete.png' alt='delete' /></a></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
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
            <div id='createEditPkg' className='hidden'></div>
            <div id='deleteModal'></div>
        </div>
    )
}


// const handleEmailVerification = async (email, userId) => {
//     await SendEmail({ email, emailType: "VERIFY", userId });
//     alert('Check your email for the verification link');
// }

Array.prototype.removeDuplicates = function () {
    return this.filter((item, index) => this.indexOf(item) === index);
}

const handleReadDeleteNotifications = async (e, notificationId, index = 0, isTable = false, action = "") => {
    e.preventDefault();
    if (action === "") {
        const res = await fetch('/api/admin/readdeletenotification',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ notificationId, action: e.target.alt })
            })
        if (res.status !== 200) {
            console.error('Error reading/deleting notification')
            return
        }
        if (isTable && e.target.alt === 'delete') {
            document.getElementById(`tableNotification${index}`).remove();
            return;
        }
        else if (isTable && e.target.alt === 'read') {
            document.getElementById(`tableNotification${index}`).children[4].innerHTML = "<span className='text-green-500'>&#10004;</span>"
            return;
        }
        else {
            document.getElementById(`notification${index}`).remove();
        }
        return;
    }
    else {
        if (action === 'deleteAll') {
            ReactDOM.render(<DeleteModal type="notifications" name={notificationId} />, document.getElementById('deleteModal'));
            document.getElementById('deleteModal').classList.remove('hidden');
            return;
        }
        else {
            const res = await fetch('/api/admin/readdeletenotification',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ notificationId, action })
                })
            if (res.status !== 200) {
                console.error('Error reading/deleting notifications')
                return
            }
            window.location.replace(location.href);
        }

    }
}