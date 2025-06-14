
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { Agent } from "./types";
import { getCategoryColor } from "./utils/styles";

interface AgentGridProps {
  agents: Agent[];
  activeAgent: string | null;
  setActiveAgent: (agentId: string | null) => void;
}

export function AgentGrid({ agents, activeAgent, setActiveAgent }: AgentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => {
        const Icon = agent.icon;
        return (
          <Card key={agent.id} className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <Badge className={getCategoryColor(agent.category)}>
                      {agent.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{agent.description}</CardDescription>
              <Button 
                onClick={() => setActiveAgent(agent.id)}
                className="w-full"
                variant={activeAgent === agent.id ? "default" : "outline"}
              >
                <Play className="w-4 h-4 mr-2" />
                {activeAgent === agent.id ? "Active" : "Activate"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
