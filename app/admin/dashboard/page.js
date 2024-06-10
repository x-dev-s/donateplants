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
import Cookies from 'universal-cookie'
import { verifyJwtToken } from '@/utils/auth'

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
        if (window.location.href.includes('?session')) {
            let token = window.location.href.split('?')[1].split('=')[1];
            token = decodeURIComponent(token);
            (async () => {
                const hasVerifiedToken = token && (await verifyJwtToken(token));
                if (hasVerifiedToken) {
                    Cookies.set('session', token);
                    document.cookie = `session=${token}`;
                }
                else{
                    console.log('Invalid token')
                }
            })();
        }
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
                            <div id='notificationsWrapper' className='relative'>
                                <button id='notifications' onClick={() => { document.getElementById('notificationsDropdown').classList.toggle('hidden') }} className='relative mr-1'>
                                    {AdminData.unreadNotifications > 0 && <div className='absolute -top-[6px] -right-[2px] bg-green-600 text-white text-xs rounded-full w-[10px] h-[10px] flex items-center justify-center animate-pulse'></div>}
                                    <img className='w-6 h-6' src='/images/notifications.png' alt='notifications' />
                                </button>
                                <div id='notificationsDropdown' className='hidden absolute z-20 top-[100%] right-[-8px] p-2 w-[250px]'>
                                    <div className='bg-gray-700 text-gray-300 text-sm font-medium rounded-md ml-3 overflow-hidden'>
                                        {AdminData.notifications.length === 0 ? (
                                            <p className='text-center min-h-40 flex items-center justify-center'>No unread notifications</p>
                                        ) : (
                                            AdminData.notifications.slice(0, 5).map((notification, index) => (
                                                <div key={index} id={'notification' + index} className='p-2 w-full flex items-center hover:bg-gray-900 hover:text-white cursor-pointer'>
                                                    <div className='max-w-[18px]'><img src='/images/notification.png' alt='notification' /></div>
                                                    <div className='px-2' onClick={(e) => { document.getElementById(`notificationActions${index}`).classList.toggle("visually-hidden"); e.target.classList.toggle('w-[130px]') }}>{notification.message}</div>
                                                    <div id={`notificationActions${index}`} className='bg-white w-full visually-hidden transition-all duration-1000 p-2 flex items-center justify-center gap-2 max-w-[55px]'>
                                                        <a role='button' className='text-green-500' onClick={(e) => { handleReadDeleteNotifications(e, notification._id, index) }}><img src='/images/markread.png' alt='read' /></a>
                                                        <a role='button' className='text-red-500' onClick={(e) => { handleReadDeleteNotifications(e, notification._id, index) }}><img src='/images/delete.png' alt='delete' /></a>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                        <a role='button' onClick={() => { document.getElementById('notificationsDropdown').classList.add('hidden') }} href='#notificationsTable' className='p-2 w-full flex items-center hover:bg-gray-900 text-gray-300 hover:text-white justify-center'>View All</a>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            <div className='relative bg-gray-100 rounded-lg p-2'>
                                <h1 className='text-xl font-bold pb-3'>Users</h1>
                                {Users.length === 0 ? (
                                    <div className='flex items-center justify-center h-[200px] overflow-auto'>
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
                                <h1 className='text-xl font-bold pb-3'>Packages</h1>
                                {Packages.length === 0 ? (
                                    <div className='flex items-center justify-center h-[200px] overflow-auto'>
                                        <div className='m-auto'>
                                            <h2 className='text-2xl'>No packages found</h2>
                                            <a role='button' onClick={(e) => handleEditPkg(e)} className='text-green-500'>Create Now</a>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <a role='button' onClick={(e) => handleEditPkg(e)} className='absolute top-2 right-2 text-green-500 text-xs'>Create Package</a>
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
                                <h1 className='text-xl font-bold pb-3'>Draws</h1>
                                {Draws.length === 0 ? (
                                    <div className='flex items-center justify-center h-[200px] overflow-auto'>
                                        <div className='m-auto'>
                                            <h2 className='text-2xl'>No draws created</h2>
                                            <a role='button' className='text-green-500'>Create Now</a>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <a role='button' onClick={(e) => { handleEditDraw(e) }} className='absolute top-2 right-2 text-green-500 text-xs'>Create Draw</a>
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
                                                        <th>Prizes</th>
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
                                                            <td>{new Date(draw.createddate).toDateString().split(' ').slice(1).join(' ')}</td>
                                                            <td>{new Date(draw.enddate).toDateString().split(' ').slice(1).join(' ')}</td>
                                                            <td>{draw.users.length}</td>
                                                            <td>{draw.numbers[0]} - {draw.numbers[draw.numbers.length - 1]}</td>
                                                            <td>{draw.winningNumbers.join(', ') || 'TBD'}</td>
                                                            <td>{draw.toSelect}</td>
                                                            <td>{draw.prizes.map((prize, index) => (<span key={index}>{parseInt(prize) ? pkr.format(parseInt(prize) / 100) : prize}<br /></span>))}</td>
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
                                <h1 className='text-xl font-bold pb-3'>Donations</h1>
                                {Users.filter(user => user.donations.length > 0).length === 0 ? (
                                    <div className='flex items-center justify-center h-[200px] overflow-auto'>
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
        // if(draw.winningNumbers.length > 1) document.getElementById('editdrawwinningNumbers').disabled = true
        document.getElementById('editdrawwinningNumbers').value = draw.winningNumbers.join(', ');
        document.getElementById('editdrawtoSelect').value = draw.toSelect;
        document.getElementById('editdrawtoSelect').disabled = true;
        document.getElementById('editdrawFirstPrize').value = !parseInt(draw.prizes[0]) ? draw.prizes[0] : draw.prizes[0] / 100;
        document.getElementById('editdrawSecondPrize').value = !parseInt(draw.prizes[1]) ? draw.prizes[1] : draw.prizes[1] / 100;
        document.getElementById('editdrawThirdPrize').value = !parseInt(draw.prizes[2]) ? draw.prizes[2] : draw.prizes[2] / 100;
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
            window.location.reload();
        }

    }
}