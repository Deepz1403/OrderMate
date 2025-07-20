'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { Star, MessageSquare, TrendingUp, TrendingDown, Users, Clock, Search, Filter, Eye, Package } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";

interface FeedbackDetails {
  _id: string;
  customer_name: string;
  customer_email: string;
  product_name?: string;
  order_id?: string;
  rating: number;
  comment: string;
  status: 'pending' | 'resolved' | 'in_review';
  helpful_votes: number;
  category: 'product' | 'service' | 'shipping' | 'support' | 'general';
  created_at: string;
  updated_at: string;
}

interface FeedbackStats {
  total: number;
  pending: number;
  resolved: number;
  in_review: number;
  average_rating: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'resolved':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in_review':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'product':
      return 'bg-blue-100 text-blue-800';
    case 'service':
      return 'bg-green-100 text-green-800';
    case 'shipping':
      return 'bg-yellow-100 text-yellow-800';
    case 'support':
      return 'bg-purple-100 text-purple-800';
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

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackDetails[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<FeedbackDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchFeedback = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/feedback');
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.feedback) {
        setFeedback(data.feedback);
      } else {
        setError('API returned success: false');
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setError('Failed to load feedback: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  // Filter feedback
  useEffect(() => {
    const filtered = feedback.filter((item) => {
      const matchesSearch = (item.customer_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.comment || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.product_name && item.product_name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
    
    setFilteredFeedback(filtered);
    setCurrentPage(1);
  }, [feedback, searchTerm, statusFilter, categoryFilter]);

  // Calculate stats
  const feedbackStats: FeedbackStats = {
    total: feedback.length,
    pending: feedback.filter(f => f.status === 'pending').length,
    resolved: feedback.filter(f => f.status === 'resolved').length,
    in_review: feedback.filter(f => f.status === 'in_review').length,
    average_rating: feedback.length > 0 ? 
      feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length : 0
  };

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = feedback.filter(f => f.rating === rating).length;
    const percentage = feedback.length > 0 ? Math.round((count / feedback.length) * 100) : 0;
    return { stars: rating, count, percentage };
  });

  // Pagination
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
  const indexOfLastFeedback = currentPage * itemsPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - itemsPerPage;
  const currentFeedback = filteredFeedback.slice(indexOfFirstFeedback, indexOfLastFeedback);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Feedback</h1>
          <p className="text-gray-600">Monitor and analyze customer reviews and ratings</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading feedback...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Feedback</h1>
          <p className="text-gray-600">Monitor and analyze customer reviews and ratings</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="text-center">
            <p className="text-red-800 font-medium">Error loading feedback</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button 
              onClick={fetchFeedback}
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
        <h1 className="text-2xl font-bold text-gray-900">Customer Feedback</h1>
        <p className="text-gray-600">Monitor and analyze customer reviews and ratings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Average Rating"
          value={feedbackStats.average_rating.toFixed(1)}
          subtitle="out of 5.0"
          icon={<Star className="w-6 h-6 text-yellow-600" />}
          color="bg-yellow-50"
        />
        <StatsCard
          title="Total Reviews"
          value={feedbackStats.total}
          subtitle="All time feedback"
          icon={<MessageSquare className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatsCard
          title="Pending"
          value={feedbackStats.pending}
          subtitle="Awaiting response"
          icon={<Clock className="w-6 h-6 text-yellow-600" />}
          color="bg-yellow-50"
        />
        <StatsCard
          title="Resolved"
          value={feedbackStats.resolved}
          subtitle="Successfully handled"
          icon={<Users className="w-6 h-6 text-green-600" />}
          color="bg-green-50"
        />
      </div>

      {/* Rating Distribution and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Rating Distribution</h2>
            <p className="text-sm text-gray-600">Breakdown of customer ratings</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center">
                  <div className="flex items-center w-16">
                    <span className="text-sm font-medium text-gray-700">{rating.stars}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-medium text-gray-900">{rating.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Feedback Filters</h2>
            <p className="text-sm text-gray-600">Filter and search feedback</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search feedback..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="in_review">In Review</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="product">Product</option>
                <option value="service">Service</option>
                <option value="shipping">Shipping</option>
                <option value="support">Support</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Customer Feedback</h2>
          <p className="text-sm text-gray-600">Recent customer reviews and ratings</p>
        </div>
        <div className="p-6">
          {currentFeedback.length > 0 ? (
            <div className="space-y-4">
              {currentFeedback.map((item) => (
                <div key={item._id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{item.customer_name}</h3>
                        <p className="text-sm text-gray-600">{item.customer_email}</p>
                        {item.product_name && (
                          <p className="text-sm text-gray-500 mt-1">Product: {item.product_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < item.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({item.rating})</span>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-900">{item.comment}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-xs text-gray-500">
                    <span>Submitted on {new Date(item.created_at).toLocaleDateString()}</span>
                    <span>{item.helpful_votes} helpful votes</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No feedback found</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-6 py-3">
          <div className="text-sm text-gray-700">
            Showing {indexOfFirstFeedback + 1} to {Math.min(indexOfLastFeedback, filteredFeedback.length)} of {filteredFeedback.length} feedback
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