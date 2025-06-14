
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Target } from "lucide-react";

interface LabLifeFlowProps {
  lifeGoal: string;
  setLifeGoal: (goal: string) => void;
  toast: (options: any) => void;
}

export function LabLifeFlow({ lifeGoal, setLifeGoal, toast }: LabLifeFlowProps) {
  const createLifePlan = () => {
    if (!lifeGoal) {
      toast({
        title: "Missing Goal",
        description: "Please enter your life goal",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "📅 LifeFlow Created!",
      description: `Creating action plan for: ${lifeGoal}`
    });
    setLifeGoal("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          📅 LifeFlow Designer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your life goal: 'Move to Canada in 6 months', 'Start a business', etc."
          value={lifeGoal}
          onChange={(e) => setLifeGoal(e.target.value)}
        />
        <Button onClick={createLifePlan} className="w-full">
          <Target className="w-4 h-4 mr-2" />
          Create Life Plan
        </Button>
      </CardContent>
    </Card>
  );
}
