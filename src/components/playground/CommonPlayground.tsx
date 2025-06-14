
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Workflow } from "lucide-react";
import { AgentList } from "./components/AgentList";
import { WorkflowBuilder } from "./components/WorkflowBuilder";
import { SavedWorkflows } from "./components/SavedWorkflows";
import { Agent, PlaygroundAgent, PlaygroundWorkflow } from "./types";

interface CommonPlaygroundProps {
  agents: Agent[];
  playgroundAgents: PlaygroundAgent[];
  workflowName: string;
  workflowDescription: string;
  savedWorkflows: PlaygroundWorkflow[];
  editingTaskId: string | null;
  tempTask: string;
  addAgentToPlayground: (agent: Agent) => void;
  removeAgentFromPlayground: (id: string) => void;
  moveAgent: (id: string, direction: "up" | "down") => void;
  startEditingTask: (id: string, currentTask: string) => void;
  saveTask: (id: string) => void;
  cancelEditingTask: () => void;
  setWorkflowName: (name: string) => void;
  setWorkflowDescription: (description: string) => void;
  runPlaygroundWorkflow: () => void;
  saveWorkflow: () => void;
  loadWorkflow: (workflow: PlaygroundWorkflow) => void;
  setSavedWorkflows: (workflows: PlaygroundWorkflow[]) => void;
}

export function CommonPlayground({
  agents,
  playgroundAgents,
  workflowName,
  workflowDescription,
  savedWorkflows,
  editingTaskId,
  tempTask,
  addAgentToPlayground,
  removeAgentFromPlayground,
  moveAgent,
  startEditingTask,
  saveTask,
  cancelEditingTask,
  setWorkflowName,
  setWorkflowDescription,
  runPlaygroundWorkflow,
  saveWorkflow,
  loadWorkflow,
  setSavedWorkflows
}: CommonPlaygroundProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-blue-600" />
              Available Agents
            </CardTitle>
            <CardDescription>
              Click to add agents to your workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AgentList agents={agents} onAddAgent={addAgentToPlayground} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Workflow className="w-5 h-5 mr-2 text-purple-600" />
              Workflow Builder
            </CardTitle>
            <CardDescription>
              Drag, drop, and customize your agent workflow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <WorkflowBuilder
              playgroundAgents={playgroundAgents}
              workflowName={workflowName}
              workflowDescription={workflowDescription}
              editingTaskId={editingTaskId}
              tempTask={tempTask}
              onRemoveAgent={removeAgentFromPlayground}
              onMoveAgent={moveAgent}
              onStartEditingTask={startEditingTask}
              onSaveTask={saveTask}
              onCancelEditingTask={cancelEditingTask}
              onSetWorkflowName={setWorkflowName}
              onSetWorkflowDescription={setWorkflowDescription}
              onRunWorkflow={runPlaygroundWorkflow}
              onSaveWorkflow={saveWorkflow}
            />
          </CardContent>
        </Card>
      </div>

      <SavedWorkflows
        savedWorkflows={savedWorkflows}
        onLoadWorkflow={loadWorkflow}
        onDeleteWorkflow={(workflowId) => 
          setSavedWorkflows(savedWorkflows.filter(w => w.id !== workflowId))
        }
      />
    </>
  );
}
