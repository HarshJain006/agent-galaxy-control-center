
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Users, Building2, Zap, Shield, Globe, ArrowRight, Star, CheckCircle } from "lucide-react";
import { SoothingScene } from "./SoothingScene";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Bot,
      title: "AI Agent Management",
      description: "Deploy, monitor, and scale AI agents across multiple companies with ease."
    },
    {
      icon: Users,
      title: "User Management",
      description: "Comprehensive user management system with role-based access control."
    },
    {
      icon: Building2,
      title: "Multi-Company Support",
      description: "Manage AI agents across different organizations from a single platform."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance tools."
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Monitor performance, usage, and efficiency with live dashboards."
    },
    {
      icon: Globe,
      title: "Global Deployment",
      description: "Deploy AI agents worldwide with low-latency edge computing."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechCorp",
      content: "AgentHub transformed how we manage our AI workforce. Incredible efficiency gains!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "AI Director, InnovateLab",
      content: "The best platform for scaling AI operations across multiple companies.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Operations Manager, FutureTech",
      content: "Seamless integration and powerful analytics. A game-changer for our business.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center animate-pulse">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-yellow-600 to-black bg-clip-text text-transparent">
                AgentHub
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hover:scale-105 transition-transform">Features</Button>
              <Button variant="ghost" className="hover:scale-105 transition-transform">Pricing</Button>
              <Button variant="ghost" className="hover:scale-105 transition-transform">About</Button>
              <Button variant="outline" className="hover:scale-105 transition-transform">Sign In</Button>
              <Button 
                onClick={handleDashboard}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Animation */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-black/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-500/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-black/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-yellow-400/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
                The Future of
                <span className="bg-gradient-to-r from-yellow-600 to-black bg-clip-text text-transparent animate-pulse">
                  {" "}AI Management
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Deploy, manage, and scale AI agents across multiple companies with our revolutionary platform. 
                Experience the next generation of artificial intelligence orchestration.
              </p>
            </div>
          </div>
          
          {/* Soothing Animation */}
          <div className="mb-12">
            <SoothingScene />
          </div>
          
          <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black text-lg px-8 py-4 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleDashboard}
                className="text-lg px-8 py-4 hover:scale-105 transition-all duration-300 hover:shadow-lg border-2 border-yellow-500 hover:bg-yellow-50"
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-fade-in">
              Powerful Features for Modern AI Operations
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in">
              Everything you need to manage AI agents at scale, from deployment to monitoring and optimization.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-500 hover:-translate-y-3 border-slate-200 group hover:border-yellow-300 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={handleDashboard}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-black" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-yellow-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2 animate-pulse">10K+</div>
              <div className="text-yellow-100">AI Agents Deployed</div>
            </div>
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2 animate-pulse">500+</div>
              <div className="text-yellow-100">Companies Served</div>
            </div>
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2 animate-pulse">99.9%</div>
              <div className="text-yellow-100">Uptime Guarantee</div>
            </div>
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2 animate-pulse">24/7</div>
              <div className="text-yellow-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-fade-in">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-slate-600 animate-fade-in">
              See what our customers are saying about AgentHub
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-white border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-fade-in">
            Ready to Transform Your AI Operations?
          </h2>
          <p className="text-xl text-slate-600 mb-8 animate-fade-in">
            Join thousands of companies already using AgentHub to scale their AI initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black text-lg px-8 py-4 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <div className="flex items-center text-slate-600">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 animate-pulse" />
              No credit card required
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <span className="font-bold text-xl">AgentHub</span>
              </div>
              <p className="text-slate-400">
                The future of AI management is here. Scale your artificial intelligence operations with confidence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">Features</li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">Enterprise</li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">About</li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">Community</li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 AgentHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
