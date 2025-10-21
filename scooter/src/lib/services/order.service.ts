
import  connectDB from "@/lib/db/connectDB";
import Order, { OrderStatus, PaymentStatus, Order as OrderInterface } from '@/lib/models/orderModel';

import mongoose from 'mongoose';

export interface AdminOrderRow {
  _id: string;
  orderNumber: string;
  customer: string;
  email: string;
  date: string;
  status: OrderStatus;
  paymentStatus:PaymentStatus;
  total: number;
}

export async function markOrderAsPaid(sessionId: string) {
  await connectDB();

  const orderId = sessionId; 

  const order = await Order.findById(orderId);
  if (!order) {
    console.warn(` Order not found for session: ${sessionId}`);
    return;
  }

  order.paymentStatus = PaymentStatus.PAID;
  console.log(order, "order payment paid")
  await order.save()  
  

  console.log("order payed successfully",order)
  console.log(`Order ${order._id} marked as PAID`);
}


export async function markOrderAsFailed(sessionId: string) {
  await connectDB();

  const orderId = sessionId; 

  const order = await Order.findById(orderId);
  if (!order) {
    console.warn(` Order not found for session: ${sessionId}`);
    return;
  }

  order.paymentStatus= PaymentStatus.FAILED;
  await order.save();
  console.log('failded to pay the order ',order)
  console.log(` Order ${order._id} marked as FAILED`);
}


export type CreatedOrderDocument = OrderInterface &  { _id: mongoose.Types.ObjectId };
interface CreateOrderParams {
    userId: string;
    customerName: string; 
    customerEmail: string; 
    items: any[];
    totalAmount: number;
}


const generateOrderNumber = () => {
    const date = new Date();
    const prefix = date.getFullYear().toString().slice(-2) + 
                   (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(100000 + Math.random() * 900000);
    return `ORD-${prefix}-${random}`;
}

export async function createOrder({ 
    userId, 
    customerName, 
    customerEmail, 
    items, 
    totalAmount 
}: CreateOrderParams): Promise<CreatedOrderDocument> {
    
   
    await connectDB();
    

    const formattedItems = items.map(item => ({
        
        productId: new mongoose.Types.ObjectId(item.productId), 
        quantity: item.quantity,
        price: item.price,
    }));

    const order = await Order.create({
        userId: new mongoose.Types.ObjectId(userId), 
        orderNumber: generateOrderNumber(),
        customerName: customerName,
        customerEmail: customerEmail,
        items: formattedItems,
        totalAmount: totalAmount,
        status: OrderStatus.PENDING, 
        paymentStatus: PaymentStatus.PENDING, 
    });
    
    console.log("Order created:", order);
    return order as CreatedOrderDocument;
}


export async function getOrderByID(id:string){

 await connectDB()
const order = await Order.findById(id)
if(!order){
    console.log('no order found')
}
return order

}

export async function getAdminOrders(searchQuery: string = ''): Promise<AdminOrderRow[]> {
  await connectDB();
  const filter = searchQuery 
    ? {
        $or: [
          { orderNumber: { $regex: searchQuery, $options: 'i' } },
          { customerName: { $regex: searchQuery, $options: 'i' } },
        ]
      }
    : {};

  try {
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 }) 
      .limit(50) 
      .select('orderNumber customerName customerEmail createdAt status paymentStatus totalAmount')
      .lean();
    return orders.map(order => ({
      _id: String(order._id ?? ""),
      orderNumber: order.orderNumber,
      customer: order.customerName,
      email: order.customerEmail,
      date: order.createdAt.toISOString(),
      status: order.status,
      paymentStatus: order.paymentStatus,
      total: order.totalAmount,
    }));
  } catch (error) {
    console.error("Database error fetching admin orders:", error);
    throw new Error("Failed to fetch orders from database.");
  }
}

export async function getUserOrders(userId: string): Promise<typeof Order[]> {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }

  const orders = await Order.find({ userId })
    .sort({ createdAt: -1 })
    .populate("items.productId", "name price") 
    .exec();
    console.log('get usersOrders ',orders)

  return orders;
}
