
export interface Agent {
  id: string;
  name: string;
  icon: any;
  description: string;
  category: string;
  status: "active" | "inactive" | "running";
}

export interface AgentChain {
  id: string;
  name: string;
  agents: Agent[];
  status: "draft" | "running" | "completed";
  progress: number;
}

export interface PlaygroundAgent {
  id: string;
  agent: Agent;
  task: string;
  order: number;
  status: "pending" | "running" | "completed" | "error";
  attachments?: File[];
  executionType: "sequential" | "parallel";
  dependsOn?: string[]; // IDs of agents this agent depends on
  outputData?: any; // Data produced by this agent
  inputSources?: string[]; // IDs of agents whose output this agent uses
}

export interface PlaygroundWorkflow {
  id: string;
  name: string;
  description: string;
  agents: PlaygroundAgent[];
  status: "draft" | "running" | "completed";
  createdAt: Date;
  executionFlow: "sequential" | "parallel" | "mixed";
}
