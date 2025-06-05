
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bot, Building2, Activity, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Dashboard() {
  const stats = [
    { title: "Total Users", value: "1,234", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Active Agents", value: "89", change: "+5%", icon: Bot, color: "text-green-600" },
    { title: "Companies", value: "45", change: "+8%", icon: Building2, color: "text-purple-600" },
    { title: "Tasks Completed", value: "12,345", change: "+23%", icon: Activity, color: "text-orange-600" },
  ];

  const recentActivity = [
    { action: "New user registered", user: "John Doe", company: "TechCorp", time: "2 min ago", status: "success" },
    { action: "Agent deployment", user: "Jane Smith", company: "InnovateLab", time: "5 min ago", status: "success" },
    { action: "Company verification", user: "Bob Wilson", company: "StartupXYZ", time: "15 min ago", status: "pending" },
    { action: "Agent error reported", user: "Alice Brown", company: "DataFlow", time: "1 hour ago", status: "error" },
  ];

  const topPerformingAgents = [
    { name: "CustomerService-AI", company: "TechCorp", tasks: 1245, efficiency: "98%" },
    { name: "DataAnalyzer-Bot", company: "AnalyticsPro", tasks: 987, efficiency: "95%" },
    { name: "SalesAssistant-AI", company: "SalesForce", tasks: 876, efficiency: "92%" },
    { name: "ContentGenerator", company: "MediaHub", tasks: 654, efficiency: "89%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome back! Here's what's happening with your AI agents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                <span className="text-xs text-slate-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest actions across your AI agent network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-600">{activity.user} • {activity.company}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={activity.status === "success" ? "default" : activity.status === "pending" ? "secondary" : "destructive"}>
                      {activity.status}
                    </Badge>
                    <span className="text-xs text-slate-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="w-5 h-5 mr-2 text-green-600" />
              Top Performing Agents
            </CardTitle>
            <CardDescription>Your most efficient AI agents this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingAgents.map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{agent.name}</p>
                    <p className="text-xs text-slate-600">{agent.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{agent.tasks} tasks</p>
                    <p className="text-xs text-green-600">{agent.efficiency} efficiency</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
