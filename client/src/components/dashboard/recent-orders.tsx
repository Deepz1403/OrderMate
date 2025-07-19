import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Package, Truck } from "lucide-react";

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "Wireless Headphones",
    amount: "$129.99",
    status: "delivered",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Smart Watch",
    amount: "$299.99",
    status: "processing",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    product: "Laptop Stand",
    amount: "$49.99",
    status: "shipped",
    date: "2024-01-13",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    product: "USB-C Cable",
    amount: "$19.99",
    status: "pending",
    date: "2024-01-12",
  },
  {
    id: "ORD-005",
    customer: "David Brown",
    product: "Bluetooth Speaker",
    amount: "$79.99",
    status: "delivered",
    date: "2024-01-11",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-yellow-100 text-yellow-800";
    case "pending":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <Package className="h-3 w-3" />;
    case "processing":
      return <Eye className="h-3 w-3" />;
    case "shipped":
      return <Truck className="h-3 w-3" />;
    case "pending":
      return <MoreHorizontal className="h-3 w-3" />;
    default:
      return <MoreHorizontal className="h-3 w-3" />;
  }
};

export function RecentOrders() {
  return (
    <div className="space-y-4">
      {recentOrders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {order.id}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {order.customer} • {order.product}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{order.amount}</p>
              <p className="text-xs text-gray-500">{order.date}</p>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusIcon(order.status)}
              <span className="ml-1 capitalize">{order.status}</span>
            </span>
          </div>
        </div>
      ))}
      
      <div className="mt-6">
        <button className="w-full text-center py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
          View All Orders
        </button>
      </div>
    </div>
  );
}