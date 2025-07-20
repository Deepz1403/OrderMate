import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export async function GET() {
  try {
    console.log('API: Starting product fetch...');
    console.log('API: Database URI:', process.env.MONGODB_URI?.substring(0, 50) + '...');
    console.log('API: Database Name:', process.env.DATABASE_NAME);
    
    await connectToDatabase();
    console.log('API: Database connected successfully');
    console.log('API: Connected to database:', mongoose.connection.name);
    
    // Try to find products in inventory collection
    console.log('API: Querying inventory collection...');
    const products = await Product.find({}).sort({ createdAt: -1 });
    console.log('API: Raw products found:', products);
    console.log('API: Products count:', products.length);
    
    // If no products found, try without sorting
    if (products.length === 0) {
      console.log('API: Trying query without sorting...');
      const productsNoSort = await Product.find({});
      console.log('API: Products without sort:', productsNoSort);
      console.log('API: Count without sort:', productsNoSort.length);
    }
    
    // Also try to count documents directly
    const count = await Product.countDocuments();
    console.log('API: Total document count in inventory:', count);
    
    return NextResponse.json({ 
      success: true, 
      products: products,
      totalCount: count,
      databaseName: mongoose.connection.name
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
          stock: 45,
          lowStockThreshold: 10,
          price: 129.99,
          description: "Premium wireless headphones with noise cancellation"
        },
        {
          name: "Smart Watch",
          sku: "SW-002",
          category: "Electronics",
          stock: 5,
          lowStockThreshold: 10,
          price: 299.99,
          description: "Advanced fitness tracking smartwatch"
        },
        {
          name: "Laptop Stand",
          sku: "LS-003",
          category: "Accessories",
          stock: 23,
          lowStockThreshold: 5,
          price: 49.99,
          description: "Adjustable aluminum laptop stand"
        },
        {
          name: "USB-C Cable",
          sku: "UC-004",
          category: "Cables",
          stock: 0,
          lowStockThreshold: 15,
          price: 19.99,
          description: "High-speed USB-C charging cable"
        },
        {
          name: "Bluetooth Speaker",
          sku: "BS-005",
          category: "Audio",
          stock: 18,
          lowStockThreshold: 8,
          price: 79.99,
          description: "Portable waterproof Bluetooth speaker"
        },
        {
          name: "Gaming Mouse",
          sku: "GM-006",
          category: "Electronics",
          stock: 32,
          lowStockThreshold: 12,
          price: 89.99,
          description: "High-precision gaming mouse with RGB lighting"
        },
        {
          name: "Phone Case",
          sku: "PC-007",
          category: "Accessories",
          stock: 8,
          lowStockThreshold: 15,
          price: 24.99,
          description: "Protective phone case with drop protection"
        },
        {
          name: "Wireless Charger",
          sku: "WC-008",
          category: "Electronics",
          stock: 0,
          lowStockThreshold: 10,
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