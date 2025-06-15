import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Users, 
  Bot, 
  Building2, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Rocket,
  Sparkles,
  MessageSquare
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }: SidebarProps) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Overview and analytics"
    },
    {
      id: "chat",
      label: "My GPT Chat",
      icon: MessageSquare,
      description: "Chat with your custom GPT"
    },
    {
      id: "playground",
      label: "Agent Playground",
      icon: Sparkles,
      description: "Mix, chain & create AI agents"
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      description: "Manage user accounts"
    },
    {
      id: "agents",
      label: "AI Agents",
      icon: Bot,
      description: "Deploy and monitor agents"
    },
    {
      id: "deployment",
      label: "Agent Deployment",
      icon: Rocket,
      description: "Deploy n8n workflows"
    },
    {
      id: "companies",
      label: "Companies",
      icon: Building2,
      description: "Manage organizations"
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description: "System configuration"
    }
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-full bg-white border-r border-slate-200 shadow-sm transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-slate-900">AgentHub</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              const isSpecialButton = item.id === 'playground' || item.id === 'chat';

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto py-2",
                    collapsed ? "px-2" : "px-3",
                    isActive && "bg-blue-600 hover:bg-blue-700 text-white",
                    !isActive && {
                      'bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100': item.id === 'playground',
                      'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100': item.id === 'chat'
                    }
                  )}
                  onClick={() => setActiveTab(item.id)}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && (
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm font-medium">{item.label}</span>
                      {!isActive && (
                        <span className="text-xs text-slate-500">{item.description}</span>
                      )}
                    </div>
                  )}
                </Button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4">
          {!collapsed && (
            <div className="text-xs text-slate-500 text-center">
              <p>AgentHub v2.1.0</p>
              <p>© 2024 All rights reserved</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
