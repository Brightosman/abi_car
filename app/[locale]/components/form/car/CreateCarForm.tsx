"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { GetMake } from "@/app/[locale]/(actions)/make/make";
import { createCar, State } from "../../../(actions)/car/car";
import { JSONContent } from '@tiptap/react';
import { TipTapEditor } from '../../Editor';

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../../SubmitButtons";
import { UploadDropzone } from "../../../lib/uploadthing";
import { toast } from "react-toastify";

type Make = {
  id: number;
  title: string;
};

export default function CreateCarForm() {
  const initialState: State = { message: "Done", status: undefined };
  const [state, formAction] = useFormState(createCar, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [makes, setMakes] = useState<Make[]>([]);

  

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message || "Car created successfully!");
    } else if (state.status === "error") {
      toast.error(state.message || "Something went wrong.");
    }
  }, [state]);

  useEffect(() => {
    const loadMakes = async () => {
      try {
        const response = await GetMake();
        setMakes(response);
      } catch (error) {
        toast.error("Failed to load car makes.");
      }
    };
    loadMakes();
  }, []);

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Create Car Listing</h2>

      <form action={formAction}>
        <CardHeader>
          <CardTitle>List Your Car</CardTitle>
          <CardDescription>
            Provide details about your car so potential buyers can find it.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-10">
          {/* Car Make */}
          <div>
            <Label htmlFor="make">Car Make</Label>
            <select
              id="make"
              name="make"
              required
              defaultValue=""
              className="w-full p-2 border rounded-md"
            >
              <option value="" disabled>
                Select a car make
              </option>
              {makes.map((make) => (
                <option key={make.id} value={make.id}>
                  {make.title}
                </option>
              ))}
            </select>
            {state.errors?.makeId && (
              <p className="text-red-500">{state.errors.makeId[0]}</p>
            )}
          </div>

          {/* Other fields */}
          {[
            { id: "model", name: "model", placeholder: "Enter the car model", label: "Car Model", type: "text", required: true },
            { id: "model_variant", name: "model_variant", placeholder: "Enter the model variant", label: "Model Variant", type: "text", required: true },
            { id: "year", name: "year", placeholder: "Enter the year of manufacture", label: "Year", type: "number", min: 1886, required: true },
            { id: "mileage", name: "mileage", placeholder: "Enter the mileage", label: "Mileage (km)", type: "number", min: 0 },
            { id: "price", name: "price", placeholder: "Enter the price of the car", label: "Price", type: "number", min: 0, required: true },
            { id: "smallDescription", name: "smallDescription", placeholder: "Enter a brief description", label: "Small Description", type: "text", required: true },
          ].map(({ id, name, placeholder, label, type, required, min }) => (
            <div key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                min={min}
              />
              {state.errors?.[name] && (
                <p className="text-red-500">{state.errors[name][0]}</p>
              )}
            </div>
          ))}

          {/* Dropdown fields */}
          {[
            { id: "fuel", name: "fuel", label: "Fuel Type", options: ["Petrol", "Diesel", "Electric", "Hybrid"], required: true },
            { id: "transmission", name: "transmission", label: "Transmission", options: ["Manual", "Semi_automatic", "Automatic"], required: true },
            { id: "carShape", name: "carShape", label: "Car Shape", options: ["Station_Wagon", "Limousine", "Small_Car", "Coupe", "Convertible", "SUV", "Minibus", "Van", "Pick_UP"], required: true },
            { id: "wheelDrive", name: "wheelDrive", label: "Wheel Drive", options: ["front_WD", "back_WD", "All_WD"], required: true},
          ].map(({ id, name, label, options, required }) => (
            <div key={id}>
              <Label htmlFor={id}>{label}</Label>
              <select
                id={id}
                name={name}
                required={required}
                defaultValue=""
                className="w-full p-2 border rounded-md"
              >
                <option value="" disabled>
                  Select {label.toLowerCase()}
                </option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option.replace("_", " ")}
                  </option>
                ))}
              </select>
              {state.errors?.[name] && (
                <p className="text-red-500">{state.errors[name][0]}</p>
              )}
            </div>
          ))}

          {/* Textarea */}
          {/* <div className="flex flex-col gap-y-2">
              <input type="hidden" name="description" value={JSON.stringify(json)} />
              <Label>Description</Label>
              <TipTapEditor json={json} setJson={setJson} />
              {state?.errors?.["description"]?.[0] && (
                <p className="text-destructive">{state?.errors?.["description"]?.[0]}</p>
              )}
          </div> */}

          {/* Features */}
          {/* <div>
            <Label>Car Features</Label>
            {[
              "navSystem", "seatHeating", "cruiseControl", "multiFunSteeringWheel",
              "rainSensor", "parkingAssistant", "eCall", "lightSensor", "startStop",
              "bluetooth", "handsFree", "trafficSignRec", "esp", "abs", "ac", "airbag"
            ].map((feature) => (
              <div key={feature} className="flex items-center">
                <input type="hidden" name={feature} value="false" />
                <input type="checkbox" id={feature} name={feature} value="true" />
                <Label htmlFor={feature} className="ml-2 capitalize">
                  {feature.replace(/([A-Z])/g, " $1")}
                </Label>
              </div>
            ))}
          </div> */}

          {/* Image Upload */}
          <div>
            <Label>Car Images</Label>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                const urls = res.map((file) => file.url);
                setImageUrls(urls);
                toast.success("Images uploaded successfully.");
              }}
              onUploadError={() => {
                 toast.error("Failed to upload images. Please try again.");
               }}
            />
            <input type="hidden" name="imageUrl" value={JSON.stringify(imageUrls)} />
          </div>
        </CardContent>

        <CardFooter>
          <SubmitButton title="Create Car Listing" />
        </CardFooter>
      </form>
    </div>
  );
}
