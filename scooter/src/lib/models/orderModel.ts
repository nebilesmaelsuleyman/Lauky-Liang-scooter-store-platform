import mongoose, { Schema, Document, Types, model } from "mongoose"

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",

}

export enum PaymentStatus {
  PAID = "paid",
  PENDING = "pending",
  FAILED = "failed",
  REFUNDED = "refunded",
}


export interface OrderItem {
  productId: Types.ObjectId
  quantity: number
  price: number
}


export interface Order extends Document {
  userId: Types.ObjectId
  orderNumber: string
  customerName: string
  customerEmail: string
  
  items: OrderItem[]
  status: OrderStatus
  paymentStatus: PaymentStatus 
  totalAmount: number
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderNumber: { type: String, required: true, unique: true }, // Added field
    customerName: { type: String, required: true }, // Added field
    customerEmail: { type: String, required: true }, // Added field
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING }, // Added field
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
)
export default mongoose.models.Order || model<Order>("Order", OrderSchema)
