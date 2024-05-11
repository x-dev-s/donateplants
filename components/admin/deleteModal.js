import axios from 'axios';

export default function DeleteModal({ type, name }) {
    return (
        <div className='bg-black/50 fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
            <div className='bg-white p-4 rounded-lg text-center'>
                <h2 className='text-2xl font-bold'>This action is irreversible.</h2><p>Are you sure you want to delete?</p>
                <div className='flex gap-2 justify-center items-center mt-3'>
                    <button onClick={(e) => handleDeleteAction(e, type, name)} className='bg-green-600 p-2 text-white rounded-md'>Yes</button>
                    <button onClick={() => { document.getElementById('deleteModal').classList.add('hidden') }} className='bg-red-600 p-2 text-white rounded-md'>No</button>
                </div>
                <p id='deleteError' className="text-xs text-red-500"></p>
            </div>
        </div>
    )
}

const handleDeleteAction = async (e, type, name) => {
    try {
        let action = 'delete'
        e.preventDefault();
        e.target.disabled = true;
        e.target.innerHTML = `<img class="mx-auto" width="20" height="20" src="/images/loading.gif" alt="Loading..."/>`;
        if(type == 'draw') var res = await axios.post("/api/admin/createeditdraw", {action, data: {drawName: name}});
        else if(type == 'pkg') var res = await axios.post("/api/admin/createeditpkg", {action, data: {name}});
        else if(type == 'notifications') var res = await axios.post("/api/admin/readdeletenotification", {notificationId: name, action: "deleteAll"});
        if(res.status === 200) {
            e.target.innerHTML = 'Deleted';
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }
    catch (error) {
        console.error(error);
        document.getElementById('deleteError').innerText = "An error occured. Please try again."
        e.target.disabled = false;
        e.target.innerHTML = 'Yes';
        return;
    }
}