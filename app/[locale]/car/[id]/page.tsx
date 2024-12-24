import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import React from 'react'
import { GetCar } from '../../(actions)/car/car'

export default async function page({params,}: {params:{id: number}}) {
    const car = await GetCar(params.id)
    return (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            <Carousel className='lg:row-end-1 lg:col-span-4'>
                <CarouselContent>
                    {car?.imageUrl.map((item, index) =>(
                        <CarouselItem key={index}>
                            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                                <Image src={item as string} alt="Product Image" fill className="object-cover w-full h-full rounded-lg" />
                            </div>
                        </CarouselItem>
                    ))}
                    <CarouselPrevious className="ml-16" />
                    <CarouselNext className="mr-16" />
                </CarouselContent>
            </Carousel>

            <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {car?.model}
                </h1>
            </div>
        </section>
    )
}