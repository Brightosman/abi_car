import React from 'react'
import { GetCars } from '@/app/[locale]/(actions)/car/car'
import Link from 'next/link';
import CarCard from './CarCard';

export default async function GetCarsForm() {
    const data = await GetCars()
    console.log(data);
  return (
    <section className="mt-12">
        <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tighter">
                Newest  Cars
            </h2>
           
        </div>

         <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt4 gap-10'>
            {data.length > 0 ? (
                data.map((car) => (
                <CarCard
                    imageUrl={car.imageUrl}
                    key={car.id}
                    id={car.id}
                    make={car.make}
                    model={car.model}
                    model_variant={car.model_variant}
                    price={car.price}
                />
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500">
                    No cars available at the moment.
                </p>
            )
            }
         </div>
    </section>
  )
}
