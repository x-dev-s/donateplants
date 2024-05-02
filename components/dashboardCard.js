export default function DashboardCard({ image, name, value}) {
    return (
        <div className="bg-gray-100 overflow-hidden rounded-lg flex items-center justify-between h-[100px] p-2">
            <div>
                <img className="w-auto h-[90%]" src={image} alt={name} />
            </div>
            <div className="text-end">
                <h3 className="text-green-600 font-bold text-3xl">{value}</h3>
                <p className="text-gray-500 text-sm mt-2">{name}</p>
            </div>
        </div>
    )
}