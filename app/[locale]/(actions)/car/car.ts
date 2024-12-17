"use server";
import { z } from "zod";
import { prisma } from "../../lib/db";
import { revalidatePath } from "next/cache";

import { useUser } from '@clerk/nextjs'

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

// Schema for car validateFields
const carSchema = z.object({
  makeId: z.number().optional(),
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
  price: z.number().min(0, { message: "Price must be a positive number" }),
  smallDescription: z.string().min(1, { message: "Small description is required" }),
  description: z.string({}).optional(),
  navSystem: z.boolean(),
  seatHeating: z.boolean(),
  cruiseControl: z.boolean(),
  multiFunSteeringWheel: z.boolean(),
  rainSensor: z.boolean(),
  parkingAssistant: z.boolean(),
  eCall: z.boolean(),
  lightSensor: z.boolean(),
  startStop: z.boolean(),
  bluetooth: z.boolean(),
  handsFree: z.boolean(),
  trafficSignRec: z.boolean(),
  esp: z.boolean(),
  abs: z.boolean(),
  ac: z.boolean(),
  airbag: z.boolean(),
  imageUrl: z.array(z.string().url({ message: "Invalid URL in imageUrl" })),
  userId: z.string().optional(),
});


// Create Car Action
export async function createCar(prevState: any, formData : FormData) {
  const {user} = useUser();
  
  console.log("formData", formData);

  

  const validateFields = carSchema.safeParse({
    make: formData.get('make') as string | null,
    model: formData.get('model'),
    model_variant: formData.get('model_variant'),
    year : parseFloat(formData.get('year') as string),
    mileage: parseFloat(formData.get('mileage')as string),

    fuel: formData.get('fuel'),
    transmission: formData.get('transmission'),
    carShape: formData.get('carShape'),

    price: parseFloat(formData.get('price') as string),
    smallDescription: formData.get('smallDescription'),
    description: formData.get('description') as string,

    navSystem: formData.get('navSystem') === 'off',
    seatHeating: formData.get('seatHeating') === 'off',
    cruiseControl: formData.get('cruiseControl') === 'off', 
    multiFunSteeringWheel: formData.get('multiFunSteeringWheel') === 'off', 
    rainSensor: formData.get('rainSensor') === 'off', 
    parkingAssistant: formData.get('parkingAssistant') === 'off', 
    eCall: formData.get('eCall') === 'off', 
    lightSensor: formData.get('lightSensor') === 'off', 
    startStop: formData.get('startStop') === 'off', 
    bluetooth: formData.get('bluetooth') === 'off', 
    handsFree: formData.get('handsFree') === 'off', 
    trafficSignRec: formData.get('trafficSignRec') === 'off', 
    esp: formData.get('esp') === 'off', 
    abs: formData.get('abs') === 'off', 
    ac: formData.get('ac') === 'off', 
    airbag: formData.get('airbag') === 'off', 

    imageUrl: JSON.parse(formData.get('imageUrl') as string),
    userId: auth.userId,

  });


  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.formErrors.fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    }
    return state;
  }

  try {
    console.log("Authenticated user ID:", userId);

    await prisma.car.create({ 
      data: {
        makeId: validateFields.data.makeId,
        model: validateFields.data.model,
        model_variant: validateFields.data.model_variant,
        year: validateFields.data.year,
        mileage: validateFields.data.mileage,

        fuel: validateFields.data.fuel,
        transmission: validateFields.data.transmission,
        carShape: validateFields.data.carShape,

        price: validateFields.data.price,
        smallDescription: validateFields.data.smallDescription,
        description: validateFields.data.description
        ? JSON.parse(validateFields.data.description)
        : undefined,

        navSystem: validateFields.data.navSystem,
        seatHeating: validateFields.data.seatHeating,
        cruiseControl: validateFields.data.cruiseControl,
        multiFunSteeringWheel: validateFields.data.multiFunSteeringWheel,
        rainSensor: validateFields.data.rainSensor,
        parkingAssistant: validateFields.data.parkingAssistant,
        eCall: validateFields.data.eCall,
        lightSensor: validateFields.data.lightSensor,
        startStop: validateFields.data.startStop,
        bluetooth: validateFields.data.bluetooth,
        handsFree: validateFields.data.handsFree,
        trafficSignRec: validateFields.data.trafficSignRec,
        esp: validateFields.data.esp,
        abs: validateFields.data.abs,
        ac: validateFields.data.ac,
        airbag: validateFields.data.airbag,

        imageUrl: validateFields.data.imageUrl,
        userId: validateFields.data.userId || null,
      } 
    });
    // revalidatePath("/cars"); // Revalidate the cars listing page

    const state: State = {
      status: "success",
      message: "Car created successfully",
    };

    return state;

  } catch (error) {
    console.error("Error creating car:", error);
    return {
      status: "error",
      message: "Failed to create car",
    };
  }
}


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
