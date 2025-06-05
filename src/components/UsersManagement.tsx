
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Plus, Search, Filter, MoreHorizontal, UserCheck, UserX } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: 1, name: "John Doe", email: "john@techcorp.com", company: "TechCorp", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
    { id: 2, name: "Jane Smith", email: "jane@innovatelab.com", company: "InnovateLab", role: "Manager", status: "Active", lastLogin: "1 day ago" },
    { id: 3, name: "Bob Wilson", email: "bob@startupxyz.com", company: "StartupXYZ", role: "User", status: "Pending", lastLogin: "Never" },
    { id: 4, name: "Alice Brown", email: "alice@dataflow.com", company: "DataFlow", role: "Manager", status: "Inactive", lastLogin: "1 week ago" },
    { id: 5, name: "Charlie Davis", email: "charlie@aitech.com", company: "AiTech", role: "User", status: "Active", lastLogin: "3 hours ago" },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Users Management</h1>
          <p className="text-slate-600 mt-2">Manage users across all companies and their AI agents</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                All Users
              </CardTitle>
              <CardDescription>Total: {users.length} users</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search users..."
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
                  <th className="text-left py-3 px-4 font-medium text-slate-600">User</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Company</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900">{user.name}</p>
                          <p className="text-sm text-slate-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-900">{user.company}</td>
                    <td className="py-4 px-4">
                      <Badge variant={user.role === "Admin" ? "default" : user.role === "Manager" ? "secondary" : "outline"}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={user.status === "Active" ? "default" : user.status === "Pending" ? "secondary" : "destructive"}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{user.lastLogin}</td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserX className="w-4 h-4 mr-2" />
                            Deactivate
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
