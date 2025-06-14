
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Plus, Edit, Trash2, Mail, Phone, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  agentsManaged: number;
}

export function UsersManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@techcorp.com",
      phone: "+1 234 567 8900",
      company: "TechCorp",
      role: "Admin",
      status: "active",
      joinDate: "2024-01-15",
      agentsManaged: 12
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@innovatelab.com",
      phone: "+1 234 567 8901",
      company: "InnovateLab",
      role: "Manager",
      status: "active",
      joinDate: "2024-02-20",
      agentsManaged: 8
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob@startupxyz.com",
      phone: "+1 234 567 8902",
      company: "StartupXYZ",
      role: "User",
      status: "pending",
      joinDate: "2024-03-10",
      agentsManaged: 3
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@dataflow.com",
      phone: "+1 234 567 8903",
      company: "DataFlow",
      role: "Manager",
      status: "inactive",
      joinDate: "2024-01-05",
      agentsManaged: 15
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "User creation form would open here",
    });
  };

  const handleEditUser = (userId: string) => {
    toast({
      title: "Edit User",
      description: `Edit form for user ${userId} would open here`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "Delete User",
      description: `Confirmation dialog for deleting user ${userId} would appear here`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Users className="w-8 h-8 mr-3 text-blue-600" />
            Users Management
          </h1>
          <p className="text-slate-600 mt-2">Manage user accounts and permissions across your AI agent network</p>
        </div>
        <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
          <CardDescription>Find users by name, email, or company</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription className="text-sm">{user.role}</CardDescription>
                </div>
                <Badge className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-slate-600">
                <Mail className="w-4 h-4 mr-2" />
                {user.email}
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Phone className="w-4 h-4 mr-2" />
                {user.phone}
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Building2 className="w-4 h-4 mr-2" />
                {user.company}
              </div>
              <div className="text-sm text-slate-600">
                <strong>Agents Managed:</strong> {user.agentsManaged}
              </div>
              <div className="text-sm text-slate-600">
                <strong>Joined:</strong> {new Date(user.joinDate).toLocaleDateString()}
              </div>
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditUser(user.id)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No users found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or add a new user.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
