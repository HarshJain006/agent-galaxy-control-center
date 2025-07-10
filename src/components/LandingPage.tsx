import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, Users, Upload, ChevronRight, Star, Eye, Brain, Mic, FileText, 
  ImageIcon, Briefcase, Play, ArrowRight, CheckCircle, Zap, Shield, 
  Heart, TrendingUp, Github, Linkedin, Search, Menu, Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  const handleBrowseAgents = () => {
    navigate('/dashboard');
  };

  const handleUploadAgent = () => {
    navigate('/dashboard');
  };

  const featuredAgents = [
    {
      id: 1,
      title: "YOLO Helmet Detector",
      description: "Detect safety helmets in construction sites with 99% accuracy",
      category: "Vision",
      image: "🔍",
      rating: 4.8,
      users: "2.3k",
      featured: true
    },
    {
      id: 2,
      title: "Resume Shortlister",
      description: "AI-powered resume screening for HR departments",
      category: "HR",
      image: "📄",
      rating: 4.9,
      users: "1.8k",
      featured: true
    },
    {
      id: 3,
      title: "Lecture Summarizer",
      description: "Convert long lectures into concise, actionable summaries",
      category: "Education",
      image: "📚",
      rating: 4.7,
      users: "3.1k",
      featured: true
    },
    {
      id: 4,
      title: "Voice-to-Text Converter",
      description: "Advanced speech recognition with multilingual support",
      category: "Audio",
      image: "🎤",
      rating: 4.6,
      users: "5.2k",
      featured: false
    },
    {
      id: 5,
      title: "Invoice Data Extractor",
      description: "Extract structured data from invoices and receipts",
      category: "Document",
      image: "🧾",
      rating: 4.8,
      users: "1.5k",
      featured: false
    },
    {
      id: 6,
      title: "PDF Table Extractor",
      description: "Extract tables from PDFs with perfect formatting",
      category: "Document",
      image: "📊",
      rating: 4.5,
      users: "2.1k",
      featured: false
    }
  ];

  const categories = [
    { name: "NLP", icon: Brain, color: "bg-blue-500", agents: 45 },
    { name: "Vision", icon: Eye, color: "bg-green-500", agents: 32 },
    { name: "Audio", icon: Mic, color: "bg-purple-500", agents: 28 },
    { name: "Document", icon: FileText, color: "bg-orange-500", agents: 38 },
    { name: "Industry", icon: Briefcase, color: "bg-red-500", agents: 25 }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Choose Agent",
      description: "Browse our marketplace and select the perfect AI agent for your needs",
      icon: Search
    },
    {
      step: "2", 
      title: "Upload Input",
      description: "Upload your data, files, or provide input according to agent requirements",
      icon: Upload
    },
    {
      step: "3",
      title: "Get Results",
      description: "Receive processed results instantly or access via API for integration",
      icon: CheckCircle
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Safety Manager, Construction Co.",
      content: "The helmet detector helped us achieve 100% safety compliance across 15 sites.",
      avatar: "👩‍💼",
      agent: "YOLO Helmet Detector"
    },
    {
      name: "Marcus Dev",
      role: "AI Developer",
      content: "Uploaded my model and earned $2,400 in the first month. Amazing platform!",
      avatar: "👨‍💻",
      agent: "Creator Success"
    },
    {
      name: "Lisa Student",
      role: "University Student",
      content: "Lecture summarizer saved me 10+ hours per week. Perfect for exam prep!",
      avatar: "👩‍🎓",
      agent: "Lecture Summarizer"
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      {/* Navigation */}
      <nav className="bg-card/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AgentStore
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
                <Home className="w-4 h-4 mr-1" />
                Home
              </a>
              <a href="#agents" className="text-slate-600 hover:text-blue-600 transition-colors">Agents</a>
              <a href="#upload" className="text-slate-600 hover:text-blue-600 transition-colors">Upload Your Agent</a>
              <Button variant="outline" className="hover:scale-105 transition-transform">Login</Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:scale-105 transition-all duration-300">
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Floating AI Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float">🤖</div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}>🧠</div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-green-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }}>⚡</div>
          <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-orange-400/20 rounded-full animate-float" style={{ animationDelay: '3s' }}>🎯</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
                Everything you need
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}is Here.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Browse AI agents built for your world. No coding required, just click and run.
              </p>
            </div>
            
            <div className="animate-fade-in flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleBrowseAgents}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-4 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                Browse Agents
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleUploadAgent}
                className="text-lg px-8 py-4 hover:scale-105 transition-all duration-300 hover:shadow-lg border-2 border-purple-500 hover:bg-purple-50"
              >
                Upload Your Agent
                <Upload className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Agents Carousel */}
      <section id="agents" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured AI Agents
            </h2>
            <p className="text-xl text-slate-600">
              Discover powerful AI agents ready to solve your challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAgents.slice(0, 6).map((agent, index) => (
              <Card 
                key={agent.id} 
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-slate-200 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{agent.image}</div>
                    {agent.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {agent.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {agent.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{agent.rating}</span>
                      <span className="text-sm text-slate-500">({agent.users} users)</span>
                    </div>
                    <Badge variant="secondary">{agent.category}</Badge>
                  </div>
                  <Button 
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300"
                    onClick={handleBrowseAgents}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Try Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-slate-600">
              Explore AI agents by category
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-3 border-slate-200 cursor-pointer text-center"
                onClick={handleBrowseAgents}
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{category.name}</h3>
                  <p className="text-slate-500">{category.agents} agents</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose AgentStore?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-blue-100">Get results in seconds, not hours</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No-Code</h3>
              <p className="text-blue-100">No programming skills required</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry-Ready</h3>
              <p className="text-blue-100">Enterprise-grade security & compliance</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Creator Earnings</h3>
              <p className="text-blue-100">Monetize your AI models easily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Upload CTA */}
      <section id="upload" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="text-6xl mb-6 animate-bounce">💰</div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Turn your AI models into income
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Upload any AI agent and start earning when others use it. Join thousands of creators already making money.
          </p>
          <Button 
            size="lg" 
            onClick={handleUploadAgent}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white text-lg px-8 py-4 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            <Upload className="mr-2 w-5 h-5" />
            Upload Your Agent
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600">
              Real people, real results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-white border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.agent}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">AgentStore</span>
              </div>
              <p className="text-slate-400 mb-4">
                Made in India with 💙 for the AI generation
              </p>
              <div className="flex space-x-4">
                <Github className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Browse Agents</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Categories</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Featured</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">API Access</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Creators</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Upload Agent</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Developer Docs</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Earnings</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Creator Badge</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">About</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 AgentStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}