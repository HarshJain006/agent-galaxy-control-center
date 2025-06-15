
import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatHistoryProps {
  messages: Message[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-6 p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
