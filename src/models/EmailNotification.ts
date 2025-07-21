import mongoose, { Schema, Document } from 'mongoose';

export interface IEmailNotification extends Document {
  _id: string;
  userId: string;
  emailId: string;
  subject: string;
  sender: string;
  receivedAt: Date;
  isRead: boolean;
  isProcessed: boolean;
  orderExtracted?: {
    customerName?: string;
    products?: Array<{ name: string; quantity: number }>;
    totalAmount?: number;
    orderDate?: string;
  };
  rawEmailContent?: string;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  processingError?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmailNotificationSchema = new Schema<IEmailNotification>({
  userId: {
    type: String,
    required: true,
    index: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  sender: {
    type: String,
    required: true,
    trim: true
  },
  receivedAt: {
    type: Date,
    required: true,
    index: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isProcessed: {
    type: Boolean,
    default: false
  },
  orderExtracted: {
    customerName: String,
    products: [{
      name: String,
      quantity: Number
    }],
    totalAmount: Number,
    orderDate: String
  },
  rawEmailContent: {
    type: String,
    select: false // Don't include by default for performance
  },
  processingStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  processingError: {
    type: String
  }
}, {
  timestamps: true,
});

// Indexes for performance
EmailNotificationSchema.index({ userId: 1, receivedAt: -1 });
EmailNotificationSchema.index({ userId: 1, isRead: 1 });
EmailNotificationSchema.index({ userId: 1, processingStatus: 1 });

export const EmailNotification = mongoose.models.EmailNotification || mongoose.model<IEmailNotification>('EmailNotification', EmailNotificationSchema);