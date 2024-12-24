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
import { Decimal } from 'decimal.js'; // Assuming you're using decimal.js

// Define the ICar interface with all required properties
interface ICar {
  id: number;
  model: string;
  model_variant: string;
  year: number;
  mileage: number;
  fuel: string;  // Adjust to your Fuel type
  transmission: string;  // Adjust to your Transmission type
  carShape: string;  // Adjust to your CarShapes type
  price: number | Decimal;
  make: { title: string; logoUrl: string | null };
  imageUrl: string[];  // Add imageUrl here as it's required by CarSlider
  // other fields...
}

export default function Cars() {
  const [cars, setCars] = useState<ICar[]>([]);  // State to store the fetched car data
  const [error, setError] = useState<string>('');  // State to store error messages

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const fetchedCars = await GetCars();

        // Convert Decimal to number for price and other Decimal fields if necessary
        const carsWithFormattedPrice = fetchedCars.map((car: ICar) => ({
          ...car,
          price: car.price instanceof Decimal ? car.price.toNumber() : car.price,
        }));

        setCars(carsWithFormattedPrice);  // Set the fetched and formatted cars to state
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('There was an issue loading the car data.');  // Set error state
      }
    };

    fetchCars();  // Call the function to fetch cars
  }, []);  // Empty dependency array means this effect runs only once after the component mounts

  return (
    <section className='h-screen flex items-center' id='cars'>
      <div className='container mx-auto'>
        <Brands />
        {error && <p className="text-red-500">{error}</p>}  {/* Display error message if any */}
        <CarSlider cars={cars} />  {/* Pass the fetched cars to the CarSlider component */}
      </div>
    </section>
  );
}
