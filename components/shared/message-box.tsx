'use client'

import { Video, Send, ArrowLeft, ImageIcon, MessageCircle, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'
import { useChatStore } from '@/store/chat.store'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function MessageBox({ isMobile }: { isMobile: boolean }) {
  const [showMessages, setShowMessages] = useState(false)
  const { currentChat } = useChatStore()

  const handleBackToList = () => {
    setShowMessages(false)
  }

  const messages = [
    { id: 1, sender: "Alice Smith", content: "Hi there! How's it going?", time: "11:30 AM", avatar: "AS" },
    { id: 2, sender: "You", content: "Hey Alice! I'm doing well, thanks. How about you?", time: "11:32 AM", avatar: "YO" },
    { id: 3, sender: "Alice Smith", content: "I'm great! Just wanted to catch up. Do you have any plans for the weekend?", time: "11:33 AM", avatar: "AS" },
    { id: 4, sender: "You", content: "Not much planned yet. Might go hiking if the weather's nice. How about you?", time: "11:35 AM", avatar: "YO" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sending message logic here
  }

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
        <Button className="px-8 py-6 text-lg" size="lg">
          Start a New Chat
        </Button>
      </div>
    )
  }

  return (
    <div className={`${isMobile && !showMessages ? 'hidden' : 'flex'} flex-1 flex-col bg-gradient-to-b from-background to-accent/10`}>
      <div className="p-4 border-b border-border flex justify-between items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={handleBackToList} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to chat list</span>
          </Button>
        )}
        <div className="flex items-center flex-1">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Alice Smith" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-lg">Alice Smith</div>
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

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender !== 'You' && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={message.sender} />
                  <AvatarFallback>{message.avatar}</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[70%] ${message.sender === 'You' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    message.sender === 'You' 
                      ? 'bg-primary text-primary-foreground rounded-br-sm' 
                      : 'bg-accent rounded-bl-sm'
                  }`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {index === 0 || messages[index - 1].sender !== message.sender ? message.sender : ''} • {message.time}
                </div>
              </div>
              {message.sender === 'You' && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarImage src="/placeholder-user-avatar.jpg" alt="You" />
                  <AvatarFallback>{message.avatar}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm sticky bottom-0">
        <form className="flex items-center space-x-2 max-w-3xl mx-auto" onSubmit={handleSubmit}>
          <Input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 bg-accent/30 border-none focus-visible:ring-primary"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Input id="image-upload" type="file" accept="image/*" className="hidden" />
                  <Button type="button" variant="outline" size="icon" className="bg-accent/30 border-none hover:bg-accent/50">
                    <ImageIcon className="h-5 w-5" />
                    <span className="sr-only">Upload image</span>
                  </Button>
                </label>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
      </div>
    </div>
  )
}

