'use client'
import { useEffect, useState } from 'react'
import UserDataModal from '@/components/admin/userDataModal'
import ReactDOM from 'react-dom'

export default function AdminUsersPage() {
    const [User, setUser] = useState(null)
    const [Users, setUsers] = useState(null)
    const [Pagination, setPagination] = useState({ start: 1, end: 5 })

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
        setUser(data.user)
        setUsers(data.users)
    }

    useEffect(() => {
        if (document.cookie.includes('session')) {
            getUsers();
        }
    }, [])

    const handleUserDetails = (e, user) => {
        e.preventDefault();
        ReactDOM.render(<UserDataModal user={user} />, document.getElementById('userDataModal'));
        document.getElementById('userDataModal').classList.remove('hidden');
        return;
    }

    const handlePagination = (e) => {
        e.preventDefault();
        if (e.target.id.includes('prev')) {
            if (Pagination.start === 1) {
                return;
            }
            if (Pagination.start - 5 <= 1) {
                e.target.style.display = 'none'
                document.getElementById('next').style.display = 'block'
            }
            else {
                e.target.style.display = 'block'
                document.getElementById('next').style.display = 'block'
            }
            setPagination({ start: Pagination.start - 5, end: Pagination.end - 5 })
        }
        else {
            if (Pagination.end >= Users.length) {
                return;
            }
            if (Pagination.end + 5 >= Users.length) {
                e.target.style.display = 'none'
                document.getElementById('prev').style.display = 'block'
            }
            else {
                e.target.style.display = 'block'
                document.getElementById('prev').style.display = 'block'
            }
            setPagination({ start: Pagination.start + 5, end: Pagination.end + 5 })
        }
    }

    return (
        <>
            {User && Users ? (
                <div>
                    <div className='relative text-center rounded-lg p-2 bg-gray-100'>
                        <h1 className='text-4xl font-bold pb-3'>Users</h1>
                        {Users.length === 0 ? (
                            <div className='flex items-center justify-center h-[200px] overflow-auto'>
                                <div className='m-auto'>
                                    <h2 className='text-2xl'>No users found</h2>
                                </div>
                            </div>
                        ) : (
                            <div className='overflow-auto max-h-screen bg-white rounded-lg min-h-[100vh]'>
                                <table className='table text-sm w-full h-full text-gray-500 min-h-[90vh]'>
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
                                        {Users.toReversed().slice(Pagination.start - 1, Pagination.end).map((user, index) => (
                                            <tr key={index}>
                                                <td>{index + Pagination.start}</td>
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
                                {Users.length > 5 && (
                                    <div className='pagination flex justify-center items-center gap-2 pb-2'>
                                        <a role='button' id='prev' style={{ display: "none" }} onClick={handlePagination} className='text-center text-gray-500 hover:transform hover:scale-125'>&larr;</a>
                                        <p className='text-center text-xs text-gray-500'>{Pagination.start < 1 ? 1 : Pagination.start} - {Pagination.end > Users.length ? Users.length : Pagination.end} of {Users.length}</p>
                                        <a role='button' id='next' onClick={handlePagination} className='text-center text-gray-500 hover:transform hover:scale-125'>&rarr;</a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='text-center h-screen w-full flex items-center'>
                    <div className='m-auto flex items-center'>
                        <h2 className='text-4xl'>Please wait</h2><span className='ml-2 mt-[12px]'><img src='/images/loading2.gif' className='w-[30px] h-[30px]' alt='loading' /></span>
                    </div>
                </div>
            )}
            <div id='userDataModal' className='hidden'></div>

        </>
    )
}