
import { useState } from 'react';
import { Message } from '@/types/chat';
import { ChatHistory } from './chat/ChatHistory';
import { ChatInput } from './chat/ChatInput';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Plus } from 'lucide-react';

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "I am your personal AI co-pilot, ready to assist you. Upload files, connect tools, or just chat with me. How can I empower you today?",
      sender: 'bot',
      avatar: '/placeholder.svg'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      avatar: '/placeholder.svg'
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Mock bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `This is a mocked response to: "${text}"`,
        sender: 'bot',
        avatar: '/placeholder.svg'
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <div>
          <CardTitle className="text-lg">My GPT Co-pilot</CardTitle>
          <CardDescription>Your personal assistant for any task.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="icon" title="New Chat">
              <Plus className="h-4 w-4" />
              <span className="sr-only">New Chat</span>
           </Button>
           <Button variant="outline" size="icon" title="ToolStore / Plugins">
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">ToolStore</span>
           </Button>
        </div>
      </CardHeader>
      <div className="flex-1 flex flex-col min-h-0">
        <ChatHistory messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </Card>
  );
}
