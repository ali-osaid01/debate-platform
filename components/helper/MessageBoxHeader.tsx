import { FC, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Video, MoreVertical, Bell, X, Users, Flag, Trash2, LogOut, User, Star } from 'lucide-react';
import { IEvent } from '@/types/interface/event.interface';
import { useChatStore } from '@/store/chat.store';
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle } from '@/components/ui/drawer-dialog';
import { IUser } from '@/types/interface/user.interface';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ChatBoxHeaderProps {
  isMobile: boolean;
  handleBackToList: () => void;
}

const ChatBoxHeader: FC<ChatBoxHeaderProps> = ({ isMobile, handleBackToList,  }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCredenzaOpen, setIsCredenzaOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentChat,onLeaveChat} = useChatStore();
  const router = useRouter();
  

  const handleViewParticipants = () => {
    setIsDropdownOpen(false); // Close dropdown first
    setIsCredenzaOpen(true); // Then open Credenza
  };

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
            src={(currentChat?.event as IEvent)?.picture || '/placeholder-avatar.jpg'}
            alt={currentChat?.name || 'Group Chat'}
          />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {currentChat?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h2 className="text-xl font-bold">{currentChat?.name}</h2>
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
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} modal>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-700">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">Open group chat menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Group Chat Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleViewParticipants} className="flex items-center gap-2 cursor-pointer">
              <Users className="w-4 h-4" />
              <span>View participants</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setIsDropdownOpen(false);
              console.log("REPORT CHAT");
              toast.success("Chat reported successfully");
            }} className="flex items-center gap-2 cursor-pointer">
              <Flag className="w-4 h-4" />
              <span>Report chat</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={() => {
              setIsDropdownOpen(false);
              console.log("DELETE");
            }} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
              <Trash2 className="w-4 h-4" />
              <span>Delete chat</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => {
              setIsDropdownOpen(false);
              router.push('/feed');
              onLeaveChat();
            }} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="w-4 h-4" />
              <span>Leave chat</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-xl overflow-hidden p-0 bg-white shadow-xl border border-gray-200">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white text-center">
            <Video className="w-10 h-10 mx-auto mb-3" />
            <DialogTitle className="text-2xl font-bold">Video Call Invitation</DialogTitle>
            <p className="text-sm opacity-80 mt-1">Stay ready for your video call!</p>
          </div>
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

      <Credenza open={isCredenzaOpen} onOpenChange={setIsCredenzaOpen}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Chat Participants</CredenzaTitle>
          <CredenzaDescription>
            Members of the {currentChat?.name} chat
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <ul className="space-y-4">
            {currentChat?.participants?.map((participant, index) => (
              <li key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-secondary">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={(participant as unknown as IUser)?.profilePicture} alt={(participant as unknown as IUser).username} />
                  <AvatarFallback>
                    <User className="h-6 w-6 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-medium">{(participant as unknown as IUser).username}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>Score: {(participant as unknown as IUser).score || 0}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CredenzaBody>
        <CredenzaFooter>
        <Button variant="outline" onClick={() => setIsCredenzaOpen(false)}>Close</Button>
      </CredenzaFooter>
      </CredenzaContent>
      </Credenza>
    </div>
  );
};

export default ChatBoxHeader;