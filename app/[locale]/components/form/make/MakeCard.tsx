import Image from "next/image";

interface ICar {
    id: number;
    model: string;
    imageUrl: string;
}

interface IMake {
    logoUrl: string | null;
    title: string;
    id: number;
    cars: ICar[] | null;
}

export default function MakeCard({ logoUrl, title, id, cars }: IMake) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full max-w-md">
            {/* Logo and Title */}
            <div className="flex items-center gap-4 mb-4">
                {logoUrl ? (
                    <Image
                        src={logoUrl}
                        alt={`${title} Logo`}
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-400">No Logo</span>
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="text-sm text-gray-500">Make ID: {id}</p>
                </div>
            </div>

            {/* Cars List */}
            <div className="border-t border-gray-300 pt-4">
                {cars && cars.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {cars.map((car) => (
                            <div
                                key={car.id}
                                className="flex flex-col items-center bg-gray-100 rounded-lg p-2"
                            >
                                <Image
                                    src={car.imageUrl}
                                    alt={`${car.model} Image`}
                                    width={60}
                                    height={60}
                                    className="rounded-md"
                                />
                                <p className="text-sm font-medium mt-2">{car.model}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">
                        No Cars Available for This Make
                    </p>
                )}
            </div>
        </div>
    );
}
