"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Book,
  MessageCircle,
  ExternalLink,
  Mail,
  Phone,
  FileText,
  Package
} from "lucide-react";

export default function HelpPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      articles: [
        'How to set up your account',
        'Connecting your email for order processing',
        'Adding your first products',
        'Understanding the dashboard'
      ]
    },
    {
      id: 'orders',
      title: 'Order Management',
      icon: FileText,
      articles: [
        'Processing incoming orders',
        'Managing order status',
        'Bulk order operations',
        'Order analytics and reports'
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory',
      icon: Package,
      articles: [
        'Adding and managing products',
        'Inventory tracking',
        'Low stock alerts',
        'Bulk inventory updates'
      ]
    },
    {
      id: 'email',
      title: 'Email Integration',
      icon: Mail,
      articles: [
        'Supported email providers',
        'Setting up email parsing',
        'Troubleshooting email issues',
        'Advanced email filters'
      ]
    }
  ];

  const activeHelpSection = helpSections.find(s => s.id === activeSection);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600">Find answers to common questions and get support</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {helpSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Need More Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {activeHelpSection && (
                  <activeHelpSection.icon className="h-5 w-5" />
                )}
                {activeHelpSection?.title}
              </CardTitle>
              <CardDescription>
                Browse articles and guides for this topic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeHelpSection?.articles.map((article, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{article}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Quick Tip</h3>
                <p className="text-blue-800 text-sm">
                  {activeSection === 'getting-started' && "Start by connecting your email account to automatically process orders from your inbox."}
                  {activeSection === 'orders' && "Use bulk operations to process multiple orders at once and save time."}
                  {activeSection === 'inventory' && "Set up low stock alerts to never run out of your popular products."}
                  {activeSection === 'email' && "Make sure your email filters are properly configured to catch all order emails."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}