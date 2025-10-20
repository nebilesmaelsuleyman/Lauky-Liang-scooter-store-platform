// import {NextResponse} from 'next/server';
// import Stripe from 'stripe'
// import { markOrderAsPaid, markOrderAsFailed } from "@/lib/services/order.service";


// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion:"2025-09-30.clover"
// });

// export const runtime= 'nodejs'

// export async function POST(req:Request){
//     const body = await req.text();
//     const sig= req.headers.get('stripe-signature')

//     const endpointSecret=process.env.STRIPE_WEBHOOK_SECRET!
//     let event:Stripe.Event;

//     try{
//         event=stripe.webhooks.constructEvent(body,sig!,endpointSecret)

//     }catch(error:any){
//         console.error('webhook signature verification failed:',error.message)
//         return new NextResponse(`webhook Error:${error.message}`,{status:400})
//     }

//     switch(event.type){
//         case "checkout.session.completed":{
//             const session= event.data.object as Stripe.Checkout.Session;
//             console.log('payment successful',session.id);
//             await markOrderAsPaid(session.metadata?.orderId || session.id);
//             break;
//         }
//         case "payment_intent.payment_failed":{
//             const paymentIntent = event.data.object as Stripe.PaymentIntent;
//             console.log('payment failed',paymentIntent.id)
//             await markOrderAsFailed(paymentIntent.metadata?.orderId || paymentIntent.id);
//              break;
        
//         }
//         default:
//             console.log(`unhandled event type :${event.type}`)
//     }
//     return NextResponse.json({received:true})
// }




////// paypall webhook
import { NextResponse } from "next/server";
import { markOrderAsPaid, markOrderAsFailed } from "@/lib/services/order.service";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventType = body.event_type;

    switch (eventType) {
      case "CHECKOUT.ORDER.APPROVED": {
        const orderId = body.resource?.id;
        const referenceId = body.resource?.purchase_units?.[0]?.reference_id;
        console.log("Payment successful:", orderId);
        await markOrderAsPaid(referenceId || orderId);
        break;
      }
      case "PAYMENT.CAPTURE.DENIED":
      case "PAYMENT.CAPTURE.FAILED": {
        const orderId = body.resource?.id;
        const referenceId = body.resource?.purchase_units?.[0]?.reference_id;
        console.log("Payment failed:", orderId);
        await markOrderAsFailed(referenceId || orderId);
        break;
      }
      default:
        console.log("Unhandled PayPal event:", eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
