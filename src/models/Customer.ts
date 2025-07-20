import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: string;
  location: string;
  joinDate: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  orders: {
    type: Number,
    default: 0,
    min: 0
  },
  totalSpent: {
    type: Number,
    default: 0,
    min: 0
  },
  lastOrder: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'vip'],
    default: 'active'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  joinDate: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
CustomerSchema.index({ email: 1 });
CustomerSchema.index({ status: 1 });
CustomerSchema.index({ location: 1 });
CustomerSchema.index({ name: 1 });
CustomerSchema.index({ joinDate: 1 });

export const Customer = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);