
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlaygroundAgent } from "../types";
import { GitBranch, ArrowRight, Users } from "lucide-react";

interface ExecutionFlowManagerProps {
  agents: PlaygroundAgent[];
  onUpdateAgent: (agentId: string, updates: Partial<PlaygroundAgent>) => void;
}

export function ExecutionFlowManager({ agents, onUpdateAgent }: ExecutionFlowManagerProps) {
  const handleExecutionTypeChange = (agentId: string, executionType: "sequential" | "parallel") => {
    onUpdateAgent(agentId, { executionType });
  };

  const handleDependencyChange = (agentId: string, dependsOn: string[]) => {
    onUpdateAgent(agentId, { dependsOn });
  };

  const handleInputSourceChange = (agentId: string, inputSources: string[]) => {
    onUpdateAgent(agentId, { inputSources });
  };

  const getAvailableAgents = (currentAgentId: string) => {
    return agents.filter(a => a.id !== currentAgentId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <GitBranch className="w-4 h-4 text-purple-600" />
        <h3 className="text-sm font-medium">Execution Flow Configuration</h3>
      </div>
      
      {agents.map((agent, index) => (
        <div key={agent.id} className="p-3 border rounded-lg bg-slate-50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-500">#{agent.order}</span>
              <span className="text-sm font-medium">{agent.agent.name}</span>
            </div>
            
            <Select
              value={agent.executionType}
              onValueChange={(value: "sequential" | "parallel") => 
                handleExecutionTypeChange(agent.id, value)
              }
            >
              <SelectTrigger className="w-32 h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sequential">
                  <div className="flex items-center space-x-1">
                    <ArrowRight className="w-3 h-3" />
                    <span>Sequential</span>
                  </div>
                </SelectItem>
                <SelectItem value="parallel">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>Parallel</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {agent.executionType === "parallel" && (
            <div className="space-y-2">
              <div>
                <label className="text-xs font-medium text-slate-600">Depends On:</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {getAvailableAgents(agent.id).map(availableAgent => {
                    const isSelected = agent.dependsOn?.includes(availableAgent.id) || false;
                    return (
                      <Button
                        key={availableAgent.id}
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        className="h-6 px-2 text-xs"
                        onClick={() => {
                          const currentDeps = agent.dependsOn || [];
                          const newDeps = isSelected
                            ? currentDeps.filter(id => id !== availableAgent.id)
                            : [...currentDeps, availableAgent.id];
                          handleDependencyChange(agent.id, newDeps);
                        }}
                      >
                        {availableAgent.agent.name}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">Uses Output From:</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {getAvailableAgents(agent.id).map(availableAgent => {
                    const isSelected = agent.inputSources?.includes(availableAgent.id) || false;
                    return (
                      <Button
                        key={availableAgent.id}
                        size="sm"
                        variant={isSelected ? "secondary" : "outline"}
                        className="h-6 px-2 text-xs"
                        onClick={() => {
                          const currentSources = agent.inputSources || [];
                          const newSources = isSelected
                            ? currentSources.filter(id => id !== availableAgent.id)
                            : [...currentSources, availableAgent.id];
                          handleInputSourceChange(agent.id, newSources);
                        }}
                      >
                        {availableAgent.agent.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Badge className="text-xs" variant="outline">
              {agent.executionType === "parallel" ? "Parallel Execution" : "Sequential Execution"}
            </Badge>
            {agent.dependsOn && agent.dependsOn.length > 0 && (
              <Badge className="text-xs" variant="secondary">
                Depends on {agent.dependsOn.length} agent{agent.dependsOn.length > 1 ? 's' : ''}
              </Badge>
            )}
            {agent.inputSources && agent.inputSources.length > 0 && (
              <Badge className="text-xs" variant="secondary">
                Uses {agent.inputSources.length} input{agent.inputSources.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
