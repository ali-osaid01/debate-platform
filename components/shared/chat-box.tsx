'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Video, Send, ArrowLeft, ImageIcon } from 'lucide-react'

const chats = [
  { id: 1, name: "Alice Smith", lastMessage: "Hey, how are you?", time: "10:30 AM", avatar: "AS" },
  { id: 2, name: "Bob Johnson", lastMessage: "Can we meet tomorrow?", time: "Yesterday", avatar: "BJ" },
  { id: 3, name: "Team Alpha", lastMessage: "New project update", time: "2 days ago", avatar: "TA" },
  { id: 4, name: "Ali Osaid", lastMessage: "Project Complete", time: "2 days ago", avatar: "AO" },
  { id: 5, name: "Team Alpha", lastMessage: "New project update", time: "2 days ago", avatar: "ST" },

]

const messages = [
  { id: 1, sender: "Alice Smith", content: "Hi there! How's it going?", time: "11:30 AM", avatar: "AS" },
  { id: 2, sender: "You", content: "Hey Alice! I'm doing well, thanks. How about you?", time: "11:32 AM", avatar: "YO" },
  { id: 3, sender: "Alice Smith", content: "I'm great! Just wanted to catch up.", time: "11:33 AM", avatar: "AS" },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(chats[0])
  const [isMobile, setIsMobile] = useState(false)
  const [showMessages, setShowMessages] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const handleChatSelect = (chat:any) => {
    setSelectedChat(chat)
    if (isMobile) {
      setShowMessages(true)
    }
  }

  const handleBackToList = () => {
    setShowMessages(false)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sending message logic here without affecting the user data
  };
  return (
    <div className="flex bg-background">
      {/* Left Sidebar */}
      <div className={`${isMobile && showMessages ? 'hidden' : 'block'} w-full md:w-1/4 border-r border-border`}>
        <div className="p-4 font-semibold text-lg">Chats</div>
        <ScrollArea className="h-[calc(88vh-60px)]">
          {chats.map((chat,index) => (
            <div
              key={index+chat.id}
              className={`flex items-center p-4 hover:bg-accent cursor-pointer ${
                selectedChat.id === chat.id ? 'bg-accent' : ''
              }`}
              onClick={() => handleChatSelect(chat)}
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

      {/* Main Chat Area */}
      <div className={`${isMobile && !showMessages ? 'hidden' : 'flex'} flex-1 flex-col`}>
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex justify-between items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={handleBackToList} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to chat list</span>
            </Button>
          )}
          <div className="font-semibold">{selectedChat.name}</div>
          <Button variant="outline" size="icon" className="bg-red-500 hover:bg-red-600 text-white">
            <Video className="h-4 w-4" />
            <span className="sr-only">Start video call</span>
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.sender === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender !== 'You' && (
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2">
                  {message.avatar}
                </div>
              )}
              <div>
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === 'You'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent'
                  }`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {message.time}
                </div>
              </div>
              {message.sender === 'You' && (
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center ml-2">
                  {message.avatar}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <form className="flex items-center">
            <Input
              type="text"
              placeholder="Type a message..."
              className="flex-1 mr-2"
            />
            <label htmlFor="image-upload" className="cursor-pointer mr-2">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
              />
              <Button type="button" variant="outline" size="icon">
                <ImageIcon className="h-4 w-4" />
                <span className="sr-only">Upload image</span>
              </Button>
            </label>
            <Button size="icon" onClick={handleSubmit}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}