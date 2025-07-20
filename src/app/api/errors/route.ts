import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Error from '@/models/Error';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Check if errors collection is empty and create sample data
    const errorCount = await Error.countDocuments();
    
    if (errorCount === 0) {
      console.log('No errors found in database, creating sample data...');
      
      const sampleErrors = [
        {
          error_id: "ERR-001",
          title: "Database Connection Timeout",
          description: "Connection to MongoDB database timed out after 30 seconds",
          severity: "high",
          status: "active",
          category: "database",
          frequency: 12,
          affected_users: 145
        },
        {
          error_id: "ERR-002",
          title: "Payment Gateway Error",
          description: "Stripe payment processing failed with invalid card error",
          severity: "critical",
          status: "active",
          category: "payment",
          frequency: 8,
          affected_users: 89
        },
        {
          error_id: "ERR-003",
          title: "Image Upload Failed",
          description: "File upload to cloud storage failed due to size limit exceeded",
          severity: "medium",
          status: "resolved",
          category: "storage",
          frequency: 25,
          affected_users: 32,
          resolved_at: new Date(),
          resolved_by: "Admin User"
        },
        {
          error_id: "ERR-004",
          title: "API Rate Limit Exceeded",
          description: "External API rate limit exceeded for product information service",
          severity: "low",
          status: "monitoring",
          category: "api",
          frequency: 156,
          affected_users: 12
        },
        {
          error_id: "ERR-005",
          title: "Email Service Disruption",
          description: "SMTP server connection failed - unable to send order confirmations",
          severity: "high",
          status: "investigating",
          category: "email",
          frequency: 34,
          affected_users: 267
        },
        {
          error_id: "ERR-006",
          title: "Server Memory Usage High",
          description: "Server memory usage exceeded 90% threshold causing performance degradation",
          severity: "medium",
          status: "monitoring",
          category: "server",
          frequency: 3,
          affected_users: 0
        },
        {
          error_id: "ERR-007",
          title: "Authentication Token Expired",
          description: "JWT tokens expiring prematurely due to clock synchronization issues",
          severity: "low",
          status: "resolved",
          category: "auth",
          frequency: 45,
          affected_users: 23,
          resolved_at: new Date(Date.now() - 86400000), // 1 day ago
          resolved_by: "Security Team"
        }
      ];

      await Error.insertMany(sampleErrors);
      console.log('Sample errors created successfully');
    }
    
    const errors = await Error.find({})
      .sort({ created_at: -1 })
      .limit(50);

    return NextResponse.json({
      success: true,
      errors: errors
    });
  } catch (error) {
    console.error('Error fetching errors:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch errors' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
      // Check if we're creating sample data or if no data exists
      if (body.createSampleData || (await Error.countDocuments()) === 0) {
      const sampleErrors = [
        {
          error_id: "ERR-001",
          title: "Database Connection Timeout",
          description: "Connection to MongoDB database timed out after 30 seconds",
          severity: "high",
          status: "active",
          category: "database",
          frequency: 12,
          affected_users: 145
        },
        {
          error_id: "ERR-002",
          title: "Payment Gateway Error",
          description: "Stripe payment processing failed with invalid card error",
          severity: "critical",
          status: "active",
          category: "payment",
          frequency: 8,
          affected_users: 89
        },
        {
          error_id: "ERR-003",
          title: "Image Upload Failed",
          description: "File upload to cloud storage failed due to size limit exceeded",
          severity: "medium",
          status: "resolved",
          category: "storage",
          frequency: 25,
          affected_users: 32,
          resolved_at: new Date(),
          resolved_by: "Admin User"
        },
        {
          error_id: "ERR-004",
          title: "API Rate Limit Exceeded",
          description: "External API rate limit exceeded for product information service",
          severity: "low",
          status: "monitoring",
          category: "api",
          frequency: 156,
          affected_users: 12
        },
        {
          error_id: "ERR-005",
          title: "Email Service Disruption",
          description: "SMTP server connection failed - unable to send order confirmations",
          severity: "high",
          status: "investigating",
          category: "email",
          frequency: 34,
          affected_users: 267
        }
      ];

      // Clear existing errors first
      await Error.deleteMany({});
      
      // Insert sample errors
      const createdErrors = await Error.insertMany(sampleErrors);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Sample errors created successfully',
        errors: createdErrors 
      });
    }
    
    // Create a single error entry
    const { error_id, title, description, severity, category, frequency, affected_users } = body;
    
    // Validate required fields
    if (!error_id || !title || !description || !severity || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    const errorEntry = new Error({
      error_id,
      title,
      description,
      severity,
      category,
      frequency: Number(frequency) || 1,
      affected_users: Number(affected_users) || 0
    });
    
    await errorEntry.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Error entry created successfully',
      error: errorEntry 
    });
  } catch (error: unknown) {
    console.error('Error creating error entry:', error);
    
    return NextResponse.json(
      { success: false, error: 'Failed to create error entry' }, 
      { status: 500 }
    );
  }
}