
import { useState } from "react";
import { AgentChain, PlaygroundAgent, PlaygroundWorkflow } from "../types";

export function usePlaygroundState() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [chains, setChains] = useState<AgentChain[]>([]);
  const [dreamChainGoal, setDreamChainGoal] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [debateTopics, setDebateTopics] = useState("");
  const [lifeGoal, setLifeGoal] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [playgroundAgents, setPlaygroundAgents] = useState<PlaygroundAgent[]>([]);
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [savedWorkflows, setSavedWorkflows] = useState<PlaygroundWorkflow[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [tempTask, setTempTask] = useState("");

  return {
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
  };
}
