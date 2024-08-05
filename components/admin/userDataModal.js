

export default function UserDataModal({ user }) {
    const pkr = new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
    });
    return (
        <div className="fixed z-40 top-0 left-0 h-screen w-screen bg-black/50 backdrop-blur">
            <div className="absolute h-full w-full md:h-[80%] md:w-[80%] max-w-[800px] max-h-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 rounded-md overflow-auto flex flex-col gap-3">
                <button className="absolute top-2 right-2 text-2xl" onClick={() => { document.getElementById('userDataModal').classList.add('hidden') }}>&times;</button>
                <h1 className="text-3xl text-center pb-3 font-bold">User Data</h1>
                <div className="p-2 flex justify-between items-center bg-white rounded-md">
                    <div>
                        <div className='items-baseline flex flex-wrap gap-1'>
                            <p className="text-xl text-green-600 font-bold">{user.name}</p>
                            {user.isVerified ? (
                                <div>
                                    <img src='/images/verified.png' className='w-4 h-4' alt='verified' />
                                </div>
                            ) : (
                                <p className='text-xs text-red-500 p-1'>Not verified</p>
                            )}
                        </div>
                        <p className="text-sm pt-1">{user.email}</p>
                        <p className="text-sm pt-1">{user.phone}</p>
                        <p className="text-sm pt-1">Account created: {new Date(user.createdAt).toDateString()}</p>
                    </div>
                    <div>
                        <p className="text-end font-bold text-wrap">Balance:<br />{pkr.format(user.balance / 100)}</p>
                    </div>
                </div>
                <div className='h-[500px]'>
                    <h1 className='text-xl font-bold pb-3'>Draws</h1>
                    {user.draws.length === 0 ? (
                        <div className='flex items-center justify-center bg-white rounded-lg h-[200px] overflow-auto'>
                            <div className='m-auto'>
                                <h2 className='text-2xl'>No draws bought</h2>
                            </div>
                        </div>
                    ) : (
                        <div className='overflow-auto h-auto max-h-[400px] bg-white rounded-lg'>
                            <table className='table text-sm text-center w-full h-full text-gray-500'>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Numbers</th>
                                        <th>Active</th>
                                        <th>Won</th>
                                        <th>Prize</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.draws.toReversed().map((draw, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{new Date(draw.date).toDateString()}</td>
                                            <td>{draw.drawName}</td>
                                            <td>{draw.drawType}</td>
                                            <td>{draw.numbers.length > 0 ? draw.numbers.join(', ') : 'Not submitted'}</td>
                                            <td>{draw.active ? (<span className="text-green-500">&#10004;</span>) : (<span className="text-red-500">&#10006;</span>)}</td>
                                            <td>{user.drawsWon.find(drawWon => drawWon.drawId === draw._id) ? (<span className="text-green-500">&#10004;</span>) : (<span className="text-red-500">&#10006;</span>)}</td>
                                            <td>{user.drawsWon.find(drawWon => drawWon.drawId === draw._id) ? pkr.format(user.drawsWon.find(drawWon => drawWon.drawId === draw._id).amount / 100) : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className='h-[500px]'>
                    <h1 className='text-xl font-bold pb-3'>Donations</h1>
                    {user.donations.length === 0 ? (
                        <div className='flex items-center justify-center bg-white rounded-lg h-[200px] overflow-auto'>
                            <div className='m-auto'>
                                <h2 className='text-2xl'>No donations made</h2>
                            </div>
                        </div>
                    ) : (
                        <div className='overflow-auto h-auto max-h-[400px] bg-white rounded-lg'>
                            <table className='table text-center text-sm w-full h-full text-gray-500'>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.donations.map((donation, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{new Date(donation.date).toDateString()}</td>
                                            <td>{donation.donationType}</td>
                                            <td>{pkr.format(donation.amount / 100)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className='h-[500px]'>
                    <h1 className='text-xl font-bold pb-3'>Deposits</h1>
                    {user.deposits.length === 0 ? (
                        <div className='flex items-center justify-center bg-white rounded-lg h-[200px] overflow-auto'>
                            <div className='m-auto'>
                                <h2 className='text-2xl'>No deposits made</h2>
                            </div>
                        </div>
                    ) : (
                        <div className='overflow-auto h-auto max-h-[400px] bg-white rounded-lg'>
                            <table className='table text-center text-sm w-full h-full text-gray-500'>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.deposits.toReversed().map((deposit, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{new Date(deposit.date).toDateString()}</td>
                                            <td>{pkr.format(deposit.amount / 100)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}