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

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      avatar: '/placeholder.svg'
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // =================================================================
    // == BACKEND-CODE-ATTACHMENT-POINT: AI RESPONSE GENERATION       ==
    // =================================================================
    // Instead of a mocked response, here you would call your backend.
    // This could be a Supabase Edge Function that interacts with an AI model like GPT.
    //
    // Example:
    // try {
    //   /* const response = await fetch('/api/chat', { // Your backend endpoint
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ message: text, history: messages })
    //   });
    //   const botResponseData = await response.json(); */
    //   const botMessage: Message = {
    //     id: Date.now().toString(), // id: botResponseData.id,
    //     text: `This is a real response for: "${text}"`, // text: botResponseData.text,
    //     sender: 'bot',
    //     avatar: '/placeholder.svg'
    //   };
    //   setMessages((prev) => [...prev, botMessage]);
    // } catch (error) {
    //   console.error("Error fetching AI response:", error);
    //   // Optionally, show an error message to the user
    // } finally {
    //   setIsLoading(false);
    // }

    // For now, we'll keep the mock response:
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

  const handleNewChat = () => {
    // =================================================================
    // == BACKEND-CODE-ATTACHMENT-POINT: NEW CHAT SESSION             ==
    // =================================================================
    // Here you might call a backend endpoint to create and store a new chat session in your database.
    console.log("Creating new chat. A backend call could save this session.");
    setMessages([
      {
        id: '1',
        text: "I am your personal AI co-pilot, ready to assist you. Upload files, connect tools, or just chat with me. How can I empower you today?",
        sender: 'bot',
        avatar: '/placeholder.svg'
      }
    ]);
  };

  const handleOpenToolStore = () => {
    // =================================================================
    // == BACKEND-CODE-ATTACHMENT-POINT: LOADING TOOLS/PLUGINS        ==
    // =================================================================
    // Here you would fetch available tools/plugins for the user from your backend.
    // This could be a list of APIs or data sources the user has configured.
    console.log("Opening ToolStore. A backend call would fetch tools here.");
    // You would then typically open a modal or a side panel with the fetched data.
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <div>
          <CardTitle className="text-lg">My GPT Co-pilot</CardTitle>
          <CardDescription>Your personal assistant for any task.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="icon" title="New Chat" onClick={handleNewChat}>
              <Plus className="h-4 w-4" />
              <span className="sr-only">New Chat</span>
           </Button>
           <Button variant="outline" size="icon" title="ToolStore / Plugins" onClick={handleOpenToolStore}>
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
