"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// --- Cloudinary Upload Helper ---
async function uploadToCloudinary(files: File[]) {
  const urls: string[] = []

  for (const file of files) {
    console.log("🔹 Uploading file:", file.name)
    const formData = new FormData()
    formData.append("file", file)
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
    console.log("✅ Uploaded to Cloudinary:", data.secure_url)
    urls.push(data.secure_url)
  }

  return urls
}

export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    compareAtPrice: "",
    category: "",
    stock: "",
    images: [] as string[],
    specifications: {
      maxSpeed: "",
      range: "",
      weight: "",
      maxLoad: "",
      batteryCapacity: "",
      chargingTime: "",
      motor: "",
      brakes: "",
    },
    isActive: true,
    isFeatured: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log("🚀 Submitting new product:", formData)

    try {
      // Step 1: Upload images
      console.log("📦 Files to upload:", imageFiles)
      const uploadedUrls = await uploadToCloudinary(imageFiles)
      console.log("📤 Uploaded image URLs:", uploadedUrls)

      // Step 2: POST to API
      const payload = {
        ...formData,
        images: uploadedUrls,
        price: Number.parseFloat(formData.price),
        compareAtPrice: formData.compareAtPrice ? Number.parseFloat(formData.compareAtPrice) : undefined,
        stock: Number.parseInt(formData.stock),
      }

      console.log("🌐 Sending payload to /api/products:", payload)

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const responseData = await response.json()
      console.log("📨 API response:", response.status, responseData)

      if (!response.ok) {
        console.error("❌ API call failed", responseData)
        throw new Error("Failed to create product")
      }

      toast.success("Product created successfully")
      router.push("/admin/products")
    } catch (error) {
      console.error("🔥 Error during product creation:", error)
      toast.error("Failed to create product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-muted-foreground">Create a new product in your inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Essential product details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g., Urban Commuter Pro"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="urban-commuter-pro"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your product..."
                    rows={5}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Upload up to 5 images. First image will be the primary.</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={formData.images}
                  onChange={(images) => setFormData({ ...formData, images })}
                  maxImages={5}
                  setFiles={setImageFiles} // Track original File[] for Cloudinary
                />
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
                <CardDescription>Technical details about the product</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div className="space-y-2" key={key}>
                    <Label htmlFor={key}>{key}</Label>
                    <Input
                      id={key}
                      value={value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: { ...formData.specifications, [key]: e.target.value },
                        })
                      }
                      placeholder={`e.g., ${value}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice">Compare at Price</Label>
                  <Input
                    id="compareAtPrice"
                    type="number"
                    step="0.01"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">Show original price for discounts</p>
                </div>
              </CardContent>
            </Card>

            {/* Organization */}
            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commuter">Commuter</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="off-road">Off-Road</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Active</Label>
                    <p className="text-sm text-muted-foreground">Make product visible to customers</p>
                  </div>
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Featured</Label>
                    <p className="text-sm text-muted-foreground">Show on homepage</p>
                  </div>
                  <Switch
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Creating..." : "Create Product"}
              </Button>
              <Link href="/admin/products">
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
