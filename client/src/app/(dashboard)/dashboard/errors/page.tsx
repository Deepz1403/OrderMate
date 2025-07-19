import { AlertTriangle, AlertCircle, CheckCircle, Clock, ArrowUp, ArrowDown, Activity, Bug } from 'lucide-react';

const errorData = [
  {
    id: 'ERR-001',
    title: 'Database Connection Timeout',
    description: 'Connection to PostgreSQL database timed out after 30 seconds',
    severity: 'high',
    status: 'active',
    timestamp: '2024-01-15 14:32:15',
    frequency: 12,
    affectedUsers: 145,
    category: 'database'
  },
  {
    id: 'ERR-002',
    title: 'Payment Gateway Error',
    description: 'Stripe payment processing failed with invalid card error',
    severity: 'critical',
    status: 'active',
    timestamp: '2024-01-15 14:28:45',
    frequency: 8,
    affectedUsers: 89,
    category: 'payment'
  },
  {
    id: 'ERR-003',
    title: 'Image Upload Failed',
    description: 'File upload to S3 bucket failed due to size limit exceeded',
    severity: 'medium',
    status: 'resolved',
    timestamp: '2024-01-15 13:45:22',
    frequency: 25,
    affectedUsers: 32,
    category: 'storage'
  },
  {
    id: 'ERR-004',
    title: 'API Rate Limit Exceeded',
    description: 'External API rate limit exceeded for product information service',
    severity: 'low',
    status: 'monitoring',
    timestamp: '2024-01-15 12:15:30',
    frequency: 156,
    affectedUsers: 12,
    category: 'api'
  },
  {
    id: 'ERR-005',
    title: 'Email Service Disruption',
    description: 'SMTP server connection failed - unable to send order confirmations',
    severity: 'high',
    status: 'active',
    timestamp: '2024-01-15 11:22:18',
    frequency: 34,
    affectedUsers: 267,
    category: 'email'
  },
];

const systemHealth = [
  { service: 'Web Server', status: 'healthy', uptime: '99.9%', responseTime: '245ms' },
  { service: 'Database', status: 'warning', uptime: '98.7%', responseTime: '1.2s' },
  { service: 'Payment Gateway', status: 'down', uptime: '94.2%', responseTime: '5.8s' },
  { service: 'File Storage', status: 'healthy', uptime: '99.8%', responseTime: '156ms' },
  { service: 'Email Service', status: 'warning', uptime: '97.3%', responseTime: '2.1s' },
];

const errorStats = [
  { period: 'Last Hour', critical: 2, high: 5, medium: 12, low: 8 },
  { period: 'Last 24 Hours', critical: 8, high: 23, medium: 67, low: 45 },
  { period: 'Last Week', critical: 15, high: 89, medium: 234, low: 178 },
];

export default function ErrorsPage() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'monitoring':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStatus = (status: string) => {
    switch (status) {
      case 'healthy':
        return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
      case 'warning':
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertTriangle };
      case 'down':
        return { color: 'text-red-600', bg: 'bg-red-100', icon: AlertCircle };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', icon: Clock };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Error Monitoring</h1>
        <p className="text-gray-600">Monitor system errors and track application health</p>
      </div>

      {/* Error Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Errors</p>
              <p className="text-2xl font-bold text-gray-900">27</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-600 ml-1">+5</span>
                <span className="text-sm text-gray-500 ml-2">last hour</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Issues</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-600 ml-1">+1</span>
                <span className="text-sm text-gray-500 ml-2">since yesterday</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Uptime</p>
              <p className="text-2xl font-bold text-gray-900">98.7%</p>
              <div className="flex items-center mt-2">
                <ArrowDown className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-600 ml-1">-0.3%</span>
                <span className="text-sm text-gray-500 ml-2">this month</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-gray-900">2.4h</p>
              <div className="flex items-center mt-2">
                <ArrowDown className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600 ml-1">-0.6h</span>
                <span className="text-sm text-gray-500 ml-2">improvement</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* System Health Status */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
          <p className="text-sm text-gray-600">Current status of all system components</p>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {systemHealth.map((service) => {
              const statusConfig = getHealthStatus(service.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={service.service} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 ${statusConfig.bg} rounded-lg flex items-center justify-center mr-4`}>
                      <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{service.service}</p>
                      <p className="text-sm text-gray-500">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${statusConfig.color}`}>
                      {service.status === 'healthy' ? 'Healthy' : 
                       service.status === 'warning' ? 'Warning' : 'Down'}
                    </p>
                    <p className="text-sm text-gray-500">{service.responseTime}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Error Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Error Statistics</h2>
          <p className="text-sm text-gray-600">Error counts by severity and time period</p>
        </div>
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Critical
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    High
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medium
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Low
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {errorStats.map((stat) => (
                  <tr key={stat.period} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{stat.period}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        {stat.critical}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        {stat.high}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {stat.medium}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {stat.low}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {stat.critical + stat.high + stat.medium + stat.low}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Errors */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Errors</h2>
          <p className="text-sm text-gray-600">Latest system errors and their details</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {errorData.map((error) => (
              <div key={error.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <Bug className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{error.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{error.description}</p>
                      <p className="text-xs text-gray-500 mt-2">Error ID: {error.id}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(error.severity)}`}>
                      {error.severity}
                    </span>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(error.status)}`}>
                      {error.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Frequency</p>
                    <p className="text-sm text-gray-900">{error.frequency} times</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Affected Users</p>
                    <p className="text-sm text-gray-900">{error.affectedUsers}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Category</p>
                    <p className="text-sm text-gray-900 capitalize">{error.category}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">First Occurred</p>
                    <p className="text-sm text-gray-900">{error.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}