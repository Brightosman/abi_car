"use server"

import {z} from"zod"
import {prisma} from "./lib/db"
// import { type CategoryTypes } from "@prisma/client"
import { redirect } from "next/navigation"

export type State = {
    status: "error" | "success" | undefined;
    errors?:{
        [key: string]: string[];
    }
    message?: string | null
}

const listingSchema = z.object({
    name: z 
        .string()
        .min(3, {message: "The name has to be a min character length of 5"}),
    category: z.string().min(1, { message: "Category is required"}),
    price: z.number().min(1,{ message: "The Price has to be bigger than 1"}),
    smallDescription: z
        .string()
        .min(10, { message: "Please summarize your product more"}),
    description: z.string().min(10, { message: "Description is required"}),
    images: z.array(z.string(), { message: "Images are required"}),
    productFile: z
        .string()
        .min(1, { message: "Please upload a zip file of your Product"}),
})

