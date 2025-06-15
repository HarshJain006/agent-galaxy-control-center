
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit, X, Save } from "lucide-react";
import { PlaygroundAgent } from "../types";
import { getStatusColor } from "../utils/styles";
import { FileUpload } from "./FileUpload";

interface AgentSequenceProps {
  playgroundAgents: PlaygroundAgent[];
  editingTaskId: string | null;
  tempTask: string;
  onRemoveAgent: (id: string) => void;
  onMoveAgent: (id: string, direction: "up" | "down") => void;
  onStartEditingTask: (id: string, currentTask: string) => void;
  onSaveTask: (id: string) => void;
  onCancelEditingTask: () => void;
  onUpdateAgentFiles: (agentId: string, files: File[]) => void;
  onSetTempTask: (task: string) => void;
}

export function AgentSequence({
  playgroundAgents,
  editingTaskId,
  tempTask,
  onRemoveAgent,
  onMoveAgent,
  onStartEditingTask,
  onSaveTask,
  onCancelEditingTask,
  onUpdateAgentFiles,
  onSetTempTask
}: AgentSequenceProps) {
  return (
    <div className="space-y-3">
      <Label>Agent Sequence ({playgroundAgents.length} agents)</Label>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {playgroundAgents.map((playgroundAgent, index) => {
          const Icon = playgroundAgent.agent.icon;
          return (
            <div key={playgroundAgent.id} className="p-3 border rounded-lg bg-slate-50 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <span className="text-sm font-bold text-slate-500">#{playgroundAgent.order}</span>
                  <Icon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{playgroundAgent.agent.name}</p>
                    {editingTaskId === playgroundAgent.id ? (
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          value={tempTask}
                          onChange={(e) => onSetTempTask(e.target.value)}
                          className="text-xs h-6"
                          placeholder="Enter task..."
                        />
                        <Button
                          size="sm"
                          onClick={() => onSaveTask(playgroundAgent.id)}
                          className="h-6 px-2"
                        >
                          <Save className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={onCancelEditingTask}
                          className="h-6 px-2"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <p 
                        className="text-xs text-slate-600 cursor-pointer hover:text-blue-600"
                        onClick={() => onStartEditingTask(playgroundAgent.id, playgroundAgent.task)}
                      >
                        {playgroundAgent.task}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge className={getStatusColor(playgroundAgent.status)}>
                      {playgroundAgent.status}
                    </Badge>
                    {playgroundAgent.executionType === "parallel" && (
                      <Badge variant="outline" className="text-xs">
                        Parallel
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onMoveAgent(playgroundAgent.id, "up")}
                    disabled={index === 0}
                    className="h-6 w-6 p-0"
                  >
                    ↑
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onMoveAgent(playgroundAgent.id, "down")}
                    disabled={index === playgroundAgents.length - 1}
                    className="h-6 w-6 p-0"
                  >
                    ↓
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onStartEditingTask(playgroundAgent.id, playgroundAgent.task)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveAgent(playgroundAgent.id)}
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <FileUpload
                agentId={playgroundAgent.id}
                files={playgroundAgent.attachments || []}
                onFilesChange={onUpdateAgentFiles}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
