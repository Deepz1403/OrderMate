'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { AlertTriangle, AlertCircle, CheckCircle, Clock, Bug, Activity, Search, RefreshCw, Eye, Calendar, User, Globe, Code, Hash, Users } from 'lucide-react';
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
  stack_trace?: string;
  user_agent?: string;
  ip_address?: string;
  resolved_at?: string;
  resolved_by?: string;
  created_at: string;
  updated_at: string;
}

const getSeverityConfig = (severity: string) => {
  switch (severity) {
    case 'critical':
      return {
        color: 'bg-red-500 text-white border-red-600',
        icon: <AlertTriangle className="w-3 h-3" />,
        bgColor: 'bg-red-50 border-red-200',
        textColor: 'text-red-800'
      };
    case 'high':
      return {
        color: 'bg-orange-500 text-white border-orange-600',
        icon: <AlertCircle className="w-3 h-3" />,
        bgColor: 'bg-orange-50 border-orange-200',
        textColor: 'text-orange-800'
      };
    case 'medium':
      return {
        color: 'bg-yellow-500 text-white border-yellow-600',
        icon: <Clock className="w-3 h-3" />,
        bgColor: 'bg-yellow-50 border-yellow-200',
        textColor: 'text-yellow-800'
      };
    case 'low':
      return {
        color: 'bg-blue-500 text-white border-blue-600',
        icon: <Bug className="w-3 h-3" />,
        bgColor: 'bg-blue-50 border-blue-200',
        textColor: 'text-blue-800'
      };
    default:
      return {
        color: 'bg-gray-500 text-white border-gray-600',
        icon: <Bug className="w-3 h-3" />,
        bgColor: 'bg-gray-50 border-gray-200',
        textColor: 'text-gray-800'
      };
  }
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'active':
      return {
        color: 'bg-red-100 text-red-800 border-red-300',
        icon: <AlertCircle className="w-3 h-3" />,
        label: 'Active Issue'
      };
    case 'resolved':
      return {
        color: 'bg-green-100 text-green-800 border-green-300',
        icon: <CheckCircle className="w-3 h-3" />,
        label: 'Resolved'
      };
    case 'monitoring':
      return {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        icon: <Eye className="w-3 h-3" />,
        label: 'Monitoring'
      };
    case 'investigating':
      return {
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        icon: <Search className="w-3 h-3" />,
        label: 'Under Investigation'
      };
    default:
      return {
        color: 'bg-gray-100 text-gray-800 border-gray-300',
        icon: <Bug className="w-3 h-3" />,
        label: status
      };
  }
};

const getCategoryConfig = (category: string) => {
  const configs = {
    database: { icon: <Activity className="w-4 h-4" />, color: 'bg-purple-100 text-purple-800', label: 'Database' },
    payment: { icon: <AlertTriangle className="w-4 h-4" />, color: 'bg-red-100 text-red-800', label: 'Payment' },
    storage: { icon: <Globe className="w-4 h-4" />, color: 'bg-blue-100 text-blue-800', label: 'Storage' },
    api: { icon: <Code className="w-4 h-4" />, color: 'bg-green-100 text-green-800', label: 'API' },
    email: { icon: <Bug className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-800', label: 'Email' },
    server: { icon: <Activity className="w-4 h-4" />, color: 'bg-gray-100 text-gray-800', label: 'Server' },
    network: { icon: <Globe className="w-4 h-4" />, color: 'bg-indigo-100 text-indigo-800', label: 'Network' },
    auth: { icon: <User className="w-4 h-4" />, color: 'bg-pink-100 text-pink-800', label: 'Authentication' }
  };
  return configs[category as keyof typeof configs] || configs.server;
};

const formatDateTime = (dateStr: string) => {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return dateStr;
  }
};

const formatRelativeTime = (dateStr: string) => {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Recently';
  } catch {
    return dateStr;
  }
};

const StatsCard = ({ title, value, subtitle, icon, color, trend }: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}) => (
  <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
          {trend && (
            <p className="text-xs text-green-600 font-medium">{trend}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const ErrorCard = ({ error, onViewDetails }: { error: ErrorDetails; onViewDetails: (error: ErrorDetails) => void }) => {
  const severityConfig = getSeverityConfig(error.severity);
  const statusConfig = getStatusConfig(error.status);
  const categoryConfig = getCategoryConfig(error.category);

  return (
    <Card className={`border-l-4 hover:shadow-md transition-all duration-200 ${severityConfig.bgColor}`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${severityConfig.color}`}>
                {severityConfig.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{error.title}</h3>
                  <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                    {error.error_id}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{error.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={severityConfig.color}>
                    {severityConfig.icon}
                    <span className="ml-1 capitalize">{error.severity}</span>
                  </Badge>
                  <Badge className={statusConfig.color}>
                    {statusConfig.icon}
                    <span className="ml-1">{statusConfig.label}</span>
                  </Badge>
                  <Badge className={categoryConfig.color}>
                    {categoryConfig.icon}
                    <span className="ml-1">{categoryConfig.label}</span>
                  </Badge>
                </div>
              </div>
            </div>
            <button
              onClick={() => onViewDetails(error)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              <Eye className="w-3 h-3" />
              View Details
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Hash className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-medium text-gray-500">Frequency</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{error.frequency.toLocaleString()}</p>
              <p className="text-xs text-gray-500">occurrences</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Users className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-medium text-gray-500">Impact</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{error.affected_users.toLocaleString()}</p>
              <p className="text-xs text-gray-500">users affected</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Calendar className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-medium text-gray-500">First Seen</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{formatRelativeTime(error.created_at)}</p>
              <p className="text-xs text-gray-500">{formatDateTime(error.created_at).split(',')[0]}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-medium text-gray-500">Last Update</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{formatRelativeTime(error.updated_at)}</p>
              <p className="text-xs text-gray-500">{formatDateTime(error.updated_at).split(',')[0]}</p>
            </div>
          </div>

          {/* Resolution Info */}
          {error.resolved_at && error.resolved_by && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Resolved by {error.resolved_by}
                  </span>
                </div>
                <span className="text-sm text-green-600">
                  {formatDateTime(error.resolved_at)}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ErrorDetailsModal = ({ error, isOpen, onClose }: {
  error: ErrorDetails | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !error) return null;

  const severityConfig = getSeverityConfig(error.severity);
  const statusConfig = getStatusConfig(error.status);
  const categoryConfig = getCategoryConfig(error.category);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className={`p-6 text-white ${severityConfig.color.includes('red') ? 'bg-red-600' : 
          severityConfig.color.includes('orange') ? 'bg-orange-600' :
          severityConfig.color.includes('yellow') ? 'bg-yellow-600' : 'bg-blue-600'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{error.title}</h2>
              <p className="text-sm opacity-90">Error ID: {error.error_id}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Error Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Error Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-gray-900 mt-1">{error.description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Severity</label>
                    <div className="mt-1">
                      <Badge className={severityConfig.color}>
                        {severityConfig.icon}
                        <span className="ml-1 capitalize">{error.severity}</span>
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      <Badge className={statusConfig.color}>
                        {statusConfig.icon}
                        <span className="ml-1">{statusConfig.label}</span>
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Category</label>
                    <div className="mt-1">
                      <Badge className={categoryConfig.color}>
                        {categoryConfig.icon}
                        <span className="ml-1">{categoryConfig.label}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact & Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact Analysis</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Hash className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-800">Frequency</span>
                    </div>
                    <p className="text-2xl font-bold text-red-900">{error.frequency.toLocaleString()}</p>
                    <p className="text-sm text-red-600">Total occurrences</p>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-orange-800">Users Affected</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-900">{error.affected_users.toLocaleString()}</p>
                    <p className="text-sm text-orange-600">Unique users impacted</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Timeline</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">First Occurred</span>
                    </div>
                    <p className="text-sm font-medium text-blue-900">{formatDateTime(error.created_at)}</p>
                    <p className="text-xs text-blue-600">{formatRelativeTime(error.created_at)}</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-800">Last Update</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{formatDateTime(error.updated_at)}</p>
                    <p className="text-xs text-gray-600">{formatRelativeTime(error.updated_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            {(error.stack_trace || error.user_agent || error.ip_address) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {error.stack_trace && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Stack Trace</label>
                      <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded mt-1 overflow-x-auto">
                        {error.stack_trace}
                      </pre>
                    </div>
                  )}
                  
                  {error.user_agent && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">User Agent</label>
                      <p className="text-sm text-gray-900 mt-1 font-mono bg-white p-2 rounded border">
                        {error.user_agent}
                      </p>
                    </div>
                  )}
                  
                  {error.ip_address && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">IP Address</label>
                      <p className="text-sm text-gray-900 mt-1 font-mono">
                        {error.ip_address}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Resolution Information */}
            {error.resolved_at && error.resolved_by && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Resolution Details</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Issue Resolved</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Resolved By</label>
                      <p className="text-sm font-medium text-green-900">{error.resolved_by}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Resolution Date</label>
                      <p className="text-sm font-medium text-green-900">{formatDateTime(error.resolved_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [selectedError, setSelectedError] = useState<ErrorDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 6;

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
        setFilteredErrors(data.errors);
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
  const errorStats = {
    total: errors.length,
    active: errors.filter(e => e.status === 'active').length,
    resolved: errors.filter(e => e.status === 'resolved').length,
    critical: errors.filter(e => e.severity === 'critical').length,
    investigating: errors.filter(e => e.status === 'investigating').length,
    totalAffected: errors.reduce((sum, e) => sum + e.affected_users, 0),
    avgFrequency: errors.length > 0 ? Math.round(errors.reduce((sum, e) => sum + e.frequency, 0) / errors.length) : 0
  };

  // Pagination
  const totalPages = Math.ceil(filteredErrors.length / itemsPerPage);
  const indexOfLastError = currentPage * itemsPerPage;
  const indexOfFirstError = indexOfLastError - itemsPerPage;
  const currentErrors = filteredErrors.slice(indexOfFirstError, indexOfLastError);

  const handleViewDetails = (error: ErrorDetails) => {
    setSelectedError(error);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Error Monitoring</h1>
            <p className="text-gray-600">System error tracking and analysis</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
            <p className="text-gray-500">Loading error data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Error Monitoring</h1>
            <p className="text-gray-600">System error tracking and analysis</p>
          </div>
        </div>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <p className="text-red-800 font-medium">Failed to load error data</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button 
              onClick={fetchErrors}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Error Monitoring</h1>
          <p className="text-gray-600">System error tracking and analysis dashboard</p>
        </div>
        <button
          onClick={fetchErrors}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Errors"
          value={errorStats.active}
          subtitle="Requiring attention"
          icon={<AlertCircle className="w-6 h-6 text-red-600" />}
          color="bg-red-100"
          trend={errorStats.active > 0 ? "Needs action" : "All clear"}
        />
        <StatsCard
          title="Critical Issues"
          value={errorStats.critical}
          subtitle="High priority fixes"
          icon={<AlertTriangle className="w-6 h-6 text-orange-600" />}
          color="bg-orange-100"
        />
        <StatsCard
          title="Total Users Affected"
          value={errorStats.totalAffected.toLocaleString()}
          subtitle="Across all errors"
          icon={<Users className="w-6 h-6 text-purple-600" />}
          color="bg-purple-100"
        />
        <StatsCard
          title="Resolved Issues"
          value={errorStats.resolved}
          subtitle="Successfully fixed"
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          color="bg-green-100"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Filter & Search Errors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </CardContent>
      </Card>

      {/* Error List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Error Reports ({filteredErrors.length} total)
        </h2>
        {currentErrors.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentErrors.map((error) => (
              <ErrorCard
                key={error._id}
                error={error}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <Card className="border-gray-200">
            <CardContent className="py-12 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No errors found</h3>
              <p className="text-gray-500">
                {errors.length === 0 
                  ? "System is running smoothly with no errors reported!"
                  : "No errors match your current filter criteria."
                }
              </p>
            </CardContent>
          </Card>
        )}
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
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
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

      {/* Error Details Modal */}
      <ErrorDetailsModal
        error={selectedError}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}