
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Trash2 } from "lucide-react";
import { PlaygroundWorkflow } from "../types";

interface SavedWorkflowsProps {
  savedWorkflows: PlaygroundWorkflow[];
  onLoadWorkflow: (workflow: PlaygroundWorkflow) => void;
  onDeleteWorkflow: (workflowId: string) => void;
}

export function SavedWorkflows({ savedWorkflows, onLoadWorkflow, onDeleteWorkflow }: SavedWorkflowsProps) {
  if (savedWorkflows.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Download className="w-5 h-5 mr-2 text-green-600" />
          Saved Workflows
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedWorkflows.map((workflow) => (
            <div key={workflow.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{workflow.name}</h4>
                <Badge variant="secondary">{workflow.agents.length} agents</Badge>
              </div>
              {workflow.description && (
                <p className="text-sm text-slate-600 mb-3">{workflow.description}</p>
              )}
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => onLoadWorkflow(workflow)}>
                  <Download className="w-3 h-3 mr-1" />
                  Load
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onDeleteWorkflow(workflow.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
