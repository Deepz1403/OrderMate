import { Search, Package, AlertTriangle, TrendingDown, Plus } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  lowStockThreshold: number;
  price: string;
  status: string;
  lastUpdated: string;
}

const inventoryItems = [
  {
    id: "INV-001",
    name: "Wireless Headphones",
    sku: "WH-001",
    category: "Electronics",
    stock: 45,
    lowStockThreshold: 10,
    price: "$129.99",
    status: "in_stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: "INV-002", 
    name: "Smart Watch",
    sku: "SW-002",
    category: "Electronics",
    stock: 5,
    lowStockThreshold: 10,
    price: "$299.99",
    status: "low_stock",
    lastUpdated: "2024-01-14",
  },
  {
    id: "INV-003",
    name: "Laptop Stand",
    sku: "LS-003", 
    category: "Accessories",
    stock: 23,
    lowStockThreshold: 5,
    price: "$49.99",
    status: "in_stock",
    lastUpdated: "2024-01-13",
  },
  {
    id: "INV-004",
    name: "USB-C Cable",
    sku: "UC-004",
    category: "Cables",
    stock: 0,
    lowStockThreshold: 15,
    price: "$19.99", 
    status: "out_of_stock",
    lastUpdated: "2024-01-12",
  },
  {
    id: "INV-005",
    name: "Bluetooth Speaker",
    sku: "BS-005",
    category: "Audio",
    stock: 18,
    lowStockThreshold: 8,
    price: "$79.99",
    status: "in_stock",
    lastUpdated: "2024-01-11",
  },
];

const getStockStatus = (item: InventoryItem) => {
  if (item.stock === 0) {
    return {
      label: "Out of Stock",
      color: "bg-red-100 text-red-800",
      icon: <AlertTriangle className="h-3 w-3" />
    };
  } else if (item.stock <= item.lowStockThreshold) {
    return {
      label: "Low Stock", 
      color: "bg-yellow-100 text-yellow-800",
      icon: <TrendingDown className="h-3 w-3" />
    };
  } else {
    return {
      label: "In Stock",
      color: "bg-green-100 text-green-800", 
      icon: <Package className="h-3 w-3" />
    };
  }
};

export default function InventoryPage() {
  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => item.stock <= item.lowStockThreshold && item.stock > 0).length;
  const outOfStockItems = inventoryItems.filter(item => item.stock === 0).length;
  const totalValue = inventoryItems.reduce((acc, item) => acc + (item.stock * parseFloat(item.price.replace('$', ''))), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your product inventory</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
            </div>
            <div className="h-12 w-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Inventory Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Cables</option>
            <option>Audio</option>
          </select>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Stock Levels</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Product Inventory</h2>
          <p className="text-sm text-gray-600">Manage your product stock levels and details</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryItems.map((item) => {
                const status = getStockStatus(item);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                          <Package className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.sku}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.stock} units</div>
                      <div className="text-sm text-gray-500">Min: {item.lowStockThreshold}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        {status.icon}
                        <span className="ml-1">{status.label}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lastUpdated}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}