import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileCode, 
  Image, 
  Video, 
  FileText, 
  Mic, 
  Brain, 
  Sparkles,
  Check,
  X,
  DollarSign,
  Eye,
  Code,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AgentUpload() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  // Form data
  const [agentData, setAgentData] = useState({
    name: "",
    description: "",
    category: "",
    tags: [] as string[],
    pricing: "free",
    price: "",
    files: [] as File[],
    documentation: "",
    apiEndpoint: "",
    isPublic: true,
    allowCommercialUse: true,
    requiresGPU: false,
    estimatedRuntime: "",
    inputFormats: [] as string[],
    outputFormats: [] as string[]
  });

  const categories = [
    { value: "computer-vision", label: "Computer Vision", icon: Eye },
    { value: "nlp", label: "Natural Language Processing", icon: Brain },
    { value: "audio", label: "Audio Processing", icon: Mic },
    { value: "document", label: "Document Processing", icon: FileText },
    { value: "code", label: "Code Generation", icon: Code },
    { value: "automation", label: "Automation", icon: Zap },
    { value: "analytics", label: "Analytics", icon: Sparkles }
  ];

  const handleInputChange = (field: string, value: any) => {
    setAgentData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !agentData.tags.includes(tag)) {
      setAgentData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setAgentData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove) 
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    // TODO: Validate file types and sizes
    setAgentData(prev => ({ ...prev, files: [...prev.files, ...files] }));
    toast({
      title: "Files Added",
      description: `${files.length} file(s) added successfully.`,
    });
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSubmit = () => {
    // TODO: Backend integration - Upload agent
    console.log("Agent upload data:", agentData);
    simulateUpload();
    
    setTimeout(() => {
      toast({
        title: "Agent Uploaded Successfully!",
        description: "Your agent is now under review. You'll be notified when it's approved.",
      });
      // TODO: Redirect to dashboard or agent management
    }, 2500);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Upload AI Agent</h1>
        <p className="text-slate-600 mt-2">Share your AI agent with the AgentHub community and start earning</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {currentStep > step ? <Check className="w-4 h-4" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && "Basic Information"}
            {currentStep === 2 && "Upload Files & Configuration"} 
            {currentStep === 3 && "Pricing & Publication"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Tell us about your AI agent"}
            {currentStep === 2 && "Upload your model files and configure settings"}
            {currentStep === 3 && "Set pricing and publication preferences"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Agent Name</Label>
                  <Input
                    id="name"
                    value={agentData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., YOLO Helmet Detector"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={agentData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center">
                              <Icon className="w-4 h-4 mr-2" />
                              {category.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={agentData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe what your agent does, its capabilities, and use cases..."
                  rows={4}
                />
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {agentData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleTagRemove(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Add tags (press Enter)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTagAdd(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="runtime">Estimated Runtime</Label>
                  <Input
                    id="runtime"
                    value={agentData.estimatedRuntime}
                    onChange={(e) => handleInputChange("estimatedRuntime", e.target.value)}
                    placeholder="e.g., 2-5 seconds"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="gpu"
                    checked={agentData.requiresGPU}
                    onCheckedChange={(checked) => handleInputChange("requiresGPU", checked)}
                  />
                  <Label htmlFor="gpu">Requires GPU</Label>
                </div>
              </div>

              <Button onClick={handleNextStep} className="w-full">
                Continue to File Upload
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* File Upload Area */}
              <div
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-colors
                  ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">Upload Agent Files</h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop your model files, or click to browse
                </p>
                <Input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFiles(Array.from(e.target.files));
                    }
                  }}
                />
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Choose Files
                </Button>
              </div>

              {/* Uploaded Files */}
              {agentData.files.length > 0 && (
                <div>
                  <Label>Uploaded Files</Label>
                  <div className="space-y-2 mt-2">
                    {agentData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileCode className="w-4 h-4" />
                          <span className="text-sm">{file.name}</span>
                          <Badge variant="outline">{(file.size / 1024 / 1024).toFixed(1)} MB</Badge>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => {
                          setAgentData(prev => ({ 
                            ...prev, 
                            files: prev.files.filter((_, i) => i !== index) 
                          }));
                        }}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="documentation">Documentation</Label>
                <Textarea
                  id="documentation"
                  value={agentData.documentation}
                  onChange={(e) => handleInputChange("documentation", e.target.value)}
                  placeholder="Provide detailed documentation about your agent, including input/output formats, usage examples, and limitations..."
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="api-endpoint">API Endpoint (Optional)</Label>
                <Input
                  id="api-endpoint"
                  value={agentData.apiEndpoint}
                  onChange={(e) => handleInputChange("apiEndpoint", e.target.value)}
                  placeholder="https://api.yourdomain.com/your-agent"
                />
                <p className="text-xs text-gray-600 mt-1">
                  If you have your own API endpoint, provide it here. Otherwise, we'll host it for you.
                </p>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button onClick={handleNextStep} className="flex-1">
                  Continue to Pricing
                </Button>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div>
                <Label>Pricing Model</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  {[
                    { value: "free", label: "Free", description: "Open for everyone" },
                    { value: "paid", label: "Paid", description: "Set a price per use" },
                    { value: "subscription", label: "Subscription", description: "Monthly/yearly plans" }
                  ].map((option) => (
                    <Card 
                      key={option.value}
                      className={`cursor-pointer transition-all ${
                        agentData.pricing === option.value ? 'ring-2 ring-blue-600' : ''
                      }`}
                      onClick={() => handleInputChange("pricing", option.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <h3 className="font-medium">{option.label}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {agentData.pricing === "paid" && (
                <div>
                  <Label htmlFor="price">Price per Use ($)</Label>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={agentData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="0.50"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public">Make Public</Label>
                    <p className="text-sm text-gray-600">Allow others to discover and use your agent</p>
                  </div>
                  <Switch
                    id="public"
                    checked={agentData.isPublic}
                    onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="commercial">Allow Commercial Use</Label>
                    <p className="text-sm text-gray-600">Permit businesses to use your agent commercially</p>
                  </div>
                  <Switch
                    id="commercial"
                    checked={agentData.allowCommercialUse}
                    onCheckedChange={(checked) => handleInputChange("allowCommercialUse", checked)}
                  />
                </div>
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div>
                  <Label>Upload Progress</Label>
                  <Progress value={uploadProgress} className="mt-2" />
                  <p className="text-sm text-gray-600 mt-1">{uploadProgress}% complete</p>
                </div>
              )}

              <div className="flex space-x-4">
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={uploadProgress > 0 && uploadProgress < 100}
                >
                  {uploadProgress > 0 && uploadProgress < 100 ? 'Uploading...' : 'Upload Agent'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}