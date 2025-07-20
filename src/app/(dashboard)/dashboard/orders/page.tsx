'use client'
import React, { useState, useCallback, useMemo, memo, useEffect } from 'react'
import { Search, Filter, RefreshCw, Package, Calendar, User, Mail, Clock, Eye, X, ChevronDown, ChevronRight, TrendingUp, CheckCircle, AlertCircle, Timer } from 'lucide-react'
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";


interface Product {
    name: string;
    quantity: number;
};

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

interface OrderRowProps {
    order: OrderDetails;
    index: number;
    onStatusChange: (orderId: string, status: string) => void;
    onShowDetails: (order: OrderDetails) => void;
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
}

const getStatusColor = (status: string) => {
  const statusLower = status.toLowerCase().trim();
  switch (statusLower) {
    case "fulfilled":
    case "delivered":
    case "completed":
      return "default";
    case "pending":
    case "awaiting":
      return "secondary";
    case "processing":
    case "in progress":
    case "preparing":
      return "outline";
    case "cancelled":
    case "canceled":
    case "rejected":
      return "destructive";
    case "shipped":
    case "dispatched":
    case "out for delivery":
      return "secondary";
    default:
      return "outline";
  }
};

const getStatusIcon = (status: string) => {
  const statusLower = status.toLowerCase().trim();
  switch (statusLower) {
    case "fulfilled":
    case "delivered":
    case "completed":
      return <CheckCircle className="w-3 h-3 text-green-600" />;
    case "pending":
    case "awaiting":
      return <Timer className="w-3 h-3 text-yellow-600" />;
    case "processing":
    case "in progress":
    case "preparing":
      return <RefreshCw className="w-3 h-3 text-blue-600 animate-spin" />;
    case "cancelled":
    case "canceled":
    case "rejected":
      return <X className="w-3 h-3 text-red-600" />;
    default:
      return <AlertCircle className="w-3 h-3 text-gray-600" />;
  }
};
const getStatusBadgeColor = (status: string) => {
  const statusLower = status.toLowerCase().trim();
  switch (statusLower) {
    case "fulfilled":
    case "delivered":
    case "completed":
      return "bg-green-100 text-green-800 border border-green-200";
    case "pending":
    case "awaiting":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    case "processing":
    case "in progress":
    case "preparing":
      return "bg-blue-100 text-blue-800 border border-blue-200";
    case "cancelled":
    case "canceled":
    case "rejected":
      return "bg-red-100 text-red-800 border border-red-200";
    case "shipped":
    case "dispatched":
    case "out for delivery":
      return "bg-blue-100 text-blue-800 border border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200";
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

const OrderCard = memo(({ order, onStatusChange, onShowDetails }: OrderRowProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        onStatusChange(order._id, newStatus);
    }, [order, onStatusChange]);

    const getTotalProducts = (products: Product[]) => {
        return products.reduce((total, product) => total + product.quantity, 0);
    };

    const displayOrderId = (id: string) => {
        return `#${id.slice(-8).toUpperCase()}`;
    };

    return (
        <Card className="bg-white border border-gray-200 mb-4">
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
                                    <h3 className="text-lg font-semibold text-gray-900">{displayOrderId(order._id)}</h3>
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
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-blue-300 text-blue-700"
                            >
                                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                {isExpanded ? 'Less' : 'More'}
                            </button>
                            <button
                                onClick={() => onShowDetails(order)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm shadow-md"
                            >
                                <Eye className="w-3 h-3" />
                                Details
                            </button>
                        </div>
                    </div>

                    {/* Summary Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 py-3 border-t border-gray-100">
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
                                <p className="text-sm text-gray-600">{getTotalProducts(order.products)} Total Qty</p>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-orange-600" />
                                <span className="text-xs font-medium text-gray-500 uppercase">Order Link</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{order.orderLink}</p>
                                <p className="text-sm text-gray-600">External Reference</p>
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
                                onChange={handleStatusChange}
                            >
                                <option value="pending">Pending</option>
                                <option value="fulfilled">Fulfilled</option>
                                <option value="partially fulfilled">Partially Fulfilled</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                        <div className="border-t border-gray-100 pt-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Package className="h-4 w-4 text-blue-600" />
                                    <h4 className="font-medium text-gray-900">Order Items ({order.products.length})</h4>
                                </div>
                                <div className="space-y-2">
                                    {order.products.length > 0 ? (
                                        order.products.map((product, index) => (
                                            <div key={index} className="flex items-center justify-between bg-white rounded-md p-3 border border-gray-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                                                        <Package className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{product.name}</p>
                                                        <p className="text-sm text-gray-500">Product #{index + 1}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-medium text-gray-600">Qty: </span>
                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-medium text-sm">
                                                        {product.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-6 text-gray-500">
                                            <Package className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                            <p className="text-sm">No products listed for this order</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
});
OrderCard.displayName = 'OrderCard';

const ActionButton = memo(({ icon, label, onClick, variant = 'secondary' }: ActionButtonProps) => (
    <button
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium ${variant === 'primary'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
        aria-label={label}
    >
        {icon}
        <span>{label}</span>
    </button>
));
ActionButton.displayName = 'ActionButton';

const StatsCard = memo(({ title, value, subtitle, icon, color }: {
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
));
StatsCard.displayName = 'StatsCard';

const OrderDetailsModal = memo(({ order, isOpen, onClose }: {
    order: OrderDetails | null;
    isOpen: boolean;
    onClose: () => void;
}) => {
    if (!isOpen || !order) return null;

    const productsDisplay = () => {
        if (!order.products || order.products.length === 0) return [];
        return order.products;
    };

    const displayOrderId = (id: string) => {
        return `#${id.slice(-8).toUpperCase()}`;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200">
                <div className="bg-blue-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">Order Details</h2>
                            <p className="text-blue-100">{displayOrderId(order._id)}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border border-gray-200">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <Package className="w-5 h-5 text-blue-600" />
                                    Order Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Order ID</label>
                                        <p className="text-lg font-semibold text-gray-900">{displayOrderId(order._id)}</p>
                                        <p className="text-xs text-gray-500">DB ID: {order._id}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">External Link</label>
                                        <p className="text-gray-900 font-medium">{order.orderLink}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                        <div className="mt-1">
                                            <Badge variant={getStatusColor(order.status)} className="capitalize">
                                                {order.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Date & Time</label>
                                        <div className="flex items-center gap-3 mt-1">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <p className="text-gray-900">{formatDate(order.date)}</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <p className="text-gray-900">{formatTime(order.time)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <User className="w-5 h-5" />
                                    Customer Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Customer Name</label>
                                        <p className="text-lg font-semibold text-gray-900">{order.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email Address</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-900">{order.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 lg:col-span-2">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <Package className="w-5 h-5 text-blue-600" />
                                    Products ({productsDisplay().length} items)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {productsDisplay().length > 0 ? (
                                        productsDisplay().map((product: Product, index: number) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 bg-gray-200 rounded-md flex items-center justify-center">
                                                        <Package className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{product.name}</p>
                                                        <p className="text-sm text-gray-500">Product #{index + 1}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm text-gray-600">Qty: </span>
                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-medium">
                                                        {product.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                            <p>No products listed for this order</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
OrderDetailsModal.displayName = 'OrderDetailsModal';

export default function OrdersPage() {
    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<OrderDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data.orders || []);
                setFilteredOrders(data.orders || []);
            } catch (error) {
                console.error('Error fetching orders:', error);
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
                (order.status?.toLowerCase()?.includes(statusFilter.toLowerCase()) ?? false);

            const matchesDate = dateFilter === '' || 
                (order.date?.includes(dateFilter) ?? false);

            return matchesSearch && matchesStatus && matchesDate;
        });

        setFilteredOrders(filtered);
        setCurrentPage(1);
    }, [searchTerm, statusFilter, dateFilter, orders]);

    const handleStatusChange = useCallback(async (orderId: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }, []);

    const handleShowDetails = useCallback((order: OrderDetails) => {
        setSelectedOrder(order);
        setShowModal(true);
    }, []);

    const handleRefresh = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/orders');
            if (!response.ok) {
                throw new Error('Failed to refresh orders');
            }
            const data = await response.json();
            setOrders(data.orders || []);
            setFilteredOrders(data.orders || []);
        } catch (error) {
            console.error('Error refreshing orders:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const orderStats = useMemo(() => {
        const total = orders.length;
        const pending = orders.filter(order => order.status.toLowerCase().includes('pending')).length;
        const fulfilled = orders.filter(order => order.status.toLowerCase().includes('fulfilled')).length;
        const processing = orders.filter(order => order.status.toLowerCase().includes('processing')).length;

        return { total, pending, fulfilled, processing };
    }, [orders]);

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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                    <p className="text-gray-600">Track and manage customer orders</p>
                </div>
                <ActionButton
                    icon={<RefreshCw className="w-4 h-4" />}
                    label="Refresh"
                    onClick={handleRefresh}
                    variant="primary"
                />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Orders"
                    value={orderStats.total}
                    subtitle="All time orders"
                    icon={<Package className="w-6 h-6 text-blue-600" />}
                    color="bg-blue-50"
                />
                <StatsCard
                    title="Pending"
                    value={orderStats.pending}
                    subtitle="Awaiting processing"
                    icon={<Timer className="w-6 h-6 text-yellow-600" />}
                    color="bg-yellow-50"
                />
                <StatsCard
                    title="Fulfilled"
                    value={orderStats.fulfilled}
                    subtitle="Successfully completed"
                    icon={<CheckCircle className="w-6 h-6 text-green-600" />}
                    color="bg-green-50"
                />
                <StatsCard
                    title="Processing"
                    value={orderStats.processing}
                    subtitle="Currently in progress"
                    icon={<RefreshCw className="w-6 h-6 text-red-600" />}
                    color="bg-red-50"
                />
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
                            <option value="processing">Processing</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <Input
                            type="date"
                            placeholder="Filter by date"
                            className="h-10"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                        <div>
                            <ActionButton
                                icon={<X className="w-4 h-4" />}
                                label="Clear Filters"
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('all');
                                    setDateFilter('');
                                }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Orders List */}
            <div className="space-y-4">
                {currentOrders.length > 0 ? (
                    currentOrders.map((order, index) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            index={indexOfFirstOrder + index}
                            onStatusChange={handleStatusChange}
                            onShowDetails={handleShowDetails}
                        />
                    ))
                ) : (
                    <Card className="bg-white border border-gray-200">
                        <CardContent className="text-center py-12">
                            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                            <p className="text-gray-600">No orders match your current filters.</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-6 py-3">
                    <div className="text-sm text-gray-700">
                        Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
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

            {/* Order Details Modal */}
            <OrderDetailsModal
                order={selectedOrder}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}