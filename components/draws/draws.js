

export function Draws({ user, Draw, mainindex }) {
    const mutationObserver = (selector) => {
        if (!document.getElementById(selector)) return;
        const targetNode = document.getElementById(selector);
        const config = { attributes: true, childList: true, subtree: true };
        const callback = (mutationList, observer) => {
            console.log("mutationList", mutationList);
            for (const mutation of mutationList) {
                if (mutation.type === "attributes") {
                    document.getElementById(selector).classList.add("hidden");
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }

    const enddate = (date, selector) => {
        function CountdownTracker(label, value) {

            var el = document.createElement('span');

            el.className = 'flip-clock__piece';
            el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' +
                '<span class="flip-clock__slot">' + label + '</span>';

            this.el = el;

            var top = el.querySelector('.card__top'),
                bottom = el.querySelector('.card__bottom'),
                back = el.querySelector('.card__back'),
                backBottom = el.querySelector('.card__back .card__bottom');

            this.update = function (val) {
                val = ('0' + val).slice(-2);
                if (val !== this.currentValue) {

                    if (this.currentValue >= 0) {
                        back.setAttribute('data-value', this.currentValue);
                        bottom.setAttribute('data-value', this.currentValue);
                    }
                    this.currentValue = val;
                    top.innerText = this.currentValue;
                    backBottom.setAttribute('data-value', this.currentValue);

                    this.el.classList.remove('flip');
                    void this.el.offsetWidth;
                    this.el.classList.add('flip');
                }
            }

            this.update(value);
        }

        // Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

        function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            return {
                'Total': t,
                'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
                'Hours': Math.floor((t / (1000 * 60 * 60)) % 24),
                'Minutes': Math.floor((t / 1000 / 60) % 60),
                'Seconds': Math.floor((t / 1000) % 60)
            };
        }

        function getTime() {
            var t = new Date();
            return {
                'Total': t,
                'Hours': t.getHours() % 12,
                'Minutes': t.getMinutes(),
                'Seconds': t.getSeconds()
            };
        }

        function Clock(countdown, callback) {

            countdown = countdown ? new Date(Date.parse(countdown)) : false;
            callback = callback || function () { };

            var updateFn = countdown ? getTimeRemaining : getTime;

            this.el = document.createElement('div');
            this.el.className = 'flip-clock';

            var trackers = {},
                t = updateFn(countdown),
                key, timeinterval;

            for (key in t) {
                if (key === 'Total') { continue; }
                trackers[key] = new CountdownTracker(key, t[key]);
                this.el.appendChild(trackers[key].el);
            }

            var i = 0;
            function updateClock() {
                timeinterval = requestAnimationFrame(updateClock);

                // throttle so it's not constantly updating the time.
                if (i++ % 10) { return; }

                var t = updateFn(countdown);
                if (t.Total < 0) {
                    cancelAnimationFrame(timeinterval);
                    for (key in trackers) {
                        trackers[key].update(0);
                    }
                    callback();
                    return;
                }

                for (key in trackers) {
                    trackers[key].update(t[key]);
                }
            }
            setTimeout(updateClock, 500);
        }

        var deadline = new Date(date);
        var c = new Clock(deadline, function () { alert('countdown complete') });
        if (document.getElementById(selector) && document.getElementById(selector).innerHTML == "") document.getElementById(selector).appendChild(c.el)
    }
    return (
        <div key={mainindex} id={Draw.drawType + "Draw" + mainindex}>
            <div className="relative grid grid-cols-1 md:grid-cols-2 my-12 gap-10">
                <div style={{ width: "100%" }} className="relative rounded-lg overflow-hidden mx-auto pb-4">
                    {/* {user.draws.filter(draw => draw.active).length > 0 ? (<div className="bg-green-600 p-4 text-white text-center">You have {user.draws.filter(draw => draw.active).length} active draws</div>) : null} */}
                    {!user || user.draws.filter(draw => draw.drawType == Draw.drawType && draw.active && draw.numbers.length == 0).length == 0 ? (<div id={Draw.drawType + "DrawBlurBg" + mainindex} className="blurBackground absolute top-0 left-0 backdrop-blur grid items-center w-full h-full z-20"><div><h2 className="text-2xl text-center mb-3 m-auto">Buy Now to Unlock the Draws</h2> <button onClick={(e) => handleBuyDonate(e, user)} className="buyBtn animate-pulse bg-green-600 hover:bg-green-800 p-2 w-fit h-fit rounded-md text-white mx-auto flex items-center">Buy Now</button></div></div>) : null}
                    <div className="bg-green-600 pt-4 pb-4 px-4">
                        <h1 className="text-3xl font-semibold text-white text-center">{Draw.drawName}</h1>
                        <p className="text-gray-200 text-center mt-2">Pick Any 8 Numbers</p>
                        <div id={Draw.drawType + "SelectedNumbers" + mainindex} className="grid grid-cols-4 sm:grid-cols-8 gap-4 w-fit pt-6 pb-3 mx-auto">
                            {/* selected numbers will be displayed here */}
                            {Array.from({ length: Draw.toSelect }, (_, i) => i + 1).map((num, index) => (
                                <div key={index} onClick={(e) => handleSelectedNumber(e, Draw.drawType, mainindex)} className={`${Draw.drawType}SelectedNumber cursor-pointer p-1 text-center bg-white w-[30px] h-[30px] rounded-md`}></div>
                            ))}
                        </div>
                        <button id={`${Draw.drawType}DrawConfirm${mainindex}`} onClick={(e) => handleConfirmDraw(e, user.email, Draw.drawType, mainindex)} className="bg-gray-700 hover:bg-gray-900 p-2 w-fit h-fit rounded-md text-gray-200 flex mx-auto" >Confirm Selection</button>
                    </div>
                    <div style={{ borderRadius: "0px 0px 10px 10px" }} className="grid grid-cols-4 bg-gray-100 px-4 py-4 lg:grid-cols-6 gap-4 mx-auto">
                        {/* from 1 to 31 */}
                        {Draw.numbers.map((num, index) => (
                            <div key={index} onClick={(e) => handleDrawOpt(e, Draw.drawType, mainindex)} className={`${Draw.drawType}DrawOpt p-2 bg-white flex items-center justify-center hover:!bg-green-600 hover:text-white cursor-pointer rounded-md`}>
                                <span className="text-center text-lg">{num}</span>
                            </div>
                        ))}
                    </div>
                        {/* <img width="42" src={`/images/${num}.jpg`} alt={num} /> */}
                </div>
                <div id={Draw.drawType + "Drawside" + mainindex} className="relative" suppressHydrationWarning>
                    <h2 className="text-2xl text-center mb-3">Winning Prizes</h2>
                    <p className="text-md mb-2">Match all 8</p>
                    <div className="flex items-center justify-between">
                        <div className="grid grid-cols-8 gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
                                <div key={index} className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            ))}
                        </div>
                        <div className="bg-gray-800 rounded-full py-1 px-3 text-sm text-center text-white">First Prize</div>
                    </div>
                    <p className="text-md mt-4 mb-2">Match any 7</p>
                    <div className="flex items-center justify-between">
                        <div className="grid grid-cols-8 gap-1">
                            {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
                                <div key={index} className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            ))}
                            <div className="border-2 border-green-600 w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] rounded-full"></div>
                        </div>
                        <div className="bg-gray-800 rounded-full py-1 px-3 text-sm text-center text-white">Second Prize</div>
                    </div>
                    <p className="text-md mt-4 mb-2">Match any 6</p>
                    <div className="flex items-center justify-between">
                        <div className="grid grid-cols-8 gap-1">
                            {[1, 2, 3, 4, 5, 6].map((num, index) => (
                                <div key={index} className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            ))}
                            <div className="border-2 border-green-600 w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] rounded-full"></div>
                            <div className="border-2 border-green-600 w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] rounded-full"></div>
                        </div>
                        <div className="bg-gray-800 rounded-full py-1 px-3 text-sm text-center text-white">Third Prize</div>
                    </div>
                    <div className="mt-5 text-center">
                        <h3 className="text-2xl">Draw Ends In</h3>
                        <div id={Draw.drawType + "Drawsideclock" + mainindex}></div>
                    </div>
                    {user && user.draws.filter(draw => draw.drawType == Draw.drawType && draw.active && draw.numbers.length == 0).length > 0 ? (<button id={Draw.drawType + "DrawAddmore" + mainindex} onClick={(e) => handleBuyDonate(e, user)} className="bg-gray-700 hover:bg-gray-900 p-2 w-fit h-fit rounded-md text-gray-200 mt-5 flex mx-auto" >Buy More Draws</button>) : null}
                </div>
            </div>
            {mutationObserver(Draw.drawType + "DrawBlurBg" + mainindex)}
            {enddate(Draw.enddate, Draw.drawType + 'Drawsideclock' + mainindex)}
        </div>
    )
}


const handleConfirmDraw = async (e, email, type, index) => {
    e.preventDefault();
    if (!email) {
        alert('Please login to continue');
        window.location.assign('/login');
        return;
    }
    let selectedNumbers = document.querySelectorAll(`#${type}Draw${index} .${type}SelectedNumber`);
    let check = true;
    for (let i = 0; i < selectedNumbers.length; i++) {
        if (selectedNumbers[i].textContent == "" || selectedNumbers[i].textContent == null) {
            selectedNumbers[i].classList.add('border-2', 'border-red-600');
            check = false;
        }
    }
    if (!check) return;
    e.target.disabled = true;
    e.target.innerHTML = `<img class="mx-auto" width="20" height="20" src="/images/loading.gif" alt="Loading..."/>`
    let numbers = [];
    for (let i = 0; i < selectedNumbers.length; i++) {
        if (selectedNumbers[i].textContent == "" || selectedNumbers[i].textContent == null) {
            return;
        }
        numbers.push(parseInt(selectedNumbers[i].textContent));
    }
    console.log(email, type, numbers);
    const res = await fetch('/api/submitdraw',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, type, numbers })
        })
    if (res.status !== 200) {
        alert('Error submitting draw')
        console.error('Error submitting draw')
        return
    }
    e.target.textContent = 'Draw Submitted'
    window.location.reload();
}

export const handleBuyDonate = async (e, user) => {
    if (!user) return window.location.assign('/login?next=/draws/');
    document.getElementById('buyDonate').classList.remove('hidden');
}

export const handleSelectedNumber = (e, type, index) => {
    let val = e.target.textContent;
    let drawOpts = document.querySelectorAll(`#${type}Draw${index} .${type}DrawOpt`);
    for (let i = 0; i < drawOpts.length; i++) {
        if (drawOpts[i].textContent == val) {
            drawOpts[i].classList.remove('bg-green-600', 'text-white');
            drawOpts[i].classList.add('bg-white');
            console.log(drawOpts[i]);
            e.target.textContent = "";
            break;
        }
    }
}



export const handleDrawOpt = (e, type, index) => {
    if(e.target.tagName === 'SPAN') e.target = e.target.parentElement;
    let selectedNumbers = document.querySelectorAll(`#${type}Draw${index} .${type}SelectedNumber`);
    for (let i = 0; i < selectedNumbers.length; i++) {
        if (selectedNumbers[i].textContent == e.target.textContent) {
            return;
        }
    }
    for (let i = 0; i < selectedNumbers.length; i++) {
        if (selectedNumbers[i].textContent == "" || selectedNumbers[i].textContent == null) {
            selectedNumbers[i].textContent = e.target.textContent;
            selectedNumbers[i].classList.remove('border-2', 'border-red-600');
            e.target.classList.remove('bg-white');
            e.target.classList.add('bg-green-600', 'text-white');
            break;
        }
    }
}
