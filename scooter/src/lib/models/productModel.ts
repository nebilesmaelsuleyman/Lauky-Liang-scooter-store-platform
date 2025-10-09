// /models/product.model.ts
import mongoose, { Schema, Document, model, Types } from "mongoose"

export interface Product extends Document {
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  specifications: {
    maxSpeed: string
    range: string
    weight: string
    maxLoad: string
    batteryCapacity: string
    chargingTime: string
    motor: string
  }
  stock: number
  sku: string
  isActive: boolean
  isFeatured: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
  createdBy: Types.ObjectId
}

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    images: [{ type: String }],
    category:{type:String, required:true},
    specifications: {
      maxSpeed: String,
      range: String,
      weight: String,
      maxLoad: String,
      batteryCapacity: String,
      chargingTime: String,
      motor: String,
    },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
)

export default mongoose.models.Product || model<Product>("Product", ProductSchema)
