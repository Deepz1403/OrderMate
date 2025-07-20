'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { AlertTriangle, AlertCircle, CheckCircle, Clock, Bug, Activity, Search, RefreshCw, Eye, Calendar, User, Globe, Code, Hash, Users, Database, CreditCard, HardDrive, Wifi, Mail, Server, Shield } from 'lucide-react';
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

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return "bg-red-100 text-red-800";
    case 'high':
      return "bg-orange-100 text-orange-800";
    case 'medium':
      return "bg-yellow-100 text-yellow-800";
    case 'low':
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return "bg-red-100 text-red-800";
    case 'resolved':
      return "bg-green-100 text-green-800";
    case 'monitoring':
      return "bg-yellow-100 text-yellow-800";
    case 'investigating':
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'database': return <Database className="w-4 h-4" />;
    case 'payment': return <CreditCard className="w-4 h-4" />;
    case 'storage': return <HardDrive className="w-4 h-4" />;
    case 'api': return <Code className="w-4 h-4" />;
    case 'email': return <Mail className="w-4 h-4" />;
    case 'server': return <Server className="w-4 h-4" />;
    case 'network': return <Wifi className="w-4 h-4" />;
    case 'auth': return <Shield className="w-4 h-4" />;
    default: return <Bug className="w-4 h-4" />;
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical': return <AlertTriangle className="w-3 h-3" />;
    case 'high': return <AlertCircle className="w-3 h-3" />;
    case 'medium': return <Clock className="w-3 h-3" />;
    case 'low': return <Bug className="w-3 h-3" />;
    default: return <Bug className="w-3 h-3" />;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return <AlertCircle className="w-3 h-3" />;
    case 'resolved': return <CheckCircle className="w-3 h-3" />;
    case 'monitoring': return <Eye className="w-3 h-3" />;
    case 'investigating': return <Search className="w-3 h-3" />;
    default: return <Bug className="w-3 h-3" />;
  }
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
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const CategoryStatsGrid = ({ errors }: { errors: ErrorDetails[] }) => {
  const categories = ['database', 'payment', 'storage', 'api', 'email', 'server', 'network', 'auth'] as const;
  
  const categoryStats = categories.map(category => {
    const categoryErrors = errors.filter(e => e.category === category);
    const activeErrors = categoryErrors.filter(e => e.status === 'active');
    return {
      category,
      total: categoryErrors.length,
      active: activeErrors.length,
      icon: getCategoryIcon(category)
    };
  }).filter(stat => stat.total > 0);

  if (categoryStats.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {categoryStats.map(stat => (
        <StatsCard
          key={stat.category}
          title={`${stat.category.charAt(0).toUpperCase() + stat.category.slice(1)} Errors`}
          value={stat.total}
          subtitle={`${stat.active} active errors`}
          icon={stat.icon}
          color="bg-blue-50"
        />
      ))}
    </div>
  );
};

const ErrorCard = ({ error, onViewDetails }: { error: ErrorDetails; onViewDetails: (error: ErrorDetails) => void }) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm mb-4">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                {getCategoryIcon(error.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{error.title}</h3>
                  <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                    {error.error_id}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{error.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getSeverityColor(error.severity)}>
                    {getSeverityIcon(error.severity)}
                    <span className="ml-1 capitalize">{error.severity}</span>
                  </Badge>
                  <Badge className={getStatusColor(error.status)}>
                    {getStatusIcon(error.status)}
                    <span className="ml-1 capitalize">{error.status}</span>
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800">
                    {getCategoryIcon(error.category)}
                    <span className="ml-1 capitalize">{error.category}</span>
                  </Badge>
                </div>
              </div>
            </div>
            <button
              onClick={() => onViewDetails(error)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              <Eye className="w-3 h-3" />
              Details
            </button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Hash className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-medium text-gray-500 uppercase">Frequency</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{error.frequency.toLocaleString()}</p>
              <p className="text-xs text-gray-500">occurrences</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Users className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-medium text-gray-500 uppercase">Impact</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{error.affected_users.toLocaleString()}</p>
              <p className="text-xs text-gray-500">users affected</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Calendar className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-medium text-gray-500 uppercase">First Seen</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{formatRelativeTime(error.created_at)}</p>
              <p className="text-xs text-gray-500">{formatDateTime(error.created_at).split(',')[0]}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-medium text-gray-500 uppercase">Last Update</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{formatRelativeTime(error.updated_at)}</p>
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
                <span className="text-sm text-green-700">
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200">
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                {getCategoryIcon(error.category)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{error.title}</h2>
                <p className="text-blue-100">{error.category.charAt(0).toUpperCase() + error.category.slice(1)} Error • {error.error_id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Error Information */}
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Bug className="w-5 h-5 text-blue-600" />
                  Error Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-gray-900 mt-1">{error.description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Severity</label>
                    <div className="mt-1">
                      <Badge className={getSeverityColor(error.severity)}>
                        {getSeverityIcon(error.severity)}
                        <span className="ml-1 capitalize">{error.severity}</span>
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(error.status)}>
                        {getStatusIcon(error.status)}
                        <span className="ml-1 capitalize">{error.status}</span>
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Category</label>
                    <div className="mt-1">
                      <Badge className="bg-gray-100 text-gray-800">
                        {getCategoryIcon(error.category)}
                        <span className="ml-1 capitalize">{error.category}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact & Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                    Impact Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Hash className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Error Frequency</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{error.frequency.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total occurrences recorded</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Users Impacted</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{error.affected_users.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Unique users affected</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">First Seen</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{formatDateTime(error.created_at)}</p>
                    </div>
                    <p className="text-sm text-gray-500 ml-6">{formatRelativeTime(error.created_at)}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{formatDateTime(error.updated_at)}</p>
                    </div>
                    <p className="text-sm text-gray-500 ml-6">{formatRelativeTime(error.updated_at)}</p>
                  </div>

                  {error.resolved_at && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Resolved</label>
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <p className="text-gray-900">{formatDateTime(error.resolved_at)}</p>
                      </div>
                      {error.resolved_by && (
                        <p className="text-sm text-gray-500 ml-6">by {error.resolved_by}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Technical Details */}
            {(error.stack_trace || error.user_agent || error.ip_address) && (
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Code className="w-5 h-5 text-blue-600" />
                    Technical Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error.stack_trace && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Stack Trace</label>
                      <pre className="mt-2 bg-gray-50 rounded-lg p-4 text-xs text-gray-800 overflow-x-auto border border-gray-200">
                        {error.stack_trace}
                      </pre>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {error.user_agent && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">User Agent</label>
                        <p className="text-sm text-gray-900 mt-1 bg-gray-50 p-2 rounded border border-gray-200">
                          {error.user_agent}
                        </p>
                      </div>
                    )}
                    
                    {error.ip_address && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">IP Address</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <p className="text-gray-900">{error.ip_address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedError, setSelectedError] = useState<ErrorDetails | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Sample data for development
  const sampleErrors: ErrorDetails[] = [
    {
      _id: "67123abc456def789012",
      error_id: "ERR-2024-001",
      title: "Database Connection Timeout",
      description: "MongoDB connection timeout occurred during user authentication process",
      severity: "high",
      status: "active",
      category: "database",
      frequency: 127,
      affected_users: 45,
      stack_trace: "MongoTimeoutError: Server selection timed out after 30000 ms\n    at Timeout.<anonymous> (/app/node_modules/mongodb/lib/core/sdam/topology.js:438:30)",
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ip_address: "192.168.1.100",
      created_at: "2024-01-15T08:30:00Z",
      updated_at: "2024-01-20T14:22:00Z"
    },
    {
      _id: "67123abc456def789013",
      error_id: "ERR-2024-002",
      title: "Payment Gateway API Failure",
      description: "Stripe payment processing failed with invalid card number error",
      severity: "critical",
      status: "investigating",
      category: "payment",
      frequency: 89,
      affected_users: 67,
      resolved_at: "2024-01-19T10:15:00Z",
      resolved_by: "John Smith",
      created_at: "2024-01-18T16:45:00Z",
      updated_at: "2024-01-19T10:15:00Z"
    },
    {
      _id: "67123abc456def789014",
      error_id: "ERR-2024-003",
      title: "File Upload Service Unavailable",
      description: "AWS S3 bucket access denied during image upload process",
      severity: "medium",
      status: "resolved",
      category: "storage",
      frequency: 34,
      affected_users: 12,
      ip_address: "203.45.67.89",
      created_at: "2024-01-17T12:00:00Z",
      updated_at: "2024-01-18T09:30:00Z"
    },
    {
      _id: "67123abc456def789015",
      error_id: "ERR-2024-004",
      title: "API Rate Limit Exceeded",
      description: "External API rate limit reached causing service degradation",
      severity: "low",
      status: "monitoring",
      category: "api",
      frequency: 156,
      affected_users: 23,
      created_at: "2024-01-16T14:20:00Z",
      updated_at: "2024-01-20T11:10:00Z"
    },
    {
      _id: "67123abc456def789016",
      error_id: "ERR-2024-005",
      title: "Email Service Authentication Failed",
      description: "SMTP authentication failed when sending notification emails",
      severity: "medium",
      status: "active",
      category: "email",
      frequency: 78,
      affected_users: 34,
      created_at: "2024-01-19T09:15:00Z",
      updated_at: "2024-01-20T13:45:00Z"
    }
  ];

  const fetchErrors = async () => {
    try {
      setLoading(true);
      // For development, use sample data
      setErrors(sampleErrors);
      setFilteredErrors(sampleErrors);
    } catch (error) {
      console.error('Error fetching errors:', error);
      setErrors([]);
      setFilteredErrors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrors();
  }, []);

  // Filter errors based on search and filters
  useEffect(() => {
    const filtered = errors.filter(error => {
      const matchesSearch = searchTerm === '' || 
        error.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        error.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        error.error_id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = severityFilter === 'all' || error.severity === severityFilter;
      const matchesStatus = statusFilter === 'all' || error.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || error.category === categoryFilter;
      
      return matchesSearch && matchesSeverity && matchesStatus && matchesCategory;
    });
    
    setFilteredErrors(filtered);
  }, [errors, searchTerm, severityFilter, statusFilter, categoryFilter]);

  const handleViewDetails = useCallback((error: ErrorDetails) => {
    setSelectedError(error);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedError(null);
  }, []);

  const totalErrors = errors.length;
  const activeErrors = errors.filter(e => e.status === 'active').length;
  const resolvedErrors = errors.filter(e => e.status === 'resolved').length;
  const totalAffectedUsers = errors.reduce((sum, error) => sum + error.affected_users, 0);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Errors</h1>
          <p className="text-gray-600">Loading error reports...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Errors</h1>
        <p className="text-gray-600">Monitor and manage system errors and issues</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Errors"
          value={totalErrors}
          subtitle="All recorded errors"
          icon={<Bug className="h-6 w-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatsCard
          title="Active Issues"
          value={activeErrors}
          subtitle="Requiring attention"
          icon={<AlertTriangle className="h-6 w-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatsCard
          title="Resolved"
          value={resolvedErrors}
          subtitle="Successfully fixed"
          icon={<CheckCircle className="h-6 w-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatsCard
          title="Affected Users"
          value={totalAffectedUsers}
          subtitle="Total impact"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          color="bg-blue-50"
        />
      </div>

      {/* Category Stats */}
      <CategoryStatsGrid errors={errors} />

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search errors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
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
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="investigating">Investigating</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
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
      </div>

      {/* Error List */}
      <div className="space-y-4">
        {filteredErrors.length > 0 ? (
          filteredErrors.map((error) => (
            <ErrorCard
              key={error._id}
              error={error}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
            <Bug className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Errors Found</h3>
            <p className="text-gray-600">
              {searchTerm || severityFilter !== 'all' || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : 'No system errors have been recorded yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Error Details Modal */}
      <ErrorDetailsModal
        error={selectedError}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}