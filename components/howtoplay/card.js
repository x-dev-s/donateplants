

export default function Card({ title, description, image }) {
    return (
        <div>
            <div className="bg-gray-100 rounded-lg w-full h-full relative">
                <div className="absolute left-1/2 -top-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-full h-36 w-36 flex items-center justify-center">
                    <img src={image} alt={title} />
                </div>
                <p className="pt-[30px] font-semibold text-gray-700">{title}</p>
                <p className="text-2xl text-green-600 font-semibold">{description}</p>
            </div>
        </div>
    )
}