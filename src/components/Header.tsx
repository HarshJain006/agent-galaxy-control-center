
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export function Header({ toggleSidebar, sidebarCollapsed }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={toggleSidebar} className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <h1 
          className="text-xl font-bold text-slate-900 cursor-pointer hover:text-slate-700 transition-colors"
          onClick={handleLogoClick}
        >
          AgentHub
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search users, agents, companies..."
            className="pl-10 w-64 bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>
        
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500">admin@agenthub.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
