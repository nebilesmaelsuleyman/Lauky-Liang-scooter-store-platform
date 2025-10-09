import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImages(filePaths: string[]) {
  const urls: string[] = [];
  for (const path of filePaths) {
    const result = await cloudinary.uploader.upload(path, { folder: "products" });
    urls.push(result.secure_url);
  }
  return urls;
}
