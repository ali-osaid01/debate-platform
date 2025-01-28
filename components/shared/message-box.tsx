'use client'
import { Info, MessageCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect } from 'react';
import { useChatStore } from '@/store/chat.store';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from '@/types/interface/user.interface';
import { formatDate } from '@/utils/data';
import { useUserStore } from '@/store/user.store';
import SendMessage from './send-message';
import ChatBoxHeader from '../helper/MessageBoxHeader';
import { useChatSettings } from '@/store/chat-setting.store';
import { IMessage } from '@/types/interface/message.interface';
import Image from 'next/image';

export default function MessageBox({ isMobile }: { isMobile: boolean }) {

  const { currentChat, fetchMessages, messages, } = useChatStore();
  const { user } = useUserStore();
  const { setShowMessage, showMessage } = useChatSettings();


  useEffect(() => {
    if (currentChat) {
      fetchMessages();
    }
    return () => {
      setShowMessage(false)
    }
  }, [currentChat, fetchMessages]);

  console.log("MESSAGE ->",messages)
  if (!currentChat) {
    return (
      <div className={`${isMobile && !showMessage ? 'hidden' : 'flex'} flex-1 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-background to-accent/20`}>
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
  const renderMessageContent = (message: IMessage) => {
    if (message.messageType === 'image') {
      return (
        <div className="space-y-2">
          <div className="relative w-full max-w-md rounded-lg overflow-hidden">
            <Image
              src={message.media || ''}
              alt="Message image"
              width={200}
              height={200}
              // className="object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          {/* {message.content && (
            <div className="text-sm">{message.content}</div>
          )} */}
        </div>
      );
    }
  };

  return (
    <div className={`${isMobile && !showMessage ? 'hidden' : 'flex'} flex-1 flex-col bg-background`}>
      <ChatBoxHeader isMobile={isMobile} handleBackToList={() => {
        setShowMessage(false)
      }} />
      <ScrollArea className="flex-1 p-2 max-h-[calc(90vh-160px)] overflow-y-auto" scrollToBottom>
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message, index) => {
            const isCurrentUser = (message?.sender as IUser)?._id === user?._id;
            const showSenderInfo =
              index === 0 || (messages[index - 1].sender as IUser)?._id !== (message?.sender as IUser)?._id;

            return (
              <div key={message?.id || index} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                {message?.isAnnocement ? (
                  <div className="flex justify-center items-center my-4 w-full">
                    <div className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg shadow-md flex items-center space-x-3 max-w-lg">
                      <Info className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium">{(message?.sender as IUser)?.username} {message?.content}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {!isCurrentUser && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={(message?.sender as IUser)?.profilePicture || '/placeholder-avatar.jpg'}
                          alt="Sender Avatar"
                        />
                        <AvatarFallback>{(message?.sender as IUser)?.username?.[0]?.toUpperCase() || 'A'}</AvatarFallback>
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
                        {renderMessageContent(message)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {showSenderInfo && !isCurrentUser && (message?.sender as IUser)?.username} •{' '}
                        {formatDate(message?.createdAt)}
                      </div>
                    </div>
                    {isCurrentUser && (
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarImage src={user?.profilePicture || '/placeholder-user-avatar.jpg'} alt="Your Avatar" />
                        <AvatarFallback>{user?.username?.[0]?.toUpperCase() || 'Y'}</AvatarFallback>
                      </Avatar>
                    )}
                  </>
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
