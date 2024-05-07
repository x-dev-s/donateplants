'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardCard from '@/components/dashboardCard'
import UserDataModal from '@/components/admin/userDataModal'
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
        if (!data.user.isAdmin) {
            router.push('/dashboard')
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
        (async () => {
            if (document.cookie.includes('session')) {
                getUsers();
            }
            getDraws();
            getPackages();
            getAdminData();
        })()
    }, [])
    return (
        <div className="container mx-auto">
            {User.name && AdminData.drawsBought ?
                (
                    <>
                        <div className='flex items-center justify-between bg-gray-100 mt-5 py-2 pl-1 pr-2 rounded-lg'>
                            <div>
                                <div className='items-baseline flex flex-wrap'>
                                    <h1 className='text-lg md:text-3xl font-bold p-1'>Welcome <span className='text-green-600'>{User.name.split(' ')[0]}</span></h1>
                                </div>
                                <p className='text-sm text-gray-500 p-1 m-0'>{User.email}</p>
                                <p className='text-sm text-gray-500 p-1 m-0'>{User.phone}</p>
                                <div className='flex flex-wrap items-center'>

                                </div>
                            </div>
                            <button id='notifications' onClick={() => { }} className='relative'>
                                <div className='absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>1</div>
                                <img className='w-6 h-6' src='/images/notifications.png' alt='notifications' />
                            </button>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-between mt-3'>
                            {/* <DashboardCard image='/images/user.png' name='Total Users' value={Users.length} />
                            <DashboardCard image='/images/vuser.png' name='Verified Users' value={Users.filter(user => user.isVerified).length} />
                            <DashboardCard image='/images/package.png' name='Active Packages' value={Packages.length} />
                            <DashboardCard image='/images/activedraws.png' name='Active Draws' value={Draws.filter(draw => draw.active).length} />
                            <DashboardCard image='/images/drawsbought.png' name='Draws Bought' value={AdminData.drawsBought} />
                            <DashboardCard image='/images/donationcount.png' name='Donations Count' value={AdminData.donationsCount} />
                            <DashboardCard image='/images/donations.png' name='Total Donations' value={pkrShort.format(AdminData.totalDonations / 100)} />
                            <DashboardCard image='/images/notifications_colored.png' name='Total Notifications' value={AdminData.notifications.length} /> */}
                            <DashboardCard image='/images/user.png' name='Total Users' value={Users.length} />
                            <DashboardCard image='/images/vuser.png' name='Verified Users' value={Users.filter(user => user.isVerified).length} />
                            <DashboardCard image='/images/package.png' name='Active Packages' value={Packages.length} />
                            <DashboardCard image='/images/activedraws.png' name='Active Draws' value={Draws.filter(draw => draw.active).length} />
                            <DashboardCard image='/images/drawsbought.png' name='Draws Bought' value={Users.reduce((acc, user) => acc + user.draws.length, 0)} />
                            <DashboardCard image='/images/donationcount.png' name='Donations Count' value={Users.reduce((acc, user) => acc + user.donations.length, 0)} />
                            <DashboardCard image='/images/donations.png' name='Total Donations' value={pkrShort.format(Users.reduce((acc, user) => acc + user.donations.reduce((acc, donation) => acc + donation.amount / 100, 0), 0))} />
                            <DashboardCard image='/images/notifications_colored.png' name='Total Notifications' value={AdminData.notifications.length} />

                        </div>

                        <div className='grid grid-cols-1 gap-3 text-center justify-between mt-3 mb-5'>
                            <div className='relative bg-gray-100 rounded-lg p-2'>
                                <h1 className='text-xl font-bold mb-3'>Users</h1>
                                {Users.length === 0 ? (
                                    <div className='flex items-center justify-center h-[400px] overflow-auto'>
                                        <div className='m-auto'>
                                            <h2 className='text-2xl'>No users found</h2>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='overflow-auto max-h-[400px] bg-white rounded-lg'>
                                        <table className='table text-sm w-full h-full text-gray-500'>
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Donations</th>
                                                    <th>Draws</th>
                                                    <th>Verified</th>
                                                    <th>View</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Users.toReversed().map((user, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phone}</td>
                                                        <td>{user.donations.length}</td>
                                                        <td>{user.draws.length}</td>
                                                        <td>{user.isVerified ? (<span className='text-green-500'>&#10004;</span>) : (<span className='text-red-500'>&#10006;</span>)}</td>
                                                        <td><a role='button' onClick={(e) => { handleUserDetails(e, user) }} className='text-center'><img className='mx-auto w-[17px] h-[17px]' src='/images/view.png' alt='view' /></a></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div className='relative bg-gray-100 rounded-lg p-2'>
                                <h1 className='text-xl font-bold mb-3'>Packages</h1>
                                {Packages.length === 0 ? (
                                    <div className='flex items-center justify-center h-[400px] overflow-auto'>
                                        <div className='m-auto'>
                                            <h2 className='text-2xl'>No packages found</h2>
                                            <a role='button' onClick={(e) => handleEditPkg(e)} className='text-green-500'>Create Now</a>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <a role='button' onClick={(e) => handleEditPkg(e)} className='absolute top-2 right-2 text-green-500 text-sm'>Create Package</a>
                                        <div className='overflow-auto max-h-[400px] bg-white rounded-lg'>
                                            <table className='table text-sm w-full h-full text-gray-500'>
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Name</th>
                                                        <th>Type</th>
                                                        <th>Description</th>
                                                        <th>Price</th>
                                                        <th>Active</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Packages.toReversed().map((pkg, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{pkg.name}</td>
                                                            <td>{pkg.type}</td>
                                                            <td>{pkg.description}</td>
                                                            <td>{pkr.format(pkg.price / 100)}</td>
                                                            <td>{pkg.active ? (<span className='text-green-500'>&#10004;</span>) : (<span className='text-red-500'>&#10006;</span>)}</td>
                                                            <td className='flex gap-2 h-full justify-center items-center'><a role='button' onClick={(e) => handleEditPkg(e, 'edit', pkg)} className='text-center'><img className='mx-auto w-[15px] h-[15px]' src='/images/edit.png' alt='edit' /></a><a role='button' onClick={(e) => handleEditPkg(e, 'delete', pkg)} className='text-center'><img className='mx-auto w-[15px] h-[15px]' src='/images/delete.png' alt='delete' /></a></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='relative bg-gray-100 rounded-lg p-2'>
                                <h1 className='text-xl font-bold mb-3'>Draws</h1>
                                {Draws.length === 0 ? (
                                    <div className='flex items-center justify-center h-[400px] overflow-auto'>
                                        <div className='m-auto'>
                                            <h2 className='text-2xl'>No draws created</h2>
                                            <a role='button' className='text-green-500'>Create Now</a>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <a role='button' onClick={(e) => { handleEditDraw(e) }} className='absolute top-2 right-2 text-green-500 text-sm'>Create Draw</a>
                                        <div className='overflow-auto max-h-[400px] bg-white rounded-lg'>
                                            <table className='table text-sm w-full h-full text-gray-500'>
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Name</th>
                                                        <th>Type</th>
                                                        <th>Created On</th>
                                                        <th>End Date</th>
                                                        <th>Users</th>
                                                        <th>Numbers</th>
                                                        <th>Winning Numbers</th>
                                                        <th>Selections</th>
                                                        <th>Active</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Draws.sort((a, b) => new Date(b.createddate) - new Date(a.createddate)).map((draw, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{draw.drawName}</td>
                                                            <td>{draw.drawType}</td>
                                                            <td>{draw.createddate.split('T')[0]}</td>
                                                            <td>{draw.enddate.split('T')[0]}</td>
                                                            <td>{draw.users.length}</td>
                                                            <td>{draw.numbers[0]} - {draw.numbers[draw.numbers.length - 1]}</td>
                                                            <td>{draw.winningNumbers.join(', ') || 'TBD'}</td>
                                                            <td>{draw.toSelect}</td>
                                                            <td>{draw.active ? (<span className='text-green-500'>&#10004;</span>) : (<span className='text-red-500'>&#10006;</span>)}</td>
                                                            <td className='flex gap-2 h-full justify-center items-center'><a role='button' onClick={(e) => { handleEditDraw(e, "edit", draw) }} className='text-center'><img className='mx-auto w-[15px] h-[15px]' src='/images/edit.png' alt='edit' /></a><a role='button' onClick={(e) => { handleEditDraw(e, "delete", draw) }} className='text-center'><img className='mx-auto w-[15px] h-[15px]' src='/images/delete.png' alt='delete' /></a></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='bg-gray-100 rounded-lg p-2'>
                                <h1 className='text-xl font-bold mb-3'>Donations</h1>
                                {Users.filter(user => user.donations.length > 0).length === 0 ? (
                                    <div className='flex items-center justify-center h-[400px] overflow-auto'>
                                        <div className='m-auto'>
                                            <h2 className='text-2xl'>No donations made</h2>
                                            <Link href='/donate' className='text-green-500'>Donate Now</Link>
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
                                                        <td>{user.donations.sort((a, b) => new Date(a.date) - new Date(b.date))[0].date.split('T')[0]} - {user.donations.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date.split('T')[0]}</td>
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
                            <div className='bg-gray-100 rounded-lg p-2'>
                                <h1 className='text-xl font-bold mb-3'>Notifications</h1>
                                {AdminData.notifications.length === 0 ? (
                                    <div className='flex items-center justify-center h-[400px] overflow-auto'>
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
                                                    <th>Message</th>
                                                    <th>Read</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {AdminData.notifications.sort((a, b) => new Date(b.date) - new Date(a.date)).map((notification, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{notification.date.split('T')[0]}</td>
                                                        <td>{notification.message}</td>
                                                        <td>{notification.read ? (<span className='text-green-500'>&#10004;</span>) : (<span className='text-red-500'>&#10006;</span>)}</td>
                                                        <td className='flex gap-2 h-full justify-center items-center'><a role='button' className='text-center'><img className='mx-auto w-[15px] h-[15px]' src='/images/delete.png' alt='delete' /></a></td>
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
            <div id='userDataModal' className='hidden'></div>
            <div id='createEditDraw' className='hidden'></div>
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

const handleUserDetails = (e, user) => {
    e.preventDefault();
    ReactDOM.render(<UserDataModal user={user} />, document.getElementById('userDataModal'));
    document.getElementById('userDataModal').classList.remove('hidden');
    return;
}

const handleEditDraw = (e, action = "create", draw = {}) => {
    e.preventDefault();
    if (action === 'delete') {
        ReactDOM.render(<DeleteModal type="draw" name={draw.drawName} />, document.getElementById('deleteModal'));
        document.getElementById('deleteModal').classList.remove('hidden');
        return;
    }
    ReactDOM.render(<CreateEditDraw action={action} />, document.getElementById('createEditDraw'));
    if (action === 'edit') {
        document.getElementById('editdrawname').value = draw.drawName;
        document.getElementById('editdrawtype').value = draw.drawType;
        document.getElementById('editdrawenddate').value = draw.enddate.split('T')[0];
        document.getElementById('editdrawnumbers').value = draw.numbers.join(', ');
        document.getElementById('editdrawwinningNumbers').value = draw.winningNumbers.join(', ');
        document.getElementById('editdrawtoSelect').value = draw.toSelect;
        document.getElementById('editdrawisActive').value = draw.active;
    }
    else {
        document.getElementById('editdrawname').value = '';
        document.getElementById('editdrawtype').value = 'Standard';
        document.getElementById('editdrawenddate').value = '';
        document.getElementById('editdrawnumbers').value = '';
        document.getElementById('editdrawwinningNumbers').value = '';
        document.getElementById('editdrawtoSelect').value = 1;
        document.getElementById('editdrawisActive').value = 'true';
    }
    document.getElementById('createEditDraw').classList.remove('hidden');
    return;
}

const handleEditPkg = (e, action = "create", pkg = {}) => {
    e.preventDefault();
    if (action === 'delete') {
        ReactDOM.render(<DeleteModal type="pkg" name={pkg.name} />, document.getElementById('deleteModal'));
        document.getElementById('deleteModal').classList.remove('hidden');
        return;
    }
    ReactDOM.render(<CreateEditPkg action={action} />, document.getElementById('createEditPkg'));
    if (action === 'edit') {
        document.getElementById('editpkgname').value = pkg.name;
        document.getElementById('editpkgtype').value = pkg.type;
        document.getElementById('editpkgdescription').value = pkg.description;
        document.getElementById('editpkgprice').value = pkg.price / 100;
        document.getElementById('editpkgisActive').value = pkg.active;
    }
    else {
        document.getElementById('editpkgname').value = '';
        document.getElementById('editpkgtype').value = 'Standard';
        document.getElementById('editpkgdescription').value = '';
        document.getElementById('editpkgprice').value = '';
        document.getElementById('editpkgisActive').value = 'true';
    }
    document.getElementById('createEditPkg').classList.remove('hidden');
    return;
}