import React, { FC, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { useIsMobile } from '@/hooks/use-mobile';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
}

const chats: Chat[] = [
  { id: 1, name: "Alice Smith", lastMessage: "Hey, how are you?", time: "10:30 AM", avatar: "AS" },
  { id: 2, name: "Bob Johnson", lastMessage: "Can we meet tomorrow?", time: "Yesterday", avatar: "BJ" },
  { id: 3, name: "Team Alpha", lastMessage: "New project update", time: "2 days ago", avatar: "TA" },
  { id: 4, name: "Ali Osaid", lastMessage: "Project Complete", time: "2 days ago", avatar: "AO" },
  { id: 5, name: "Team Alpha", lastMessage: "New project update", time: "2 days ago", avatar: "ST" },
]

interface ChatListProps {
  showMessages: boolean;
}

const ChatList: FC<ChatListProps> = ({ showMessages }) => {
  const [selectedChat, setSelectedChat] = useState<Chat>(chats[0]);
  const isMobile = useIsMobile()
    
  const onChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className={`${isMobile && showMessages ? 'hidden' : 'block'} w-full md:w-1/4 border-r border-border`}>
      <div className="p-4 font-semibold text-lg">Chats</div>
      <ScrollArea className="h-[calc(88vh-60px)]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-4 hover:bg-accent cursor-pointer ${
              selectedChat.id === chat.id ? 'bg-accent' : ''
            }`}
            onClick={() => onChatSelect(chat)}
          >
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
              {chat.avatar}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{chat.name}</div>
              <div className="text-sm text-muted-foreground truncate">{chat.lastMessage}</div>
            </div>
            <div className="text-xs text-muted-foreground">{chat.time}</div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

export default ChatList;