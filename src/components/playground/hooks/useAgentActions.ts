
import { useToast } from "@/hooks/use-toast";
import { Agent, PlaygroundAgent } from "../types";

interface UseAgentActionsProps {
  playgroundAgents: PlaygroundAgent[];
  setPlaygroundAgents: (agents: PlaygroundAgent[]) => void;
  editingTaskId: string | null;
  setEditingTaskId: (id: string | null) => void;
  tempTask: string;
  setTempTask: (task: string) => void;
}

export function useAgentActions({
  playgroundAgents,
  setPlaygroundAgents,
  editingTaskId,
  setEditingTaskId,
  tempTask,
  setTempTask,
}: UseAgentActionsProps) {
  const { toast } = useToast();

  const addAgentToPlayground = (agent: Agent) => {
    const newPlaygroundAgent: PlaygroundAgent = {
      id: `${agent.id}-${Date.now()}`,
      agent,
      task: `Perform ${agent.name} task`,
      order: playgroundAgents.length + 1,
      status: "pending",
      attachments: [],
      executionType: "sequential",
      dependsOn: [],
      inputSources: []
    };
    setPlaygroundAgents([...playgroundAgents, newPlaygroundAgent]);
    
    toast({
      title: "Agent Added! 🤖",
      description: `${agent.name} added to playground`
    });
  };

  const removeAgentFromPlayground = (id: string) => {
    setPlaygroundAgents(playgroundAgents.filter(a => a.id !== id));
  };

  const updateAgentTask = (id: string, task: string) => {
    setPlaygroundAgents(playgroundAgents.map(a => 
      a.id === id ? { ...a, task } : a
    ));
  };

  const updateAgentFiles = (agentId: string, files: File[]) => {
    setPlaygroundAgents(playgroundAgents.map(a => 
      a.id === agentId ? { ...a, attachments: files } : a
    ));
  };

  const moveAgent = (id: string, direction: "up" | "down") => {
    const currentIndex = playgroundAgents.findIndex(a => a.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === playgroundAgents.length - 1)
    ) return;

    const newAgents = [...playgroundAgents];
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    
    [newAgents[currentIndex], newAgents[targetIndex]] = [newAgents[targetIndex], newAgents[currentIndex]];
    
    // Update order numbers
    newAgents.forEach((agent, index) => {
      agent.order = index + 1;
    });
    
    setPlaygroundAgents(newAgents);
  };

  const updateAgent = (agentId: string, updates: Partial<PlaygroundAgent>) => {
    setPlaygroundAgents(playgroundAgents.map(a => 
      a.id === agentId ? { ...a, ...updates } : a
    ));
  };

  const startEditingTask = (id: string, currentTask: string) => {
    setEditingTaskId(id);
    setTempTask(currentTask);
  };

  const saveTask = (id: string) => {
    updateAgentTask(id, tempTask);
    setEditingTaskId(null);
    setTempTask("");
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setTempTask("");
  };

  return {
    addAgentToPlayground,
    removeAgentFromPlayground,
    updateAgentTask,
    updateAgentFiles,
    moveAgent,
    updateAgent,
    startEditingTask,
    saveTask,
    cancelEditingTask,
  };
}
