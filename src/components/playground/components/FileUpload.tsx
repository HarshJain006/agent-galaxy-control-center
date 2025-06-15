
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, X, File, Image, Video, FileText } from "lucide-react";
import { useState, useRef } from "react";

interface FileUploadProps {
  agentId: string;
  files: File[];
  onFilesChange: (agentId: string, files: File[]) => void;
}

export function FileUpload({ agentId, files, onFilesChange }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const updatedFiles = [...files, ...selectedFiles];
    onFilesChange(agentId, updatedFiles);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex);
    onFilesChange(agentId, updatedFiles);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    if (file.type.includes('pdf') || file.type.includes('document')) return FileText;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="h-7 px-2"
        >
          <Upload className="w-3 h-3 mr-1" />
          Upload Files
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />
        {files.length > 0 && (
          <Badge variant="secondary" className="text-xs">
            {files.length} file{files.length > 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {files.map((file, index) => {
            const FileIcon = getFileIcon(file);
            return (
              <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded text-xs">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <FileIcon className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  <span className="truncate font-medium">{file.name}</span>
                  <span className="text-slate-500">({formatFileSize(file.size)})</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFile(index)}
                  className="h-5 w-5 p-0 text-red-600 hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
