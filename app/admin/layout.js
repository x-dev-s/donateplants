'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { logout } from '@/lib'

export default function Layout({ children }) {
    const [User, setUser] = useState(null)
    const [AdminData, setAdminData] = useState(null)
    const getUser = async () => {
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
    }

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

    const initEventListeners = () => {
        let adminNav = document.querySelectorAll('.adminNav');
        console.log(adminNav)
        adminNav.forEach((nav) => {
            console.log(nav)
            nav.addEventListener('click', () => {
                adminNav.forEach((nav) => {
                    nav.classList.remove('text-green-600')
                    nav.classList.add('text-gray-600')
                })
                nav.classList.remove('text-gray-600')
                nav.classList.add('text-green-600')
            })
            nav.addEventListener('mouseover', () => {
                nav.lastChild.classList.add("transform", "scale-150")
            }
            )
            nav.addEventListener('mouseout', () => {
                nav.lastChild.classList.remove("transform", "scale-150")
            }
            )
        })
    }

    useEffect(() => {
        if (window.location.href.includes('?session') && !document.cookie.includes('session')) {
            let token = window.location.href.split('?')[1].split('=')[1];
            token = decodeURIComponent(token);
            (async () => {
                const hasVerifiedToken = token && (await verifyJwtToken(token));
                if (hasVerifiedToken) {
                    Cookies.set('session', token);
                    document.cookie = `session=${token}`;
                }
                else {
                    console.log('Invalid token')
                }
            })();
        }
        if (document.cookie.includes('session')) {
            getUser();
            getAdminData();
        }
    }, [])
    return (
        //sidenav
        <>
            {User && AdminData ? (
                <div className='relative'>
                    <button id='adminNavbarOpen' onClick={() => { document.getElementById('adminNavbar').classList.remove('!w-0'); document.getElementById('adminNavbar').classList.add('!w-[230px]'); document.getElementById('adminNavbar').classList.add('px-2'); }} className='lg:hidden absolute top-4 left-3 text-gray-700 p-2 rounded-md'>
                        <svg id="navbarOpen" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <div className="row max-w-[1304px] mx-auto gap-4">
                        <div id='adminNavbar' className="lg:flex flex-col h-screen z-20 fixed lg:sticky overflow-auto p-0 lg:!px-2 top-0 left-0 bg-gray-100 transition-all !w-0 lg:!w-[230px] py-5">
                            <button id='adminNavbarClose' onClick={() => { document.getElementById('adminNavbar').classList.remove('!w-[230px]'); document.getElementById('adminNavbar').classList.add('!w-0'); document.getElementById('adminNavbar').classList.remove('px-2'); }} className='lg:hidden absolute top-0 right-0 text-gray-700 p-2 rounded-md'>
                                <svg id="navbarClose" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div id='user' className='flex items-center justify-between gap-2'>
                                {/* <img src={User.image} className='w-10 h-10 rounded-full' /> */}
                                <div className='flex flex-col'>
                                    <span className='text-md text-green-600 font-bold'>{User.name}</span>
                                    <span className='text-xs text-gray-500'>{User.email}</span>
                                    <span className='text-xs text-gray-500'>{User.phone}</span>
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
                                            <Link role='button' onClick={() => { document.getElementById('notificationsDropdown').classList.add('hidden') }} href='/admin/dashboard#notificationsTable' className='p-2 w-full flex items-center hover:bg-gray-900 text-gray-300 hover:text-white justify-center'>View All</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className='text-green-600' />
                            <Link href='/admin/dashboard' className='adminNav flex items-center justify-between gap-2 text-green-600'>
                                <span className='text-sm'>Dashboard</span>
                                <span>&rarr;</span>
                            </Link>
                            <hr className='text-green-600' />
                            <Link href='/admin/users' className='adminNav flex items-center justify-between gap-2 text-green-600'>
                                <span className='text-sm'>Users</span>
                                <span>&rarr;</span>
                            </Link>
                            <hr className='text-green-600' />
                            <Link href='/admin/packages' className='adminNav flex items-center justify-between gap-2 text-green-600'>
                                <span className='text-sm'>Packages</span>
                                <span>&rarr;</span>
                            </Link>
                            <hr className='text-green-600' />
                            <Link href='/admin/donations' className='adminNav flex items-center justify-between gap-2 text-green-600'>
                                <span className='text-sm'>Donations</span>
                                <span>&rarr;</span>
                            </Link>
                            <hr className='text-green-600' />
                            <Link href='/admin/draws' className='adminNav flex items-center justify-between gap-2 text-green-600'>
                                <span className='text-sm'>Draws</span>
                                <span>&rarr;</span>
                            </Link>
                            <hr className='text-green-600' />
                            <Link href='/admin/settings' className='adminNav flex items-center justify-between gap-2 text-green-600'>
                                <span className='text-sm'>Settings</span>
                                <span>&rarr;</span>
                            </Link>
                            <hr className='text-green-600' />
                            <a role='button' onClick={handleLogout} className='adminNav flex items-center justify-between gap-2 text-green-600'>
                                <span className='text-sm'>Logout</span>
                                <span>&rarr;</span>
                            </a>
                        </div>
                        {initEventListeners()}
                        <div className='py-5 w-full' id="adminMainDiv">
                            {children}
                        </div>
                    </div>
                </div>
            ) : null}
        </>


    )
}

const handleLogout = async () => {
    await logout();
    window.location.assign('/login');
}

Array.prototype.removeDuplicates = function () {
    return this.filter((item, index) => this.indexOf(item) === index);
}