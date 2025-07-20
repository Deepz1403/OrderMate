"use client";

import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Package, 
  Users, 
  FileText, 
  BarChart3,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    title: "Add Product",
    description: "Add new item to inventory",
    icon: <Plus className="h-5 w-5" />,
    href: "/dashboard/inventory/add",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "View Inventory",
    description: "Manage your products",
    icon: <Package className="h-5 w-5" />,
    href: "/dashboard/inventory",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Customer List",
    description: "View all customers",
    icon: <Users className="h-5 w-5" />,
    href: "/dashboard/customers",
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "Generate Report",
    description: "Create analytics report",
    icon: <FileText className="h-5 w-5" />,
    href: "/dashboard/reports",
    color: "bg-orange-500 hover:bg-orange-600",
  },
  {
    title: "View Analytics",
    description: "Business insights",
    icon: <BarChart3 className="h-5 w-5" />,
    href: "/dashboard/analytics",
    color: "bg-indigo-500 hover:bg-indigo-600",
  },
  {
    title: "AI Assistant",
    description: "Chat with AI helper",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/dashboard/chatbot",
    color: "bg-pink-500 hover:bg-pink-600",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-3">
      {quickActions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-auto p-4 justify-start hover:bg-muted/50"
          asChild
        >
          <Link href={action.href}>
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white mr-3 ${action.color}`}>
              {action.icon}
            </div>
            <div className="text-left">
              <p className="font-medium">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </Link>
        </Button>
      ))}
    </div>
  );
}