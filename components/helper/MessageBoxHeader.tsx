import { FC, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Video, MoreVertical, Bell, X, XCircle, VolumeOff, Users, Flag, Trash2, LogOut } from 'lucide-react';
import { IEvent } from '@/types/interface/event.interface';
import { IChat } from '@/types/interface/chat.interface';

interface ChatBoxHeaderProps {
  isMobile: boolean;
  handleBackToList: () => void;
  currentChat: IChat;
  onLeaveChat: () => void;
  onMuteChat: () => void;
}

const ChatBoxHeader: FC<ChatBoxHeaderProps> = ({ isMobile, handleBackToList, currentChat, onLeaveChat, onMuteChat }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="p-4 border-b border-border flex justify-between items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={handleBackToList} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to chat list</span>
        </Button>
      )}
     <div className="flex items-center flex-1">
        <Avatar className="h-12 w-12 ">
          <AvatarImage
            src={(currentChat?.event as IEvent).picture || '/placeholder-avatar.jpg'}
            alt={currentChat.name || 'Group Chat'}
          />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {currentChat?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{currentChat.name}</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users size={16} className="mr-1" />
            <span>{currentChat?.participants?.length} members</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Video className="h-5 w-5" />
                <span className="sr-only">Start video call</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Start video call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-700">
          <MoreVertical className="h-5 w-5" />
          <span className="sr-only">Open group chat menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Group Chat Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>console.log("VIEW PARTICCIPANTS")} className="flex items-center gap-2 cursor-pointer">
          <Users className="w-4 h-4" />
          <span>View participants</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>console.log("REPORT CHAT")} className="flex items-center gap-2 cursor-pointer">
          <Flag className="w-4 h-4" />
          <span>Report chat</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>console.log("DELETE")} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
          <Trash2 className="w-4 h-4" />
          <span>Delete chat</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLeaveChat} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="w-4 h-4" />
          <span>Leave chat</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </div>

      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
      <DialogTitle></DialogTitle>
        <DialogContent className="sm:max-w-[480px] rounded-xl overflow-hidden p-0 bg-white shadow-xl border border-gray-200">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white text-center">
            <Video className="w-10 h-10 mx-auto mb-3" />
            <h2 className="text-2xl font-bold">Video Call Invitation</h2>
            <p className="text-sm opacity-80 mt-1">Stay ready for your video call!</p>
          </div>

          {/* Body */}
          <div className="p-6 text-gray-800">
            <div className="flex items-start gap-4 mb-5">
              <Bell className="w-8 h-8 text-yellow-400 shrink-0" />
              <p className="text-sm leading-relaxed">
                The moderator will notify you when the video call begins. Please make sure you're ready to join.
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-6">
                You can close this notification and return later when the call starts.
              </p>
              <Button
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg shadow-md transition duration-150"
                onClick={() => setIsVideoModalOpen(false)}
              >
                <X className="w-5 h-5 mr-2" />
                Close Notification
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


    </div>
  );
};

export default ChatBoxHeader;

