import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  sku?: string; // Made optional since existing data doesn't have SKUs
  category: string;
  price: number;
  quantity: number;
  stock_alert_level: number;
  warehouse_location?: string;
  supplier_info?: {
    name: string;
    contact: string;
  };
  last_restocked?: Date;
  status: 'in_stock' | 'low_quantity' | 'not_available';
  created_at?: Date;
  updated_at?: Date;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  sku: {
    type: String,
    trim: true,
    sparse: true, // Allow multiple null values for existing data without SKUs
    index: { unique: true, sparse: true } // Unique only when present
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  stock_alert_level: {
    type: Number,
    required: true,
    default: 5,
    min: 0
  },
  warehouse_location: {
    type: String,
    trim: true,
    maxlength: 100
  },
  supplier_info: {
    name: {
      type: String,
      trim: true,
      maxlength: 255
    },
    contact: {
      type: String,
      trim: true,
      maxlength: 255
    }
  },
  last_restocked: {
    type: Date
  },
  status: {
    type: String,
    enum: ['in_stock', 'low_quantity', 'not_available'],
    default: 'in_stock'
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'inventory' // Use lowercase collection name
});

// Update status based on quantity before saving
ProductSchema.pre('save', function(this: IProduct, next) {
  if (this.quantity === 0) {
    this.status = 'not_available';
  } else if (this.quantity <= this.stock_alert_level) {
    this.status = 'low_quantity';
  } else {
    this.status = 'in_stock';
  }
  next();
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);