import { NextResponse,NextRequest } from 'next/server';
import { getOrderByID, deleteOrderById } from '@/lib/services/order.service';


export async function GET(
  request: NextResponse,
  context: { params: Promise<{ orderId: string }> }
) {
  const {orderId } = await context.params; // 👈 await params since it’s a Promise

  if (!orderId) {
    return NextResponse.json({ message: 'order id  is required' }, { status: 400 });
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




export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const result = await deleteOrderById(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 }
    );
  }
}
