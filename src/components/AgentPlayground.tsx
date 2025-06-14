
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  FileText, 
  Users, 
  Beaker, 
  Video, 
  GraduationCap, 
  MessageSquare, 
  Calendar, 
  Camera, 
  Settings,
  Play,
  Upload,
  Download,
  Zap,
  Link,
  Sparkles,
  Target,
  BookOpen,
  Mic,
  Image,
  Workflow
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Agent {
  id: string;
  name: string;
  icon: any;
  description: string;
  category: string;
  status: "active" | "inactive" | "running";
}

interface AgentChain {
  id: string;
  name: string;
  agents: Agent[];
  status: "draft" | "running" | "completed";
  progress: number;
}

export function AgentPlayground() {
  const { toast } = useToast();
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [chains, setChains] = useState<AgentChain[]>([]);
  const [dreamChainGoal, setDreamChainGoal] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [debateTopics, setDebateTopics] = useState("");
  const [lifeGoal, setLifeGoal] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const agents: Agent[] = [
    {
      id: "dreamchain",
      name: "DreamChain Builder",
      icon: Brain,
      description: "Multi-Agent Flow Builder - Type a goal, get a complete execution plan",
      category: "automation",
      status: "active"
    },
    {
      id: "pdf-chat",
      name: "Talk to My PDF",
      icon: FileText,
      description: "Upload PDF, chat with it like a person with memory & context",
      category: "document",
      status: "active"
    },
    {
      id: "roleplay-arena",
      name: "Roleplay Arena",
      icon: Users,
      description: "Conversational characters with memory - Einstein, Elon, Sherlock",
      category: "entertainment",
      status: "active"
    },
    {
      id: "ai-lab",
      name: "AI Lab Generator",
      icon: Beaker,
      description: "Mix tools like potions - drag & drop agents for new combinations",
      category: "creative",
      status: "active"
    },
    {
      id: "reels-generator",
      name: "Reels-from-Text",
      icon: Video,
      description: "Text → Script + AI Audio + Background + Captions for social media",
      category: "content",
      status: "active"
    },
    {
      id: "study-coach",
      name: "Study Coach AI",
      icon: GraduationCap,
      description: "Flashcards, quizzes, progress tracking, motivational coaching",
      category: "education",
      status: "active"
    },
    {
      id: "debate-club",
      name: "Debate Club AI",
      icon: MessageSquare,
      description: "Watch AI personas debate any topic - Musk vs Gandhi style",
      category: "entertainment",
      status: "active"
    },
    {
      id: "lifeflow",
      name: "LifeFlow Designer",
      icon: Calendar,
      description: "Long-term goal planning with checklists, deadlines & reminders",
      category: "productivity",
      status: "active"
    },
    {
      id: "face-agent",
      name: "AI Face Agent",
      icon: Camera,
      description: "Upload face image, create custom bot persona with voice & text",
      category: "creative",
      status: "active"
    },
    {
      id: "tool-combo",
      name: "Tool Combo Agent",
      icon: Settings,
      description: "Combine APIs to create instant productivity tools",
      category: "automation",
      status: "active"
    }
  ];

  const characters = [
    { id: "einstein", name: "Einstein", emoji: "🧠" },
    { id: "elon", name: "Elon Musk", emoji: "🚀" },
    { id: "sherlock", name: "Sherlock Holmes", emoji: "🔍" },
    { id: "gandhi", name: "Gandhi", emoji: "☮️" },
    { id: "davinci", name: "Da Vinci", emoji: "🎨" },
    { id: "jobs", name: "Steve Jobs", emoji: "📱" }
  ];

  const handleDreamChainCreate = () => {
    if (!dreamChainGoal) {
      toast({
        title: "Missing Goal",
        description: "Please enter a goal for your DreamChain",
        variant: "destructive"
      });
      return;
    }

    const newChain: AgentChain = {
      id: Date.now().toString(),
      name: dreamChainGoal,
      agents: [
        agents.find(a => a.id === "dreamchain")!,
        { ...agents[1], status: "running" },
        { ...agents[4], status: "inactive" }
      ],
      status: "running",
      progress: 0
    };

    setChains([newChain, ...chains]);
    setDreamChainGoal("");
    
    toast({
      title: "DreamChain Created! 🧠",
      description: "Your multi-agent flow is now executing..."
    });

    // Simulate progress
    setTimeout(() => {
      setChains(prev => prev.map(chain => 
        chain.id === newChain.id ? { ...chain, progress: 30 } : chain
      ));
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      toast({
        title: "PDF Uploaded! 📄",
        description: `${file.name} is ready for conversation`
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
    }
  };

  const handleChatWithPDF = () => {
    if (!uploadedFile || !chatMessage) {
      toast({
        title: "Missing Requirements",
        description: "Please upload a PDF and enter a message",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "AI is analyzing... 🤖",
      description: `Processing "${chatMessage}" against ${uploadedFile.name}`
    });
    setChatMessage("");
  };

  const handleCharacterSelect = (charId: string) => {
    if (selectedCharacters.includes(charId)) {
      setSelectedCharacters(prev => prev.filter(id => id !== charId));
    } else if (selectedCharacters.length < 3) {
      setSelectedCharacters(prev => [...prev, charId]);
    }
  };

  const startDebate = () => {
    if (selectedCharacters.length < 2 || !debateTopics) {
      toast({
        title: "Setup Required",
        description: "Select 2+ characters and enter a debate topic",
        variant: "destructive"
      });
      return;
    }

    const participants = selectedCharacters.map(id => 
      characters.find(c => c.id === id)?.name
    ).join(" vs ");

    toast({
      title: "🎭 Debate Starting!",
      description: `${participants} debating: ${debateTopics}`
    });
  };

  const createLifePlan = () => {
    if (!lifeGoal) {
      toast({
        title: "Missing Goal",
        description: "Please enter your life goal",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "📅 LifeFlow Created!",
      description: `Creating action plan for: ${lifeGoal}`
    });
    setLifeGoal("");
  };

  const handleToolSelect = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(prev => prev.filter(id => id !== toolId));
    } else if (selectedTools.length < 2) {
      setSelectedTools(prev => [...prev, toolId]);
    }
  };

  const mixTools = () => {
    if (selectedTools.length !== 2) {
      toast({
        title: "Select 2 Tools",
        description: "Choose exactly 2 tools to mix",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🧪 Magic Happening!",
      description: "Combining tools to create something amazing...",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      automation: "bg-blue-100 text-blue-800",
      document: "bg-green-100 text-green-800",
      entertainment: "bg-purple-100 text-purple-800",
      creative: "bg-pink-100 text-pink-800",
      content: "bg-orange-100 text-orange-800",
      education: "bg-indigo-100 text-indigo-800",
      productivity: "bg-yellow-100 text-yellow-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const tools = [
    { id: "airtable", name: "Airtable", icon: "📊" },
    { id: "openai", name: "OpenAI", icon: "🧠" },
    { id: "zapier", name: "Zapier", icon: "⚡" },
    { id: "notion", name: "Notion", icon: "📝" },
    { id: "slack", name: "Slack", icon: "💬" },
    { id: "gmail", name: "Gmail", icon: "📧" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <Sparkles className="w-8 h-8 mr-3 text-purple-600" />
          AI Agent Playground
        </h1>
        <p className="text-slate-600 mt-2">
          Mix, match, and chain AI agents to create powerful automated workflows
        </p>
      </div>

      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agents">🤖 Agents</TabsTrigger>
          <TabsTrigger value="chains">🔗 Chains</TabsTrigger>
          <TabsTrigger value="playground">🧪 Lab</TabsTrigger>
          <TabsTrigger value="results">📊 Results</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <Card key={agent.id} className="hover:shadow-lg transition-all cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <Badge className={getCategoryColor(agent.category)}>
                            {agent.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{agent.description}</CardDescription>
                    <Button 
                      onClick={() => setActiveAgent(agent.id)}
                      className="w-full"
                      variant={activeAgent === agent.id ? "default" : "outline"}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {activeAgent === agent.id ? "Active" : "Activate"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="chains" className="space-y-6">
          {/* DreamChain Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                🧠 DreamChain Builder
              </CardTitle>
              <CardDescription>
                Type a goal and watch AI decompose it into executable sub-agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dream-goal">Your Goal</Label>
                <Input
                  id="dream-goal"
                  placeholder="e.g., Plan my startup launch, Write a research paper, Create a marketing campaign"
                  value={dreamChainGoal}
                  onChange={(e) => setDreamChainGoal(e.target.value)}
                />
              </div>
              <Button onClick={handleDreamChainCreate} className="bg-purple-600 hover:bg-purple-700">
                <Target className="w-4 h-4 mr-2" />
                Create DreamChain
              </Button>
            </CardContent>
          </Card>

          {/* Active Chains */}
          {chains.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Active Chains</h3>
              {chains.map((chain) => (
                <Card key={chain.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <Workflow className="w-5 h-5 mr-2" />
                        {chain.name}
                      </CardTitle>
                      <Badge variant={chain.status === "running" ? "default" : "secondary"}>
                        {chain.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{chain.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${chain.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="playground" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PDF Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-600" />
                  📄 Talk to My PDF
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input type="file" accept=".pdf" onChange={handleFileUpload} />
                {uploadedFile && (
                  <div className="p-2 bg-green-50 rounded text-sm">
                    📄 {uploadedFile.name} ready for conversation
                  </div>
                )}
                <Input
                  placeholder="Ask anything about your PDF..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <Button onClick={handleChatWithPDF} className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with PDF
                </Button>
              </CardContent>
            </Card>

            {/* Roleplay Arena */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  🎭 Roleplay Arena
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Characters (up to 3)</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {characters.map((char) => (
                      <Button
                        key={char.id}
                        variant={selectedCharacters.includes(char.id) ? "default" : "outline"}
                        onClick={() => handleCharacterSelect(char.id)}
                        className="text-sm"
                      >
                        {char.emoji} {char.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <Input
                  placeholder="Debate topic: AI ethics, Space exploration, etc."
                  value={debateTopics}
                  onChange={(e) => setDebateTopics(e.target.value)}
                />
                <Button onClick={startDebate} className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Start Debate
                </Button>
              </CardContent>
            </Card>

            {/* LifeFlow Designer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  📅 LifeFlow Designer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your life goal: 'Move to Canada in 6 months', 'Start a business', etc."
                  value={lifeGoal}
                  onChange={(e) => setLifeGoal(e.target.value)}
                />
                <Button onClick={createLifePlan} className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Create Life Plan
                </Button>
              </CardContent>
            </Card>

            {/* Tool Combo Lab */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Beaker className="w-5 h-5 mr-2 text-orange-600" />
                  🧪 Tool Combo Lab
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select 2 Tools to Mix</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {tools.map((tool) => (
                      <Button
                        key={tool.id}
                        variant={selectedTools.includes(tool.id) ? "default" : "outline"}
                        onClick={() => handleToolSelect(tool.id)}
                        className="text-sm"
                      >
                        {tool.icon} {tool.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button onClick={mixTools} className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Mix Tools ✨
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🏆 Agent Results & Export</CardTitle>
              <CardDescription>
                View outputs from your agent chains and export results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Results Coming Soon!</h3>
                <p className="text-slate-600">Run some agents to see results here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
