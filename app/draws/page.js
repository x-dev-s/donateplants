export default function DrawsPage() {
    return (
        <div className="container mx-auto max-w-7xl sm:px-16">
            <div className="relative grid grid-cols-1 my-12">
                <div className="blurBackground absolute top-0 left-0 backdrop-blur grid items-center w-full h-full z-20"><div><h2 className="text-2xl text-center mb-3 m-auto">Buy Now to Unlock the Draws</h2> <button className="buyBtn animate-pulse bg-green-600 hover:bg-green-800 p-2 w-fit h-fit rounded-md text-white mx-auto flex items-center">Buy Now</button></div></div>
                <div className="rounded-lg overflow-hidden mx-auto pb-4">
                    <div className="bg-green-600 pt-4 px-4">
                        <h2 className="text-2xl text-white text-center">Pick Any 8 Numbers</h2>
                        <div id="selectedNumbers" className="grid grid-cols-4 sm:grid-cols-8 gap-4 w-fit py-6 mx-auto">
                            {/* selected numbers will be displayed here */}
                            <div className="selectedNumber p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                            <div className="selectedNumber p-1 text-center bg-white w-[30px] h-[30px] rounded-md"></div>
                        </div>
                    </div>
                    <div style={{ borderRadius: "0px 0px 10px 10px" }} className="grid grid-col-3 bg-gray-100 px-4 py-4 sm:grid-cols-4 md:grid-cols-6 gap-4 mx-auto">
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
            </div>
        </div>

    )
}