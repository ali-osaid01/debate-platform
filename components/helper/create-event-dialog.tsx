'use client'
import { ArrowRight, PlusCircle, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DatePicker } from '../ui/date-picker'
import { Credenza, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '../ui/drawer-dialog'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FloatingInput } from '../shared/Auth-Input'

export default function EventFormDialog() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        // resolver: yupResolver(EventValidation),
    });

    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Button className="bg-black w-[280px] text-white font-semibold rounded-lg  shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
                    Create Event
                    <PlusCircle className="mr-2 h-5 w-5" />
                </Button>
            </CredenzaTrigger>
            <CredenzaContent className="max-w-[425px] md:max-w-[700px] h-[80vh] flex flex-col ">
                <CredenzaHeader>
                    <CredenzaTitle>Create New Event</CredenzaTitle>
                    <CredenzaDescription>
                        Fill in the details for your new event. Click save when you're done.
                    </CredenzaDescription>
                </CredenzaHeader>
                <ScrollArea className="flex-grow">
                    <form className="space-y-6 p-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <FloatingInput placeholder="Enter Title" register={register} name='title' />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <DatePicker />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="group relative">
                                <label
                                    htmlFor="bio"
                                    className="origin-start absolute top-0 block translate-y-2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+textarea:not(:placeholder-shown)]:pointer-events-none has-[+textarea:not(:placeholder-shown)]:-translate-y-1/2 has-[+textarea:not(:placeholder-shown)]:cursor-default has-[+textarea:not(:placeholder-shown)]:text-xs has-[+textarea:not(:placeholder-shown)]:font-medium has-[+textarea:not(:placeholder-shown)]:text-foreground"
                                >
                                    <span className="inline-flex bg-background px-2">Textarea with label animation</span>
                                </label>
                                <Textarea id="bio" placeholder="" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="picture">Picture</Label>
                            <Input id="picture" type="file" accept="image/*" placeholder='Picture' />
                        </div>

                        <div className="space-y-2">
                            <FloatingInput placeholder="Location" register={register} name='title' />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="participants">Participants</Label>
                            <div className="space-y-2">
                                <Label htmlFor="input-26">Search input with icon and button</Label>
                                <div className="relative">
                                    <Input id="input-26" className="peer pe-9 ps-9" placeholder="Search..." type="search" />
                                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                        <Search size={16} strokeWidth={2} />
                                    </div>
                                    <button
                                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        aria-label="Submit search"
                                        type="submit"
                                    >
                                        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
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
                <div className="flex justify-end space-x-4 p-6 border-t">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="submit">Save Event</Button>
                </div>
            </CredenzaContent>
        </Credenza>
    )
}