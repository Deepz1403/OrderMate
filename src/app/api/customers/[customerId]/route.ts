import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Customer } from '@/models/Customer';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  try {
    await connectToDatabase();
    
    const { customerId } = await params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid customer ID format' },
        { status: 400 }
      );
    }

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      customer: customer
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customer' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  try {
    await connectToDatabase();
    
    const { customerId } = await params;
    const body = await request.json();

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid customer ID format' },
        { status: 400 }
      );
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Customer updated successfully',
      customer: updatedCustomer
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update customer' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  try {
    await connectToDatabase();
    
    const { customerId } = await params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid customer ID format' },
        { status: 400 }
      );
    }

    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Customer deleted successfully',
      customer: deletedCustomer
    });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete customer' },
      { status: 500 }
    );
  }
}