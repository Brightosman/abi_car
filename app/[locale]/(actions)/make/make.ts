"use server"
import {z} from "zod"
import {prisma} from "../../lib/db"
import { revalidatePath } from "next/cache";

export type State ={
    status : "error" | "success" | undefined;
    errors?:{
        [key: string]: string[];
    }
    message?: string | null
}

const makeSchema = z.object({
    title: z
        .string()
        .min(2, {message: "The title has to be a min character length of 2"}),
    logoUrl: z.string()
})

export async function AddMake(prevState: any, formData: FormData){
    console.log(formData)
    

    const validateFields = makeSchema.safeParse({
        title: formData.get('title'),
        logoUrl: formData.get('logoUrl'),
        
    })

    

    if(!validateFields.success){
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, I think there is a mistake with your inputs.",
        }
        return state;
    }

    await prisma.make.create({
        data: {
            title: validateFields.data.title,
            logoUrl: validateFields.data.logoUrl,
        }
    })

    const state: State = {
        status: "success",
        message: "Your Make has been created!",
    }

    revalidatePath("/")

    return state;
}

export async function GetMake(){
    const make = await prisma.make.findMany({
        select: {
            id: true,
            title: true,
            logoUrl: true,
            cars: true,
        },
        // take:4,
        orderBy: {
            title: "asc"
        }
    })

    return make;
}
