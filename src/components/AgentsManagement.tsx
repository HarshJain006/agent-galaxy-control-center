
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Plus, Search, Filter, MoreHorizontal, Play, Pause, Settings } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function AgentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const agents = [
    { id: 1, name: "CustomerService-AI", company: "TechCorp", type: "Support", status: "Running", tasks: 1245, uptime: "99.8%", lastActive: "Active now" },
    { id: 2, name: "DataAnalyzer-Bot", company: "AnalyticsPro", type: "Analytics", status: "Running", tasks: 987, uptime: "99.5%", lastActive: "2 min ago" },
    { id: 3, name: "SalesAssistant-AI", company: "SalesForce", type: "Sales", status: "Paused", tasks: 876, uptime: "98.2%", lastActive: "1 hour ago" },
    { id: 4, name: "ContentGenerator", company: "MediaHub", type: "Content", status: "Running", tasks: 654, uptime: "97.9%", lastActive: "Active now" },
    { id: 5, name: "SecurityBot", company: "SecureTech", type: "Security", status: "Error", tasks: 432, uptime: "95.1%", lastActive: "1 day ago" },
  ];

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Running": return "default";
      case "Paused": return "secondary";
      case "Error": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Agents Management</h1>
          <p className="text-slate-600 mt-2">Monitor and manage all AI agents across companies</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Deploy Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Agents</p>
                <p className="text-2xl font-bold text-slate-900">{agents.length}</p>
              </div>
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Running</p>
                <p className="text-2xl font-bold text-green-600">{agents.filter(a => a.status === "Running").length}</p>
              </div>
              <Play className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Paused</p>
                <p className="text-2xl font-bold text-orange-600">{agents.filter(a => a.status === "Paused").length}</p>
              </div>
              <Pause className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Errors</p>
                <p className="text-2xl font-bold text-red-600">{agents.filter(a => a.status === "Error").length}</p>
              </div>
              <Settings className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                All AI Agents
              </CardTitle>
              <CardDescription>Monitor performance and manage deployments</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search agents..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Agent Name</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Company</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Tasks</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Uptime</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Last Active</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-slate-900">{agent.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-900">{agent.company}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{agent.type}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-900">{agent.tasks.toLocaleString()}</td>
                    <td className="py-4 px-4 text-slate-900">{agent.uptime}</td>
                    <td className="py-4 px-4 text-slate-600">{agent.lastActive}</td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Play className="w-4 h-4 mr-2" />
                            Start/Resume
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
