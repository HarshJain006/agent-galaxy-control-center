
import { useState } from 'react';
import { Message } from '@/types/chat';
import { ChatHistory } from './chat/ChatHistory';
import { ChatInput } from './chat/ChatInput';
import { Card } from '@/components/ui/card';

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I am your personal AI assistant. How can I help you today?",
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
      <div className="flex-1 flex flex-col min-h-0">
        <ChatHistory messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </Card>
  );
}
