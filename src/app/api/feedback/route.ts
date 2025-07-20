import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Feedback from '@/models/Feedback';

export async function GET() {
  try {
    await connectToDatabase();
    
    const feedback = await Feedback.find({})
      .sort({ created_at: -1 })
      .limit(50);

    return NextResponse.json({
      success: true,
      feedback: feedback
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Check if we're creating sample data
    if (body.createSampleData) {
      const sampleFeedback = [
        {
          customer_name: "Sarah Johnson",
          customer_email: "sarah.johnson@example.com",
          product_name: "Wireless Headphones",
          order_id: "ORD-2024-001",
          rating: 5,
          comment: "Excellent service! Fast delivery and great product quality.",
          status: "resolved",
          helpful_votes: 12,
          category: "product"
        },
        {
          customer_name: "Mike Chen",
          customer_email: "mike.chen@example.com",
          product_name: "Smart Watch",
          order_id: "ORD-2024-002",
          rating: 4,
          comment: "Good product but shipping took longer than expected.",
          status: "pending",
          helpful_votes: 8,
          category: "shipping"
        },
        {
          customer_name: "Emily Davis",
          customer_email: "emily.davis@example.com",
          product_name: "Bluetooth Speaker",
          order_id: "ORD-2024-003",
          rating: 5,
          comment: "Amazing quality and customer support was very helpful!",
          status: "resolved",
          helpful_votes: 15,
          category: "service"
        },
        {
          customer_name: "John Smith",
          customer_email: "john.smith@example.com",
          product_name: "Laptop Stand",
          order_id: "ORD-2024-004",
          rating: 3,
          comment: "Product is okay but could be better for the price.",
          status: "in_review",
          helpful_votes: 5,
          category: "product"
        },
        {
          customer_name: "Lisa Wilson",
          customer_email: "lisa.wilson@example.com",
          product_name: "USB-C Cable",
          order_id: "ORD-2024-005",
          rating: 5,
          comment: "Perfect! Exactly what I was looking for.",
          status: "resolved",
          helpful_votes: 9,
          category: "product"
        }
      ];

      // Clear existing feedback first
      await Feedback.deleteMany({});
      
      // Insert sample feedback
      const createdFeedback = await Feedback.insertMany(sampleFeedback);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Sample feedback created successfully',
        feedback: createdFeedback 
      });
    }
    
    // Create a single feedback entry
    const { customer_name, customer_email, product_name, order_id, rating, comment, category } = body;
    
    // Validate required fields
    if (!customer_name || !customer_email || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    const feedback = new Feedback({
      customer_name,
      customer_email,
      product_name,
      order_id,
      rating: Number(rating),
      comment,
      category: category || 'general'
    });
    
    await feedback.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Feedback created successfully',
      feedback: feedback 
    });
  } catch (error: unknown) {
    console.error('Error creating feedback:', error);
    
    return NextResponse.json(
      { success: false, error: 'Failed to create feedback' }, 
      { status: 500 }
    );
  }
}