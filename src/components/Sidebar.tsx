
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Users, Bot, Building2, LayoutDashboard, Settings, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "agents", label: "AI Agents", icon: Bot },
  { id: "companies", label: "Companies", icon: Building2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }: SidebarProps) {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-slate-200 shadow-lg transition-all duration-300 z-50",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AgentHub
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 hover:bg-slate-100"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200",
                    collapsed ? "px-2" : "px-4",
                    activeTab === item.id 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md" 
                      : "hover:bg-slate-100 text-slate-700"
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className={cn("w-5 h-5", collapsed ? "mx-auto" : "mr-3")} />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className={cn("text-xs text-slate-500", collapsed ? "text-center" : "")}>
            {collapsed ? "v1.0" : "AgentHub v1.0.0"}
          </div>
        </div>
      </div>
    </div>
  );
}
