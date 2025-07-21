'use client'
import React, { useState, useEffect } from 'react'
import { Search, Filter, RefreshCw, Package, Timer, CheckCircle, AlertCircle, X, Calendar, Clock, User, Mail, Truck, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Product {
    name: string;
    quantity: number;
}

interface OrderDetails {
    _id: string;
    date: string;
    time: string;
    products: Product[];
    status: string;
    orderLink: string;
    email: string;
    name: string;
}

const getStatusBadgeColor = (status: string) => {
  const statusLower = status.toLowerCase().trim();
  switch (statusLower) {
    case "fulfilled":
      return "bg-green-100 text-green-800 border border-green-200";
    case "partial fulfillment":
      return "bg-purple-100 text-purple-800 border border-purple-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  const statusLower = status.toLowerCase().trim();
  switch (statusLower) {
    case "fulfilled":
      return <CheckCircle className="w-3 h-3 text-green-600" />;
    case "partial fulfillment":
      return <Truck className="w-3 h-3 text-purple-600" />;
    case "pending":
      return <Timer className="w-3 h-3 text-yellow-600" />;
    default:
      return <AlertCircle className="w-3 h-3 text-gray-600" />;
  }
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'No date';
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return dateStr;
    }
    
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

const formatTime = (timeStr: string) => {
  if (!timeStr) return '';
  
  try {
    const [hours, minutes] = timeStr.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 % 12 || 12;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  } catch {
    return timeStr;
  }
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<OrderDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch orders: ${response.status}`);
                }
                
                const data = await response.json();
                
                setOrders(data.orders || []);
                setFilteredOrders(data.orders || []);
                setError(null);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError(error instanceof Error ? error.message : 'Unknown error');
                setOrders([]);
                setFilteredOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Filter orders based on search and filters
    useEffect(() => {
        const filtered = orders.filter(order => {
            const matchesSearch = searchTerm === '' || 
                (order.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
                (order.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
                (order._id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
                (order.orderLink?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false);

            const matchesStatus = statusFilter === 'all' || 
                order.status?.toLowerCase() === statusFilter.toLowerCase();

            const matchesDate = dateFilter === '' || order.date === dateFilter;

            return matchesSearch && matchesStatus && matchesDate;
        });

        setFilteredOrders(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, statusFilter, dateFilter, orders]);
    // Open order details modal
    const openOrderModal = (order: OrderDetails) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    // Close order details modal
    const closeOrderModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    };

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            
            if (response.ok) {
                const result = await response.json();
                setOrders(prev => 
                    prev.map(o => 
                        o._id === orderId 
                            ? { ...o, status: newStatus }
                            : o
                    )
                );
                console.log('Order status updated successfully:', result.message);
            } else {
                const errorData = await response.json();
                console.error('Failed to update order:', errorData.error);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const orderStats = {
        total: orders.length,
        pendingFulfillment: orders.filter(order => order.status === 'pending').length,
        fulfilled: orders.filter(order => order.status === 'fulfilled').length,
        partiallyFulfilled: orders.filter(order => order.status === 'partial fulfillment').length,
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-center h-64">
                    <div className="flex items-center gap-2">
                        <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
                        <span className="text-gray-600">Loading orders...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Orders</h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                    <p className="text-gray-600">Track and manage customer orders</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={async () => {
                            try {
                                const response = await fetch('/api/orders');
                                if (response.ok) {
                                    const data = await response.json();
                                    setOrders(data.orders || []);
                                    setFilteredOrders(data.orders || []);
                                    console.log('Orders refreshed from database');
                                }
                            } catch (error) {
                                console.error('Error refreshing orders:', error);
                            }
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
                            <p className="text-sm text-gray-500">All time orders</p>
                        </div>
                        <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-blue-50">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">{orderStats.pendingFulfillment}</p>
                            <p className="text-sm text-gray-500">Awaiting processing</p>
                        </div>
                        <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-yellow-50">
                            <Timer className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Fulfilled</p>
                            <p className="text-2xl font-bold text-gray-900">{orderStats.fulfilled}</p>
                            <p className="text-sm text-gray-500">Successfully completed</p>
                        </div>
                        <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-green-50">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Partial Fulfillment</p>
                            <p className="text-2xl font-bold text-gray-900">{orderStats.partiallyFulfilled}</p>
                            <p className="text-sm text-gray-500">Partially completed</p>
                        </div>
                        <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-purple-50">
                            <Truck className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Order Filters
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search orders..."
                                className="pl-10 h-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="fulfilled">Fulfilled</option>
                            <option value="partial fulfillment">Partial Fulfillment</option>
                        </select>
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                placeholder="Filter by date"
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('all');
                                    setDateFilter('');
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium bg-white text-gray-700 border border-gray-300"
                            >
                                <X className="w-4 h-4" />
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Orders List */}
            <div className="space-y-4">
                {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                        <Card key={order._id} className="bg-white border border-gray-200">
                            <CardContent className="p-4">
                                <div className="space-y-4">
                                    {/* Header Row */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center shadow-md">
                                                <Package className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        #{order._id.slice(-8).toUpperCase()}
                                                    </h3>
                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                                                        {getStatusIcon(order.status)}
                                                        <span className="capitalize">{order.status}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{formatDate(order.date)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{formatTime(order.time)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => openOrderModal(order)}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View Details
                                            </button>
                                        </div>
                                    </div>

                                    {/* Summary Row - Always Visible */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 border-t border-gray-100">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-emerald-600" />
                                                <span className="text-xs font-medium text-gray-500 uppercase">Customer</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{order.name}</p>
                                                <p className="text-sm text-gray-600">{order.email}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Package className="h-4 w-4 text-blue-600" />
                                                <span className="text-xs font-medium text-gray-500 uppercase">Items</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{order.products.length} Products</p>
                                                <p className="text-sm text-gray-600">
                                                    {order.products.reduce((total, product) => total + product.quantity, 0)} Total Qty
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <RefreshCw className="h-4 w-4 text-blue-600" />
                                                <span className="text-xs font-medium text-gray-500 uppercase">Status</span>
                                            </div>
                                            <select
                                                className="w-full bg-white border border-gray-300 rounded-md px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="fulfilled">Fulfilled</option>
                                                <option value="partial fulfillment">Partial Fulfillment</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card className="bg-white border border-gray-200">
                        <CardContent className="text-center py-12">
                            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                            <p className="text-gray-600 mb-4">No orders match your current filters.</p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {filteredOrders.length > ordersPerPage && (
                    <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-6 py-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            currentPage === page
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <Package className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Order #{selectedOrder._id.slice(-8).toUpperCase()}
                                    </h2>
                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeColor(selectedOrder.status)}`}>
                                        {getStatusIcon(selectedOrder.status)}
                                        <span className="capitalize">{selectedOrder.status}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={closeOrderModal}
                                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Customer Information */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <User className="h-5 w-5 text-emerald-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Name</label>
                                        <p className="text-gray-900 font-medium">{selectedOrder.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email</label>
                                        <p className="text-gray-900 font-medium">{selectedOrder.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Information */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Calendar className="h-5 w-5 text-indigo-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Order Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Order Date</label>
                                        <p className="text-gray-900 font-medium">{formatDate(selectedOrder.date)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Order Time</label>
                                        <p className="text-gray-900 font-medium">{formatTime(selectedOrder.time)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Order Link</label>
                                        <p className="text-gray-900 font-medium break-all">{selectedOrder.orderLink}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Package className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Order Items ({selectedOrder.products.length})</h3>
                                </div>
                                <div className="space-y-3">
                                    {selectedOrder.products.length > 0 ? (
                                        selectedOrder.products.map((product, index) => (
                                            <div key={index} className="flex items-center justify-between bg-white rounded-md p-4 border border-gray-200">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                                        <Package className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-lg">{product.name}</p>
                                                        <p className="text-sm text-gray-500">Product #{index + 1}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-medium text-gray-600">Quantity: </span>
                                                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md font-medium text-sm border">
                                                        {product.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                            <p className="text-lg">No products listed for this order</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}