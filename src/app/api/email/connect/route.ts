import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { userId, provider } = body;

    if (!userId || !provider) {
      return NextResponse.json(
        { success: false, error: 'User ID and provider are required' },
        { status: 400 }
      );
    }

    // For now, just update the connection status
    // In a real implementation, this would involve OAuth flows
    const user = await User.findByIdAndUpdate(
      userId,
      {
        'emailIntegration.isConnected': true,
        'emailIntegration.provider': provider,
        'emailIntegration.lastSyncedAt': new Date()
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${provider} integration connected successfully`,
      emailIntegration: user.emailIntegration
    });

  } catch (error) {
    console.error('Error connecting email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to connect email' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        'emailIntegration.isConnected': false,
        'emailIntegration.provider': null,
        'emailIntegration.accessToken': null,
        'emailIntegration.refreshToken': null,
        'emailIntegration.webhookId': null
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email integration disconnected successfully'
    });

  } catch (error) {
    console.error('Error disconnecting email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to disconnect email' },
      { status: 500 }
    );
  }
}