import React, { useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ImageIcon, Send, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useChatStore } from '@/store/chat.store';
import FileUpload from '../helper/file-upload';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

interface FormInputs {
  message: string;
  image?: string;
}

export default function SendMessage() {
    const { sendMessage } = useChatStore();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { isValid }
    } = useForm<FormInputs>({
        defaultValues: {
            message: '',
        }
    });

    const selectedImage = watch('image')?.[0];
    const message = watch('message');


    const onSubmit = (data: FormInputs) => {
            sendMessage(data.message);
            reset();
    };
    const image = watch('image');
    
    return (
        <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm sticky bottom-0">
            {image && (
                <div className="max-w-3xl mx-auto mb-2 relative">
                    <div className="relative inline-block">
                        <Image
                        width={250}
                        height={250}
                            src={image}
                            alt="Preview"
                            className="rounded-lg object-contain"
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant="secondary"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
            <form className="flex items-center space-x-2 max-w-3xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-accent/30 border-none focus-visible:ring-primary"
                    {...register('message')}
                />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <FileUpload
                                name="image"
                                className=""
                                maxFileSize={10 * 1024 * 1024}
                                onUploadError={(error) => console.log(error)}
                                onUploadSuccess={(url) => setValue("image", url )}
                                setValue={setValue}
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className={`bg-accent/30 border-none hover:bg-accent/50 ${selectedImage ? 'text-primary' : ''}`}
                                >
                                    <ImageIcon className="h-5 w-5" />
                                    <span className="sr-only">Upload image</span>
                                </Button>
                            </FileUpload>
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
                                disabled={!message?.trim() && !selectedImage}
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