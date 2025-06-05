
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { UsersManagement } from "@/components/UsersManagement";
import { AgentsManagement } from "@/components/AgentsManagement";
import { CompaniesManagement } from "@/components/CompaniesManagement";
import { Settings } from "@/components/Settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UsersManagement />;
      case "agents":
        return <AgentsManagement />;
      case "companies":
        return <CompaniesManagement />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
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

export default Index;
