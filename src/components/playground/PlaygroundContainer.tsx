
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import { CommonPlayground } from "./CommonPlayground";
import { AgentGrid } from "./AgentGrid";
import { AgentChains } from "./AgentChains";
import { AgentLab } from "./AgentLab";
import { PlaygroundResults } from "./PlaygroundResults";
import { useAgentPlayground } from "./hooks/useAgentPlayground";

export function PlaygroundContainer() {
  const playgroundData = useAgentPlayground();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <Sparkles className="w-8 h-8 mr-3 text-purple-600" />
          AI Agent Playground
        </h1>
        <p className="text-slate-600 mt-2">
          Mix, match, and chain AI agents to create powerful automated workflows
        </p>
      </div>

      <Tabs defaultValue="playground" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="playground">🎯 Common Playground</TabsTrigger>
          <TabsTrigger value="agents">🤖 Agents</TabsTrigger>
          <TabsTrigger value="chains">🔗 Chains</TabsTrigger>
          <TabsTrigger value="lab">🧪 Lab</TabsTrigger>
          <TabsTrigger value="results">📊 Results</TabsTrigger>
        </TabsList>

        <TabsContent value="playground" className="space-y-6">
          <CommonPlayground {...playgroundData} />
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <AgentGrid {...playgroundData} />
        </TabsContent>

        <TabsContent value="chains" className="space-y-6">
          <AgentChains {...playgroundData} />
        </TabsContent>

        <TabsContent value="lab" className="space-y-6">
          <AgentLab {...playgroundData} />
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <PlaygroundResults />
        </TabsContent>
      </Tabs>
    </div>
  );
}
