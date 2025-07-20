import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Customer } from '@/models/Customer';

export async function GET() {
  try {
    await connectToDatabase();
    
    const customers = await Customer.find({})
      .sort({ joinDate: -1 })
      .limit(100);

    return NextResponse.json({
      success: true,
      customers: customers
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await connectToDatabase();

    // Create sample customers if none exist
    const existingCustomers = await Customer.find({});
    
    if (existingCustomers.length === 0) {
      const sampleCustomers = [
        {
          name: "John Doe",
          email: "john@example.com",
          phone: "+1 (555) 123-4567",
          orders: 12,
          totalSpent: 1543.98,
          lastOrder: "2024-01-15",
          status: "active",
          location: "New York, NY",
          joinDate: "2023-06-15",
        },
        {
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1 (555) 234-5678",
          orders: 8,
          totalSpent: 892.45,
          lastOrder: "2024-01-14",
          status: "active",
          location: "Los Angeles, CA",
          joinDate: "2023-08-22",
        },
        {
          name: "Mike Johnson",
          email: "mike@example.com",
          phone: "+1 (555) 345-6789",
          orders: 15,
          totalSpent: 2156.32,
          lastOrder: "2024-01-13",
          status: "vip",
          location: "Chicago, IL",
          joinDate: "2023-04-10",
        },
        {
          name: "Sarah Wilson",
          email: "sarah@example.com",
          phone: "+1 (555) 456-7890",
          orders: 3,
          totalSpent: 245.67,
          lastOrder: "2024-01-12",
          status: "active",
          location: "Houston, TX",
          joinDate: "2023-11-08",
        },
        {
          name: "David Brown",
          email: "david@example.com",
          phone: "+1 (555) 567-8901",
          orders: 25,
          totalSpent: 3421.89,
          lastOrder: "2024-01-11",
          status: "vip",
          location: "Phoenix, AZ",
          joinDate: "2023-02-20",
        },
        {
          name: "Lisa Garcia",
          email: "lisa@example.com",
          phone: "+1 (555) 678-9012",
          orders: 1,
          totalSpent: 89.99,
          lastOrder: "2024-01-10",
          status: "active",
          location: "Philadelphia, PA",
          joinDate: "2024-01-05",
        },
        {
          name: "Robert Taylor",
          email: "robert@example.com",
          phone: "+1 (555) 789-0123",
          orders: 0,
          totalSpent: 0,
          lastOrder: "",
          status: "inactive",
          location: "San Antonio, TX",
          joinDate: "2023-12-15",
        },
        {
          name: "Amanda Lee",
          email: "amanda@example.com",
          phone: "+1 (555) 890-1234",
          orders: 18,
          totalSpent: 2987.43,
          lastOrder: "2024-01-09",
          status: "vip",
          location: "San Diego, CA",
          joinDate: "2023-03-12",
        },
        {
          name: "Christopher Martinez",
          email: "chris@example.com",
          phone: "+1 (555) 901-2345",
          orders: 6,
          totalSpent: 567.21,
          lastOrder: "2024-01-08",
          status: "active",
          location: "Dallas, TX",
          joinDate: "2023-09-30",
        },
        {
          name: "Jennifer Anderson",
          email: "jennifer@example.com",
          phone: "+1 (555) 012-3456",
          orders: 9,
          totalSpent: 1234.56,
          lastOrder: "2024-01-07",
          status: "active",
          location: "San Jose, CA",
          joinDate: "2023-07-18",
        }
      ];

      await Customer.insertMany(sampleCustomers);
      console.log('Created sample customers');

      return NextResponse.json({
        success: true,
        message: 'Sample customers created',
        count: sampleCustomers.length
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Customers already exist',
      count: existingCustomers.length
    });
  } catch (error) {
    console.error('Error creating sample customers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create sample customers' },
      { status: 500 }
    );
  }
}