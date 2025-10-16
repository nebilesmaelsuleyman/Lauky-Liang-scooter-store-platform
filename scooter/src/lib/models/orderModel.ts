// /models/order.model.ts
import mongoose, { Schema, Document, Types, model } from "mongoose"

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
 
}

export interface OrderItem {
  productId: Types.ObjectId
  quantity: number
  price: number
}

export interface Order extends Document {
  userId: Types.ObjectId
  items: OrderItem[]
  status: OrderStatus
  totalAmount: number
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.Order || model<Order>("Order", OrderSchema)
