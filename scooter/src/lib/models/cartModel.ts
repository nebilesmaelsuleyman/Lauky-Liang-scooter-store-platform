// /models/cart.model.ts
import mongoose, { Schema, Document, Types, model } from "mongoose"

export interface CartItem {
  productId: Types.ObjectId
  quantity: number
  price: number
}

export interface Cart extends Document {
  userId: Types.ObjectId
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
}

const CartSchema = new Schema<Cart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.models.Cart || model<Cart>("Cart", CartSchema)
