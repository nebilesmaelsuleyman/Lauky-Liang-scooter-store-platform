import { NextResponse } from 'next/server';
import { getOrderByID } from '@/lib/services/order.service';


export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  if (!orderId) {
    return NextResponse.json({ message: 'Missing orderId' }, { status: 400 });
  }

  try {
    
    const order = await getOrderByID(orderId);

    if (!order) {
      return NextResponse.json({ message: `Order with ID ${orderId} not found` }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });

  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}