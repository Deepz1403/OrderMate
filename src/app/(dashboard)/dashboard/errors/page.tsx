'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { AlertTriangle, AlertCircle, CheckCircle, Clock, Bug, Activity, Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";

interface ErrorDetails {
  _id: string;
  error_id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'monitoring' | 'investigating';
  category: 'database' | 'payment' | 'storage' | 'api' | 'email' | 'server' | 'network' | 'auth';
  frequency: number;
  affected_users: number;
  resolved_at?: string;
  resolved_by?: string;
  created_at: string;
  updated_at: string;
}

interface ErrorStats {
  total: number;
  active: number;
  resolved: number;
  critical: number;
  investigating: number;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'high':
      return 'bg-orange-100 text-orange-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
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
    case 'investigating':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'database':
      return 'bg-purple-100 text-purple-800';
    case 'payment':
      return 'bg-red-100 text-red-800';
    case 'storage':
      return 'bg-blue-100 text-blue-800';
    case 'api':
      return 'bg-green-100 text-green-800';
    case 'email':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const StatsCard = ({ title, value, subtitle, icon, color }: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      <div className={`h-12 w-12 ${color} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

export default function ErrorsPage() {
  const [errors, setErrors] = useState<ErrorDetails[]>([]);
  const [filteredErrors, setFilteredErrors] = useState<ErrorDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchErrors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/errors');
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.errors) {
        setErrors(data.errors);
      } else {
        setError('API returned success: false');
      }
    } catch (error) {
      console.error('Error fetching errors:', error);
      setError('Failed to load errors: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchErrors();
  }, [fetchErrors]);

  // Filter errors
  useEffect(() => {
    const filtered = errors.filter((item) => {
      const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.error_id || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = severityFilter === 'all' || item.severity === severityFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      
      return matchesSearch && matchesSeverity && matchesStatus && matchesCategory;
    });
    
    setFilteredErrors(filtered);
    setCurrentPage(1);
  }, [errors, searchTerm, severityFilter, statusFilter, categoryFilter]);

  // Calculate stats
  const errorStats: ErrorStats = {
    total: errors.length,
    active: errors.filter(e => e.status === 'active').length,
    resolved: errors.filter(e => e.status === 'resolved').length,
    critical: errors.filter(e => e.severity === 'critical').length,
    investigating: errors.filter(e => e.status === 'investigating').length,
  };

  // Severity distribution
  const severityDistribution = ['critical', 'high', 'medium', 'low'].map(severity => {
    const count = errors.filter(e => e.severity === severity).length;
    const percentage = errors.length > 0 ? Math.round((count / errors.length) * 100) : 0;
    return { severity, count, percentage };
  });

  // Pagination
  const totalPages = Math.ceil(filteredErrors.length / itemsPerPage);
  const indexOfLastError = currentPage * itemsPerPage;
  const indexOfFirstError = indexOfLastError - itemsPerPage;
  const currentErrors = filteredErrors.slice(indexOfFirstError, indexOfLastError);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Error Monitoring</h1>
          <p className="text-gray-600">Monitor system errors and track application health</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading errors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Error Monitoring</h1>
          <p className="text-gray-600">Monitor system errors and track application health</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="text-center">
            <p className="text-red-800 font-medium">Error loading system errors</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button 
              onClick={fetchErrors}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Error Monitoring</h1>
        <p className="text-gray-600">Monitor system errors and track application health</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Active Errors"
          value={errorStats.active}
          subtitle="Currently unresolved"
          icon={<AlertCircle className="w-6 h-6 text-red-600" />}
          color="bg-red-50"
        />
        <StatsCard
          title="Critical Issues"
          value={errorStats.critical}
          subtitle="Require immediate attention"
          icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
          color="bg-red-50"
        />
        <StatsCard
          title="Resolved"
          value={errorStats.resolved}
          subtitle="Successfully fixed"
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          color="bg-green-50"
        />
        <StatsCard
          title="Investigating"
          value={errorStats.investigating}
          subtitle="Under investigation"
          icon={<Activity className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
        />
      </div>

      {/* Severity Distribution and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Severity Distribution</h2>
            <p className="text-sm text-gray-600">Breakdown of error severity levels</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {severityDistribution.map((item) => (
                <div key={item.severity} className="flex items-center">
                  <div className="flex items-center w-20">
                    <span className="text-sm font-medium text-gray-700 capitalize">{item.severity}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.severity === 'critical' ? 'bg-red-600' :
                          item.severity === 'high' ? 'bg-orange-600' :
                          item.severity === 'medium' ? 'bg-yellow-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-medium text-gray-900">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Error Filters</h2>
            <p className="text-sm text-gray-600">Filter and search system errors</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search errors..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="monitoring">Monitoring</option>
                <option value="investigating">Investigating</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="database">Database</option>
                <option value="payment">Payment</option>
                <option value="storage">Storage</option>
                <option value="api">API</option>
                <option value="email">Email</option>
                <option value="server">Server</option>
                <option value="network">Network</option>
                <option value="auth">Authentication</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Error List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">System Errors</h2>
          <p className="text-sm text-gray-600">Recent system errors and their details</p>
        </div>
        <div className="p-6">
          {currentErrors.length > 0 ? (
            <div className="space-y-4">
              {currentErrors.map((item) => (
                <div key={item._id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <Bug className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                          <span className="text-xs text-gray-500">({item.error_id})</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        <Badge className={getSeverityColor(item.severity)}>
                          {item.severity}
                        </Badge>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Frequency</p>
                      <p className="text-sm text-gray-900">{item.frequency} times</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Affected Users</p>
                      <p className="text-sm text-gray-900">{item.affected_users}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">First Occurred</p>
                      <p className="text-sm text-gray-900">{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Last Updated</p>
                      <p className="text-sm text-gray-900">{new Date(item.updated_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {item.resolved_at && item.resolved_by && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-gray-500">Resolved by</p>
                          <p className="text-sm text-gray-900">{item.resolved_by}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">Resolution Date</p>
                          <p className="text-sm text-gray-900">{new Date(item.resolved_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No errors found</p>
              <p className="text-gray-400 text-sm">System is running smoothly!</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-6 py-3">
          <div className="text-sm text-gray-700">
            Showing {indexOfFirstError + 1} to {Math.min(indexOfLastError, filteredErrors.length)} of {filteredErrors.length} errors
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm rounded-md ${currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}