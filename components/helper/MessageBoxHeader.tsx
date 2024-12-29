import { FC } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Video, MoreVertical } from 'lucide-react';
import { IEvent } from '@/types/interface/event.interface';
import { IChat } from '@/types/interface/chat.interface';

interface ChatBoxHeaderProps {
    isMobile: boolean;
    handleBackToList: () => void;
    currentChat: IChat;
}

const ChatBoxHeader: FC<ChatBoxHeaderProps> = ({ isMobile, handleBackToList, currentChat }) => {
  return (
    <div className="p-4 border-b border-border flex justify-between items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={handleBackToList} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to chat list</span>
        </Button>
      )}
      <div className="flex items-center flex-1">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage
            src={(currentChat.event as IEvent)?.picture || '/placeholder-avatar.jpg'}
            alt={currentChat.name || 'Chat Avatar'}
          />
          <AvatarFallback>{currentChat.name?.[0]?.toUpperCase() || 'C'}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-lg">{currentChat.name}</div>
          <div className="text-sm text-muted-foreground">Online</div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Video className="h-5 w-5" />
                <span className="sr-only">Start video call</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Start video call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ChatBoxHeader;
