// /models/category.model.ts
import mongoose, { Schema, Document, model } from "mongoose"

export interface Category extends Document {
  name: string
  slug: string
  description: string
  image: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true } 
)

export default mongoose.models.Category || model<Category>("Category", CategorySchema)
