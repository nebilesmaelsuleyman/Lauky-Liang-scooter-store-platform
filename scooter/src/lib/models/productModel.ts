// lib/models/product.ts
import mongoose, { Schema, models, model } from 'mongoose';

export interface IProduct {
  _id?: string;
  name: string;
  slug: string; // for SEO-friendly URLs
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  status: 'published' | 'draft' | 'archived';
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
  },
  { timestamps: true }
);

const Product = models.Product || model<IProduct>('Product', productSchema);
export default Product;