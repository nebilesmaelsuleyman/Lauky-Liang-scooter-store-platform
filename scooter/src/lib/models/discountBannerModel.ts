
import mongoose, { Schema, Document, model } from "mongoose"

export interface DiscountBanner extends Document {
  title: string
  description: string
  discountPercentage: number
  isActive: boolean
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
}

const DiscountBannerSchema = new Schema<DiscountBanner>(
  {
    title: { type: String, required: true },
    description: { type: String },
    discountPercentage: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.DiscountBanner || model<DiscountBanner>("DiscountBanner", DiscountBannerSchema)
