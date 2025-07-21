import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Order } from '@/models/Order';

export async function GET() {
  try {
    await connectToDatabase();
    
    const orders = await Order.find({}).sort({ _id: -1 });
    
    return NextResponse.json({
      success: true,
      orders,
      count: orders.length
    });
  } catch (error) {
    console.error('Error in orders API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { date, time, products, status, orderLink, email, name } = body;

    // Validate required fields
    if (!date || !time || !products || !status || !orderLink || !email || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newOrder = new Order({
      date,
      time,
      products,
      status,
      orderLink,
      email,
      name
    });

    const savedOrder = await newOrder.save();

    return NextResponse.json({
      success: true,
      order: savedOrder,
      message: 'Order created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}