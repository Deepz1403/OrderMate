"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  MessageSquare,
  AlertTriangle,
  MessageCircle,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    badge: "12",
  },
  {
    name: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
    badge: "3",
    badgeVariant: "destructive" as const,
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Feedback",
    href: "/dashboard/feedback",
    icon: MessageSquare,
  },
  {
    name: "Errors",
    href: "/dashboard/errors",
    icon: AlertTriangle,
  },
  {
    name: "AI Assistant",
    href: "/dashboard/chatbot",
    icon: MessageCircle,
  },
];

const secondaryNavigation = [
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Help",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-64 flex-col overflow-y-auto bg-white p-4 shadow-lg border-r border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">OrderMate</h2>
              <p className="text-xs text-gray-500">Supply Chain Portal</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg transition-colors border-b border-gray-100 hover:bg-gray-50 w-full text-sm font-medium',
                  isActiveLink(item.href)
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'text-gray-700 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5',
                    isActiveLink(item.href) ? 'text-blue-600' : 'text-gray-500'
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span
                    className={cn(
                      "ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                      item.badgeVariant === "destructive"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <div className="px-3 py-2 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Account
            </h3>
          </div>
          <ul className="space-y-1">
            {secondaryNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg transition-colors border-b border-gray-100 hover:bg-gray-50 w-full text-sm font-medium',
                    isActiveLink(item.href)
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'text-gray-700 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-5 w-5',
                      isActiveLink(item.href) ? 'text-blue-600' : 'text-gray-500'
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* User Section */}
      <div className="mt-auto">
        <div className="flex items-center gap-2 mb-3 p-3 rounded-lg bg-gray-50">
          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Demo User
            </p>
            <p className="text-xs text-gray-500 truncate">
              demo@ordermate.com
            </p>
          </div>
        </div>
        <button className="flex items-center gap-3 p-3 rounded-lg transition-colors border-b border-gray-100 hover:bg-gray-50 w-full text-sm font-medium text-gray-700 hover:text-gray-900">
          <LogOut className="h-5 w-5 text-gray-500" />
          Logout
        </button>
      </div>
    </aside>
  );
}