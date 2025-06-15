
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Save, Workflow, Edit, X, GitBranch } from "lucide-react";
import { PlaygroundAgent } from "../types";
import { getStatusColor } from "../utils/styles";
import { FileUpload } from "./FileUpload";
import { ExecutionFlowManager } from "./ExecutionFlowManager";

interface WorkflowBuilderProps {
  playgroundAgents: PlaygroundAgent[];
  workflowName: string;
  workflowDescription: string;
  editingTaskId: string | null;
  tempTask: string;
  onRemoveAgent: (id: string) => void;
  onMoveAgent: (id: string, direction: "up" | "down") => void;
  onStartEditingTask: (id: string, currentTask: string) => void;
  onSaveTask: (id: string) => void;
  onCancelEditingTask: () => void;
  onSetWorkflowName: (name: string) => void;
  onSetWorkflowDescription: (description: string) => void;
  onRunWorkflow: () => void;
  onSaveWorkflow: () => void;
  onUpdateAgentFiles: (agentId: string, files: File[]) => void;
  onUpdateAgent: (agentId: string, updates: Partial<PlaygroundAgent>) => void;
  onSetTempTask: (task: string) => void;
}

export function WorkflowBuilder({
  playgroundAgents,
  workflowName,
  workflowDescription,
  editingTaskId,
  tempTask,
  onRemoveAgent,
  onMoveAgent,
  onStartEditingTask,
  onSaveTask,
  onCancelEditingTask,
  onSetWorkflowName,
  onSetWorkflowDescription,
  onRunWorkflow,
  onSaveWorkflow,
  onUpdateAgentFiles,
  onUpdateAgent,
  onSetTempTask
}: WorkflowBuilderProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="workflow-name">Workflow Name</Label>
          <Input
            id="workflow-name"
            placeholder="My Custom Workflow"
            value={workflowName}
            onChange={(e) => onSetWorkflowName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="workflow-desc">Description (Optional)</Label>
          <Input
            id="workflow-desc"
            placeholder="What does this workflow do?"
            value={workflowDescription}
            onChange={(e) => onSetWorkflowDescription(e.target.value)}
          />
        </div>
      </div>

      {playgroundAgents.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-lg">
          <Workflow className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-500">Add agents from the left to build your workflow</p>
        </div>
      ) : (
        <Tabs defaultValue="agents" className="w-full">
          <TabsList>
            <TabsTrigger value="agents">Agent Configuration</TabsTrigger>
            <TabsTrigger value="flow">
              <GitBranch className="w-4 h-4 mr-1" />
              Execution Flow
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-3">
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
          </TabsContent>

          <TabsContent value="flow">
            <ExecutionFlowManager
              agents={playgroundAgents}
              onUpdateAgent={onUpdateAgent}
            />
          </TabsContent>
        </Tabs>
      )}

      <div className="flex space-x-2">
        <Button onClick={onRunWorkflow} className="flex-1">
          <Play className="w-4 h-4 mr-2" />
          Run Workflow
        </Button>
        <Button onClick={onSaveWorkflow} variant="outline">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </>
  );
}
