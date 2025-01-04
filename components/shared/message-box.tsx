'use client'

import { MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '@/store/chat.store';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from '@/types/interface/user.interface';
import { formatDate } from '@/utils/data';
import { useUserStore } from '@/store/user.store';
import SendMessage from './send-message';
import ChatBoxHeader from '../helper/MessageBoxHeader';

export default function MessageBox({ isMobile }: { isMobile: boolean }) {
  const [showMessages, setShowMessages] = useState(false);
  const { currentChat, fetchMessages, messages } = useChatStore();
  const { user } = useUserStore();

  const handleBackToList = () => {
    setShowMessages(false);
  };

  useEffect(() => {
    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat, fetchMessages]);

  if (!currentChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-background to-accent/20">
        <div className="p-8 bg-accent rounded-full mb-6 animate-pulse">
          <MessageCircle className="h-16 w-16 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Welcome to Your Chat</h2>
        <p className="text-xl text-muted-foreground max-w-md mb-8">
          Select a conversation from the list to start messaging or create a new chat to begin.
        </p>
      </div>
    );
  }

  return (
    <div className={`${isMobile && !showMessages ? 'hidden' : 'flex'} flex-1 flex-col bg-background`}>
      <ChatBoxHeader isMobile={isMobile} handleBackToList={handleBackToList} currentChat={currentChat} onLeaveChat={()=>console.log("LEAVEING CHAT")}  onMuteChat={()=>console.log("mute")}/>
      <ScrollArea  className="flex-1 max-h-[calc(90vh-160px)] overflow-y-auto" scrollToBottom>
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message, index) => {
            const isCurrentUser = (message?.sender as IUser)?._id === user?._id;
            const showSenderInfo = index === 0 || (messages[index - 1].sender as IUser)?._id !== (message?.sender as IUser)?._id;
            return (
              <div key={message.id || index} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                {!isCurrentUser && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={(message.sender as IUser)?.profilePicture || '/placeholder-avatar.jpg'} alt="Sender Avatar" />
                    <AvatarFallback>{(message.sender as IUser)?.username?.[0]?.toUpperCase() || 'A'}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[70%] ${isCurrentUser ? 'items-end text-right' : 'items-start text-left'}`}>
                  <div
                    className={`p-3 rounded-2xl ${isCurrentUser
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-accent text-accent-foreground rounded-bl-sm'
                      }`}
                  >
                    {message?.content}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {showSenderInfo && !isCurrentUser && (message.sender as IUser)?.username} • {formatDate(message?.createdAt)}
                  </div>
                </div>
                {isCurrentUser && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarImage src={user?.profilePicture || '/placeholder-user-avatar.jpg'} alt="Your Avatar" />
                    <AvatarFallback>{user?.username?.[0]?.toUpperCase() || 'Y'}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <SendMessage />
    </div>
  );
}
