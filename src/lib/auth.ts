import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateJWT(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJWT(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
}

export function generateRandomToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generateEmailVerificationToken(): string {
  return crypto.randomBytes(20).toString('hex');
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  company: string;
  isEmailVerified: boolean;
}

export function createAuthResponse(user: { _id: { toString(): string }; email: string; name: string; company: string; isEmailVerified: boolean }): AuthUser {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    company: user.company,
    isEmailVerified: user.isEmailVerified
  };
}