import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct {
  name: string;
  quantity: number;
}

export interface IOrder extends Document {
  _id: string;
  date: string;
  time: string;
  products: IProduct[];
  status: string;
  orderLink: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const OrderSchema = new Schema<IOrder>({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  products: [ProductSchema],
  status: {
    type: String,
    required: true,
    trim: true
  },
  orderLink: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
});

OrderSchema.index({ orderLink: 1 });
OrderSchema.index({ email: 1 });
OrderSchema.index({ date: 1 });

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);