"use client"
import React, { FormEvent, Fragment, useEffect, useState } from 'react'
import { useFormState } from 'react-dom';
import { AddMake, State } from '../../(actions)/make';

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {SubmitButton} from "../SubmitButtons";

import { UploadDropzone } from "../../lib/uploadthing"

import { toast } from 'react-toastify';

export default function AddMakeForm() {

    const initalState : State= {message: "", status: undefined}
    const [state, formAction] = useFormState(AddMake, initalState)
    const [logoUrl, setLogoUrl] = useState<null | string>(null);

     useEffect(() =>{
        if(state.status === "success"){
        toast.success(state.message);
        } else if (state.status === "error"){
        toast.error(state.message);
        }
    }, [state])

  return (
    <div className="bg-BG p-32px my-rounded-20 relative w-full h-full">
        <h2 className="section-title sm:mb-3 mb-2">Add Make</h2>

        <form
        action={formAction}
        >
            <CardHeader>
                <CardTitle>Sell Your Products With Ease </CardTitle>
                <CardDescription>Please describe your products here in details so that it can be sold</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-y-10">

                <div className="flex flex-col gap-y-2">
                <Label>Title</Label>
                <Input name="title" type="text" placeholder="Title of the Make" required minLength={2} />
                {state?.errors?.["title"]?.[0] && (
                    <p className="text-red-500">{state?.errors?.["title"]?.[0]}</p>
                )}
                </div>

                

                <div className="flex flex-col gap-y-2">
                {/* <input type="hidden" name="logoUrl" value={JSON.stringify(logoUrl)} /> */}
                <label htmlFor="logoUrl" className="my-text-16 sm:mb-2 mb-1.5 inline-block">
                    Logo
                </label>
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) =>{ setLogoUrl(res[0].url); toast.success("Your images have been uploaded")}} 
                    onUploadError={(error: Error) => { toast.error("Something went wrong, try again")}} 
                />
                <input type="hidden" name="logoUrl" value={logoUrl ?? ""} />
                {state?.errors?.["logoUrl"]?.[0] && (
                    <p className="text-destructive">{state?.errors?.["logoUrl"]?.[0]}</p>
                )}
                </div>

            </CardContent>

            <CardFooter className="mt-5">
                <SubmitButton title="Create Your Car Make" />
            </CardFooter>

        </form>
    </div>
  )
}
