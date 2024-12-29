import React, { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ImageIcon, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useChatStore } from '@/store/chat.store';

export default function SendMessage() {
    const { sendMessage } = useChatStore(); 
    const [message, setMessage] = useState('');

    // useEffect(() => {
    //     receiveNewMessage();
    //   }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage(message); 
            setMessage(''); 
        }
    };

    return (
        <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm sticky bottom-0">
            <form className="flex items-center space-x-2 max-w-3xl mx-auto" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-accent/30 border-none focus-visible:ring-primary"
                    value={message} // Bind the input value to the state
                    onChange={(e) => setMessage(e.target.value)} // Update state on input change
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
                            <Button
                                size="icon"
                                type="submit"
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                                disabled={!message.trim()} 
                            >
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
    );
}
