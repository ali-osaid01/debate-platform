"use client";
import { memo, useCallback, useRef } from "react";
import { CalendarRangeIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "../ui/date-picker";
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui/drawer-dialog";

import { useForm } from "react-hook-form";
import { FloatingInput } from "../shared/Auth-Input";
import FileUpload from "./file-upload";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSingleCategory } from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import eventValidation from "@/validation/event.validation";
import ParticipantSearch from "./participant-search";
import { ICategory } from "@/types/interface/category.interface";
import { createEvent } from "@/services/event.service";
import { EVENT_TYPE, IEventValues } from "@/types/interface/event.interface";
import { STATUS } from "@/types/enum";
import { toast } from "sonner";
import { useParticipantStore } from "@/store/participants.store";

const FormField = memo(({ label, children, error }: { label?: string; children: React.ReactNode; error?: string }) => (
  <div className="space-y-2">
    {label && <Label htmlFor={label}>{label}</Label>}
    {children}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
));

 const CategorySelect = memo(({ 
  data, 
  onValueChange, 
  error,
  placeholder,
  label,
  disabled = false
}: {
  data?: { response?: { data?: ICategory[] } };
  onValueChange: (value: string) => void;
  error?: string;
  placeholder: string;
  label: string;
  disabled?: boolean;
}) => (
  <FormField label={label} error={error}>
    <Select onValueChange={onValueChange} defaultValue="" disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data?.response?.data?.map((item: ICategory) => (
          <SelectItem value={item._id} key={item._id}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </FormField>
));

function EventFormDialog() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IEventValues>({
    resolver: yupResolver(eventValidation),
  });
  
  const { clearParticipants,participants } = useParticipantStore();
  const closeButton = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const category = watch("category");
  const eventType = watch("type");

  const { data: categoriesData } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => fetchSingleCategory(""),
    staleTime: 5 * 60 * 1000,
  });

  const { data: subCategories } = useQuery({
    queryKey: ["Categories-SubTopics", category],
    queryFn: () => fetchSingleCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });

  const onSubmit = (async (data: IEventValues) => {
    if (data.type === EVENT_TYPE.PUBLIC) {
      toast.error("PUBLIC EVENTS ARE CLOSED UNTIL ADMIN PANEL IS COMPLETED");
      return;
    }
    
    const { status, response } = await createEvent({...data,participants});
    if (status === STATUS.SUCCESS) {
      toast("Event Created Successfully");
      clearParticipants();
      closeButton.current?.click();
    }
  });

  const handleCategoryChange = useCallback((value: string) => {
    setValue("category", value);
    queryClient.invalidateQueries({
      queryKey: ["Categories"],
    });
  }, [setValue, queryClient]);

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button className="bg-black w-[280px] text-white font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
          Create Event
          <PlusCircle className="mr-2 h-5 w-5" />
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="md:max-w-[700px] h-[80vh] flex flex-col">
        <CredenzaHeader>
          <CredenzaTitle>Create New Event</CredenzaTitle>
          <CredenzaDescription>
            Fill in the details for your new event. Click save when you&apos;re done.
          </CredenzaDescription>
        </CredenzaHeader>
        <ScrollArea className="flex-grow">
          <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField error={errors.title?.message}>
                <FloatingInput
                  placeholder="Enter Title"
                  register={register}
                  name="title"
                />
              </FormField>

              <FormField>
                <DatePicker setValue={setValue} isFutureDate />
              </FormField>

              <FormField 
                label="Description" 
                error={errors.description?.message}
              >
                <Textarea
                  placeholder="Write a short description about the event..."
                  className="w-full"
                  {...register("description")}
                />
              </FormField>
            </div>

            <FileUpload
              setValue={setValue}
              maxFileSize={2 * 1024 * 1024}
              onUploadSuccess={(url) => setValue("picture", url)}
              onUploadError={(error) => console.error(error)}
              className="relative group w-full h-[150px] rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition-all cursor-pointer flex flex-col justify-center items-center"
              name="picture"
            >
              <div className="text-center flex flex-col items-center space-y-2">
                <div className="w-12 h-12 flex justify-center items-center bg-gray-200 text-gray-600 rounded-full group-hover:bg-gray-300">
                  <CalendarRangeIcon size={28} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    Upload Event Photo
                  </p>
                  <p className="text-xs text-gray-500 group-hover:text-gray-600">
                    Click or drag and drop your image here
                  </p>
                </div>
              </div>
            </FileUpload>

            <FormField error={errors.location?.message}>
              <FloatingInput
                placeholder="Location"
                register={register}
                name="location"
              />
            </FormField>

            <FormField label="Event Type">
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue="PUBLIC"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLIC">Public</SelectItem>
                  <SelectItem value="PRIVATE">Private</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            {eventType === EVENT_TYPE.PRIVATE && (
              <ParticipantSearch setValue={setValue} watch={watch} />
            )}

            <CategorySelect
              data={categoriesData}
              onValueChange={handleCategoryChange}
              error={errors.category?.message}
              placeholder="Select Category"
              label="Category"
            />

            <CategorySelect
              data={subCategories}
              onValueChange={(value) => setValue("topic", value)}
              error={errors.topic?.message}
              placeholder="Select Topic"
              label="Topic"
              disabled={!category}
            />

            <div className="flex justify-end space-x-4 p-6 border-t">
              <CredenzaClose asChild>
                <Button variant="outline" ref={closeButton}>
                  Cancel
                </Button>
              </CredenzaClose>
              <Button
                type="submit"
                className="bg-black text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Event"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </CredenzaContent>
    </Credenza>
  );
}

export default memo(EventFormDialog);