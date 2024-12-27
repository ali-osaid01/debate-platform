import React, { FC, useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChatStore } from '@/store/chat.store';
import { useUserStore } from '@/store/user.store';
import { IEvent } from '@/types/interface/event.interface';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface ChatListProps {
  showMessages: boolean;
}

const ChatList: FC<ChatListProps> = ({ showMessages }) => {
  const { fetchChats, chats, setCurrentChat, currentChat } = useChatStore();
  const { user } = useUserStore();
  const isMobile = useIsMobile();

  const onChatSelect = (id:string) => {
    console.log("CURRENT CHAT ->",currentChat)
      setCurrentChat(id);
    }
    
  useEffect(() => {
    if (user?._id) {
      fetchChats(user._id);
    }
  }, [user?._id, fetchChats]);

  return (
    <div className={`${isMobile && showMessages ? 'hidden' : 'block'} w-full md:w-1/4 border-r border-border`}>
      <div className="p-4 font-semibold text-lg">Chats</div>
      <ScrollArea className="h-[calc(88vh-60px)]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-4 hover:bg-accent cursor-pointer ${currentChat === chat.id ? 'bg-accent' : ''
              }`}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="w-10 h-10 flex items-center justify-center mr-3">
              <Avatar>
                <AvatarImage
                  src={(chat.event as IEvent).picture}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="font-semibold">{chat.name}</div>
              <div className="text-sm text-muted-foreground truncate">{chat.lastMessage}</div>
            </div>
            <div className="text-xs text-muted-foreground">{chat.createdAt.toLocaleString()}</div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatList;
