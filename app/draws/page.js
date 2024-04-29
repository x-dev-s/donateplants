'use client'
import { useEffect } from "react"
export default function DrawsPage() {
    useEffect(() => {
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

        var deadline = new Date(Date.parse(new Date()) + 12 * 24 * 60 * 60 * 1000);
        var c = new Clock(deadline, function () { alert('countdown complete') });
        document.getElementById('drawsideclock').innerHTML === '' ? document.getElementById('drawsideclock').appendChild(c.el) : null;
    }, [])

    return (
        <div className="container mx-auto max-w-7xl sm:px-16">
            <div className="relative grid grid-cols-1 md:grid-cols-2 my-12 gap-10">
                <div style={{ width: "100%" }} className="relative rounded-lg overflow-hidden mx-auto pb-4">
                    <div id="drawBlurBg" className="blurBackground absolute top-0 left-0 backdrop-blur grid items-center w-full h-full z-20"><div><h2 className="text-2xl text-center mb-3 m-auto">Buy Now to Unlock the Draws</h2> <button className="buyBtn animate-pulse bg-green-600 hover:bg-green-800 p-2 w-fit h-fit rounded-md text-white mx-auto flex items-center">Buy Now</button></div></div>
                    <div className="bg-green-600 pt-4 px-4">
                        <h2 className="text-2xl text-white text-center">Pick Any 8 Numbers</h2>
                        <div id="selectedNumbers" className="grid grid-cols-4 sm:grid-cols-8 gap-4 w-fit py-6 mx-auto">
                            {/* selected numbers will be displayed here */}
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
                                <div key={index} className="selectedNumber cursor-pointer p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            ))}
                        </div>
                    </div>
                    <div style={{ borderRadius: "0px 0px 10px 10px" }} className="grid grid-cols-4 bg-gray-100 px-4 py-4 lg:grid-cols-6 gap-4 mx-auto">
                        {/* from 1 to 31 */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((num, index) => (
                            <div key={index} className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                                {/* <img width="42" src={`/images/${num}.jpg`} alt={num} /> */}
                                <h3 className="text-center">{num}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="drawside" className="relative" suppressHydrationWarning>
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
                        <div id="drawsideclock"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}