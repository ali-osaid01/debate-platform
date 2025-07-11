"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormSetValue } from "react-hook-form";
import { IEventValues } from "@/types/interface/event.interface";
import { toast } from "sonner";

export function DatePicker({
  setValue,
  isFutureDate = false
}: {
  setValue: UseFormSetValue<IEventValues>;
  isFutureDate?: boolean;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pb-5 pt-5 justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          
          onSelect={(value) => {
            if (!value) return;
            if(isFutureDate && value < new Date()) {
              toast.error("Please select a future date");
              return;
            }
            setValue("date", value || new Date());
            console.log("DATE ->", value);
            setDate(value);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
