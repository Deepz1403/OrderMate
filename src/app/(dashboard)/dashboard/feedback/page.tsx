import { Star, MessageSquare, TrendingUp, TrendingDown, Users, Clock } from 'lucide-react';

const feedbackData = [
  {
    id: 1,
    customer: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent service! Fast delivery and great product quality.',
    product: 'Wireless Headphones',
    date: '2024-01-15',
    status: 'resolved',
    helpful: 12
  },
  {
    id: 2,
    customer: 'Mike Chen',
    rating: 4,
    comment: 'Good product but shipping took longer than expected.',
    product: 'Smart Watch',
    date: '2024-01-14',
    status: 'pending',
    helpful: 8
  },
  {
    id: 3,
    customer: 'Emily Davis',
    rating: 5,
    comment: 'Amazing quality and customer support was very helpful!',
    product: 'Bluetooth Speaker',
    date: '2024-01-13',
    status: 'resolved',
    helpful: 15
  },
  {
    id: 4,
    customer: 'John Smith',
    rating: 3,
    comment: 'Product is okay but could be better for the price.',
    product: 'Laptop Stand',
    date: '2024-01-12',
    status: 'pending',
    helpful: 5
  },
  {
    id: 5,
    customer: 'Lisa Wilson',
    rating: 5,
    comment: 'Perfect! Exactly what I was looking for.',
    product: 'USB-C Cable',
    date: '2024-01-11',
    status: 'resolved',
    helpful: 9
  },
];

const ratingDistribution = [
  { stars: 5, count: 145, percentage: 58 },
  { stars: 4, count: 78, percentage: 31 },
  { stars: 3, count: 18, percentage: 7 },
  { stars: 2, count: 6, percentage: 3 },
  { stars: 1, count: 3, percentage: 1 },
];

const topicsData = [
  { topic: 'Product Quality', mentions: 89, sentiment: 'positive' },
  { topic: 'Shipping Speed', mentions: 67, sentiment: 'mixed' },
  { topic: 'Customer Service', mentions: 45, sentiment: 'positive' },
  { topic: 'Pricing', mentions: 34, sentiment: 'mixed' },
  { topic: 'Packaging', mentions: 28, sentiment: 'positive' },
];

export default function FeedbackPage() {
  const averageRating = 4.6;
  const totalReviews = 250;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customer Feedback</h1>
        <p className="text-gray-600">Monitor and analyze customer reviews and ratings</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(averageRating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">out of 5</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600 ml-1">+12.5%</span>
                <span className="text-sm text-gray-500 ml-2">this month</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600 ml-1">+2.1%</span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">2.4h</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600 ml-1">-0.3h</span>
                <span className="text-sm text-gray-500 ml-2">improvement</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution and Topics */}
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

        {/* Feedback Topics */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Feedback Topics</h2>
            <p className="text-sm text-gray-600">Most mentioned topics in reviews</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topicsData.map((topic) => (
                <div key={topic.topic} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{topic.topic}</p>
                    <p className="text-sm text-gray-500">{topic.mentions} mentions</p>
                  </div>
                  <div className="flex items-center">
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        topic.sentiment === 'positive' 
                          ? 'bg-green-100 text-green-800' 
                          : topic.sentiment === 'negative'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {topic.sentiment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
          <p className="text-sm text-gray-600">Latest customer reviews and ratings</p>
        </div>
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedbackData.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {feedback.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{feedback.product}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < feedback.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({feedback.rating})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {feedback.comment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(feedback.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          feedback.status === 'resolved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {feedback.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}