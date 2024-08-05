'use client'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import CreateEditPkg from '@/components/admin/createEditPkg'
import axios from 'axios'
import DeleteModal from '@/components/admin/deleteModal'

export default function AdminDrawsPage() {
    const [Packages, setPackages] = useState([])
    const [Pagination, setPagination] = useState({ start: 1, end: 10 })
    let pkr = Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
    });

    const getPackages = async () => {
        const { data } = await axios.get("/api/admin/getpkgs")
        setPackages(data);
    }

    useEffect(() => {
        if (document.cookie.includes('session')) {
            getPackages();
        }
    }, [])

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

    const handlePagination = (e) => {
        e.preventDefault();
        if (e.target.id.includes('prev')) {
            if (Pagination.start === 1) {
                return;
            }
            if(Pagination.start - 10 <= 1){
                e.target.style.display = 'none'
                document.getElementById('next').style.display = 'block'
            }
            else{
                e.target.style.display = 'block'
                document.getElementById('next').style.display = 'block'
            }
            setPagination({ start: Pagination.start - 10, end: Pagination.end - 10 })
        }
        else {
            if (Pagination.end >= Packages.length) {
                return;
            }
            if(Pagination.end + 10 >= Packages.length){
                e.target.style.display = 'none'
                document.getElementById('prev').style.display = 'block'
            }
            else{
                e.target.style.display = 'block'
                document.getElementById('prev').style.display = 'block'
            }
            setPagination({ start: Pagination.start + 10, end: Pagination.end + 10 })
        }
    }

    return (
        <>
            {Packages ? (
                <div className='relative text-center bg-gray-100 rounded-lg p-2'>
                <h1 className='text-4xl font-bold pb-3'>Packages</h1>
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
                        <div className='overflow-auto max-h-[400px] bg-white rounded-lg min-h-[100vh]'>
                            <table className='table text-sm w-full h-full text-gray-500 min-h-[90vh]'>
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
                                    {Packages.toReversed().slice(Pagination.start - 1, Pagination.end).map((pkg, index) => (
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
                            {Packages.length > 10 && (
                                    <div className='pagination flex justify-center items-center gap-2 pb-2'>
                                        <a role='button' id='prev' style={{display: "none"}} onClick={handlePagination} className='text-center text-gray-500 hover:transform hover:scale-125'>&larr;</a>
                                        <p className='text-center text-xs text-gray-500'>{Pagination.start < 1 ? 1 : Pagination.start} - {Pagination.end > Packages.length ? Packages.length : Pagination.end} of {Packages.length}</p>
                                        <a role='button' id='next' onClick={handlePagination} className='text-center text-gray-500 hover:transform hover:scale-125'>&rarr;</a>
                                    </div>
                                )}
                        </div>
                    </>
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
            <div id='createEditPkg' className='hidden'></div>
            <div id='deleteModal'></div>
        </>
    )
}
