"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  MailOpen, 
  Bell, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Clock,
  ExternalLink,
  Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface EmailNotification {
  _id: string;
  emailId: string;
  subject: string;
  sender: string;
  receivedAt: string;
  isRead: boolean;
  isProcessed: boolean;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  orderExtracted?: {
    customerName?: string;
    products?: Array<{ name: string; quantity: number }>;
    totalAmount?: number;
    orderDate?: string;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  emailIntegration: {
    isConnected: boolean;
    provider: string | null;
  };
}

export default function EmailIntegrationPage() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<EmailNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUserData();
    fetchNotifications();
  }, []);

  const fetchUserData = async () => {
    try {
      // For demo purposes, we'll simulate user data
      // In a real app, this would fetch from an API
      setUser({
        id: 'demo-user-id',
        email: 'demo@ordermate.com',
        name: 'Demo User',
        company: 'Demo Company',
        emailIntegration: {
          isConnected: false,
          provider: null
        }
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load user data');
    }
  };

  const fetchNotifications = async () => {
    try {
      // For demo purposes, we'll simulate notification data
      const demoNotifications: EmailNotification[] = [
        {
          _id: '1',
          emailId: 'email_1',
          subject: 'New Order Request - ABC Corp',
          sender: 'orders@abccorp.com',
          receivedAt: new Date().toISOString(),
          isRead: false,
          isProcessed: false,
          processingStatus: 'pending'
        },
        {
          _id: '2',
          emailId: 'email_2',
          subject: 'Order Inquiry - Widget Manufacturing',
          sender: 'procurement@widgets.com',
          receivedAt: new Date(Date.now() - 3600000).toISOString(),
          isRead: true,
          isProcessed: true,
          processingStatus: 'completed',
          orderExtracted: {
            customerName: 'Widget Manufacturing',
            products: [
              { name: 'Widget A', quantity: 100 },
              { name: 'Widget B', quantity: 50 }
            ],
            totalAmount: 2500,
            orderDate: new Date().toISOString().split('T')[0]
          }
        }
      ];

      setNotifications(demoNotifications);
      setUnreadCount(demoNotifications.filter(n => !n.isRead).length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
      setLoading(false);
    }
  };

  const handleConnectEmail = async (provider: string) => {
    setConnecting(true);
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUser(prev => prev ? {
        ...prev,
        emailIntegration: {
          isConnected: true,
          provider
        }
      } : null);
      
      toast.success(`${provider} connected successfully! You'll now receive notifications for new emails.`);
    } catch (error) {
      console.error('Error connecting email:', error);
      toast.error('Failed to connect email');
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnectEmail = async () => {
    try {
      setUser(prev => prev ? {
        ...prev,
        emailIntegration: {
          isConnected: false,
          provider: null
        }
      } : null);
      
      toast.success('Email disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting email:', error);
      toast.error('Failed to disconnect email');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={variants[status] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Email Integration</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Integration</h1>
          <p className="text-gray-600">Connect your email to automate order processing</p>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-red-100 text-red-800">
            {unreadCount} unread notifications
          </Badge>
        )}
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Connection Status
          </CardTitle>
          <CardDescription>
            Connect your email account to receive notifications for new orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user?.emailIntegration.isConnected ? (
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Connected to {user.emailIntegration.provider}</p>
                  <p className="text-sm text-green-600">Your inbox is being monitored for new orders</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleDisconnectEmail}
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">No email connected</p>
                    <p className="text-sm text-yellow-600">Connect your email to start receiving order notifications</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleConnectEmail('Gmail')} 
                  disabled={connecting}
                  className="flex items-center justify-center gap-2"
                >
                  {connecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                  Connect Gmail
                </Button>
                <Button 
                  onClick={() => handleConnectEmail('Outlook')} 
                  disabled={connecting}
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                >
                  {connecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                  Connect Outlook
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Email Notifications
          </CardTitle>
          <CardDescription>
            Latest emails that may contain order information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No email notifications yet</p>
              <p className="text-sm text-gray-400">Connect your email to start receiving notifications</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification._id} 
                  className={`p-4 border rounded-lg transition-colors ${
                    notification.isRead ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {notification.isRead ? (
                        <MailOpen className="h-5 w-5 text-gray-400 mt-0.5" />
                      ) : (
                        <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{notification.subject}</h4>
                        <p className="text-sm text-gray-600">From: {notification.sender}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(notification.receivedAt).toLocaleString()}
                        </p>
                        
                        {notification.orderExtracted && (
                          <div className="mt-2 p-2 bg-white rounded border">
                            <p className="text-xs font-medium text-gray-700 mb-1">Extracted Order Info:</p>
                            <div className="text-xs text-gray-600 space-y-1">
                              <p>Customer: {notification.orderExtracted.customerName}</p>
                              <p>Products: {notification.orderExtracted.products?.length || 0} items</p>
                              {notification.orderExtracted.totalAmount && (
                                <p>Amount: ${notification.orderExtracted.totalAmount}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(notification.processingStatus)}
                      {getStatusBadge(notification.processingStatus)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure how you want to receive email notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Real-time notifications</p>
                <p className="text-sm text-gray-600">Get notified immediately when new emails arrive</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Order detection</p>
                <p className="text-sm text-gray-600">Automatically detect and extract order information</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily summary</p>
                <p className="text-sm text-gray-600">Receive a daily summary of processed emails</p>
              </div>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}