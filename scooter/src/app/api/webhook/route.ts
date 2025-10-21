import {NextResponse} from 'next/server';
import Stripe from 'stripe'
import { markOrderAsPaid, markOrderAsFailed } from "@/lib/services/order.service";


export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion:"2025-09-30.clover"
});
export const config = {
  api: {
    bodyParser: false,
  },
}
export const runtime= 'nodejs'

export async function POST(req:Request){
    const body = await req.text();
    const sig= req.headers.get('stripe-signature')

    const endpointSecret=process.env.STRIPE_WEBHOOK_SECRET!
    let event:Stripe.Event;

    try{
        event=stripe.webhooks.constructEvent(body,sig!,endpointSecret)

    }catch(error:any){
        
        return new NextResponse(`webhook Error:${error.message}`,{status:400})
    }

    switch(event.type){
        case "checkout.session.completed":{
            const session= event.data.object as Stripe.Checkout.Session;
           
            await markOrderAsPaid(session.metadata?.orderId || session.id);
            break;
        }
        case "payment_intent.payment_failed":{
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            
            await markOrderAsFailed(paymentIntent.metadata?.orderId || paymentIntent.id);
             break;
        
        }
        default:
            console.log(`unhandled event type :${event.type}`)
    }
    return NextResponse.json({received:true})
}



