
import { useToast } from "@/hooks/use-toast";
import { agents } from "../data/agents";
import { usePlaygroundState } from "./usePlaygroundState";
import { useAgentActions } from "./useAgentActions";
import { useWorkflowActions } from "./useWorkflowActions";

export function useAgentPlayground() {
  const { toast } = useToast();
  const state = usePlaygroundState();

  const agentActions = useAgentActions({
    playgroundAgents: state.playgroundAgents,
    setPlaygroundAgents: state.setPlaygroundAgents,
    editingTaskId: state.editingTaskId,
    setEditingTaskId: state.setEditingTaskId,
    tempTask: state.tempTask,
    setTempTask: state.setTempTask,
  });

  const workflowActions = useWorkflowActions({
    playgroundAgents: state.playgroundAgents,
    setPlaygroundAgents: state.setPlaygroundAgents,
    workflowName: state.workflowName,
    workflowDescription: state.workflowDescription,
    setWorkflowName: state.setWorkflowName,
    setWorkflowDescription: state.setWorkflowDescription,
    savedWorkflows: state.savedWorkflows,
    setSavedWorkflows: state.setSavedWorkflows,
  });

  return {
    agents,
    ...state,
    ...agentActions,
    ...workflowActions,
    toast,
  };
}
