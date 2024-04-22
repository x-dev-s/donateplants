'use client'
import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";
// import { Dropdown } from "flowbite-react";

export default function Home() {
  return (
    <main className="container relative grid bg-gradient-to-bl">
      <div id="carouselExampleIndicators" className="bg-white mx-auto w-full max-w-7xl carousel carousel-dark slide" data-bs-ride="true">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/tree.png" className="d-block m-auto" style={{ height: "500px" }} alt="plant1" />
                <div className="carousel-caption bg-black/50">
                  <p className="text-white">Help us plant trees for a better ecosystem</p>
                  <button className="bg-green-600 hover:bg-green-800 text-white font-bold mt-2 py-2 px-4 rounded">Donate Now</button>
                </div>
              </div>
              <div className="carousel-item">
                <img src="/images/carousel2.png" className="d-block m-auto" style={{ height: "500px" }} alt="plant2" />
              </div>
              <div className="carousel-item">
                <img src="/images/prize1.png" className="d-block m-auto" style={{ height: "500px" }} alt="prize1" />
              </div>
              <div className="carousel-item">
                <img src="/images/prize2.png" className="d-block m-auto" style={{ height: "500px" }} alt="prize2" />
              </div>
              <div className="carousel-item">
                <img src="/images/prize3.png" className="d-block m-auto" style={{ height: "500px" }} alt="prize3" />
              </div>
            </div>
            <button className="carousel-control-prev absolute" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

      <section id="mainHeading" className="mx-auto my-16 max-w-7xl sm:px-16">
        <h1 className="text-5xl font-bold text-center text-black">Welcome to the world of <span className="text-green-500">Plants</span></h1>
        <p className="text-center text-gray-500">We are a non-profit organization that plants trees for a better ecosystem</p>
        <div className="flex justify-center mt-4">
          <button className="donateBtn bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Donate Now</button>
        </div>
      </section>

      <div id="blurBackground" className="bg-black/50 backdrop-blur fixed top-0 left-0 w-full h-full z-20 hidden"></div>

      <section id="about" className="mx-auto my-16 max-w-7xl sm:px-16">
        <h1 className="text-5xl font-bold text-center text-black mb-4">About Us</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div id="whoWeAre" className="relative cursor-pointer bg-gray-100 rounded-md p-3" onMouseEnter={() => { document.querySelector("#whoWeAre p").style.height = "85%"; document.querySelector("#whoWeAre p").style.padding = "24px" }} onMouseLeave={() => { document.querySelector("#whoWeAre p").style.height = "0"; document.querySelector("#whoWeAre p").style.padding = "0px" }}>
            <img className="mix-blend-darken m-auto" src="/images/about.png" style={{ height: "200px" }} alt="about" />
            <h2 className="text-3xl font-bold text-center text-black">Who We Are?</h2>
            <p id="whoWeAre" className="text-white text-center overflow-hidden grid items-center rounded-md absolute h-0 bottom-0 left-0 bg-black/80 transition-all">We are a non-profit organization that plants trees for a better ecosystem. Our mission is to help restore the ecosystem by planting trees in deforested areas. We also educate the community on the importance of trees and how to care for them.</p>
          </div>
          <div id="whatWeOffer" className="relative cursor-pointer bg-gray-100 rounded-md p-3" onMouseEnter={() => { document.querySelector("#whatWeOffer p").style.height = "85%"; document.querySelector("#whatWeOffer p").style.padding = "24px" }} onMouseLeave={() => { document.querySelector("#whatWeOffer p").style.height = "0"; document.querySelector("#whatWeOffer p").style.padding = "0px" }}>
            <img className="mix-blend-darken m-auto" src="/images/services.svg" style={{ height: "200px" }} alt="services" />
            <h2 className="text-3xl font-bold text-center text-black">What We Offer?</h2>
            <p id="whatWeOffer" className="text-white text-center overflow-hidden grid items-center rounded-md absolute h-0 bottom-0 left-0 bg-black/80 transition-all">We provide tree planting services to individuals, businesses, and organizations. Our services include planting trees in deforested areas, educating the community on the importance of trees, and providing care instructions for trees.</p>
          </div>
          <div id="contactUs" className="col-span-1 sm:col-span-2 lg:col-span-1 relative cursor-pointer bg-gray-100 rounded-md p-3" onMouseEnter={() => { document.querySelector("#contactUs p").style.height = "85%"; document.querySelector("#contactUs p").style.padding = "24px" }} onMouseLeave={() => { document.querySelector("#contactUs p").style.height = "0"; document.querySelector("#contactUs p").style.padding = "0px" }}>
            <img className="mix-blend-darken m-auto" src="/images/contact.png" style={{ height: "200px" }} alt="contact" />
            <h2 className="text-3xl font-bold text-center text-black">Contact Us</h2>
            <p id="contactUs" className="text-white text-center overflow-hidden grid items-center rounded-md absolute h-0 w-full bottom-0 left-0 bg-black/80 transition-all">For more information on our services, please contact us at 123-456-7890 or email us at
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

      <section id="prizes" className="mx-auto my-16 max-w-7xl sm:px-16">
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
