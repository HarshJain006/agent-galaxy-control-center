
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch } from "lucide-react";
import { PlaygroundAgent } from "../types";
import { ExecutionFlowManager } from "./ExecutionFlowManager";
import { WorkflowHeader } from "./WorkflowHeader";
import { AgentSequence } from "./AgentSequence";
import { WorkflowActions } from "./WorkflowActions";
import { EmptyWorkflow } from "./EmptyWorkflow";

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
      <WorkflowHeader
        workflowName={workflowName}
        workflowDescription={workflowDescription}
        onSetWorkflowName={onSetWorkflowName}
        onSetWorkflowDescription={onSetWorkflowDescription}
      />

      {playgroundAgents.length === 0 ? (
        <EmptyWorkflow />
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
            <AgentSequence
              playgroundAgents={playgroundAgents}
              editingTaskId={editingTaskId}
              tempTask={tempTask}
              onRemoveAgent={onRemoveAgent}
              onMoveAgent={onMoveAgent}
              onStartEditingTask={onStartEditingTask}
              onSaveTask={onSaveTask}
              onCancelEditingTask={onCancelEditingTask}
              onUpdateAgentFiles={onUpdateAgentFiles}
              onSetTempTask={onSetTempTask}
            />
          </TabsContent>

          <TabsContent value="flow">
            <ExecutionFlowManager
              agents={playgroundAgents}
              onUpdateAgent={onUpdateAgent}
            />
          </TabsContent>
        </Tabs>
      )}

      <WorkflowActions
        onRunWorkflow={onRunWorkflow}
        onSaveWorkflow={onSaveWorkflow}
      />
    </>
  );
}
