import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder, CreatedOrderDocument } from '@/lib/services/order.service';
import {getCustomerDetails} from '@/lib/services/user.service'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
apiVersion:"2025-09-30.clover"
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, items ,customerName, customerEmail } = body;
    console.log(userId, "user id")

    if (!userId || !items?.length) {
      return NextResponse.json(
        { error: "Missing userId or items" },
        { status: 400 }
      );
    }

    
    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
const customer = await getCustomerDetails(userId);

    const order:CreatedOrderDocument= await createOrder({userId, 
        items, 
        totalAmount, 
        customerName: customer?.customerName ?? "" ,   
        customerEmail: customer?.customerEmail ?? ""});
        if(!order){
          return NextResponse.json({error:"Order creation failed."},{status:500})
        }

    const orderIdString = order._id.toString() 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkoutpage/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkoutpage/cancel`,
      metadata: {
        orderId: orderIdString,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
