
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Workflow } from "lucide-react";
import { AgentChain } from "./types";

interface AgentChainsProps {
  chains: AgentChain[];
  dreamChainGoal: string;
  setDreamChainGoal: (goal: string) => void;
  setChains: (chains: AgentChain[]) => void;
  toast: (options: any) => void;
}

export function AgentChains({ chains, dreamChainGoal, setDreamChainGoal, setChains, toast }: AgentChainsProps) {
  const handleDreamChainCreate = () => {
    if (!dreamChainGoal) {
      toast({
        title: "Missing Goal",
        description: "Please enter a goal for your DreamChain",
        variant: "destructive"
      });
      return;
    }

    const newChain: AgentChain = {
      id: Date.now().toString(),
      name: dreamChainGoal,
      agents: [],
      status: "running",
      progress: 0
    };

    setChains([newChain, ...chains]);
    setDreamChainGoal("");
    
    toast({
      title: "DreamChain Created! 🧠",
      description: "Your multi-agent flow is now executing..."
    });

    // Simulate progress
    setTimeout(() => {
      const updatedChains = chains.map(chain => 
        chain.id === newChain.id ? { ...chain, progress: 30 } : chain
      );
      setChains([newChain, ...updatedChains]);
    }, 2000);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            🧠 DreamChain Builder
          </CardTitle>
          <CardDescription>
            Type a goal and watch AI decompose it into executable sub-agents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="dream-goal">Your Goal</Label>
            <Input
              id="dream-goal"
              placeholder="e.g., Plan my startup launch, Write a research paper, Create a marketing campaign"
              value={dreamChainGoal}
              onChange={(e) => setDreamChainGoal(e.target.value)}
            />
          </div>
          <Button onClick={handleDreamChainCreate} className="bg-purple-600 hover:bg-purple-700">
            <Target className="w-4 h-4 mr-2" />
            Create DreamChain
          </Button>
        </CardContent>
      </Card>

      {chains.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Active Chains</h3>
          {chains.map((chain) => (
            <Card key={chain.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Workflow className="w-5 h-5 mr-2" />
                    {chain.name}
                  </CardTitle>
                  <Badge variant={chain.status === "running" ? "default" : "secondary"}>
                    {chain.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{chain.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${chain.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
