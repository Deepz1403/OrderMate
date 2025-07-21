import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';
import { hashPassword, generateJWT, createAuthResponse } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { email, password, name, company, phone } = body;

    // Validate required fields
    if (!email || !password || !name || !company) {
      return NextResponse.json(
        { success: false, error: 'Email, password, name, and company are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name.trim(),
      company: company.trim(),
      phone: phone?.trim(),
      isEmailVerified: false, // Will need email verification
      emailIntegration: {
        isConnected: false,
        provider: null
      },
      notifications: {
        emailNotifications: true,
        newOrderAlerts: true,
        lowStockAlerts: true
      },
      subscription: {
        plan: 'free',
        isActive: true
      }
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = generateJWT(savedUser._id.toString());

    // Create response without sensitive data
    const userResponse = createAuthResponse(savedUser);

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user: userResponse,
      message: 'Account created successfully'
    }, { status: 201 });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create account' },
      { status: 500 }
    );
  }
}