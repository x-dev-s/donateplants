import axios from "axios";

export default function CreateEditPkg({ action }) {
    return (
        <div className="fixed z-40 top-0 left-0 h-screen w-screen bg-black/50 backdrop-blur">
            <div className="absolute h-full w-full md:h-[80%] md:w-[80%] max-w-[400px] max-h-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 rounded-md overflow-auto flex flex-col gap-3">
                <button className="absolute top-2 right-2 text-2xl" onClick={() => { document.getElementById('createEditPkg').classList.add('hidden') }}>&times;</button>
                <form onSubmit={(e) => { handleSubmit(e, action) }} className="flex flex-col gap-3 text-sm">
                    <h1 className="text-3xl text-center mb-3 font-bold">Edit Package</h1>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input required type="text" name="name" id="editpkgname" className="rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="type">Type</label>
                        <select required id="editpkgtype" className="rounded-md">
                            <option value="Standard">Standard</option>
                            <option value="Farmer">Farmer</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea id="editpkgdescription" className="rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="price">Price</label>
                        <input required type="number" id="editpkgprice" className="rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="isActive">Active</label>
                        <select id="editpkgisActive" required className="rounded-md">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button type="submit" className="bg-green-600 p-2 text-white rounded-md">Save</button>
                    </div>
                </form>
                <p id='editPkgError' className="text-xs text-red-500"></p>
            </div>
        </div>
    )
}

const handleSubmit = async (e, action) => {
    e.preventDefault();
    document.querySelector('#createEditPkg button[type="submit"]').setAttribute('disabled', 'true');
    document.querySelector('#createEditPkg button[type="submit"]').innerHTML = `<img class="mx-auto" width="20" height="20" src="/images/loading.gif" alt="Loading..."/>`
    const data = {
        active: document.getElementById('editpkgisActive').value,
        name: document.getElementById('editpkgname').value,
        type: document.getElementById('editpkgtype').value,
        description: document.getElementById('editpkgdescription').value,
        price: document.getElementById('editpkgprice').value*100,
    }
    try {
        const res = await axios.post('/api/admin/createeditpkg', { action, data });
        if (res.status === 200) {
            document.querySelector('#createEditPkg button[type="submit"]').innerHTML = `Saved`
            setTimeout(() => {
                document.getElementById('createEditPkg').classList.add('hidden');
                window.location.reload();
            }, 2000);
        }
    } catch (error) {
        document.querySelector('#createEditPkg button[type="submit"]').removeAttribute('disabled');
        document.querySelector('#createEditPkg button[type="submit"]').innerHTML = `Save`
        document.getElementById('editPkgError').innerText = "* An error occured, please try again";
    }
}