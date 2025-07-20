import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    await connectToDatabase();
    
    const { productId } = await params;
    const body = await request.json();
    
    const product = await Product.findByIdAndUpdate(
      productId,
      body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product updated successfully',
      product: product 
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    await connectToDatabase();
    
    const { productId } = await params;
    
    const product = await Product.findByIdAndDelete(productId);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' }, 
      { status: 500 }
    );
  }
}