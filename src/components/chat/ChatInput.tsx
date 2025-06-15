
import { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // =================================================================
    // == BACKEND-CODE-ATTACHMENT-POINT: FILE UPLOAD & PROCESSING   ==
    // =================================================================
    // Here you would upload the file to your backend for processing.
    // This typically involves using FormData or a library to send it to an endpoint.
    //
    // Example with Supabase Storage:
    // const { data, error } = await supabase.storage
    //   .from('uploads')
    //   .upload(`public/${file.name}`, file);
    //
    // After uploading, you can notify the user and the AI.
    console.log("File selected:", file.name);
    onSendMessage(`I've uploaded the file: ${file.name}. Please analyze it.`);

    // Reset file input to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="shrink-0" 
          title="Attach file"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message, or drop a file..."
          className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={1}
        />
        <Button type="submit" size="icon" className="shrink-0" disabled={isLoading || !input.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
