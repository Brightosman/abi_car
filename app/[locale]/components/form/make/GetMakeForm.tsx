import React from 'react';
import { prisma } from '../../../lib/db';
import Link from 'next/link';
import { GetMake } from '@/app/[locale]/(actions)/make/make';
import MakeCard from './MakeCard';

export default async function GetMakeForm() {
  const data = await GetMake();
  console.log(data);
  
  return (
    <div>
      <section className="mt-12">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tighter">
            Make (Brand)
          </h2>
          <Link
            href="#"
            className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
          >
            All Products <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
          {data.map((make) => (
            <MakeCard
              id={make.id}
              logoUrl={make.logoUrl}
              title={make.title}
              key={make.id}
              // Add additional props like `cars` if `MakeCard` requires them
              //  cars={make.cars.map((car) => car.model)}
              cars={make.cars ?? []}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
