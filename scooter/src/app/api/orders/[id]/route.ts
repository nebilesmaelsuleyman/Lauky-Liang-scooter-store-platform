import { NextResponse, NextRequest } from 'next/server';
import { getOrderByID, deleteOrderById } from '@/lib/services/order.service';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ match folder name
) {
  const { id } = await context.params; // ✅ match folder param

  if (!id) {
    return NextResponse.json({ message: 'Order ID is required' }, { status: 400 });
  }

  try {
    const order = await getOrderByID(id);

    if (!order) {
      return NextResponse.json({ message: `Order with ID ${id} not found` }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const result = await deleteOrderById(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error deleting order ${id}:`, error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 }
    );
  }
}
