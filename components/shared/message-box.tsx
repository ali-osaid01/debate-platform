import { Video, Send, ArrowLeft, ImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from '../ui/scroll-area';
import { useState } from 'react';

export default function MessageBox({isMobile}:{isMobile:boolean}) {
      const [showMessages, setShowMessages] = useState(false)
    

  const handleBackToList = () => {
    setShowMessages(false)
  }

const messages = [
    { id: 1, sender: "Alice Smith", content: "Hi there! How's it going?", time: "11:30 AM", avatar: "AS" },
    { id: 2, sender: "You", content: "Hey Alice! I'm doing well, thanks. How about you?", time: "11:32 AM", avatar: "YO" },
    { id: 3, sender: "Alice Smith", content: "I'm great! Just wanted to catch up.", time: "11:33 AM", avatar: "AS" },
  ]
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sending message logic here without affecting the user data
  };
  
    return (
    <div className={`${isMobile && !showMessages ? 'hidden' : 'flex'} flex-1 flex-col`}>
      <div className="p-4 border-b border-border flex justify-between items-center">
        {isMobile && <Button variant="ghost" size="icon" onClick={handleBackToList} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to chat list</span>
        </Button>}
        <div className="font-semibold">chat name</div>
        <Button variant="outline" size="icon" className="bg-red-500 hover:bg-red-600 text-white">
          <Video className="h-4 w-4" />
          <span className="sr-only">Start video call</span>
        </Button>
      </div>
  
      {
        /* Messages */
      }
      <ScrollArea className="flex-1 p-4">
        {messages.map(message => <div key={message.id} className={`mb-4 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
          {message.sender !== 'You' && <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2">
            {message.avatar}
          </div>}
          <div>
            <div className={`inline-block p-2 rounded-lg ${message.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-accent'}`}>
              {message.content}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {message.time}
            </div>
          </div>
          {message.sender === 'You' && <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center ml-2">
            {message.avatar}
          </div>}
        </div>)}
      </ScrollArea>
  
      {
        /* Message Input */
      }
      <div className="p-4 border-t border-border">
        <form className="flex items-center">
          <Input type="text" placeholder="Type a message..." className="flex-1 mr-2" />
          <label htmlFor="image-upload" className="cursor-pointer mr-2">
            <Input id="image-upload" type="file" accept="image/*" className="hidden" />
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
    </div>);
  }