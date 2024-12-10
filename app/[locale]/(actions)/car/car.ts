"use server";
import { z } from "zod";
import { prisma } from "../../lib/db";
import { revalidatePath } from "next/cache";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

// Schema for car validation
const carSchema = z.object({
  makeId: z.number().optional(),
  model: z.string().min(1, { message: "Model is required" }),
  model_variant: z.string().min(1, { message: "Model variant is required" }),
  year: z.number().min(1886, { message: "Year must be a valid year" }),
  mileage: z.number().min(0, { message: "Mileage must be a positive number" }),
  fuel: z.string().min(1, { message: "Fuel type is required" }),
  transmission: z.string().min(1, { message: "Transmission type is required" }),
  carShape: z.string().min(1, { message: "Car shape is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  smallDescription: z.string().min(1, { message: "Small description is required" }),
  description: z.object({}).optional(),
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
export async function createCar(data: z.infer<typeof carSchema>): Promise<State> {
  const validation = carSchema.safeParse(data);

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.formErrors.fieldErrors,
    };
  }

  try {
    await prisma.car.create({ data });
    revalidatePath("/cars"); // Revalidate the cars listing page
    return {
      status: "success",
      message: "Car created successfully",
    };
  } catch (error) {
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
  const validation = carSchema.partial().safeParse(data);

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.formErrors.fieldErrors,
    };
  }

  try {
    await prisma.car.update({
      where: { id },
      data: validation.data,
    });
    revalidatePath(`/cars/${id}`); // Revalidate the specific car page
    return {
      status: "success",
      message: "Car updated successfully",
    };
  } catch (error) {
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
    return {
      status: "error",
      message: "Failed to fetch car",
    };
  }
}
