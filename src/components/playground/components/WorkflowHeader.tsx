
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WorkflowHeaderProps {
  workflowName: string;
  workflowDescription: string;
  onSetWorkflowName: (name: string) => void;
  onSetWorkflowDescription: (description: string) => void;
}

export function WorkflowHeader({
  workflowName,
  workflowDescription,
  onSetWorkflowName,
  onSetWorkflowDescription
}: WorkflowHeaderProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="workflow-name">Workflow Name</Label>
        <Input
          id="workflow-name"
          placeholder="My Custom Workflow"
          value={workflowName}
          onChange={(e) => onSetWorkflowName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="workflow-desc">Description (Optional)</Label>
        <Input
          id="workflow-desc"
          placeholder="What does this workflow do?"
          value={workflowDescription}
          onChange={(e) => onSetWorkflowDescription(e.target.value)}
        />
      </div>
    </div>
  );
}
