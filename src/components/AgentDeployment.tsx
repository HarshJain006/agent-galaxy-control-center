
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileJson, Bot, Play, Pause, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface N8nWorkflow {
  id: string;
  name: string;
  description: string;
  status: "draft" | "deployed" | "running" | "stopped" | "error";
  workflowJson: object;
  createdAt: string;
  lastRun: string;
  executionCount: number;
}

export function AgentDeployment() {
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState<N8nWorkflow[]>([
    {
      id: "1",
      name: "Customer Support Bot",
      description: "Automated customer inquiry processing workflow",
      status: "running",
      workflowJson: {},
      createdAt: "2024-01-15",
      lastRun: "2 minutes ago",
      executionCount: 1245
    },
    {
      id: "2",
      name: "Data Processing Pipeline",
      description: "Automated data validation and transformation",
      status: "deployed",
      workflowJson: {},
      createdAt: "2024-02-20",
      lastRun: "1 hour ago",
      executionCount: 987
    }
  ]);

  const [newWorkflow, setNewWorkflow] = useState({
    name: "",
    description: "",
    workflowFile: null as File | null
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      setNewWorkflow(prev => ({ ...prev, workflowFile: file }));
      toast({
        title: "File Selected",
        description: `${file.name} ready for upload`,
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid JSON file",
        variant: "destructive",
      });
    }
  };

  const handleUploadWorkflow = async () => {
    if (!newWorkflow.name || !newWorkflow.workflowFile) {
      toast({
        title: "Missing Information",
        description: "Please provide workflow name and JSON file",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real implementation, this would upload to Supabase
      const fileContent = await newWorkflow.workflowFile.text();
      const workflowJson = JSON.parse(fileContent);
      
      const newId = Date.now().toString();
      const workflow: N8nWorkflow = {
        id: newId,
        name: newWorkflow.name,
        description: newWorkflow.description,
        status: "draft",
        workflowJson,
        createdAt: new Date().toISOString().split('T')[0],
        lastRun: "Never",
        executionCount: 0
      };

      setWorkflows(prev => [workflow, ...prev]);
      setNewWorkflow({ name: "", description: "", workflowFile: null });
      
      toast({
        title: "Workflow Uploaded",
        description: "n8n workflow has been successfully uploaded",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Invalid JSON format in workflow file",
        variant: "destructive",
      });
    }
  };

  const handleDeployWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId ? { ...w, status: "deployed" } : w
    ));
    toast({
      title: "Workflow Deployed",
      description: "Agent is now ready to run",
    });
  };

  const handleToggleWorkflow = (workflowId: string, currentStatus: string) => {
    const newStatus = currentStatus === "running" ? "stopped" : "running";
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId ? { ...w, status: newStatus } : w
    ));
    toast({
      title: `Workflow ${newStatus === "running" ? "Started" : "Stopped"}`,
      description: `Agent execution has been ${newStatus === "running" ? "started" : "stopped"}`,
    });
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.filter(w => w.id !== workflowId));
    toast({
      title: "Workflow Deleted",
      description: "Agent workflow has been removed",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-100 text-green-800";
      case "deployed": return "bg-blue-100 text-blue-800";
      case "stopped": return "bg-gray-100 text-gray-800";
      case "error": return "bg-red-100 text-red-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <Bot className="w-8 h-8 mr-3 text-purple-600" />
          Agent Deployment Platform
        </h1>
        <p className="text-slate-600 mt-2">Deploy and manage AI agents using n8n workflow JSON files</p>
      </div>

      {/* Upload New Workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2 text-purple-600" />
            Deploy New Agent
          </CardTitle>
          <CardDescription>Upload n8n workflow JSON file to create a new AI agent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workflow-name">Agent Name</Label>
              <Input
                id="workflow-name"
                placeholder="Enter agent name..."
                value={newWorkflow.name}
                onChange={(e) => setNewWorkflow(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workflow-file">n8n Workflow JSON</Label>
              <Input
                id="workflow-file"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="workflow-description">Description</Label>
            <Textarea
              id="workflow-description"
              placeholder="Describe what this agent does..."
              value={newWorkflow.description}
              onChange={(e) => setNewWorkflow(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <Button onClick={handleUploadWorkflow} className="bg-purple-600 hover:bg-purple-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload & Create Agent
          </Button>
        </CardContent>
      </Card>

      {/* Deployed Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <FileJson className="w-5 h-5 mr-2 text-purple-600" />
                    {workflow.name}
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">{workflow.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(workflow.status)}>
                  {workflow.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Created:</span>
                  <p className="text-slate-600">{workflow.createdAt}</p>
                </div>
                <div>
                  <span className="font-medium">Last Run:</span>
                  <p className="text-slate-600">{workflow.lastRun}</p>
                </div>
                <div>
                  <span className="font-medium">Executions:</span>
                  <p className="text-slate-600">{workflow.executionCount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <p className="capitalize text-slate-600">{workflow.status}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                {workflow.status === "draft" && (
                  <Button
                    size="sm"
                    onClick={() => handleDeployWorkflow(workflow.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Deploy
                  </Button>
                )}
                
                {(workflow.status === "deployed" || workflow.status === "running" || workflow.status === "stopped") && (
                  <Button
                    size="sm"
                    variant={workflow.status === "running" ? "destructive" : "default"}
                    onClick={() => handleToggleWorkflow(workflow.id, workflow.status)}
                    className="flex-1"
                  >
                    {workflow.status === "running" ? (
                      <><Pause className="w-3 h-3 mr-1" />Stop</>
                    ) : (
                      <><Play className="w-3 h-3 mr-1" />Start</>
                    )}
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast({ title: "Download", description: "Workflow JSON download would start here" })}
                >
                  <Download className="w-3 h-3" />
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteWorkflow(workflow.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {workflows.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileJson className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No workflows deployed</h3>
            <p className="text-slate-600">Upload your first n8n workflow JSON file to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
