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
                <div className="blurBackground hidden absolute top-0 left-0 backdrop-blur grid items-center w-full h-full z-20"><div><h2 className="text-2xl text-center mb-3 m-auto">Buy Now to Unlock the Draws</h2> <button className="buyBtn animate-pulse bg-green-600 hover:bg-green-800 p-2 w-fit h-fit rounded-md text-white mx-auto flex items-center">Buy Now</button></div></div>
                <div style={{ width: "100%" }} className="rounded-lg overflow-hidden mx-auto pb-4">
                    <div className="bg-green-600 pt-4 px-4">
                        <h2 className="text-2xl text-white text-center">Pick Any 8 Numbers</h2>
                        <div id="selectedNumbers" className="grid grid-cols-4 sm:grid-cols-8 gap-4 w-fit py-6 mx-auto">
                            {/* selected numbers will be displayed here */}
                            <div className="selectedNumber cursor-pointer p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber cursor-pointer p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber cursor-pointer p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber cursor-pointer p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber cursor-pointer p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber cursor-pointer p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber cursor-pointer p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber cursor-pointer p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                        </div>
                    </div>
                    <div style={{ borderRadius: "0px 0px 10px 10px" }} className="grid grid-cols-4 bg-gray-100 px-4 py-4 lg:grid-cols-6 gap-4 mx-auto">
                        {/* from 1 to 31 */}
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/1.jpg" alt="1" /> */}
                            <h3 className="text-center">1</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/2.jpg" alt="2" /> */}
                            <h3 className="text-center">2</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/3.jpg" alt="3" /> */}
                            <h3 className="text-center">3</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/4.jpg" alt="4" /> */}
                            <h3 className="text-center">4</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/5.jpg" alt="5" /> */}
                            <h3 className="text-center">5</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/6.jpg" alt="6" /> */}
                            <h3 className="text-center">6</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/7.jpg" alt="7" /> */}
                            <h3 className="text-center">7</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/8.jpg" alt="8" /> */}
                            <h3 className="text-center">8</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/9.jpg" alt="9" /> */}
                            <h3 className="text-center">9</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/10.jpg" alt="10" /> */}
                            <h3 className="text-center">10</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/11.jpg" alt="11" /> */}
                            <h3 className="text-center">11</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/12.jpg" alt="12" /> */}
                            <h3 className="text-center">12</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/13.jpg" alt="13" /> */}
                            <h3 className="text-center">13</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/14.jpg" alt="14" /> */}
                            <h3 className="text-center">14</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/15.jpg" alt="15" /> */}
                            <h3 className="text-center">15</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/16.jpg" alt="16" /> */}
                            <h3 className="text-center">16</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/17.jpg" alt="17" /> */}
                            <h3 className="text-center">17</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/18.jpg" alt="18" /> */}
                            <h3 className="text-center">18</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/19.jpg" alt="19" /> */}
                            <h3 className="text-center">19</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/20.jpg" alt="20" /> */}
                            <h3 className="text-center">20</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/21.jpg" alt="21" /> */}
                            <h3 className="text-center">21</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/22.jpg" alt="22" /> */}
                            <h3 className="text-center">22</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/23.jpg" alt="23" /> */}
                            <h3 className="text-center">23</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/24.jpg" alt="24" /> */}
                            <h3 className="text-center">24</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/25.jpg" alt="25" /> */}
                            <h3 className="text-center">25</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/26.jpg" alt="26" /> */}
                            <h3 className="text-center">26</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/27.jpg" alt="27" /> */}
                            <h3 className="text-center">27</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/28.jpg" alt="28" /> */}
                            <h3 className="text-center">28</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/29.jpg" alt="29" /> */}
                            <h3 className="text-center">29</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/30.jpg" alt="30" /> */}
                            <h3 className="text-center">30</h3>
                        </div>
                        <div className="drawOpt p-2 bg-white hover:!bg-green-600 hover:text-white cursor-pointer rounded-md">
                            {/* <img width="42" src="/images/31.jpg" alt="31" /> */}
                            <h3 className="text-center">31</h3>
                        </div>
                    </div>
                </div>
                <div id="drawside" className="relative" suppressHydrationWarning>
                    <h2 className="text-2xl text-center mb-3">Winning Prizes</h2>
                    <h3 className="text-md mb-2">Match all 8</h3>
                    <div className="flex items-center justify-between">
                        <div className="grid grid-cols-8 gap-1">
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                        </div>
                        <div className="bg-gray-800 rounded-full py-1 px-3 text-sm text-center text-white">First Prize</div>
                    </div>
                    <h3 className="text-md mt-4 mb-2">Match any 7</h3>
                    <div className="flex items-center justify-between">
                        <div className="grid grid-cols-8 gap-1">
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="border-2 border-green-600 w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] rounded-full"></div>
                        </div>
                        <div className="bg-gray-800 rounded-full py-1 px-3 text-sm text-center text-white">Second Prize</div>
                    </div>
                    <h3 className="text-md mt-4 mb-3">Match any 6</h3>
                    <div className="flex items-center justify-between">
                        <div className="grid grid-cols-8 gap-1">
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
                            <div className="bg-green-600 rounded-full w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"></div>
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