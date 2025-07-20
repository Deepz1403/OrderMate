import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  customer_name: string;
  customer_email: string;
  product_name?: string;
  order_id?: string;
  rating: number;
  comment: string;
  status: 'pending' | 'resolved' | 'in_review';
  created_at: Date;
  updated_at: Date;
  helpful_votes: number;
  category: 'product' | 'service' | 'shipping' | 'support' | 'general';
}

const FeedbackSchema: Schema = new Schema({
  customer_name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  customer_email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 255
  },
  product_name: {
    type: String,
    trim: true,
    maxlength: 255
  },
  order_id: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  status: {
    type: String,
    enum: ['pending', 'resolved', 'in_review'],
    default: 'pending'
  },
  helpful_votes: {
    type: Number,
    default: 0,
    min: 0
  },
  category: {
    type: String,
    enum: ['product', 'service', 'shipping', 'support', 'general'],
    default: 'general'
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'feedback'
});

// Indexes for better query performance
FeedbackSchema.index({ customer_email: 1 });
FeedbackSchema.index({ rating: 1 });
FeedbackSchema.index({ status: 1 });
FeedbackSchema.index({ created_at: -1 });

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);