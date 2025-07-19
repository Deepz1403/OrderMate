"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  BarChart3, 
  Users, 
  Package, 
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Clock,
  Zap,
  AlertTriangle,
  DollarSign,
  Shield,
  RefreshCw,
  Target,
  Smartphone
} from "lucide-react";

export default function Home() {
  const problems = [
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Inventory Nightmares",
      description: "Stockouts, overstocking, and manual tracking leading to lost sales and wasted capital."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Slow Order Processing",
      description: "Manual order handling causing delays, errors, and frustrated customers."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Zero Visibility",
      description: "No real-time insights into your supply chain performance and bottlenecks."
    }
  ];

  const solutions = [
    {
      icon: <Package className="h-6 w-6" />,
      title: "Smart Inventory Management",
      description: "AI-powered stock optimization with automated reordering and low-stock alerts.",
      metrics: "30% reduction in carrying costs"
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Automated Order Processing",
      description: "Streamlined workflows from order placement to delivery with real-time tracking.",
      metrics: "50% faster order fulfillment"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Real-time dashboards and AI insights to optimize your entire supply chain.",
      metrics: "15% increase in profitability"
    }
  ];

  const features = [
    "Real-time inventory tracking across all channels",
    "Automated reorder points and purchase orders",
    "Advanced demand forecasting with AI",
    "Multi-location inventory management",
    "Supplier performance monitoring", 
    "Customer order tracking and notifications"
  ];

  const stats = [
    { number: "50%", label: "Faster Order Processing" },
    { number: "30%", label: "Reduction in Costs" },
    { number: "99.9%", label: "System Uptime" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image 
              src="/logo.png" 
              alt="OrderMate Logo" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-gray-900">OrderMate</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#solution" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Solution
            </Link>
            <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/dashboard">Try Free Demo</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Image 
                src="/logo.png" 
                alt="OrderMate Logo" 
                width={80} 
                height={80}
                className="rounded-xl shadow-lg"
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Stop Losing Money on<br />
              <span className="text-blue-600">Inventory Chaos</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              OrderMate transforms your inventory management and order processing from a daily headache into your competitive advantage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/dashboard">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
                <Link href="#demo">
                  Watch Demo
                </Link>
              </Button>
            </div>

            <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              No credit card required • Setup in under 5 minutes
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Running a Business Shouldn&apos;t Feel Like This
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every day you&apos;re fighting the same inventory and order management battles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {problems.map((problem, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mx-auto mb-4">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              What If Your Operations Ran Themselves?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              OrderMate turns chaos into control with intelligent automation and real-time insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {solution.metrics}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Everything You Need to Scale Your Operations
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  From small businesses to enterprise operations, OrderMate adapts to your needs with powerful features that grow with you.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                    <Link href="/dashboard">
                      See All Features
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Real-time Dashboard</h3>
                      <p className="text-sm text-gray-600">Monitor all operations at a glance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">AI-Powered Automation</h3>
                      <p className="text-sm text-gray-600">Smart decisions without manual work</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Mobile Access</h3>
                      <p className="text-sm text-gray-600">Manage your business from anywhere</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Trusted by Growing Businesses
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join hundreds of businesses that have streamlined their supply chain with OrderMate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/dashboard">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="#contact">
                  Talk to Sales
                </Link>
              </Button>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              No setup fees • Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image 
                  src="/logo.png" 
                  alt="OrderMate Logo" 
                  width={32} 
                  height={32}
                  className="rounded-md"
                />
                <span className="font-bold text-gray-900">OrderMate</span>
              </div>
              <p className="text-sm text-gray-600">
                The intelligent supply chain platform that helps businesses optimize inventory and streamline operations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#features" className="hover:text-gray-900">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-gray-900">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-gray-900">Demo</Link></li>
                <li><Link href="#integrations" className="hover:text-gray-900">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#about" className="hover:text-gray-900">About</Link></li>
                <li><Link href="#careers" className="hover:text-gray-900">Careers</Link></li>
                <li><Link href="#contact" className="hover:text-gray-900">Contact</Link></li>
                <li><Link href="#blog" className="hover:text-gray-900">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#help" className="hover:text-gray-900">Help Center</Link></li>
                <li><Link href="#docs" className="hover:text-gray-900">Documentation</Link></li>
                <li><Link href="#api" className="hover:text-gray-900">API</Link></li>
                <li><Link href="#status" className="hover:text-gray-900">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 OrderMate. Built for modern supply chains. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}