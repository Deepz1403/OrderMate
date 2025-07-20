import mongoose, { Schema, Document } from 'mongoose';

export interface IError extends Document {
  error_id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'monitoring' | 'investigating';
  category: 'database' | 'payment' | 'storage' | 'api' | 'email' | 'server' | 'network' | 'auth';
  frequency: number;
  affected_users: number;
  stack_trace?: string;
  user_agent?: string;
  ip_address?: string;
  resolved_at?: Date;
  resolved_by?: string;
  created_at: Date;
  updated_at: Date;
}

const ErrorSchema: Schema = new Schema({
  error_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'monitoring', 'investigating'],
    required: true,
    default: 'active'
  },
  category: {
    type: String,
    enum: ['database', 'payment', 'storage', 'api', 'email', 'server', 'network', 'auth'],
    required: true
  },
  frequency: {
    type: Number,
    default: 1,
    min: 1
  },
  affected_users: {
    type: Number,
    default: 0,
    min: 0
  },
  stack_trace: {
    type: String,
    trim: true
  },
  user_agent: {
    type: String,
    trim: true,
    maxlength: 500
  },
  ip_address: {
    type: String,
    trim: true,
    maxlength: 45 // IPv6 max length
  },
  resolved_at: {
    type: Date
  },
  resolved_by: {
    type: String,
    trim: true,
    maxlength: 255
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'errors'
});

// Indexes for better query performance
ErrorSchema.index({ error_id: 1 });
ErrorSchema.index({ severity: 1 });
ErrorSchema.index({ status: 1 });
ErrorSchema.index({ category: 1 });
ErrorSchema.index({ created_at: -1 });
ErrorSchema.index({ frequency: -1 });

export default mongoose.models.Error || mongoose.model<IError>('Error', ErrorSchema);