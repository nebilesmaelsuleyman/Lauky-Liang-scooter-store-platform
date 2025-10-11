// src/app/admin/categories/create/CategoryFormClient.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/image-upload"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// --- Cloudinary Upload Helper (REUSED) ---
// NOTE: Ensure your NEXT_PUBLIC_CLOUDINARY_* environment variables are set.
async function uploadToCloudinary(files: File[]) {
  const urls: string[] = []

  // **Using the dedicated Next.js API route is generally better for security**,
  // but since your direct client-side call to Cloudinary works, we'll keep it.
  
  // ***If you want to use the secure API route from the previous answer, 
  // replace this function with a call to the /api/upload endpoint.***

  for (const file of files) {
    const formData = new FormData()
    formData.append("file", file)
    // Use the upload preset defined in your Cloudinary settings
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!) 

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: formData }
    )

    if (!res.ok) {
      console.error("❌ Cloudinary upload failed for file:", file.name)
      throw new Error("Failed to upload image")
    }

    const data = await res.json()
    urls.push(data.secure_url)
  }

  return urls
}


export default function NewCategoryPageClient() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  // State for the raw image file (Category only needs one)
  const [imageFile, setImageFile] = useState<File[]>([]) 

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    // Changed from images: [] to image: "" for a single category image URL
    image: "" as string, 
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic Validation Check
    if (!formData.name || !formData.description) {
        toast.error("Name and Description are required.")
        setIsSubmitting(false)
        return
    }

    try {
      let imageUrl = "";

      // Step 1: Upload image only if a file is selected
      if (imageFile.length > 0) {
        const imageUrls = await uploadToCloudinary(imageFile)
        imageUrl = imageUrls[0] // Categories only use the first image
      }

      // Step 2: Prepare payload and POST to API
      const payload = { 
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          // Use the uploaded URL or an empty string
          image: imageUrl, 
      }

      const response = await fetch("/api/categories", { // ⬅️ TARGET THE CATEGORIES API ROUTE
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("❌ API call failed", result)
        throw new Error(result.message || "Failed to create category")
      }

      toast.success("✅ Category created successfully")
      router.push("/admin/categories")
    } catch (error) {
      console.error("🔥 Error during category creation:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create category")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      // Automatic slug generation from name
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add New Category</h1>
          <p className="text-muted-foreground">Create a new product category</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content (Basic Information) */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Essential category details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g., Electric Scooters"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="electric-scooters"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Briefly describe the category..."
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category Image */}
            <Card>
              <CardHeader>
                <CardTitle>Category Image</CardTitle>
                <CardDescription>Upload the primary image for this category.</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  // ImageUpload expects an array, so we wrap the single URL
                  value={formData.image ? [formData.image] : []}
                  // Update the single URL state based on the array result
                  onChange={(images) => setFormData({ ...formData, image: images[0] || '' })}
                  maxImages={1} // Restrict to only one image
                  setFiles={setImageFile} // Track the original File for upload
                  disabled={isSubmitting}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar (Simplified) */}
          <div className="space-y-6">
            {/* Status Card (Removed Status Card for simplicity, as categories are usually active by default) */}

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Creating..." : "Create Category"}
              </Button>
              <Link href="/admin/categories">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}