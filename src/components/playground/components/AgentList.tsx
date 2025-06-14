
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Agent } from "../types";
import { getCategoryColor } from "../utils/styles";

interface AgentListProps {
  agents: Agent[];
  onAddAgent: (agent: Agent) => void;
}

export function AgentList({ agents, onAddAgent }: AgentListProps) {
  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {agents.map((agent) => {
        const Icon = agent.icon;
        return (
          <div
            key={agent.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
            onClick={() => onAddAgent(agent)}
          >
            <div className="flex items-center space-x-2">
              <Icon className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">{agent.name}</p>
                <Badge className={getCategoryColor(agent.category)}>
                  {agent.category}
                </Badge>
              </div>
            </div>
            <Plus className="w-4 h-4 text-blue-600" />
          </div>
        );
      })}
    </div>
  );
}
