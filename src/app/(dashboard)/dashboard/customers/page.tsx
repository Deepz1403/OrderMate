'use client'
import React, { useState, useCallback, useMemo, memo, useEffect } from 'react'
import { Search, Filter, RefreshCw, Users, Mail, Phone, Calendar, Eye, X, MapPin, UserPlus, TrendingUp, ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";

interface CustomerDetails {
  _id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: string;
  location: string;
  joinDate: string;
}

interface CustomerCardProps {
  customer: CustomerDetails;
  index: number;
  onStatusChange: (customerId: string, status: string) => void;
  onShowDetails: (customer: CustomerDetails) => void;
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    case "vip":
      return "outline";
    default:
      return "outline";
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    case "vip":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const CustomerCard = memo(({ customer, onStatusChange, onShowDetails }: CustomerCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        onStatusChange(customer._id, newStatus);
    }, [customer, onStatusChange]);

    const displayCustomerId = (id: string) => {
        return `#${id.slice(-8).toUpperCase()}`;
    };

    return (
        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow mb-4">
            <CardContent className="p-4">
                <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">
                                    {getInitials(customer.name)}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                                    <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeColor(customer.status)}`}>
                                        <span className="capitalize">{customer.status}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Mail className="h-3 w-3" />
                                        <span>{customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        <span>{customer.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
                            >
                                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                {isExpanded ? 'Less' : 'More'}
                            </button>
                            <button
                                onClick={() => onShowDetails(customer)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
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
                                <Phone className="h-4 w-4 text-gray-500" />
                                <span className="text-xs font-medium text-gray-500 uppercase">Contact</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{customer.phone}</p>
                                <p className="text-sm text-gray-600">Phone Number</p>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-gray-500" />
                                <span className="text-xs font-medium text-gray-500 uppercase">Orders</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{customer.orders} Orders</p>
                                <p className="text-sm text-gray-600">{formatCurrency(customer.totalSpent)} Total</p>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span className="text-xs font-medium text-gray-500 uppercase">Last Order</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{formatDate(customer.lastOrder)}</p>
                                <p className="text-sm text-gray-600">Most Recent</p>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <RefreshCw className="h-4 w-4 text-gray-500" />
                                <span className="text-xs font-medium text-gray-500 uppercase">Status</span>
                            </div>
                            <select
                                className="w-full bg-white border border-gray-300 rounded-md px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                                value={customer.status}
                                onChange={handleStatusChange}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="vip">VIP</option>
                            </select>
                        </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                        <div className="border-t border-gray-100 pt-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Users className="h-4 w-4 text-gray-600" />
                                    <h4 className="font-medium text-gray-900">Customer Details</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-md p-3 border border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-blue-100 rounded-md flex items-center justify-center">
                                                <Calendar className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Join Date</p>
                                                <p className="text-sm text-gray-600">{formatDate(customer.joinDate)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-md p-3 border border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-green-100 rounded-md flex items-center justify-center">
                                                <TrendingUp className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Customer ID</p>
                                                <p className="text-sm text-gray-600">{displayCustomerId(customer._id)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
});
CustomerCard.displayName = 'CustomerCard';

const ActionButton = memo(({ icon, label, onClick, variant = 'secondary' }: ActionButtonProps) => (
    <button
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${variant === 'primary'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
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
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
                    {icon}
                </div>
            </div>
        </CardContent>
    </Card>
));
StatsCard.displayName = 'StatsCard';

const CustomerDetailsModal = memo(({ customer, isOpen, onClose }: {
    customer: CustomerDetails | null;
    isOpen: boolean;
    onClose: () => void;
}) => {
    if (!isOpen || !customer) return null;

    const displayCustomerId = (id: string) => {
        return `#${id.slice(-8).toUpperCase()}`;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="bg-blue-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">Customer Details</h2>
                            <p className="text-blue-100">{customer.name} - {displayCustomerId(customer._id)}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 bg-blue-500 hover:bg-blue-400 rounded-lg flex items-center justify-center"
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
                                    <Users className="w-5 h-5" />
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Customer ID</label>
                                        <p className="text-lg font-semibold text-gray-900">{displayCustomerId(customer._id)}</p>
                                        <p className="text-xs text-gray-500">DB ID: {customer._id}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                                        <p className="text-gray-900 font-medium">{customer.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                        <div className="mt-1">
                                            <Badge variant={getStatusColor(customer.status)} className="capitalize">
                                                {customer.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Join Date</label>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-900">{formatDate(customer.joinDate)}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <Mail className="w-5 h-5" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email Address</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-900">{customer.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Phone Number</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-900">{customer.phone}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Location</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-900">{customer.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 lg:col-span-2">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <TrendingUp className="w-5 h-5" />
                                    Order Statistics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 rounded-md p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-blue-100 rounded-md flex items-center justify-center">
                                                <TrendingUp className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Total Orders</p>
                                                <p className="text-2xl font-bold text-blue-600">{customer.orders}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-md p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-green-100 rounded-md flex items-center justify-center">
                                                <TrendingUp className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Total Spent</p>
                                                <p className="text-2xl font-bold text-green-600">{formatCurrency(customer.totalSpent)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-md p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-purple-100 rounded-md flex items-center justify-center">
                                                <Calendar className="h-4 w-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Last Order</p>
                                                <p className="text-lg font-bold text-purple-600">{formatDate(customer.lastOrder)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
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
});
CustomerDetailsModal.displayName = 'CustomerDetailsModal';

export default function CustomersPage() {
    const [customers, setCustomers] = useState<CustomerDetails[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<CustomerDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [locationFilter, setLocationFilter] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    // Fetch customers from API
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/customers');
            const data = await response.json();
            
            if (data.success) {
                setCustomers(data.customers);
                setFilteredCustomers(data.customers);
            } else {
                console.error('Failed to fetch customers:', data.error);
                setCustomers([]);
                setFilteredCustomers([]);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
            setCustomers([]);
            setFilteredCustomers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Filter customers based on search and filters
    useEffect(() => {
        const filtered = customers.filter(customer => {
            const matchesSearch = searchTerm === '' || 
                (customer.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
                (customer.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
                (customer._id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
                (customer.phone?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false);

            const matchesStatus = statusFilter === 'all' || 
                (customer.status?.toLowerCase() === statusFilter.toLowerCase());

            const matchesLocation = locationFilter === '' || 
                (customer.location?.toLowerCase()?.includes(locationFilter.toLowerCase()) ?? false);

            return matchesSearch && matchesStatus && matchesLocation;
        });

        setFilteredCustomers(filtered);
        setCurrentPage(1);
    }, [searchTerm, statusFilter, locationFilter, customers]);

    const handleStatusChange = useCallback(async (customerId: string, newStatus: string) => {
        try {
            // Update local state immediately for better UX
            setCustomers(prevCustomers =>
                prevCustomers.map(customer =>
                    customer._id === customerId ? { ...customer, status: newStatus } : customer
                )
            );

            // Make API call to update status
            const response = await fetch(`/api/customers/${customerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();
            
            if (!data.success) {
                console.error('Failed to update customer status:', data.error);
                // Revert on failure
                fetchCustomers();
            }
        } catch (error) {
            console.error('Error updating customer status:', error);
            // Revert on failure
            fetchCustomers();
        }
    }, []);

    const handleShowDetails = useCallback((customer: CustomerDetails) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    }, []);

    const handleRefresh = useCallback(async () => {
        await fetchCustomers();
    }, []);

    // Pagination calculations
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    const customerStats = useMemo(() => {
        const total = customers.length;
        const active = customers.filter(customer => customer.status === 'active').length;
        const inactive = customers.filter(customer => customer.status === 'inactive').length;
        const vip = customers.filter(customer => customer.status === 'vip').length;
        const totalRevenue = customers.reduce((acc, customer) => acc + customer.totalSpent, 0);
        return { total, active, inactive, vip, totalRevenue };
    }, [customers]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span className="text-gray-600">Loading customers...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
                    <p className="text-gray-600">Manage and track your customer relationships</p>
                </div>
                <div className="flex items-center gap-2">
                    <ActionButton
                        icon={<UserPlus className="w-4 h-4" />}
                        label="Add Customer"
                        onClick={() => console.log('Add customer')}
                        variant="primary"
                    />
                    <ActionButton
                        icon={<RefreshCw className="w-4 h-4" />}
                        label="Refresh"
                        onClick={handleRefresh}
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatsCard
                    title="Total Customers"
                    value={customerStats.total}
                    subtitle="All registered customers"
                    icon={<Users className="w-6 h-6 text-blue-600" />}
                    color="bg-blue-100"
                />
                <StatsCard
                    title="Active Customers"
                    value={customerStats.active}
                    subtitle="Currently active"
                    icon={<Users className="w-6 h-6 text-green-600" />}
                    color="bg-green-100"
                />
                <StatsCard
                    title="Inactive Customers"
                    value={customerStats.inactive}
                    subtitle="Currently inactive"
                    icon={<Users className="w-6 h-6 text-red-600" />}
                    color="bg-red-100"
                />
                <StatsCard
                    title="VIP Customers"
                    value={customerStats.vip}
                    subtitle="Premium customers"
                    icon={<Users className="w-6 h-6 text-purple-600" />}
                    color="bg-purple-100"
                />
                <StatsCard
                    title="Total Revenue"
                    value={formatCurrency(customerStats.totalRevenue)}
                    subtitle="From all customers"
                    icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                    color="bg-green-100"
                />
            </div>

            {/* Filters */}
            <Card className="border border-gray-200">
                <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-700">Customer Filters</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="vip">VIP</option>
                        </select>
                        <Input
                            type="text"
                            placeholder="Filter by location..."
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Customers List */}
            <div className="space-y-4">
                {currentCustomers.length > 0 ? (
                    currentCustomers.map((customer, index) => (
                        <CustomerCard
                            key={customer._id}
                            customer={customer}
                            index={indexOfFirstCustomer + index}
                            onStatusChange={handleStatusChange}
                            onShowDetails={handleShowDetails}
                        />
                    ))
                ) : (
                    <Card className="border border-gray-200">
                        <CardContent className="py-12 text-center">
                            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
                            <p className="text-gray-600">No customers match your current filters.</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                        Showing {indexOfFirstCustomer + 1} to {Math.min(indexOfLastCustomer, filteredCustomers.length)} of {filteredCustomers.length} customers
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Customer Details Modal */}
            <CustomerDetailsModal
                customer={selectedCustomer}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}