"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { GetMake } from "@/app/[locale]/(actions)/make/make";
import { createCar, State } from "../../../(actions)/car/car";

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
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(createCar, initialState);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [makes, setMakes] = useState<Make[]>([]);

  // Load makes (brands) from the database
  useEffect(() => {
    const loadMakes = async () => {
      try {
        const makes = await GetMake();
        setMakes(makes);
      } catch (error) {
        toast.error("Failed to load car makes.");
      }
    };
    loadMakes();
  }, []);

  // Display form submission status
  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message || "Car created successfully!");
    } else if (state.status === "error") {
      toast.error(state.message || "Something went wrong.");
    }
  }, [state]);

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Create Car Listing</h2>

      <form action={formAction}>
        <CardHeader>
          <CardTitle>List Your Car</CardTitle>
          <CardDescription>
            Provide details about your car so that potential buyers can find it.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-6">
          {/* Make */}
          <div>
            <Label htmlFor="make">Car Make</Label>
            <select
              id="make"
              name="make"
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a car make</option>
              {makes.map((make) => (
                <option key={make.id} value={make.id}>
                  {make.title}
                </option>
              ))}
            </select>
            {state.errors?.make && (
              <p className="text-red-500">{state.errors.make[0]}</p>
            )}
          </div>

          {/* Model */}
          <div>
            <Label htmlFor="model">Car Model</Label>
            <Input
              id="model"
              name="model"
              type="text"
              placeholder="Enter the car model"
              required
              minLength={2}
            />
            {state.errors?.model && (
              <p className="text-red-500">{state.errors.model[0]}</p>
            )}
          </div>

          {/* Model Variant */}
          <div>
            <Label htmlFor="model_variant">Model Variant</Label>
            <Input
              id="model_variant"
              name="model_variant"
              type="text"
              placeholder="Enter the model variant"
            />
          </div>

          {/* Year */}
          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              placeholder="Enter the year of manufacture"
              required
              min={1886}
            />
            {state.errors?.year && (
              <p className="text-red-500">{state.errors.year[0]}</p>
            )}
          </div>

          {/* Mileage */}
          <div>
            <Label htmlFor="mileage">Mileage (km)</Label>
            <Input
              id="mileage"
              name="mileage"
              type="number"
              placeholder="Enter the mileage"
              min={0}
            />
          </div>

          {/* Fuel Type */}
          <div>
            <Label htmlFor="fuel">Fuel Type</Label>
            <select
              id="fuel"
              name="fuel"
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select fuel type</option>
              {["Petrol", "Diesel", "Electric", "Hybrid"].map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>
          </div>

          {/* Transmission */}
          <div>
            <Label htmlFor="transmission">Transmission</Label>
            <select
              id="transmission"
              name="transmission"
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select transmission</option>
              {["Manual", "Semi_automatic", "Automatic"].map((transmission) => (
                <option key={transmission} value={transmission}>
                  {transmission}
                </option>
              ))}
            </select>
          </div>

          {/* Car Shape */}
          <div>
            <Label htmlFor="carShape">Car Shape</Label>
            <select
              id="carShape"
              name="carShape"
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select car shape</option>
              {[
                "Station_Wagon",
                "Limousine",
                "Small_Car",
                "Coupe",
                "Convertible",
                "SUV",
                "Minibus",
                "Van",
                "Pick_UP",
              ].map((shape) => (
                <option key={shape} value={shape}>
                  {shape.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter the price of the car"
              required
              min={0}
            />
          </div>

          {/* Features */}
          <div>
            <Label>Car Features</Label>
            {[
              "navSystem",
              "seatHeating",
              "cruiseControl",
              "multiFunSteeringWheel",
              "rainSensor",
              "parkingAssistant",
              "eCall",
              "lightSensor",
              "startStop",
              "bluetooth",
              "handsFree",
              "trafficSignRec",
              "esp",
              "abs",
              "ac",
              "airbag",
            ].map((feature) => (
              <div key={feature}>
                <input
                  type="checkbox"
                  id={feature}
                  name={feature}
                  value="true"
                />
                <Label htmlFor={feature} className="ml-2 capitalize">
                  {feature.replace(/([A-Z])/g, " $1")}
                </Label>
              </div>
            ))}
          </div>

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
            <input
              type="hidden"
              name="imageUrl"
              value={JSON.stringify(imageUrls)}
            />
          </div>
        </CardContent>

        <CardFooter>
          <SubmitButton title="Create Car Listing" />
        </CardFooter>
      </form>
    </div>
  );
}
