'use client'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import CreateEditDraw from '@/components/admin/createEditDraw'
import DeleteModal from '@/components/admin/deleteModal'

export default function AdminDrawsPage() {
    const [Draws, setDraws] = useState(null)
    const [Pagination, setPagination] = useState({ start: 1, end: 10 })
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
        if (document.cookie.includes('session')) {
            getDraws();
        }
    }, [])

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
            if (Pagination.end >= Draws.length) {
                return;
            }
            if(Pagination.end + 10 >= Draws.length){
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
            {Draws ? (
                <div className='relative text-center rounded-lg pt-2'>
                    <h1 className='text-4xl font-bold pb-3'>Draws</h1>
                    {Draws.length === 0 ? (
                        <div className='flex items-center justify-center h-[200px] overflow-auto'>
                            <div className='m-auto'>
                                <h2 className='text-2xl'>No draws created</h2>
                                <a role='button' className='text-green-500'>Create Now</a>
                            </div>
                        </div>
                    ) : (
                        <>
                            <a role='button' onClick={(e) => { handleEditDraw(e) }} className='sm:absolute top-2 right-2 text-green-500 text-xs'>Create Draw</a>
                            <div className='overflow-auto rounded-lg min-h-[100vh]'>
                                <table className='table text-sm w-full h-full text-gray-500 min-h-[90vh]'>
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
                                        {Draws.sort((a, b) => new Date(b.createddate) - new Date(a.createddate)).slice(Pagination.start - 1, Pagination.end).map((draw, index) => (
                                            <tr key={index}>
                                                <td>{index + Pagination.start}</td>
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
                                {Draws.length > 10 && (
                                    <div className='pagination flex justify-center items-center gap-2 pb-2'>
                                        <a role='button' id='prev' style={{display: "none"}} onClick={handlePagination} className='text-center text-gray-500 hover:transform hover:scale-125'>&larr;</a>
                                        <p className='text-center text-xs text-gray-500'>{Pagination.start < 1 ? 1 : Pagination.start} - {Pagination.end > Draws.length ? Draws.length : Pagination.end} of {Draws.length}</p>
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
            <div id='createEditDraw' className='hidden'></div>
            <div id='deleteModal'></div>
        </>
    )
}
