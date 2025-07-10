import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Search, 
  Calendar, 
  BarChart3, 
  Star, 
  Clock, 
  Play, 
  Download,
  Share2,
  Heart,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MyAgents() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // TODO: Backend integration - Fetch user's agent usage history
  const usedAgents = [
    {
      id: "1",
      name: "YOLO Helmet Detector",
      description: "Detect safety helmets in construction site images",
      category: "Computer Vision",
      lastUsed: "2 hours ago",
      usageCount: 15,
      rating: 4.8,
      favorite: true,
      thumbnail: "🏗️",
      status: "completed",
      resultPreview: "Detected 8 workers with helmets, 2 without"
    },
    {
      id: "2", 
      name: "Resume Shortlister",
      description: "AI-powered resume screening and ranking",
      category: "HR & Recruitment",
      lastUsed: "1 day ago", 
      usageCount: 7,
      rating: 4.9,
      favorite: false,
      thumbnail: "📄",
      status: "completed",
      resultPreview: "Shortlisted 12/50 candidates"
    },
    {
      id: "3",
      name: "Lecture Summarizer", 
      description: "Convert long lectures into concise summaries",
      category: "Education",
      lastUsed: "3 days ago",
      usageCount: 23,
      rating: 4.7,
      favorite: true,
      thumbnail: "🎓",
      status: "completed", 
      resultPreview: "Generated 5-minute summary from 2-hour lecture"
    },
    {
      id: "4",
      name: "Voice-to-Text Converter",
      description: "Accurate speech recognition and transcription",
      category: "Audio Processing",
      lastUsed: "1 week ago",
      usageCount: 5,
      rating: 4.6,
      favorite: false,
      thumbnail: "🎤",
      status: "completed",
      resultPreview: "Transcribed 45 minutes of audio with 97% accuracy"
    },
    {
      id: "5",
      name: "Invoice Data Extractor",
      description: "Extract structured data from invoice documents",
      category: "Document Processing", 
      lastUsed: "2 weeks ago",
      usageCount: 12,
      rating: 4.8,
      favorite: false,
      thumbnail: "🧾",
      status: "completed",
      resultPreview: "Extracted data from 25 invoices"
    }
  ];

  const filteredAgents = usedAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRunAgain = (agentId: string, agentName: string) => {
    // TODO: Backend integration - Redirect to agent run page
    toast({
      title: "Running Agent",
      description: `Redirecting to ${agentName}...`,
    });
  };

  const handleToggleFavorite = (agentId: string) => {
    // TODO: Backend integration - Update favorite status
    toast({
      title: "Favorites Updated",
      description: "Agent favorite status updated.",
    });
  };

  const handleDownloadResults = (agentId: string) => {
    // TODO: Backend integration - Download agent results
    toast({
      title: "Downloading Results",
      description: "Your results will be downloaded shortly.",
    });
  };

  const handleShareAgent = (agentId: string) => {
    // TODO: Backend integration - Share agent or results
    toast({
      title: "Share Link Copied",
      description: "Agent share link copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Agents</h1>
        <p className="text-slate-600 mt-2">Track and manage your previously used AI agents</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search your agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Used</p>
                <p className="text-2xl font-bold">{usedAgents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Total Runs</p>
                <p className="text-2xl font-bold">{usedAgents.reduce((sum, agent) => sum + agent.usageCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-600" />
              <div>
                <p className="text-sm font-medium">Favorites</p>
                <p className="text-2xl font-bold">{usedAgents.filter(agent => agent.favorite).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {(usedAgents.reduce((sum, agent) => sum + agent.rating, 0) / usedAgents.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Agents ({filteredAgents.length})</TabsTrigger>
          <TabsTrigger value="favorites">
            Favorites ({filteredAgents.filter(agent => agent.favorite).length})
          </TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{agent.thumbnail}</div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {agent.category}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleFavorite(agent.id)}
                      className="p-1"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          agent.favorite ? "fill-pink-500 text-pink-500" : "text-gray-400"
                        }`}
                      />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription>{agent.description}</CardDescription>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Last used: {agent.lastUsed}
                      </span>
                      <span className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        {agent.usageCount} runs
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {agent.rating}/5
                      </span>
                      <Badge 
                        variant={agent.status === "completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {agent.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Last result:</strong> {agent.resultPreview}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleRunAgain(agent.id, agent.name)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Run Again
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadResults(agent.id)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShareAgent(agent.id)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.filter(agent => agent.favorite).map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-all duration-200">
                {/* Same card content as above */}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{agent.thumbnail}</div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {agent.category}
                        </Badge>
                      </div>
                    </div>
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{agent.description}</CardDescription>
                  <div className="mt-4 flex space-x-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleRunAgain(agent.id, agent.name)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Run Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="space-y-4">
            {filteredAgents
              .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
              .slice(0, 5)
              .map((agent) => (
                <Card key={agent.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{agent.thumbnail}</div>
                        <div>
                          <h3 className="font-medium">{agent.name}</h3>
                          <p className="text-sm text-gray-600">{agent.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{agent.lastUsed}</p>
                          <p className="text-xs text-gray-500">{agent.usageCount} runs</p>
                        </div>
                        <Button onClick={() => handleRunAgain(agent.id, agent.name)}>
                          <Play className="w-4 h-4 mr-2" />
                          Run
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}