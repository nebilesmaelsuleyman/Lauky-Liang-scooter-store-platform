// import Stripe from "stripe";
// import { NextResponse } from "next/server";
// import { createOrder, CreatedOrderDocument } from '@/lib/services/order.service';
// import {getCustomerDetails} from '@/lib/services/user.service'
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
// apiVersion:"2025-09-30.clover"
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { userId, items ,customerName, customerEmail } = body;
//     console.log(userId, "user id")

//     if (!userId || !items?.length) {
//       return NextResponse.json(
//         { error: "Missing userId or items" },
//         { status: 400 }
//       );
//     }

    
//     const totalAmount = items.reduce(
//       (sum: number, item: any) => sum + item.price * item.quantity,
//       0
//     );
// const customer = await getCustomerDetails(userId);

//     const order:CreatedOrderDocument= await createOrder({userId, 
//         items, 
//         totalAmount, 
//         customerName: customer?.customerName ?? "" ,   
//         customerEmail: customer?.customerEmail ?? ""});
//         if(!order){
//           return NextResponse.json({error:"Order creation failed."},{status:500})
//         }

//     const orderIdString = order._id.toString() 
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: items.map((item: any) => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.name,
//             images: item.image ? [item.image] : [],
//           },
//           unit_amount: Math.round(item.price * 100),
//         },
//         quantity: item.quantity,
//       })),
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkoutpage/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkoutpage/cancel`,
//       metadata: {
//         orderId: orderIdString,
//       },
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error: any) {
//     console.error("Stripe checkout error:", error);
//     return NextResponse.json(
//       { error: error.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }



/////// Paypall integration 

import { NextResponse } from "next/server";
import { createOrder, CreatedOrderDocument } from "@/lib/services/order.service";
import { getCustomerDetails } from "@/lib/services/user.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, items } = body;

    if (!userId || !items?.length) {
      return NextResponse.json({ error: "Missing userId or items" }, { status: 400 });
    }

    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    const customer = await getCustomerDetails(userId);

    const order: CreatedOrderDocument = await createOrder({
      userId,
      items,
      totalAmount,
      customerName: customer?.customerName ?? "",
      customerEmail: customer?.customerEmail ?? "",
    });

    if (!order) {
      return NextResponse.json({ error: "Order creation failed." }, { status: 500 });
    }

    // STEP 1: Get PayPal access token
    const auth = await fetch(`${process.env.PAYPAL_MODE === "live"
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com"
    }/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: "grant_type=client_credentials",
    });

    const { access_token } = await auth.json();

    // STEP 2: Create PayPal order
    const paypalOrder = await fetch(
      `${process.env.PAYPAL_MODE === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com"
      }/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              reference_id: order._id.toString(),
              amount: {
                currency_code: "USD",
                value: totalAmount.toFixed(2),
              },
            },
          ],
          application_context: {
            brand_name: "Your Store Name",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkoutpage/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkoutpage/cancel`,
          },
        }),
      }
    );

    const orderData = await paypalOrder.json();

    return NextResponse.json({ url: orderData.links.find((l: any) => l.rel === "approve")?.href });
  } catch (error: any) {
    console.error("PayPal checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
