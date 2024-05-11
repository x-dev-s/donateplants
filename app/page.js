'use client'
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Carousel from "@/components/home/carousel";

export default function Home() {
  const auth = useAuth();
  return (
    <main className="container relative grid bg-gradient-to-bl">
      <Carousel />

      <section id="mainHeading" className="mx-auto">
        <h1 className="text-5xl font-bold text-center text-black">Welcome to the world of <span className="text-green-500">Plants</span></h1>
        <p className="text-center text-gray-500">We are a non-profit organization that plants trees for a better ecosystem</p>
        <div className="flex justify-center mt-4">
          <Link href="/draws" className="donateBtn bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Donate Now</Link>
        </div>
      </section>

      <div id="blurBackground" className="bg-black/50 backdrop-blur fixed top-0 left-0 w-full h-full z-20 hidden"></div>

      <section id="about" className="mx-auto w-full mt-16">
        <h1 className="text-5xl font-bold text-center text-black mb-4">About Us</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div id="whoWeAre" className="relative cursor-pointer bg-gray-100 rounded-md p-3" onMouseEnter={() => { document.querySelector("#whoWeAre p").style.height = "auto"; document.querySelector("#whoWeAre p").style.padding = "24px" }} onMouseLeave={() => { document.querySelector("#whoWeAre p").style.height = "0"; document.querySelector("#whoWeAre p").style.padding = "0px" }}>
            <img className="mix-blend-darken m-auto" src="/images/about.png" style={{ height: "200px" }} alt="about" />
            <h2 className="text-3xl font-bold text-center text-black">Who We Are?</h2>
            <p id="whoWeAre" className="text-white text-center overflow-hidden grid items-center rounded-md absolute h-0 max-h-full bottom-0 left-0 bg-black/80 transition-all">We are a non-profit organization that plants trees for a better ecosystem. Our mission is to help restore the ecosystem by planting trees in deforested areas. We also educate the community on the importance of trees and how to care for them.</p>
          </div>
          <div id="whatWeOffer" className="relative cursor-pointer bg-gray-100 rounded-md p-3" onMouseEnter={() => { document.querySelector("#whatWeOffer p").style.height = "auto"; document.querySelector("#whatWeOffer p").style.padding = "24px" }} onMouseLeave={() => { document.querySelector("#whatWeOffer p").style.height = "0"; document.querySelector("#whatWeOffer p").style.padding = "0px" }}>
            <img className="mix-blend-darken m-auto" src="/images/services.svg" style={{ height: "200px" }} alt="services" />
            <h2 className="text-3xl font-bold text-center text-black">What We Offer?</h2>
            <p id="whatWeOffer" className="text-white text-center overflow-hidden grid items-center rounded-md absolute h-0 max-h-full bottom-0 left-0 bg-black/80 transition-all">We provide tree planting services to individuals, businesses, and organizations. Our services include planting trees in deforested areas, educating the community on the importance of trees, and providing care instructions for trees.</p>
          </div>
          <div id="contactUs" className="col-span-1 sm:col-span-2 lg:col-span-1 relative cursor-pointer bg-gray-100 rounded-md p-3" onMouseEnter={() => { document.querySelector("#contactUs p").style.height = "auto"; document.querySelector("#contactUs p").style.padding = "24px" }} onMouseLeave={() => { document.querySelector("#contactUs p").style.height = "0"; document.querySelector("#contactUs p").style.padding = "0px" }}>
            <img className="mix-blend-darken m-auto" src="/images/contact.png" style={{ height: "200px" }} alt="contact" />
            <h2 className="text-3xl font-bold text-center text-black">Contact Us</h2>
            <p id="contactUs" className="text-white text-center overflow-hidden grid items-center rounded-md absolute h-0 max-h-full w-full bottom-0 left-0 bg-black/80 transition-all">For more information on our services, please contact us at 123-456-7890 or email us at
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

      <section id="prizes" className="mx-auto my-16">
        <h1 className="text-5xl font-bold text-center text-black mb-4">Prizes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100 rounded-md p-3">
            <img className="m-auto" src="/images/prize1.png" style={{ height: "200px" }} alt="prize1" />
            <h2 className="text-3xl font-bold text-center text-black">Prize 1</h2>
            <p className="text-black text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec velit nec nulla ultrices lacinia.</p>
          </div>
          <div className="bg-gray-100 rounded-md p-3">
            <img className="m-auto" src="/images/prize2.png" style={{ height: "200px" }} alt="prize2" />
            <h2 className="text-3xl font-bold text-center text-black">Prize 2</h2>
            <p className="text-black text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec velit nec nulla ultrices lacinia.</p>
          </div>
          <div className="bg-gray-100 rounded-md p-3">
            <img className="m-auto" src="/images/prize3.png" style={{ height: "200px" }} alt="prize3" />
            <h2 className="text-3xl font-bold text-center text-black">Prize 3</h2>
            <p className="text-black text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec velit nec nulla ultrices lacinia.</p>
          </div>
        </div>
      </section>      
    </main >
  );
}
