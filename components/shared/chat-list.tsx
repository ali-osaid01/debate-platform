import React, { FC, useEffect, useCallback } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { useChatStore } from '@/store/chat.store';
import { useUserStore } from '@/store/user.store';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { IChat } from '@/types/interface/chat.interface';
import { formatDate } from '@/utils/data';
import { useChatSettings } from '@/store/chat-setting.store';

interface ChatListProps {
  isMobile: boolean;
  isSocketConnected: boolean;
}

const ChatList: FC<ChatListProps> = ({isMobile,isSocketConnected}) => {
  const { fetchChats, chats, setCurrentChat, currentChat } = useChatStore();
  const { user } = useUserStore();
  const {setShowMessage,showMessage} = useChatSettings();

  useEffect(() => {
    if (!user?._id) return; 
    console.log("FETCHING CHATS", user._id);
    fetchChats(user._id);
  }, [user?._id, isSocketConnected]); 

  const onChatSelect = useCallback((chat: IChat) => {
    setCurrentChat(chat);
    setShowMessage(true);
  }, [setCurrentChat]);

  return (
    <div
      className={`${isMobile && showMessage ? 'hidden' : 'block'} w-full md:w-1/4 border-r border-border`}>
      <header className="p-4 font-semibold text-lg border-b border-border">Chats</header>
      <ScrollArea className="h-[calc(88vh-60px)]">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isSelected={currentChat?.id === chat.id}
              onSelect={onChatSelect}
            />
          ))
        ) : (
          <div className="p-4 text-sm text-muted-foreground text-center">Loading...</div>
        )}
      </ScrollArea>
    </div>
  );
};

interface ChatItemProps {
  chat: IChat;
  isSelected: boolean;
  onSelect: (chat: IChat) => void;
}

const ChatItem: FC<ChatItemProps> = ({ chat, isSelected, onSelect }) => {
  return (
    <div
      className={`flex items-center p-4 hover:bg-accent cursor-pointer ${isSelected ? 'bg-accent' : ''
        }`}
      onClick={() => onSelect(chat)}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
    >
      <div className="w-10 h-10 flex items-center justify-center mr-3">
        <Avatar>
          <AvatarImage src={(chat.event as any)?.picture || ''} alt={chat.name || 'Chat Avatar'} />
          <AvatarFallback>{chat.name?.[0]?.toUpperCase() || 'C'}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="font-semibold truncate" title={chat.name}>{chat.name}</div>
        {/* <div className="text-sm text-muted-foreground truncate" title={chat.lastMessage}>
          {chat.lastMessage || 'No messages yet'}
        </div> */}
      </div>
      <div className="text-xs text-muted-foreground whitespace-nowrap">
        {formatDate(chat.updatedAt)}
      </div>
    </div>
  );
};

export default ChatList;
