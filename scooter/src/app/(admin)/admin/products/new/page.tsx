"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"
import { ArrowLeft, Save, Loader2 } from "lucide-react" // Added Loader2
import Link from "next/link"
import { toast } from "sonner"


interface Category {
  _id: string;
  name: string;
  slug: string;
}

async function uploadToCloudinary(files: File[]) {
  const urls: string[] = []

  for (const file of files) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: formData }
    )

    if (!res.ok) {
      console.error("Cloudinary upload failed for file:", file.name)
      throw new Error("Failed to upload image")
    }

    const data = await res.json()
    const optimizedUrl = data.secure_url.replace("/upload/", "/upload/f_auto,q_auto,w_1000/")
    urls.push(optimizedUrl)
  }
  return urls
}


export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  

  const [categories, setCategories] = useState<Category[]>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true) 

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
      display:"",
      braking:"",
      antiTheftSystem:"",
      tire:"",
      frame:"",
      shiftLevel:"",
      suspensionFork:"",
      ECU:"",
      MaxTorque:"",
    ClimbingAbility:"",
    TireTubeless:"",
    Controller:"",
    WaterProof:"",
    Odometer:"",
    Charger:"",
    EnergyRecovery:"",
    Wheelbase:"",
    },
    isActive: true,
    isFeatured: false,
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories.')
        }

        const data: Category[] = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Category Fetch Error:', error)
        toast.error('Could not load categories.')
      } finally {
        setIsCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])



  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
     
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

   
    if (!formData.category) {
        toast.error("Please select a category.")
        setIsSubmitting(false)
        return
    }

    let loadingToastId: string | number = toast.loading("Uploading images and submitting product...")

    try {
   
      const imageUrls = await uploadToCloudinary(imageFiles)

     
      const payload = { 
        ...formData, 
        images: imageUrls,
       
        price: parseFloat(formData.price),
        compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : undefined,
        stock: parseInt(formData.stock, 10),
      }

    
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("API call failed", result)
        throw new Error(result.message || "Failed to create product")
      }

      toast.success("Product created successfully!", { id: loadingToastId })
      router.push("/admin/products")
    } catch (error) {
      console.error("Error during product creation:", error)
      toast.error(`Creation failed: ${(error as Error).message}`, { id: loadingToastId })
    } finally {
      setIsSubmitting(false)
    }
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
                  setFiles={setImageFiles}
                />
              </CardContent>
            </Card>

          
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

       
          <div className="space-y-6">
            
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
                    disabled={isCategoriesLoading || categories.length === 0 || isSubmitting} 
                    required
                  >
                    <SelectTrigger>
                      <SelectValue 
                          placeholder={
                              isCategoriesLoading 
                              ? "Loading categories..." 
                              : categories.length === 0 
                              ? "No categories found" 
                              : "Select category"
                          } 
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {isCategoriesLoading && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </div>
                  )}
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

            {/* Status Card... (unchanged) */}
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
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Product
                  </>
                )}
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