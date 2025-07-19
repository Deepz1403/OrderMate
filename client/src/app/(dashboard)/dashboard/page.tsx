import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { 
  BarChart3,
  Users,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  DollarSign
} from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    title: "Total Customers",
    value: "1,234",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Revenue",
    value: "$45,678",
    change: "+15.3%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Critical Items",
    value: "23",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <p className="text-sm text-gray-600">Latest customer orders and their status</p>
            </div>
            <div className="p-6">
              <RecentOrders />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Create New Order
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <BarChart3 className="h-4 w-4" />
                View Analytics
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                Manage Customers
              </button>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Low Stock Alert</p>
                  <p className="text-xs text-yellow-700">3 items are running low on inventory</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Sales Milestone</p>
                  <p className="text-xs text-green-700">Reached 1000 orders this month!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}