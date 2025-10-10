import { Types } from "mongoose"

export interface ProductLean {
  _id: Types.ObjectId | string
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
    maxLoad?: string
    batteryCapacity?: string
    chargingTime?: string
    motor?: string
  }
  stock: number
  isActive: boolean
  isFeatured: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
  createdBy: Types.ObjectId | string
}
