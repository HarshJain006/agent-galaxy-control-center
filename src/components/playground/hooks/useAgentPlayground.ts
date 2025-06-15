import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Agent, AgentChain, PlaygroundAgent, PlaygroundWorkflow } from "../types";
import { agents } from "../data/agents";

export function useAgentPlayground() {
  const { toast } = useToast();
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [chains, setChains] = useState<AgentChain[]>([]);
  const [dreamChainGoal, setDreamChainGoal] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [debateTopics, setDebateTopics] = useState("");
  const [lifeGoal, setLifeGoal] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  // Common Playground State
  const [playgroundAgents, setPlaygroundAgents] = useState<PlaygroundAgent[]>([]);
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [savedWorkflows, setSavedWorkflows] = useState<PlaygroundWorkflow[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [tempTask, setTempTask] = useState("");

  // Common Playground Functions
  const addAgentToPlayground = (agent: Agent) => {
    const newPlaygroundAgent: PlaygroundAgent = {
      id: `${agent.id}-${Date.now()}`,
      agent,
      task: `Perform ${agent.name} task`,
      order: playgroundAgents.length + 1,
      status: "pending",
      attachments: []
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

  const saveWorkflow = () => {
    if (!workflowName || playgroundAgents.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide a workflow name and add at least one agent",
        variant: "destructive"
      });
      return;
    }

    const newWorkflow: PlaygroundWorkflow = {
      id: Date.now().toString(),
      name: workflowName,
      description: workflowDescription,
      agents: [...playgroundAgents],
      status: "draft",
      createdAt: new Date()
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
    agents,
    activeAgent,
    setActiveAgent,
    chains,
    setChains,
    dreamChainGoal,
    setDreamChainGoal,
    uploadedFile,
    setUploadedFile,
    chatMessage,
    setChatMessage,
    selectedCharacters,
    setSelectedCharacters,
    debateTopics,
    setDebateTopics,
    lifeGoal,
    setLifeGoal,
    selectedTools,
    setSelectedTools,
    playgroundAgents,
    setPlaygroundAgents,
    workflowName,
    setWorkflowName,
    workflowDescription,
    setWorkflowDescription,
    savedWorkflows,
    setSavedWorkflows,
    editingTaskId,
    setEditingTaskId,
    tempTask,
    setTempTask,
    addAgentToPlayground,
    removeAgentFromPlayground,
    updateAgentTask,
    updateAgentFiles,
    moveAgent,
    saveWorkflow,
    runPlaygroundWorkflow,
    loadWorkflow,
    startEditingTask,
    saveTask,
    cancelEditingTask,
    toast
  };
}
