"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Mail,
  Bell,
  Shield,
  User,
  Building,
  Save,
  ExternalLink,
  Check,
  AlertCircle
} from "lucide-react";
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [emailSettings, setEmailSettings] = useState({
    isConnected: false,
    provider: null as string | null,
    emailNotifications: true,
    newOrderAlerts: true,
    lowStockAlerts: true,
  });

  const [profileData, setProfileData] = useState({
    name: 'Demo User',
    email: 'demo@ordermate.com',
    company: 'Demo Company',
    phone: '+1 (555) 123-4567'
  });

  const handleEmailConnection = async (provider: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/email/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider }),
      });

      if (response.ok) {
        toast.success(`${provider} connected successfully!`);
        setEmailSettings(prev => ({ ...prev, isConnected: true, provider }));
      } else {
        toast.error('Failed to connect email account');
      }
    } catch (error) {
      toast.error('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Integration
                {emailSettings.isConnected && (
                  <Badge variant="secondary" className="ml-2">
                    <Check className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Connect your email account to automatically process orders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!emailSettings.isConnected ? (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose your email provider to get started with automated order processing:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center gap-2"
                      onClick={() => handleEmailConnection('gmail')}
                      disabled={loading}
                    >
                      <Mail className="h-6 w-6" />
                      <span>Gmail</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center gap-2"
                      onClick={() => handleEmailConnection('outlook')}
                      disabled={loading}
                    >
                      <Mail className="h-6 w-6" />
                      <span>Outlook</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center gap-2"
                      onClick={() => handleEmailConnection('imap')}
                      disabled={loading}
                    >
                      <Mail className="h-6 w-6" />
                      <span>IMAP</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-900">Email Connected</p>
                        <p className="text-sm text-green-700">
                          Your {emailSettings.provider} account is connected and processing orders
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <input
                  type="checkbox"
                  id="email-notifications"
                  checked={emailSettings.emailNotifications}
                  onChange={(e) => 
                    setEmailSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="order-alerts">New Order Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified of new incoming orders</p>
                </div>
                <input
                  type="checkbox"
                  id="order-alerts"
                  checked={emailSettings.newOrderAlerts}
                  onChange={(e) => 
                    setEmailSettings(prev => ({ ...prev, newOrderAlerts: e.target.checked }))
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="stock-alerts">Low Stock Alerts</Label>
                  <p className="text-sm text-gray-500">Receive alerts when inventory is low</p>
                </div>
                <input
                  type="checkbox"
                  id="stock-alerts"
                  checked={emailSettings.lowStockAlerts}
                  onChange={(e) => 
                    setEmailSettings(prev => ({ ...prev, lowStockAlerts: e.target.checked }))
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Plan</span>
                <Badge>Free</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge variant="secondary" className="text-green-700 bg-green-100">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Verified</span>
                <Badge variant="secondary" className="text-green-700 bg-green-100">
                  <Check className="h-3 w-3 mr-1" />
                  Yes
                </Badge>
              </div>
              <Button variant="outline" className="w-full">
                <Building className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="h-4 w-4 mr-2" />
                Download Data
              </Button>
            </CardContent>
          </Card>

          <Button 
            onClick={handleSaveSettings}
            disabled={loading}
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </div>
  );
}