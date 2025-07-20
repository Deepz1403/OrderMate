import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

const salesData = [
  { month: 'Jan', sales: 12000, orders: 145 },
  { month: 'Feb', sales: 15000, orders: 178 },
  { month: 'Mar', sales: 18000, orders: 203 },
  { month: 'Apr', sales: 22000, orders: 256 },
  { month: 'May', sales: 19000, orders: 221 },
  { month: 'Jun', sales: 25000, orders: 289 },
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#3B82F6' },
  { name: 'Accessories', value: 25, color: '#10B981' },
  { name: 'Audio', value: 20, color: '#F59E0B' },
  { name: 'Cables', value: 10, color: '#8B5CF6' },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 1250, revenue: '$162,500' },
  { name: 'Smart Watch', sales: 890, revenue: '$266,890' },
  { name: 'Bluetooth Speaker', sales: 675, revenue: '$53,925' },
  { name: 'Laptop Stand', sales: 543, revenue: '$27,150' },
  { name: 'USB-C Cable', sales: 432, revenue: '$8,640' },
];

export default function AnalyticsPage() {
  const averageRating = 4.6;
  const totalReviews = 250;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your business performance and key metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$111,000</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600 ml-1">+15.3%</span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">1,292</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600 ml-1">+8.2%</span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Customers</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-600 ml-1">-2.4%</span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">$86.42</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600 ml-1">+5.7%</span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart Placeholder */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Sales Trend</h2>
            <p className="text-sm text-gray-600">Monthly sales and order volume over time</p>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 mb-2">📊</div>
                <p className="text-gray-500 text-sm">Sales chart visualization</p>
                <p className="text-gray-400 text-xs">Integration with charts library</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Category Distribution</h2>
            <p className="text-sm text-gray-600">Sales by product category</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          backgroundColor: item.color,
                          width: `${item.value}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Growth Chart */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Growth</h2>
          <p className="text-sm text-gray-600">Monthly revenue growth over the past 6 months</p>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 mb-2">📈</div>
              <p className="text-gray-500 text-sm">Revenue growth chart</p>
              <p className="text-gray-400 text-xs">Detailed analytics visualization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Products</h2>
          <p className="text-sm text-gray-600">Best selling products by volume and revenue</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                  <p className="text-sm text-gray-500">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}