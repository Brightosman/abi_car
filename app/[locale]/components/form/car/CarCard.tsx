import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

interface IMake{
    id: number
    title: string
    logoUrl: string
}
interface ICar {
    id: number;
    imageUrl : string[];
    make : IMake
    model : string | null
    model_variant : string | null

    price: number | null

    // make: IMake
}

export default function CarCard({id, imageUrl, make, model, model_variant, price}:ICar) {
    const displayPrice = price ? price.toFixed(2) : 'N/A';
  return (
    <div>
        <Carousel className='w-full mx-auto'>
          <CarouselContent>
            {imageUrl.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[230px]">
                <Image alt='Product Image' src={item} fill className='object-cover w-full h-full rounded-lg' />
              </div>
            </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>

        <div  className='flex justify-between items-center mt-2'>
            <div>{model} {model_variant}</div>
            <h3 className='inline-flex items-center rounded-md bg-primary/10 px-2 py1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10 '>
            €{displayPrice}
          </h3>
            
        </div>
        
        <div>
            <div>{make.title}</div>
            <Image src={make.logoUrl} alt={make.title} width={30} height={30} />
        </div>

        <Button asChild className="w-full mt-5 bg-accent ">
          <Link
            href={`/car/${id}`}
            className="mt-4 inline-block bg-accent  text-white px-4 py-2 rounded"
            >
            View Details
            </Link>
        </Button>

        {/* <div>
            {make && make.length > 0 ? (
                make.map(make => (
                    <div>
                        <Image src={make.imageUrl} alt={make.title} width={30} height={30} />
                        <p className="text-lg">{make.title}</p>
                    </div>
                ))
            ): (
                <div> No Make Available </div>
            )}
        </div> */}
    </div>
  )
}


// import Image from 'next/image';
// import Link from 'next/link';

// interface CarProps {
//   id: number;
//   make: string;
//   model: string;
//   model_variant: string;
//   imageUrl: string;
// }

// export default function CarCard({ id, make, model, model_variant, imageUrl }: CarProps) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
//       <div className="relative w-full h-48">
//         <Image
//           src={imageUrl || '/default-car.png'}
//           alt={`${make} ${model}`}
//           layout="fill"
//           objectFit="cover"
//           className="rounded-t-lg"
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-bold">
//           {make} {model}
//         </h3>
//         <p className="text-sm text-gray-500">{model_variant}</p>
//         <Link
//           href={`/cars/${id}`}
//           className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// }
