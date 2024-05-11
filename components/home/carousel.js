import { useEffect } from "react";

export default function Carousel() {
    useEffect(() => {
        setTimeout(() => {
            document.querySelector(".carousel-control-next").click();
        }, 5000);
    }, []);
    return (
        <div id="carouselExampleIndicators" className="bg-white mx-auto w-full carousel carousel-dark slide" data-bs-ride="true">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="/images/carousel/1.png" className="d-block m-auto" style={{ height: "500px" }} alt="plant1" />
                    <div className="carousel-caption bg-black/50">
                        <p className="text-white">Help us plant trees for a better ecosystem</p>
                        {/* <button className="bg-green-600 hover:bg-green-800 text-white font-bold mt-2 py-2 px-4 rounded">Donate Now</button> */}
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="/images/carousel/2.png" className="d-block m-auto" style={{ height: "500px" }} alt="plant2" />
                    <div className="carousel-caption bg-black/50">
                        <p className="text-white">Save the planet by planting trees</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="/images/carousel/3.png" className="d-block m-auto" style={{ height: "500px" }} alt="prize1" />
                    <div className="carousel-caption bg-black/50">
                        <p className="text-white">First prize</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="/images/carousel/4.png" className="d-block m-auto" style={{ height: "500px" }} alt="prize2" />
                    <div className="carousel-caption bg-black/50">
                        <p className="text-white">Second prize</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="/images/carousel/5.png" className="d-block m-auto" style={{ height: "500px" }} alt="prize3" />
                    <div className="carousel-caption bg-black/50">
                        <p className="text-white">Third prize</p>
                    </div>
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
    )
}