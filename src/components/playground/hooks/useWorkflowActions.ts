
import { useToast } from "@/hooks/use-toast";
import { PlaygroundAgent, PlaygroundWorkflow } from "../types";

interface UseWorkflowActionsProps {
  playgroundAgents: PlaygroundAgent[];
  setPlaygroundAgents: (agents: PlaygroundAgent[]) => void;
  workflowName: string;
  workflowDescription: string;
  setWorkflowName: (name: string) => void;
  setWorkflowDescription: (description: string) => void;
  savedWorkflows: PlaygroundWorkflow[];
  setSavedWorkflows: (workflows: PlaygroundWorkflow[]) => void;
}

export function useWorkflowActions({
  playgroundAgents,
  setPlaygroundAgents,
  workflowName,
  workflowDescription,
  setWorkflowName,
  setWorkflowDescription,
  savedWorkflows,
  setSavedWorkflows,
}: UseWorkflowActionsProps) {
  const { toast } = useToast();

  const saveWorkflow = () => {
    if (!workflowName || playgroundAgents.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide a workflow name and add at least one agent",
        variant: "destructive"
      });
      return;
    }

    // Determine execution flow based on agents
    const hasParallelAgents = playgroundAgents.some(agent => agent.executionType === "parallel");
    const hasSequentialAgents = playgroundAgents.some(agent => agent.executionType === "sequential");
    
    let executionFlow: "sequential" | "parallel" | "mixed";
    if (hasParallelAgents && hasSequentialAgents) {
      executionFlow = "mixed";
    } else if (hasParallelAgents) {
      executionFlow = "parallel";
    } else {
      executionFlow = "sequential";
    }

    const newWorkflow: PlaygroundWorkflow = {
      id: Date.now().toString(),
      name: workflowName,
      description: workflowDescription,
      agents: [...playgroundAgents],
      status: "draft",
      createdAt: new Date(),
      executionFlow
    };

    setSavedWorkflows([newWorkflow, ...savedWorkflows]);
    setWorkflowName("");
    setWorkflowDescription("");
    
    toast({
      title: "Workflow Saved! 💾",
      description: `"${newWorkflow.name}" saved successfully`
    });
  };

  const runPlaygroundWorkflow = () => {
    if (playgroundAgents.length === 0) {
      toast({
        title: "No Agents",
        description: "Add agents to run the workflow",
        variant: "destructive"
      });
      return;
    }

    // Simulate running workflow
    setPlaygroundAgents(playgroundAgents.map(a => ({ ...a, status: "running" })));
    
    toast({
      title: "🚀 Workflow Started!",
      description: `Running ${playgroundAgents.length} agents in sequence`
    });

    // Simulate completion
    setTimeout(() => {
      setPlaygroundAgents(playgroundAgents.map(a => ({ ...a, status: "completed" })));
      toast({
        title: "✅ Workflow Completed!",
        description: "All agents have finished their tasks"
      });
    }, 3000);
  };

  const loadWorkflow = (workflow: PlaygroundWorkflow) => {
    setPlaygroundAgents(workflow.agents.map(a => ({ ...a, status: "pending" })));
    setWorkflowName(workflow.name);
    setWorkflowDescription(workflow.description);
    
    toast({
      title: "Workflow Loaded! 📂",
      description: `"${workflow.name}" loaded into playground`
    });
  };

  return {
    saveWorkflow,
    runPlaygroundWorkflow,
    loadWorkflow,
  };
}
