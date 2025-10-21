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
export interface AdminOrderRow {
  _id: string;
  orderNumber: string;
  customer: string;
  email: string;
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
}