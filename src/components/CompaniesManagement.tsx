
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, Search, Plus, Edit, Trash2, Users, Bot, Globe, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "trial" | "suspended";
  employees: number;
  agents: number;
  joinDate: string;
  subscription: string;
  location: string;
}

export function CompaniesManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [companies] = useState<Company[]>([
    {
      id: "1",
      name: "TechCorp",
      industry: "Technology",
      website: "https://techcorp.com",
      email: "admin@techcorp.com",
      phone: "+1 234 567 8900",
      status: "active",
      employees: 150,
      agents: 12,
      joinDate: "2024-01-15",
      subscription: "Enterprise",
      location: "San Francisco, CA"
    },
    {
      id: "2",
      name: "InnovateLab",
      industry: "Research & Development",
      website: "https://innovatelab.com",
      email: "contact@innovatelab.com",
      phone: "+1 234 567 8901",
      status: "active",
      employees: 85,
      agents: 8,
      joinDate: "2024-02-20",
      subscription: "Professional",
      location: "Austin, TX"
    },
    {
      id: "3",
      name: "StartupXYZ",
      industry: "Fintech",
      website: "https://startupxyz.com",
      email: "hello@startupxyz.com",
      phone: "+1 234 567 8902",
      status: "trial",
      employees: 25,
      agents: 3,
      joinDate: "2024-03-10",
      subscription: "Trial",
      location: "New York, NY"
    },
    {
      id: "4",
      name: "DataFlow Inc",
      industry: "Data Analytics",
      website: "https://dataflow.com",
      email: "support@dataflow.com",
      phone: "+1 234 567 8903",
      status: "suspended",
      employees: 200,
      agents: 15,
      joinDate: "2024-01-05",
      subscription: "Enterprise",
      location: "Seattle, WA"
    }
  ]);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCompany = () => {
    toast({
      title: "Add Company",
      description: "Company registration form would open here",
    });
  };

  const handleEditCompany = (companyId: string) => {
    toast({
      title: "Edit Company",
      description: `Edit form for company ${companyId} would open here`,
    });
  };

  const handleDeleteCompany = (companyId: string) => {
    toast({
      title: "Delete Company",
      description: `Confirmation dialog for deleting company ${companyId} would appear here`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "trial": return "bg-blue-100 text-blue-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "Enterprise": return "bg-purple-100 text-purple-800";
      case "Professional": return "bg-blue-100 text-blue-800";
      case "Trial": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Building2 className="w-8 h-8 mr-3 text-purple-600" />
            Companies Management
          </h1>
          <p className="text-slate-600 mt-2">Manage company accounts and organizational settings</p>
        </div>
        <Button onClick={handleAddCompany} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Company
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Companies</CardTitle>
          <CardDescription>Find companies by name, industry, or location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-purple-600" />
                    {company.name}
                  </CardTitle>
                  <CardDescription className="text-sm">{company.industry}</CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(company.status)}>
                    {company.status}
                  </Badge>
                  <Badge className={getSubscriptionColor(company.subscription)}>
                    {company.subscription}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-slate-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{company.employees} employees</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Bot className="w-4 h-4 mr-2" />
                  <span>{company.agents} agents</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <Globe className="w-4 h-4 mr-2" />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    {company.website}
                  </a>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {company.email}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {company.phone}
                </div>
              </div>

              <div className="text-sm text-slate-600">
                <div><strong>Location:</strong> {company.location}</div>
                <div><strong>Joined:</strong> {new Date(company.joinDate).toLocaleDateString()}</div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditCompany(company.id)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteCompany(company.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No companies found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or add a new company.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
