import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';
import { comparePassword, generateJWT, createAuthResponse } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { email, password } = body;

    console.log('Login attempt for email:', email); // Debug log

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      console.log('User not found for email:', email); // Debug log
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('User found, verifying password...'); // Debug log

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email); // Debug log
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('Password verified, generating token...'); // Debug log

    // Generate JWT token
    const token = generateJWT(user._id.toString());

    // Create response without sensitive data
    const userResponse = createAuthResponse(user);

    console.log('Login successful, setting cookie...'); // Debug log

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user: userResponse,
      message: 'Login successful'
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/' // Ensure cookie is available site-wide
    });

    console.log('Cookie set, returning response'); // Debug log

    return response;

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}