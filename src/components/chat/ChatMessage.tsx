
import { Message } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  return (
    <div className={cn('flex items-start gap-4', isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarImage src={message.avatar} />
          <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[75%] rounded-lg p-3 text-sm shadow-sm',
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-white'
        )}
      >
        <p>{message.text}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarImage src={message.avatar} />
          <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
