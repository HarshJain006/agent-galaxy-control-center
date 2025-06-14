
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Search, Plus, Edit, Trash2, Activity, Zap, AlertCircle, Play, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Agent {
  id: string;
  name: string;
  type: string;
  company: string;
  status: "active" | "inactive" | "error" | "maintenance";
  tasksCompleted: number;
  efficiency: string;
  lastActive: string;
  description: string;
  version: string;
}

export function AgentsManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [agents] = useState<Agent[]>([
    {
      id: "1",
      name: "CustomerService-AI",
      type: "Customer Support",
      company: "TechCorp",
      status: "active",
      tasksCompleted: 1245,
      efficiency: "98%",
      lastActive: "2 minutes ago",
      description: "Handles customer inquiries and support tickets",
      version: "v2.1.0"
    },
    {
      id: "2",
      name: "DataAnalyzer-Bot",
      type: "Data Analysis",
      company: "AnalyticsPro",
      status: "active",
      tasksCompleted: 987,
      efficiency: "95%",
      lastActive: "5 minutes ago",
      description: "Processes and analyzes large datasets",
      version: "v1.8.3"
    },
    {
      id: "3",
      name: "SalesAssistant-AI",
      type: "Sales Support",
      company: "SalesForce",
      status: "maintenance",
      tasksCompleted: 876,
      efficiency: "92%",
      lastActive: "1 hour ago",
      description: "Assists with sales processes and lead qualification",
      version: "v3.0.1"
    },
    {
      id: "4",
      name: "ContentGenerator",
      type: "Content Creation",
      company: "MediaHub",
      status: "error",
      tasksCompleted: 654,
      efficiency: "89%",
      lastActive: "2 hours ago",
      description: "Generates marketing content and copy",
      version: "v1.5.2"
    }
  ]);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAgent = () => {
    toast({
      title: "Deploy New Agent",
      description: "Agent deployment wizard would open here",
    });
  };

  const handleEditAgent = (agentId: string) => {
    toast({
      title: "Edit Agent",
      description: `Configuration panel for agent ${agentId} would open here`,
    });
  };

  const handleDeleteAgent = (agentId: string) => {
    toast({
      title: "Delete Agent",
      description: `Confirmation dialog for deleting agent ${agentId} would appear here`,
      variant: "destructive",
    });
  };

  const handleToggleAgent = (agentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast({
      title: `Agent ${newStatus === "active" ? "Started" : "Stopped"}`,
      description: `Agent ${agentId} has been ${newStatus === "active" ? "activated" : "deactivated"}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "error": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Activity className="w-4 h-4" />;
      case "inactive": return <Pause className="w-4 h-4" />;
      case "error": return <AlertCircle className="w-4 h-4" />;
      case "maintenance": return <Zap className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Bot className="w-8 h-8 mr-3 text-green-600" />
            AI Agents Management
          </h1>
          <p className="text-slate-600 mt-2">Deploy, monitor, and manage AI agents across your network</p>
        </div>
        <Button onClick={handleAddAgent} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Deploy Agent
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Agents</CardTitle>
          <CardDescription>Find agents by name, type, or company</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <Bot className="w-5 h-5 mr-2 text-blue-600" />
                    {agent.name}
                  </CardTitle>
                  <CardDescription className="text-sm">{agent.type}</CardDescription>
                </div>
                <Badge className={getStatusColor(agent.status)}>
                  <div className="flex items-center">
                    {getStatusIcon(agent.status)}
                    <span className="ml-1">{agent.status}</span>
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-600">{agent.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Company:</span>
                  <p className="text-slate-600">{agent.company}</p>
                </div>
                <div>
                  <span className="font-medium">Version:</span>
                  <p className="text-slate-600">{agent.version}</p>
                </div>
                <div>
                  <span className="font-medium">Tasks:</span>
                  <p className="text-slate-600">{agent.tasksCompleted.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium">Efficiency:</span>
                  <p className="text-green-600 font-semibold">{agent.efficiency}</p>
                </div>
              </div>
              <div className="text-sm text-slate-600">
                <strong>Last Active:</strong> {agent.lastActive}
              </div>
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant={agent.status === "active" ? "destructive" : "default"}
                  onClick={() => handleToggleAgent(agent.id, agent.status)}
                  className="flex-1"
                >
                  {agent.status === "active" ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                  {agent.status === "active" ? "Stop" : "Start"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditAgent(agent.id)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteAgent(agent.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bot className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No agents found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or deploy a new agent.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
