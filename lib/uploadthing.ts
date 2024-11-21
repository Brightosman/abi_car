import { createUploadthing } from "uploadthing/next";

const uploadthing = createUploadthing();

export const carImageUpload = uploadthing({
  file: { maxSize: "4MB", accepted: ["image/*"] },
});
