
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Dashboard as DashboardComponent } from "@/components/Dashboard";
import { UsersManagement } from "@/components/UsersManagement";
import { AgentsManagement } from "@/components/AgentsManagement";
import { AgentDeployment } from "@/components/AgentDeployment";
import { MyAgents } from "@/components/MyAgents";
import { OwnerPanel } from "@/components/OwnerPanel";
import { AgentUpload } from "@/components/AgentUpload";
import { Settings } from "@/components/Settings";
import { Chat } from "@/components/Chat";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardComponent />;
      case "chat":
        return <Chat />;
      case "agents":
        return <AgentsManagement />;
      case "my-agents":
        return <MyAgents />;
      case "upload":
        return <AgentUpload />;
      case "owner-panel":
        return <OwnerPanel />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardComponent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex w-full">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header 
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
