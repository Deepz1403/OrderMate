import { Bot, User, Send, MoreVertical, Clock, CheckCircle, AlertCircle, Settings } from 'lucide-react';

const chatHistory = [
  {
    id: 1,
    customer: 'Sarah Johnson',
    lastMessage: 'When will my order arrive?',
    timestamp: '2 minutes ago',
    status: 'active',
    unread: 2,
    type: 'support'
  },
  {
    id: 2,
    customer: 'Mike Chen',
    lastMessage: 'Product recommendation needed',
    timestamp: '15 minutes ago',
    status: 'resolved',
    unread: 0,
    type: 'sales'
  },
  {
    id: 3,
    customer: 'Emily Davis',
    lastMessage: 'Thank you for the help!',
    timestamp: '1 hour ago',
    status: 'resolved',
    unread: 0,
    type: 'support'
  },
  {
    id: 4,
    customer: 'John Smith',
    lastMessage: 'Having trouble with checkout',
    timestamp: '2 hours ago',
    status: 'waiting',
    unread: 1,
    type: 'technical'
  },
];

const currentConversation = [
  {
    id: 1,
    sender: 'customer',
    message: 'Hi, I placed an order yesterday but haven\'t received any tracking information yet.',
    timestamp: '10:30 AM',
    avatar: null
  },
  {
    id: 2,
    sender: 'bot',
    message: 'Hello! I\'d be happy to help you track your order. Could you please provide your order number?',
    timestamp: '10:31 AM',
    avatar: null
  },
  {
    id: 3,
    sender: 'customer',
    message: 'Sure, it\'s ORD-12345',
    timestamp: '10:32 AM',
    avatar: null
  },
  {
    id: 4,
    sender: 'bot',
    message: 'Thank you! I found your order ORD-12345. It was shipped yesterday and is currently in transit. Your tracking number is TRK789123456. You can expect delivery within 2-3 business days.',
    timestamp: '10:33 AM',
    avatar: null
  },
  {
    id: 5,
    sender: 'customer',
    message: 'Perfect! Thank you so much for the quick response.',
    timestamp: '10:34 AM',
    avatar: null
  },
];

const botStats = [
  { metric: 'Response Rate', value: '98.5%', change: '+2.1%', trend: 'up' },
  { metric: 'Avg Response Time', value: '1.2s', change: '-0.3s', trend: 'up' },
  { metric: 'Resolution Rate', value: '87%', change: '+5%', trend: 'up' },
  { metric: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up' },
];

export default function ChatbotPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'support':
        return 'bg-blue-100 text-blue-800';
      case 'sales':
        return 'bg-green-100 text-green-800';
      case 'technical':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Chatbot</h1>
        <p className="text-gray-600">Manage customer conversations and chatbot performance</p>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {botStats.map((stat) => (
          <div key={stat.metric} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.metric}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ml-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">vs last week</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Active Conversations</h2>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {chatHistory.map((chat) => (
              <div key={chat.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{chat.customer}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(chat.status)}`}>
                          {chat.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(chat.type)}`}>
                          {chat.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  {chat.unread > 0 && (
                    <div className="h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">{chat.unread}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {chat.timestamp}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Chat */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-xs text-gray-500">Online now</p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentConversation.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                  message.sender === 'customer' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'customer' 
                      ? 'bg-blue-600' 
                      : 'bg-gray-100'
                  }`}>
                    {message.sender === 'customer' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className={`rounded-lg px-4 py-2 ${
                      message.sender === 'customer'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bot Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Bot Configuration</h2>
          <p className="text-sm text-gray-600">Manage chatbot settings and responses</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Response Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Auto-Response</p>
                    <p className="text-xs text-gray-500">Automatically respond to common queries</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" checked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                    <label className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-600 cursor-pointer"></label>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Human Handoff</p>
                    <p className="text-xs text-gray-500">Transfer complex queries to human agents</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" checked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                    <label className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-600 cursor-pointer"></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Order Status</p>
                  <p className="text-xs text-gray-500">Check order details</p>
                </button>
                <button className="p-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Returns</p>
                  <p className="text-xs text-gray-500">Process returns</p>
                </button>
                <button className="p-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Product Info</p>
                  <p className="text-xs text-gray-500">Product details</p>
                </button>
                <button className="p-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Support</p>
                  <p className="text-xs text-gray-500">General support</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}