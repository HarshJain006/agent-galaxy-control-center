
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, MessageSquare } from "lucide-react";

interface LabPDFChatProps {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  chatMessage: string;
  setChatMessage: (message: string) => void;
  toast: (options: any) => void;
}

export function LabPDFChat({ uploadedFile, setUploadedFile, chatMessage, setChatMessage, toast }: LabPDFChatProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      toast({
        title: "PDF Uploaded! 📄",
        description: `${file.name} is ready for conversation`
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
    }
  };

  const handleChatWithPDF = () => {
    if (!uploadedFile || !chatMessage) {
      toast({
        title: "Missing Requirements",
        description: "Please upload a PDF and enter a message",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "AI is analyzing... 🤖",
      description: `Processing "${chatMessage}" against ${uploadedFile.name}`
    });
    setChatMessage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-600" />
          📄 Talk to My PDF
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" accept=".pdf" onChange={handleFileUpload} />
        {uploadedFile && (
          <div className="p-2 bg-green-50 rounded text-sm">
            📄 {uploadedFile.name} ready for conversation
          </div>
        )}
        <Input
          placeholder="Ask anything about your PDF..."
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <Button onClick={handleChatWithPDF} className="w-full">
          <MessageSquare className="w-4 h-4 mr-2" />
          Chat with PDF
        </Button>
      </CardContent>
    </Card>
  );
}
