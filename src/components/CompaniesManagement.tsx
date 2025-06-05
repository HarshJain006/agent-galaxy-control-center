
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Search, Filter, MoreHorizontal, Users, Bot } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function CompaniesManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const companies = [
    { id: 1, name: "TechCorp", industry: "Technology", users: 45, agents: 12, status: "Active", plan: "Enterprise", joined: "Jan 2024" },
    { id: 2, name: "AnalyticsPro", industry: "Data Analytics", users: 23, agents: 8, status: "Active", plan: "Professional", joined: "Feb 2024" },
    { id: 3, name: "SalesForce", industry: "Sales", users: 67, agents: 15, status: "Active", plan: "Enterprise", joined: "Dec 2023" },
    { id: 4, name: "MediaHub", industry: "Media", users: 12, agents: 4, status: "Trial", plan: "Trial", joined: "Mar 2024" },
    { id: 5, name: "SecureTech", industry: "Security", users: 34, agents: 9, status: "Suspended", plan: "Professional", joined: "Nov 2023" },
  ];

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Trial": return "secondary";
      case "Suspended": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Companies Management</h1>
          <p className="text-slate-600 mt-2">Manage companies and their AI agent subscriptions</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Company
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Companies</p>
                <p className="text-2xl font-bold text-slate-900">{companies.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{companies.filter(c => c.status === "Active").length}</p>
              </div>
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">On Trial</p>
                <p className="text-2xl font-bold text-orange-600">{companies.filter(c => c.status === "Trial").length}</p>
              </div>
              <Building2 className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-purple-600">{companies.reduce((sum, c) => sum + c.users, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                All Companies
              </CardTitle>
              <CardDescription>Manage company accounts and subscriptions</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search companies..."
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
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Company</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Industry</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Users</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Agents</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Plan</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Joined</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-slate-900">{company.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-900">{company.industry}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-900">{company.users}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Bot className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-900">{company.agents}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getStatusColor(company.status)}>
                        {company.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{company.plan}</Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{company.joined}</td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Company</DropdownMenuItem>
                          <DropdownMenuItem>Manage Subscription</DropdownMenuItem>
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
