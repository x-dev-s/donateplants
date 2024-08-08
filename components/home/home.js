'use client'
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import Carousel from "./carousel";

export default function Home() {
    const auth = useAuth();
    useEffect(() => {
        let interval = setInterval(() => {
            if (document.getElementById('pageloading').classList.contains('hidden')) {
                document.getElementById('mainJumbotronImg').classList.add('animate-[slideRightFadeIn_1s_ease]');
                document.getElementById('mainJumbotronText').classList.add('animate-[slideLeftFadeIn_1s_ease]');
                document.getElementById('mainJumbotronMobile').classList.add('animate-[fadeIn_1s_ease]');
                document.getElementById('mainJumbotronMobileText').classList.add('animate-[slideDown_1s_ease]');
                clearInterval(interval);
            }
        }, 400);

        let tiles = document.querySelectorAll('.tile');
        document.addEventListener('scroll', () => {
            tiles.forEach(tile => {
                if (tile.getBoundingClientRect().top < window.innerHeight) {
                    tile.classList.add('animate-[slideUpFadeIn_1s_ease]');
                }
            });
            if (document.getElementById('mainVideo') && document.getElementById('mainVideo').getBoundingClientRect().top < window.innerHeight) {
                document.getElementById('mainVideo').classList.add('animate-[fadeIn_2s_ease]');
            }
            if (document.getElementById('carouselExampleIndicators') && document.getElementById('carouselExampleIndicators').getBoundingClientRect().top < window.innerHeight) {
                document.getElementById('carouselExampleIndicators').classList.add('animate-[zoomIn_1s_ease]');
            }
        });

    }, [])
    return (
        <main className="container relative grid bg-gradient-to-bl">
            <div id="mainJumbotron" className="gap-4 justify-center items-center hidden lg:flex">
                <div id="mainJumbotronImg" className="bg-opacity-50 p-4 rounded-md mt-4 bg-[url('/images/carousel/1.png')] bg-no-repeat h-[600px] flex-initial w-[45%]">
                </div>
                <div id="mainJumbotronText" className="flex-initial w-[55%]">
                    <h1 className="text-5xl font-bold text-center text-black">Welcome to the world of <span className="text-green-500">Plants</span></h1>
                    <p className="text-center text-gray-500">Help us plant trees for a better ecosystem and win a prize<br />درخت لگانا صدقہ جاریہ ہے<br /><b>!</b><b>ثواب بھی انعام بھی</b></p>
                    <div className="flex justify-center mt-4">
                        <Link href="/draws" className="donateBtn bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Donate Now</Link>
                    </div>
                </div>
            </div>

            <div id="mainJumbotronMobile" className="flex lg:hidden gap-4 justify-center items-center bg-[url('/images/carousel/1.png')] bg-no-repeat bg-center bg-opacity-5 h-[600px]">
                <div id="mainJumbotronMobileText">
                    <h1 className="text-5xl font-bold text-center text-black">Welcome to the world of <span className="text-green-500">Plants</span></h1>
                    <p className="text-center text-gray-500">Help us plant trees for a better ecosystem and win a prize<br />درخت لگانا صدقہ جاریہ ہے<br /><b>!</b><b>ثواب بھی انعام بھی</b></p>
                    <div className="flex justify-center mt-4">
                        <Link href="/draws" className="donateBtn bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Donate Now</Link>
                    </div>
                </div>
            </div>

            <div id="mainVideo" className="relative h-[400px] mb-4 hidden lg:block">
                <div id="videoSide" className="flex justify-center items-center z-10 bg-white w-[60%] h-full slanted2 absolute top-0 right-[45%]">
                    <div id="mainHeading" className="mx-auto">
                        <h2 className="text-center text-black lg:px-[7%] text-2xl">We plants trees for a better ecosystem and promote organic farming and organic food</h2>
                        <div className="flex justify-center mt-4">
                            <Link href="/draws" className="donateBtn bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Donate Now</Link>
                        </div>
                    </div>
                </div>
                <div id="video" className="absolute top-0 right-0">
                    <div className="relative slanted2-revert">
                        <div className="bg-gray-100/25 absolute top-0 left-0 w-full h-full z-10"></div>
                        <video className="h-[400px]" autoPlay loop muted>
                            <source src="/videos/plants.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>

            </div>


            <div className="lg:hidden">
                <div id="mainVideo" className="relative">
                    <div className="bg-gray-100/25 absolute top-0 left-0 w-full h-full z-10"></div>
                    <video className="h-full" autoPlay loop muted>
                        <source src="/videos/plants.mp4" type="video/mp4" />
                    </video>
                </div>

                <div id="mainHeading" className="mx-auto mt-4">
                    <h2 className="text-center text-black lg:px-[7%] text-xl">We plants trees for a better ecosystem and promote organic farming and organic food</h2>
                    <div className="flex justify-center mt-4">
                        <Link href="/draws" className="donateBtn bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Donate Now</Link>
                    </div>
                </div>
            </div>

            <Carousel />


            <div id="blurBackground" className="bg-black/50 backdrop-blur fixed top-0 left-0 w-full h-full z-20 hidden"></div>

            <section id="about" className="mx-auto w-full mt-16 md:hidden">
                <h1 className="text-5xl font-bold text-center text-black pb-4">About Us</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div id="whoWeAre" className="relative cursor-pointer bg-gray-100 rounded-md p-3 tile" onMouseEnter={() => { document.querySelector("#whoWeAre p").style.height = "auto"; document.querySelector("#whoWeAre p").style.padding = "24px" }} onMouseLeave={() => { document.querySelector("#whoWeAre p").style.height = "0"; document.querySelector("#whoWeAre p").style.padding = "0px" }}>
                        <img className="mix-blend-darken m-auto" src="/images/about.png" style={{ height: "200px" }} alt="about" />
                        <h2 className="text-3xl font-bold text-center text-black">Who We Are?</h2>
                        <p id="whoWeAre" className="text-white text-center overflow-hidden grid items-center rounded-md absolute h-0 max-h-full bottom-0 left-0 bg-black/80 transition-all">We plant trees for a better ecosystem and promote organic farming and food. Our mission is to help restore the ecosystem by planting trees to curb the climate change and educate the humanity to consume organic food nd fruits.</p>
                    </div>
                    <div id="whatWeOffer" className="relative cursor-pointer bg-gray-100 rounded-md p-3 tile" onMouseEnter={() => { document.querySelector("#whatWeOffer p").style.height = "auto"; document.querySelector("#whatWeOffer p").style.padding = "24px" }} onMouseLeave={() => { document.querySelector("#whatWeOffer p").style.height = "0"; document.querySelector("#whatWeOffer p").style.padding = "0px" }}>
                        <img className="mix-blend-darken m-auto" src="/images/services.svg" style={{ height: "200px" }} alt="services" />
                        <h2 className="text-3xl font-bold text-center text-black">What We Offer?</h2>
                        <p id="whatWeOffer" className="text-white text-center overflow-hidden grid items-center rounded-md absolute h-0 max-h-full bottom-0 left-0 bg-black/80 transition-all">We help planting trees without consuming goverment funds via community support and encourage community to donate plant by wining  a prize.</p>
                    </div>
                    <div id="contactUs" className="col-span-1 sm:col-span-2 lg:col-span-1 relative cursor-pointer bg-gray-100 rounded-md p-3 tile" onMouseEnter={() => { document.querySelector("#contactUs p").style.height = "auto"; document.querySelector("#contactUs p").style.padding = "24px" }} onMouseLeave={() => { document.querySelector("#contactUs p").style.height = "0"; document.querySelector("#contactUs p").style.padding = "0px" }}>
                        <img className="mix-blend-darken m-auto" src="/images/contact.png" style={{ height: "200px" }} alt="contact" />
                        <h2 className="text-3xl font-bold text-center text-black">Contact Us</h2>
                        <p id="contactUs" className="text-white text-center overflow-hidden grid items-center rounded-md absolute h-0 max-h-full w-full bottom-0 left-0 bg-black/80 transition-all">For more information on our services, please contact us at 123-456-7890 or email us at
                            <a className="hover:underline" href="mailto:info@plants.com">info@plants.com</a>
                        </p>
                    </div>
                </div>
            </section>
            <section id="aboutDesktop" className="mx-auto w-full mt-16 hidden md:block">
                <h1 className="text-5xl font-bold text-center text-black pb-4">About Us</h1>
                <div id="whoWeAre" className="relative cursor-pointer rounded-md p-3 tile flex items-center gap-4">
                    <div className="bg-gray-100 w-1/2 lg:w-[500px] slanted">
                        <img className="mix-blend-darken" src="/images/about.png" style={{ height: "250px" }} alt="about" />
                    </div>
                    <div className="slanted-side">
                        <h2 className="text-3xl pb-4 font-bold text-center text-black">Who We Are?</h2>
                        <p id="whoWeAre" className="text-center transition-all">We plant trees for a better ecosystem and promote organic farming and food. Our mission is to help restore the ecosystem by planting trees to curb the climate change and educate the humanity to consume organic food nd fruits.</p>
                    </div>
                </div>
                <div id="whatWeOffer" className="relative cursor-pointer rounded-md p-3 tile flex items-center gap-4">
                    <div className="slanted-side">
                        <h2 className="text-3xl pb-4 font-bold text-center text-black">What We Offer?</h2>
                        <p id="whatWeOffer" className="text-center transition-all">We help planting trees without consuming goverment funds via community support and encourage community to donate plant by wining  a prize.</p>
                    </div>
                    <div className="bg-gray-100 w-1/2 lg:w-[500px] slanted-revert">
                        <img className="mix-blend-darken" src="/images/services.svg" style={{ height: "300px" }} alt="services" />
                    </div>
                </div>
                <div id="contactUs" className="relative cursor-pointer rounded-md p-3 tile flex items-center gap-4">
                    <div className="bg-gray-100 w-1/2 lg:w-[500px] slanted">
                        <img className="mix-blend-darken" src="/images/contact.png" style={{ height: "250px" }} alt="contact" />
                    </div>
                    <div className="slanted-side">
                        <h2 className="text-3xl pb-4 font-bold text-center text-black">Contact Us</h2>
                        <p id="contactUs" className="text-center transition-all">For more information on our services, please contact us at 123-456-7890 or email us at
                            <a className="hover:underline" href="mailto:info@plants.com">info@plants.com</a>
                        </p>
                    </div>
                </div>
            </section>
            {/* <div id="donateForm" className="hidden bg-gray-100 mx-auto z-30 overflow-scroll w-full h-full md:w-1/2 lg:w-1/3 lg:left-1/3 md:h-full fixed top-0 left-0 md:top-1/4 md:left-1/4 sm:px-16 p-3 rounded-md">
        <button className="absolute top-2 right-2" onClick={() => { document.getElementById("donateForm").classList.add("hidden"); document.getElementById('blurBackground').classList.add('hidden'); }}><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg></button>
        <h2 className="text-3xl font-bold text-center text-black">Donate Now</h2>
        <form className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="name">Name</label>
            <input className="w-full p-2 border border-gray-300 rounded-md" type="text" id="name" name="name" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input className="w-full p-2 border border-gray-300 rounded-md" type="email" id="email" name="email" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="phone">Phone</label>
            <input className="w-full p-2 border border-gray-300 rounded-md" type="tel" id="phone" name="phone" />
          </div>
          <div id="paymentMethod">
          </div>
        </form>
      </div > */}

            <section id="prizes" className="mx-auto my-16 w-full md:hidden">
                <h1 className="text-5xl font-bold text-center text-black pb-4">Prizes</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gray-100 rounded-md p-3 tile">
                        <img className="m-auto" src="/images/prize1.png" style={{ height: "200px" }} alt="prize1" />
                        <h2 className="text-2xl font-bold text-center text-black">First Prize</h2>
                        <p className="text-center text-gray-500">PKR 200,000</p>
                    </div>
                    <div className="bg-gray-100 rounded-md p-3 tile">
                        <img className="m-auto" src="/images/prize2.png" style={{ height: "200px" }} alt="prize2" />
                        <h2 className="text-2xl font-bold text-center text-black">Second Prize</h2>
                        <p className="text-center text-gray-500">PKR 150,000</p>
                    </div>
                    <div className="bg-gray-100 rounded-md p-3 tile sm:col-span-2">
                        <img className="m-auto" src="/images/prize3.png" style={{ height: "200px" }} alt="prize3" />
                        <h2 className="text-2xl font-bold text-center text-black">Third Prize</h2>
                        <p className="text-center text-gray-500">PKR 50,000</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 pt-4 gap-4">
                    <div className="bg-gray-100 rounded-md p-3 tile">
                        <img className="m-auto mix-blend-darken" src="/images/specialprize.png" style={{ height: "250px" }} alt="specialprize" />
                        <h2 className="text-2xl font-bold text-center text-black">Special Prize</h2>
                        <p className="text-center text-gray-500">100 prizes of PKR 1000 each</p>
                    </div>
                    <div className="bg-gray-100 rounded-md p-3 tile">
                        <img className="m-auto" src="/images/farmersprize.png" style={{ height: "250px" }} alt="farmersprize" />
                        <h2 className="text-2xl font-bold text-center text-black">Farmer&apos;s Prize</h2>
                        <p className="text-center text-gray-500">1000 plants in addition to the winning prize</p>
                    </div>
                </div>
            </section>

            <section id="prizesDesktop" className="mx-auto my-16 w-full hidden md:block">
                <h1 className="text-5xl font-bold text-center text-black pb-4">Prizes</h1>
                <div className="p-3 tile flex items-center gap-4">
                    <div className="bg-gray-100 w-1/2 lg:w-[500px] slanted">
                        <img className="m-auto" src="/images/prize1.png" style={{ height: "200px" }} alt="prize1" />
                    </div>
                    <div className="slanted-side">
                        <h2 className="text-2xl font-bold text-center text-black">First Prize</h2>
                        <p className="text-center text-gray-500">PKR 200,000</p>
                    </div>
                </div>
                <div className="p-3 tile flex items-center gap-4">
                    <div className="slanted-side">
                        <h2 className="text-2xl font-bold text-center text-black">Second Prize</h2>
                        <p className="text-center text-gray-500">PKR 150,000</p>
                    </div>
                    <div className="bg-gray-100 w-1/2 lg:w-[500px] slanted-revert">
                        <img className="m-auto" src="/images/prize2.png" style={{ height: "250px" }} alt="prize2" />
                    </div>
                </div>
                <div className="p-3 tile flex items-center gap-4">
                    <div className="bg-gray-100 w-1/2 lg:w-[500px] slanted">
                        <img className="m-auto" src="/images/prize3.png" style={{ height: "200px" }} alt="prize3" />
                    </div>
                    <div className="slanted-side">
                        <h2 className="text-2xl font-bold text-center text-black">Third Prize</h2>
                        <p className="text-center text-gray-500">PKR 50,000</p>
                    </div>
                </div>
                <div className="tile flex items-center gap-4">
                    <div className="slanted-side">
                        <h2 className="text-2xl font-bold text-center text-black">Special Prize</h2>
                        <p className="text-center text-gray-500">100 prizes of PKR 1000 each</p>
                    </div>
                    <div className="bg-gray-100 w-1/2 lg:w-[500px] slanted-revert">
                        <img className="m-auto mix-blend-darken" src="/images/specialprize.png" style={{ height: "250px" }} alt="specialprize" />
                    </div>
                </div>
                <div className="p-3 tile flex items-center gap-4">
                    <div className="bg-gray-100 w-1/2 lg:w-[500px] slanted">
                        <img className="m-auto" src="/images/farmersprize.png" style={{ height: "200px" }} alt="farmersprize" />
                    </div>
                    <div className="slanted-side">
                        <h2 className="text-2xl font-bold text-center text-black">Farmer&apos;s Prize</h2>
                        <p className="text-center text-gray-500">1000 plants in addition to the winning prize</p>
                    </div>
                </div>
            </section>

        </main >
    );
}
