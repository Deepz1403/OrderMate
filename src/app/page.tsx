"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Star,
  Play,
  Mail,
  Package,
  Sparkles
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/OrderMate Logo.png" alt="OrderMate" width={56} height={56} />
              <span className="text-xl font-bold text-gray-900">OrderMate</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#product" className="text-gray-600 hover:text-gray-900 font-medium">Product</Link>
              <Link href="#customers" className="text-gray-600 hover:text-gray-900 font-medium">Customers</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button className="bg-black hover:bg-gray-800 text-white" asChild>
                <Link href="/dashboard">Get started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Order Intelligence
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Transform emails into 
                <span className="text-blue-600"> insights</span> instantly
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Stop manually processing orders. OrderMate&apos;s AI reads every email, extracts data perfectly, and gives you real-time business intelligence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  Start free trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Watch demo
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Setup in 5 minutes</span>
                </div>
              </div>
            </div>
            
            {/* Dashboard preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Today&apos;s Orders</h3>
                    <span className="text-2xl font-bold text-blue-600">847</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-900">Global Parts Inc.</span>
                      </div>
                      <span className="text-green-600 font-semibold">$45,680</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-gray-900">TechFlow Manufacturing</span>
                      </div>
                      <span className="text-blue-600 font-semibold">$32,150</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="font-medium text-gray-900">Industrial Solutions</span>
                      </div>
                      <span className="text-purple-600 font-semibold">$28,940</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Processing accuracy</span>
                      <span className="font-semibold text-gray-900">99.7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">10M+</div>
              <div className="text-gray-600">Orders processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">99.7%</div>
              <div className="text-gray-600">AI accuracy rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Enterprise clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">75%</div>
              <div className="text-gray-600">Time saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stop drowning in manual order processing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your team spends hours copying data from emails. Orders get lost. Inventory is always wrong. 
              There&apos;s a better way.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Email chaos</h3>
              <p className="text-gray-600">Orders arrive in different formats. Your team manually copies data, makes mistakes, wastes time.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Package className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Inventory mess</h3>
              <p className="text-gray-600">Stock levels are always wrong. You oversell, disappoint customers, or hold too much inventory.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No insights</h3>
              <p className="text-gray-600">You can&apos;t see trends, predict demand, or make data-driven decisions about your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Three steps to order intelligence
            </h2>
            <p className="text-xl text-gray-600">
              Connect, process, optimize. It&apos;s that simple.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-xl font-bold text-lg mb-6">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect your email</h3>
              <p className="text-gray-600 mb-6">Link your business email in under 2 minutes. OrderMate monitors for new orders automatically.</p>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">New order from Global Parts</div>
                    <div className="text-xs text-gray-500">2 minutes ago</div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  Subject: PO #45231 - Industrial bearings order...
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-xl font-bold text-lg mb-6">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI extracts everything</h3>
              <p className="text-gray-600 mb-6">Our AI reads the order, extracts all data points, and structures everything perfectly. 99.7% accuracy.</p>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customer:</span>
                    <span className="text-gray-900 font-medium">Global Parts Inc.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Items:</span>
                    <span className="text-gray-900 font-medium">24 products</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total:</span>
                    <span className="text-gray-900 font-medium">$45,680</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="text-green-600 font-medium">✓ Processed</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-xl font-bold text-lg mb-6">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get instant insights</h3>
              <p className="text-gray-600 mb-6">See real-time analytics, track inventory, forecast demand, and make smarter business decisions.</p>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-900">Revenue today</span>
                  <span className="text-sm text-green-600">+23%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">$127,840</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by operations teams everywhere
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-900 mb-6">
                OrderMate eliminated 8 hours of manual work per day. Our accuracy went from 94% to 99.7%. It&apos;s like having a perfect assistant.
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">SC</div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-sm text-gray-600">Head of Operations, TechFlow</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-900 mb-6">
                We processed 300% more orders with the same team. ROI was immediate. I can&apos;t imagine going back to manual processing.
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">MR</div>
                <div>
                  <div className="font-semibold text-gray-900">Michael Rodriguez</div>
                  <div className="text-sm text-gray-600">CEO, Global Parts Inc.</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-900 mb-6">
                The AI insights helped us reduce inventory costs by 40% while improving customer satisfaction. Game-changing technology.
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">EW</div>
                <div>
                  <div className="font-semibold text-gray-900">Emily Watson</div>
                  <div className="text-sm text-gray-600">Director, NextGen Industrial</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to stop wasting time on manual orders?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join 500+ companies saving hours every day with intelligent order processing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Start free trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
              Talk to sales
            </Button>
          </div>
          
          <p className="text-gray-400">
            Free 14-day trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image src="/OrderMate Logo.png" alt="OrderMate" width={40} height={40} />
                <span className="text-xl font-bold text-gray-900">OrderMate</span>
              </Link>
              <p className="text-gray-600 mb-4">
                AI-powered order intelligence for modern businesses.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3 text-gray-600">
                <li><Link href="#">Features</Link></li>
                <li><Link href="#">Integrations</Link></li>
                <li><Link href="#">API</Link></li>
                <li><Link href="#">Security</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3 text-gray-600">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-3 text-gray-600">
                <li><Link href="#">Help center</Link></li>
                <li><Link href="#">Documentation</Link></li>
                <li><Link href="#">Status</Link></li>
                <li><Link href="#">Community</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} OrderMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}