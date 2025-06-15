
export interface PlaygroundState {
  activeAgent: string | null;
  chains: any[];
  dreamChainGoal: string;
  uploadedFile: File | null;
  chatMessage: string;
  selectedCharacters: string[];
  debateTopics: string;
  lifeGoal: string;
  selectedTools: string[];
  playgroundAgents: any[];
  workflowName: string;
  workflowDescription: string;
  savedWorkflows: any[];
  editingTaskId: string | null;
  tempTask: string;
}
