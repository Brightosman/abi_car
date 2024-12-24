// // components
// import Brands from './Brands';
// import CarSlider from './CarSlider';
// import { GetCars } from '@/app/[locale]/(actions)/car/car';

// export default async function Cars() {
//   const cars = await GetCars();  // Fetch cars from DB
//   console.log(cars);  // Debug to check if cars are fetched correctly

//   return (
//     <section className='h-screen flex items-center' id='cars'>
//       <div className='container mx-auto'>
//         <Brands />
//         <CarSlider cars={cars} />  {/* Pass the cars to CarSlider */}
//       </div>
//     </section>
//   );
// }

"use client"

import { useState, useEffect } from 'react';
import Brands from './Brands';
import CarSlider from './CarSlider';
import { GetCars } from '@/app/[locale]/(actions)/car/car';

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const fetchedCars = await GetCars();
        setCars(fetchedCars);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('There was an issue loading the car data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="h-screen flex items-center" id="cars">
      <div className="container mx-auto">
        <Brands />
        <CarSlider cars={cars} /> {/* Pass the cars to CarSlider */}
      </div>
    </section>
  );
}

