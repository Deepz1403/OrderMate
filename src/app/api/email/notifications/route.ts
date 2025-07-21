import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { EmailNotification } from '@/models/EmailNotification';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const filter: Record<string, unknown> = { userId };
    if (unreadOnly) {
      filter.isRead = false;
    }

    const skip = (page - 1) * limit;

    const [notifications, total, unreadCount] = await Promise.all([
      EmailNotification.find(filter)
        .sort({ receivedAt: -1 })
        .skip(skip)
        .limit(limit),
      EmailNotification.countDocuments(filter),
      EmailNotification.countDocuments({ userId, isRead: false })
    ]);

    return NextResponse.json({
      success: true,
      notifications,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      },
      unreadCount
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { userId, emailId, subject, sender, receivedAt, rawEmailContent } = body;

    // Validate required fields
    if (!userId || !emailId || !subject || !sender || !receivedAt) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if notification already exists
    const existingNotification = await EmailNotification.findOne({ emailId });
    if (existingNotification) {
      return NextResponse.json(
        { success: false, error: 'Notification already exists' },
        { status: 409 }
      );
    }

    // Create new notification
    const notification = new EmailNotification({
      userId,
      emailId,
      subject,
      sender,
      receivedAt: new Date(receivedAt),
      rawEmailContent,
      processingStatus: 'pending'
    });

    const savedNotification = await notification.save();

    return NextResponse.json({
      success: true,
      notification: savedNotification,
      message: 'Email notification created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}