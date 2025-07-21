import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  company: string;
  phone?: string;
  emailIntegration: {
    isConnected: boolean;
    provider: 'gmail' | 'outlook' | 'imap' | null;
    accessToken?: string;
    refreshToken?: string;
    lastSyncedAt?: Date;
    webhookId?: string;
  };
  notifications: {
    emailNotifications: boolean;
    newOrderAlerts: boolean;
    lowStockAlerts: boolean;
  };
  subscription: {
    plan: 'free' | 'basic' | 'premium';
    isActive: boolean;
    expiresAt?: Date;
  };
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  company: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  emailIntegration: {
    isConnected: {
      type: Boolean,
      default: false
    },
    provider: {
      type: String,
      enum: ['gmail', 'outlook', 'imap', null],
      default: null
    },
    accessToken: {
      type: String,
      select: false // Don't include in queries by default for security
    },
    refreshToken: {
      type: String,
      select: false
    },
    lastSyncedAt: {
      type: Date
    },
    webhookId: {
      type: String
    }
  },
  notifications: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    newOrderAlerts: {
      type: Boolean,
      default: true
    },
    lowStockAlerts: {
      type: Boolean,
      default: true
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    expiresAt: {
      type: Date
    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  resetPasswordToken: {
    type: String,
    select: false
  },
  resetPasswordExpires: {
    type: Date,
    select: false
  }
}, {
  timestamps: true,
});

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ emailVerificationToken: 1 });
UserSchema.index({ resetPasswordToken: 1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);