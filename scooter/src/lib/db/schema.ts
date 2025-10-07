export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Product Category Schema
export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Product Schema
export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number // Original price for discount calculation
  images: string[]
  category: string // Reference to Category._id
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
  createdBy: string // Reference to User._id
}

// Cart Schema
export interface Cart {
  _id: string
  userId: string // Reference to User._id
  items: {
    productId: string // Reference to Product._id
    quantity: number
    price: number // Price at time of adding to cart
  }[]
  createdAt: Date
  updatedAt: Date
}