
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Beaker, Zap } from "lucide-react";
import { tools } from "../data/tools";

interface LabToolComboProps {
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
  toast: (options: any) => void;
}

export function LabToolCombo({ selectedTools, setSelectedTools, toast }: LabToolComboProps) {
  const handleToolSelect = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(id => id !== toolId));
    } else if (selectedTools.length < 2) {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const mixTools = () => {
    if (selectedTools.length !== 2) {
      toast({
        title: "Select 2 Tools",
        description: "Choose exactly 2 tools to mix",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🧪 Magic Happening!",
      description: "Combining tools to create something amazing...",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Beaker className="w-5 h-5 mr-2 text-orange-600" />
          🧪 Tool Combo Lab
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Select 2 Tools to Mix</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant={selectedTools.includes(tool.id) ? "default" : "outline"}
                onClick={() => handleToolSelect(tool.id)}
                className="text-sm"
              >
                {tool.icon} {tool.name}
              </Button>
            ))}
          </div>
        </div>
        <Button onClick={mixTools} className="w-full">
          <Zap className="w-4 h-4 mr-2" />
          Mix Tools ✨
        </Button>
      </CardContent>
    </Card>
  );
}
