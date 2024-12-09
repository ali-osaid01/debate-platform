'use client';

import { CalendarRangeIcon, PlusCircle, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from '../ui/date-picker';
import { Credenza, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '../ui/drawer-dialog';
import { useForm } from 'react-hook-form';
import { FloatingInput } from '../shared/Auth-Input';
import FileUpload from './file-upload';

export default function EventFormDialog() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Button className="bg-black w-[280px] text-white font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
                    Create Event
                    <PlusCircle className="mr-2 h-5 w-5" />
                </Button>
            </CredenzaTrigger>
            <CredenzaContent className="max-w-[425px] md:max-w-[700px] h-[80vh] flex flex-col">
                <CredenzaHeader>
                    <CredenzaTitle>Create New Event</CredenzaTitle>
                    <CredenzaDescription>
                        Fill in the details for your new event. Click save when you're done.
                    </CredenzaDescription>
                </CredenzaHeader>
                <ScrollArea className="flex-grow">
                    <form className="space-y-6 p-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Title */}
                            <div className="space-y-2">
                                <FloatingInput placeholder="Enter Title" register={register} name="title" />
                            </div>

                            {/* Date */}
                            <div className="space-y-2">
                                <DatePicker />
                            </div>

                            {/* Description */}
                            <div className="col-span-2 space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Write a short description about the event..."
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Picture Upload */}
                        <div className="space-y-2">
                            <FileUpload
                                setValue={setValue}
                                maxFileSize={2 * 1024 * 1024}
                                onUploadSuccess={(url) => console.log('Uploaded:', url)}
                                onUploadError={(error) => console.error(error)}
                                className="relative group w-full h-[150px] rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition-all cursor-pointer flex flex-col justify-center items-center"
                                name="profilePicture"
                            >
                                <div className="text-center flex flex-col items-center space-y-2">
                                    {/* Icon */}
                                    <div className="w-12 h-12 flex justify-center items-center bg-gray-200 text-gray-600 rounded-full group-hover:bg-gray-300">
                                        <CalendarRangeIcon size={28} />
                                    </div>

                                    {/* Text */}
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-800">Upload Event Photo</p>
                                        <p className="text-xs text-gray-500 group-hover:text-gray-600">Click or drag and drop your image here</p>
                                    </div>
                                </div>
                            </FileUpload>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <FloatingInput placeholder="Location" register={register} name="location" />
                        </div>

                        {/* Participants Search */}
                        <div className="space-y-2">
                            <Label htmlFor="participants">Participants</Label>
                            <div className="relative">
                                <Input
                                    className="peer pe-9 ps-9"
                                    id="participants"
                                    placeholder="Search participants"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                    <Search size={16} strokeWidth={2} />
                                </div>
                            </div>
                        </div>

                        {/* Topic */}
                        <div className="space-y-2">
                            <Label htmlFor="topic">Category</Label>
                            <Select>
                                <SelectTrigger id="topic">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="science">Science</SelectItem>
                                    <SelectItem value="arts">Arts</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="topic">Topic</Label>
                            <Select>
                                <SelectTrigger id="topic">
                                    <SelectValue placeholder="Select topic" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="science">Science</SelectItem>
                                    <SelectItem value="arts">Arts</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                </ScrollArea>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 p-6 border-t">
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-black text-white">
                        Save Event
                    </Button>
                </div>
            </CredenzaContent>
        </Credenza>
    );
}
