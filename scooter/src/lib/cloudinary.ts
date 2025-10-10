// src/lib/uploadToCloudinary.ts
export async function uploadToCloudinary(files: File[]): Promise<string[]> {
  const urls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // must match preset in Cloudinary dashboard
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("🌤️ Cloudinary upload result:", data);

    if (!res.ok || !data.secure_url) {
      throw new Error(`Cloudinary upload failed for ${file.name}: ${data.error?.message}`);
    }

    urls.push(data.secure_url);
  }

  return urls;
}
