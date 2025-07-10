import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Users, 
  Bot, 
  DollarSign, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  FileText,
  Database,
  Server,
  Globe,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function OwnerPanel() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  // TODO: Backend integration - Fetch owner dashboard data
  const ownerStats = {
    totalUsers: 1234,
    activeAgents: 89,
    totalRevenue: 45678,
    monthlyGrowth: 23.5,
    pendingApprovals: 12,
    systemStatus: "healthy"
  };

  const handleApproveAgent = (agentId: string) => {
    // TODO: Backend integration - Approve agent
    toast({
      title: "Agent Approved",
      description: "Agent has been approved and published.",
    });
  };

  const handleRejectAgent = (agentId: string) => {
    // TODO: Backend integration - Reject agent
    toast({
      title: "Agent Rejected", 
      description: "Agent has been rejected and removed from queue.",
    });
  };

  const handleSystemUpdate = (setting: string, value: any) => {
    // TODO: Backend integration - Update system settings
    console.log(`Updating ${setting} to:`, value);
    toast({
      title: "Setting Updated",
      description: `${setting} has been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Shield className="w-8 h-8 text-red-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Owner Panel</h1>
          <p className="text-slate-600">Administrative controls and system management</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="agents">Agent Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Owner Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ownerStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{ownerStats.monthlyGrowth}% this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                <Bot className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ownerStats.activeAgents}</div>
                <p className="text-xs text-gray-600">
                  {ownerStats.pendingApprovals} pending approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${ownerStats.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-green-600">
                  +15% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{ownerStats.systemStatus}</div>
                <p className="text-xs text-green-600">All systems operational</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Platform Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New agent submitted", user: "DevStudio", time: "5 min ago", status: "pending" },
                  { action: "User registration spike", details: "+50 new users", time: "1 hour ago", status: "info" },
                  { action: "Payment processed", details: "$1,234 revenue", time: "2 hours ago", status: "success" },
                  { action: "System maintenance completed", time: "1 day ago", status: "success" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      {activity.details && <p className="text-sm text-gray-600">{activity.details}</p>}
                      {activity.user && <p className="text-sm text-gray-600">by {activity.user}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={activity.status === "success" ? "default" : activity.status === "pending" ? "secondary" : "outline"}>
                        {activity.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Approval Queue</CardTitle>
              <CardDescription>Review and approve new agent submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "1", name: "PDF Invoice Parser", creator: "DevStudio", category: "Document", submitted: "2 hours ago" },
                  { id: "2", name: "Social Media Analyzer", creator: "AICreator", category: "Analytics", submitted: "5 hours ago" },
                  { id: "3", name: "Voice Cloning Tool", creator: "VoiceTech", category: "Audio", submitted: "1 day ago" }
                ].map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{agent.name}</h3>
                      <p className="text-sm text-gray-600">by {agent.creator} • {agent.category} • {agent.submitted}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleApproveAgent(agent.id)}>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleRejectAgent(agent.id)}>
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agent Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "YOLO Helmet Detector", uses: 1245, revenue: "$2,340", rating: 4.8 },
                  { name: "Resume Shortlister", uses: 987, revenue: "$1,876", rating: 4.9 },
                  { name: "Lecture Summarizer", uses: 876, revenue: "$1,654", rating: 4.7 }
                ].map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-gray-600">{agent.uses} uses • Rating: {agent.rating}/5</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{agent.revenue}</p>
                      <p className="text-xs text-gray-500">Total Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-2xl font-bold">1,234</p>
                      <p className="text-sm text-gray-600">Total Users</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="text-2xl font-bold">1,120</p>
                      <p className="text-sm text-gray-600">Active Users</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                      <p className="text-2xl font-bold">5</p>
                      <p className="text-sm text-gray-600">Flagged Accounts</p>
                    </CardContent>
                  </Card>
                </div>

                {/* User Search */}
                <div className="flex space-x-2">
                  <Input placeholder="Search users..." className="flex-1" />
                  <Button>Search</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Dashboard</CardTitle>
              <CardDescription>Platform monetization metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">This Month</p>
                        <p className="text-2xl font-bold">$12,345</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Total Revenue</p>
                        <p className="text-2xl font-bold">$156,789</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Paying Users</p>
                        <p className="text-2xl font-bold">456</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Growth Rate</p>
                        <p className="text-2xl font-bold">+23%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Platform settings and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <Switch 
                      id="maintenance"
                      onCheckedChange={(checked) => handleSystemUpdate("maintenance", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="registrations">Allow New Registrations</Label>
                    <Switch 
                      id="registrations" 
                      defaultChecked
                      onCheckedChange={(checked) => handleSystemUpdate("registrations", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="agent-uploads">Allow Agent Uploads</Label>
                    <Switch 
                      id="agent-uploads" 
                      defaultChecked
                      onCheckedChange={(checked) => handleSystemUpdate("agent-uploads", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="max-file-size">Max File Size (MB)</Label>
                    <Input 
                      id="max-file-size" 
                      type="number" 
                      defaultValue="100"
                      onChange={(e) => handleSystemUpdate("max-file-size", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="rate-limit">API Rate Limit (requests/hour)</Label>
                    <Input 
                      id="rate-limit" 
                      type="number" 
                      defaultValue="1000"
                      onChange={(e) => handleSystemUpdate("rate-limit", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">System Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Database: Online</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>API: Healthy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Storage: 78% Used</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <CardDescription>Detailed usage and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { category: "Document Processing", usage: "45%" },
                        { category: "Computer Vision", usage: "32%" },
                        { category: "Audio Processing", usage: "15%" },
                        { category: "NLP", usage: "8%" }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{item.category}</span>
                          <Badge>{item.usage}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { month: "January", users: 234 },
                        { month: "February", users: 456 },
                        { month: "March", users: 789 },
                        { month: "April", users: 1234 }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{item.month}</span>
                          <span className="font-bold">{item.users}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}