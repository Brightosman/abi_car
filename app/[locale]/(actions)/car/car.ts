"use server";
import { z } from "zod";
import { prisma } from "../../lib/db";
import { type CarShapes, Transmission, Fuel  } from "@prisma/client"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"

// import type { NextApiRequest, NextApiResponse } from 'next'
// import { getAuth } from '@clerk/nextjs/server'

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

// Schema for car validateFields
const carSchema = z.object({
  make: z.string().min(1, { message: "Make is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  model_variant: z.string().min(1, { message: "Model variant is required" }),
  year: z.number().min(1886, { message: "Year must be a valid year" }),
  mileage: z.number().min(0, { message: "Mileage must be a positive number" }),
  fuel: z.enum(["Petrol", "Diesel", "Electric", "Hybrid"], { message: "Invalid fuel type" }),
  transmission: z.enum(["Manual", "Semi_automatic", "Automatic"], { message: "Invalid transmission type" }),
  carShape: z.enum([
    "Station_Wagon",
    "Limousine",
    "Small_Car",
    "Coupe",
    "Convertible",
    "SUV",
    "Minibus",
    "Van",
    "Pick_UP",
  ], { message: "Invalid car shape" }),
  wheelDrive: z.enum(["front_WD", "back_WD", "All_WD"], { message: "Invalid wheel drive type" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  smallDescription: z.string().min(1, { message: "Small description is required" }),
  // description: z.string({}).optional(),
  // navSystem: z.boolean(),
  // seatHeating: z.boolean(),
  // cruiseControl: z.boolean(),
  // multiFunSteeringWheel: z.boolean(),
  // rainSensor: z.boolean(),
  // parkingAssistant: z.boolean(),
  // eCall: z.boolean(),
  // lightSensor: z.boolean(),
  // startStop: z.boolean(),
  // bluetooth: z.boolean(),
  // handsFree: z.boolean(),
  // trafficSignRec: z.boolean(),
  // esp: z.boolean(),
  // abs: z.boolean(),
  // ac: z.boolean(),
  // airbag: z.boolean(),
  imageUrl: z.array(z.string().url({ message: "Invalid URL in imageUrl" })),
  // userId: z.string().optional(),
});


// Create Car Action
export async function createCar(prevState: any, formData : FormData) {
  // const { userId }: { userId: string | null } = await auth()
  
  console.log("formData from action", formData);

  

  const validateFields = carSchema.safeParse({
    make: formData.get('make') as string,
    model: formData.get('model'),
    model_variant: formData.get('model_variant'),
    year : parseFloat(formData.get('year') as string),
    mileage: parseFloat(formData.get('mileage')as string),

    fuel: formData.get('fuel'),
    transmission: formData.get('transmission'),
    carShape: formData.get('carShape'),
    wheelDrive: formData.get('wheelDrive'),

    price: parseFloat(formData.get('price') as string),
    smallDescription: formData.get('smallDescription'),
    // description: formData.get('description') as string,

    // navSystem: formData.get('navSystem') === 'off',
    // seatHeating: formData.get('seatHeating') === 'off',
    // cruiseControl: formData.get('cruiseControl') === 'off', 
    // multiFunSteeringWheel: formData.get('multiFunSteeringWheel') === 'off', 
    // rainSensor: formData.get('rainSensor') === 'off', 
    // parkingAssistant: formData.get('parkingAssistant') === 'off', 
    // eCall: formData.get('eCall') === 'off', 
    // lightSensor: formData.get('lightSensor') === 'off', 
    // startStop: formData.get('startStop') === 'off', 
    // bluetooth: formData.get('bluetooth') === 'off', 
    // handsFree: formData.get('handsFree') === 'off', 
    // trafficSignRec: formData.get('trafficSignRec') === 'off', 
    // esp: formData.get('esp') === 'off', 
    // abs: formData.get('abs') === 'off', 
    // ac: formData.get('ac') === 'off', 
    // airbag: formData.get('airbag') === 'off', 

    imageUrl: JSON.parse(formData.get('imageUrl') as string),
    // userId: formData.get('userId') || null,

  });


  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.formErrors.fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    }
    return state;
  }



    await prisma.car.create({ 
      data: {
        makeId: parseInt(validateFields.data.make),
        model: validateFields.data.model,
        model_variant: validateFields.data.model_variant,
        year: validateFields.data.year,
        mileage: validateFields.data.mileage,

        fuel: validateFields.data.fuel,
        transmission: validateFields.data.transmission,
        carShape: validateFields.data.carShape,
        wheelDrive: validateFields.data.wheelDrive,

        price: validateFields.data.price,
        smallDescription: validateFields.data.smallDescription,
        // description: validateFields.data.description
        // ? JSON.parse(validateFields.data.description)
        // : undefined,

        // navSystem: validateFields.data.navSystem,
        // seatHeating: validateFields.data.seatHeating,
        // cruiseControl: validateFields.data.cruiseControl,
        // multiFunSteeringWheel: validateFields.data.multiFunSteeringWheel,
        // rainSensor: validateFields.data.rainSensor,
        // parkingAssistant: validateFields.data.parkingAssistant,
        // eCall: validateFields.data.eCall,
        // lightSensor: validateFields.data.lightSensor,
        // startStop: validateFields.data.startStop,
        // bluetooth: validateFields.data.bluetooth,
        // handsFree: validateFields.data.handsFree,
        // trafficSignRec: validateFields.data.trafficSignRec,
        // esp: validateFields.data.esp,
        // abs: validateFields.data.abs,
        // ac: validateFields.data.ac,
        // airbag: validateFields.data.airbag,

        imageUrl: validateFields.data.imageUrl,
        // userId: validateFields.data.userId || null,
      } 
    });

    const state: State = {
      status: "success",
      message: "Car created successfully",
    };


    // revalidatePath("/cars"); // Revalidate the cars listing page

    

    return state;

  
}


// export const createCar = async (formData: FormData): Promise<State> => {
//   try {
//     const rawCarData = Object.fromEntries(formData.entries());

//     // Convert boolean string values ("true"/"false") to actual booleans
//     const carData = {
//       ...rawCarData,
//       navSystem: rawCarData.navSystem === "true",
//       seatHeating: rawCarData.seatHeating === "true",
//       cruiseControl: rawCarData.cruiseControl === "true",
//       multiFunSteeringWheel: rawCarData.multiFunSteeringWheel === "true",
//       rainSensor: rawCarData.rainSensor === "true",
//       parkingAssistant: rawCarData.parkingAssistant === "true",
//       eCall: rawCarData.eCall === "true",
//       lightSensor: rawCarData.lightSensor === "true",
//       startStop: rawCarData.startStop === "true",
//       bluetooth: rawCarData.bluetooth === "true",
//       handsFree: rawCarData.handsFree === "true",
//       trafficSignRec: rawCarData.trafficSignRec === "true",
//       esp: rawCarData.esp === "true",
//       abs: rawCarData.abs === "true",
//       ac: rawCarData.ac === "true",
//       airbag: rawCarData.airbag === "true",
//     };

//     // Validate data
//     const parsedData = carSchema.parse(carData);

//     // Save to database
//     await prisma.car.create({ data: parsedData });

//     return { status: "success", message: "Car created successfully!" };
//   } catch (error: any) {
//     return {
//       status: "error",
//       errors: error.errors || {},
//       message: error.message || "An error occurred",
//     };
//   }
// };

// Update Car Action
export async function updateCar(
  id: number,
  data: Partial<z.infer<typeof carSchema>>
): Promise<State> {
  const validateFields = carSchema.partial().safeParse(data);

  if (!validateFields.success) {
    return {
      status: "error",
      errors: validateFields.error.formErrors.fieldErrors,
    };
  }

  try {
    await prisma.car.update({
      where: { id },
      data: validateFields.data,
    });
    revalidatePath(`/cars/${id}`); // Revalidate the specific car page
    return {
      status: "success",
      message: "Car updated successfully",
    };
  } catch (error) {
    console.error("Error updating car:", error);
    return {
      status: "error",
      message: "Failed to update car",
    };
  }
}

// Delete Car Action
export async function deleteCar(id: number): Promise<State> {
  try {
    await prisma.car.delete({ where: { id } });
    revalidatePath("/cars"); // Revalidate the cars listing page
    return {
      status: "success",
      message: "Car deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting car:", error);
    return {
      status: "error",
      message: "Failed to delete car",
    };
  }
}

// Get Car By ID Action
export async function getCarById(id: number): Promise<State & { car?: any }> {
  try {
    const car = await prisma.car.findUnique({ where: { id } });
    if (!car) {
      return {
        status: "error",
        message: "Car not found",
      };
    }
    return {
      status: "success",
      car,
    };
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    return {
      status: "error",
      message: "Failed to fetch car",
    };
  }
}
