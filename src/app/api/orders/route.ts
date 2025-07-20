import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Order } from '@/models/Order';

export async function GET() {
  try {
    await connectToDatabase();
    
    const orders = await Order.find({})
      .sort({ date: -1, time: -1 })
      .limit(50);

    return NextResponse.json({
      success: true,
      orders: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await connectToDatabase();

    // Create sample orders if none exist
    const existingOrders = await Order.find({});
    
    if (existingOrders.length === 0) {
      const sampleOrders = [
        {
          date: "2024-01-20",
          time: "14:30",
          products: [
            { name: "Laptop Pro 15\"", quantity: 1 },
            { name: "Wireless Mouse", quantity: 2 }
          ],
          status: "pending",
          orderLink: "ORD-2024-001",
          email: "john.doe@example.com",
          name: "John Doe"
        },
        {
          date: "2024-01-19",
          time: "09:15",
          products: [
            { name: "Smartphone X", quantity: 1 },
            { name: "Phone Case", quantity: 1 },
            { name: "Screen Protector", quantity: 2 }
          ],
          status: "fulfilled",
          orderLink: "ORD-2024-002",
          email: "jane.smith@example.com",
          name: "Jane Smith"
        },
        {
          date: "2024-01-18",
          time: "16:45",
          products: [
            { name: "Gaming Headset", quantity: 1 }
          ],
          status: "processing",
          orderLink: "ORD-2024-003",
          email: "mike.wilson@example.com",
          name: "Mike Wilson"
        },
        {
          date: "2024-01-17",
          time: "11:20",
          products: [
            { name: "4K Monitor", quantity: 1 },
            { name: "HDMI Cable", quantity: 1 }
          ],
          status: "fulfilled",
          orderLink: "ORD-2024-004",
          email: "sarah.johnson@example.com",
          name: "Sarah Johnson"
        },
        {
          date: "2024-01-16",
          time: "13:00",
          products: [
            { name: "Mechanical Keyboard", quantity: 1 },
            { name: "Keycap Set", quantity: 1 }
          ],
          status: "cancelled",
          orderLink: "ORD-2024-005",
          email: "david.brown@example.com",
          name: "David Brown"
        }
      ];

      await Order.insertMany(sampleOrders);
      console.log('Created sample orders');

      return NextResponse.json({
        success: true,
        message: 'Sample orders created',
        count: sampleOrders.length
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Orders already exist',
      count: existingOrders.length
    });
  } catch (error) {
    console.error('Error creating sample orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create sample orders' },
      { status: 500 }
    );
  }
}