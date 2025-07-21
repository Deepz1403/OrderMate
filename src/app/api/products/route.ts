import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectToDatabase();
    
    const products = await Product.find({}).sort({ created_at: -1 });
    
    return NextResponse.json({ 
      success: true, 
      products: products,
      totalCount: products.length
    });
  } catch (error) {
    console.error('API Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products: ' + (error as Error).message }, 
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
      const sampleProducts = [
        {
          name: "Wireless Headphones",
          sku: "WH-001",
          category: "Electronics",
          quantity: 45,
          stock_alert_level: 10,
          price: 129.99,
          description: "Premium wireless headphones with noise cancellation"
        },
        {
          name: "Smart Watch",
          sku: "SW-002",
          category: "Electronics",
          quantity: 5,
          stock_alert_level: 10,
          price: 299.99,
          description: "Advanced fitness tracking smartwatch"
        },
        {
          name: "Laptop Stand",
          sku: "LS-003",
          category: "Accessories",
          quantity: 23,
          stock_alert_level: 5,
          price: 49.99,
          description: "Adjustable aluminum laptop stand"
        },
        {
          name: "USB-C Cable",
          sku: "UC-004",
          category: "Cables",
          quantity: 0,
          stock_alert_level: 15,
          price: 19.99,
          description: "High-speed USB-C charging cable"
        },
        {
          name: "Bluetooth Speaker",
          sku: "BS-005",
          category: "Audio",
          quantity: 18,
          stock_alert_level: 8,
          price: 79.99,
          description: "Portable waterproof Bluetooth speaker"
        },
        {
          name: "Gaming Mouse",
          sku: "GM-006",
          category: "Electronics",
          quantity: 32,
          stock_alert_level: 12,
          price: 89.99,
          description: "High-precision gaming mouse with RGB lighting"
        },
        {
          name: "Phone Case",
          sku: "PC-007",
          category: "Accessories",
          quantity: 8,
          stock_alert_level: 15,
          price: 24.99,
          description: "Protective phone case with drop protection"
        },
        {
          name: "Wireless Charger",
          sku: "WC-008",
          category: "Electronics",
          quantity: 0,
          stock_alert_level: 10,
          price: 39.99,
          description: "Fast wireless charging pad"
        }
      ];

      // Clear existing products first
      await Product.deleteMany({});
      
      // Insert sample products
      const createdProducts = await Product.insertMany(sampleProducts);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Sample products created successfully',
        products: createdProducts 
      });
    }
    
    // Create a single product
    const { name, sku, category, quantity, stock_alert_level, price, description, warehouse_location } = body;
    
    // Validate required fields
    if (!name || !category || quantity === undefined || stock_alert_level === undefined || !price) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    const product = new Product({
      name,
      sku: sku || undefined, // Optional
      category,
      quantity: Number(quantity),
      stock_alert_level: Number(stock_alert_level),
      price: Number(price),
      description,
      warehouse_location
    });
    
    await product.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product created successfully',
      product: product 
    });
  } catch (error: unknown) {
    console.error('Error creating product:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'SKU already exists' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create product' }, 
      { status: 500 }
    );
  }
}