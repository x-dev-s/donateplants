import axios from 'axios';

export default function CreateEditDraw({ action }) {
    return (
        <div className="fixed z-40 top-0 left-0 h-screen w-screen bg-black/50 backdrop-blur">
            <div className="absolute h-full w-full md:h-[80%] md:w-[80%] max-w-[400px] max-h-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 rounded-md overflow-auto flex flex-col gap-3">
                <button className="absolute top-2 right-2 text-2xl" onClick={() => { document.getElementById('createEditDraw').classList.add('hidden') }}>&times;</button>
                <form onSubmit={(e) => { handleSubmit(e, action) }} className="flex flex-col gap-3 text-sm">
                    <h1 className="text-3xl text-center mb-3 font-bold">Edit Draw</h1>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input required type="text" name="name" id="editdrawname" className="rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="type">Type</label>
                        <select required id="editdrawtype" className="rounded-md">
                            <option value="Standard">Standard</option>
                            <option value="Farmer">Farmer</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="enddate">End Date</label>
                        <input required type="date" id="editdrawenddate" className="rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="numbers">Numbers</label>
                        <textarea id="editdrawnumbers" className="rounded-md" placeholder="Seperate each by a comma ',' (Default 1 - 31)" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="winningNumbers">Winning Numbers</label>
                        <textarea id="editdrawwinningNumbers" className="rounded-md" placeholder="Seperate each by a comma ','" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="toSelect">Number of Selections</label>
                        <input required min={1} type="number" id="editdrawtoSelect" className="rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="First Prize">First Prize</label>
                        <input required type="text" id="editdrawFirstPrize" className="rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="Second Prize">Second Prize</label>
                        <input required type="text" id="editdrawSecondPrize" className="rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="Third Prize">Third Prize</label>
                        <input required type="text" id="editdrawThirdPrize" className="rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="isActive">Active</label>
                        <select id="editdrawisActive" required className="rounded-md">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button type="submit" className="bg-green-600 p-2 text-white rounded-md">Save</button>
                    </div>
                </form>
                <p id='editDrawError' className="text-xs text-red-500"></p>
            </div>
        </div>
    )
}

const handleSubmit = async (e, action) => {
    try {
        e.preventDefault();
        document.querySelector('#createEditDraw button[type="submit"]').setAttribute('disabled', 'true');
        document.querySelector('#createEditDraw button[type="submit"]').innerHTML = `<img class="mx-auto" width="20" height="20" src="/images/loading.gif" alt="Loading..."/>`
        const data = {
            active: document.getElementById('editdrawisActive').value,
            drawName: document.getElementById('editdrawname').value,
            drawType: document.getElementById('editdrawtype').value,
            toSelect: parseInt(document.getElementById('editdrawtoSelect').value),
            enddate: document.getElementById('editdrawenddate').value,

        }
        !parseInt(document.getElementById('editdrawFirstPrize').value) ? data.prizes = [document.getElementById('editdrawFirstPrize').value] : data.prizes = [parseInt(document.getElementById('editdrawFirstPrize').value * 100)]

        !parseInt(document.getElementById('editdrawSecondPrize').value) ? data.prizes.push(document.getElementById('editdrawSecondPrize').value) : data.prizes.push(parseInt(document.getElementById('editdrawSecondPrize').value * 100))

        !parseInt(document.getElementById('editdrawThirdPrize').value) ? data.prizes.push(document.getElementById('editdrawThirdPrize').value) : data.prizes.push(parseInt(document.getElementById('editdrawThirdPrize').value * 100))

        if (document.getElementById('editdrawnumbers').value !== '') data.numbers = document.getElementById('editdrawnumbers').value.replace(/\s/g, '').split(',').filter(el => el !== '').sort((a, b) => a - b); // Remove empty strings

        if (document.getElementById('editdrawwinningNumbers').value !== '') {
            data.winningNumbers = document.getElementById('editdrawwinningNumbers').value.replace(/\s/g, '').split(',').filter(el => el !== '').sort((a, b) => a - b); // Remove empty strings
            if (data.winningNumbers.length !== data.toSelect) {
                document.getElementById('editDrawError').innerHTML = "* Winning numbers must be equal to the number of selections (" + data.toSelect + ")";
                document.querySelector('#createEditDraw button[type="submit"]').removeAttribute('disabled');
                document.querySelector('#createEditDraw button[type="submit"]').innerHTML = `Save`
                return;
            }
            // Numbers must be unique
            if (new Set(data.winningNumbers).size !== data.winningNumbers.length) {
                document.getElementById('editDrawError').innerHTML = "* Winning numbers must be unique";
                document.querySelector('#createEditDraw button[type="submit"]').removeAttribute('disabled');
                document.querySelector('#createEditDraw button[type="submit"]').innerHTML = `Save`
                return;
            }

            // Numbers must be within the range of 1 - 31
            if (data.winningNumbers.some(num => num < 1 || num > 31)) {
                document.getElementById('editDrawError').innerHTML = "* Winning numbers must be within the range of 1 - 31";
                document.querySelector('#createEditDraw button[type="submit"]').removeAttribute('disabled');
                document.querySelector('#createEditDraw button[type="submit"]').innerHTML = `Save`
                return;
            }
        }
        else {
            data.winningNumbers = [];
        }
        const res = await axios.post("/api/admin/createeditdraw", { action, data });
        if (res.ok || res.status === 200) {
            document.querySelector('#createEditDraw button[type="submit"]').innerHTML = `Saved`
            setTimeout(() => {
                document.getElementById('createEditDraw').classList.add('hidden');
                return window.location.reload();
            }, 2000);
        }
    } catch (error) {
        console.error(error);
        document.getElementById('editDrawError').innerHTML = "* An error occured, please try again (Hint: Draw name must be unique)";
        document.querySelector('#createEditDraw button[type="submit"]').removeAttribute('disabled');
        document.querySelector('#createEditDraw button[type="submit"]').innerHTML = `Save`
        return;
    }
}