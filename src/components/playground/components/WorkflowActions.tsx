
import { Button } from "@/components/ui/button";
import { Play, Save } from "lucide-react";

interface WorkflowActionsProps {
  onRunWorkflow: () => void;
  onSaveWorkflow: () => void;
}

export function WorkflowActions({
  onRunWorkflow,
  onSaveWorkflow
}: WorkflowActionsProps) {
  return (
    <div className="flex space-x-2">
      <Button onClick={onRunWorkflow} className="flex-1">
        <Play className="w-4 h-4 mr-2" />
        Run Workflow
      </Button>
      <Button onClick={onSaveWorkflow} variant="outline">
        <Save className="w-4 h-4 mr-2" />
        Save
      </Button>
    </div>
  );
}
