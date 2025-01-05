"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  viewType?: string;
};

function CustomCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
        month: "space-y-10 w-full",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "title-18-s font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-0",
        nav_button_next: "absolute right-0",
        table: "w-full border-collapse",
        head_row:
          "grid grid-cols-[repeat(7,minmax(45px,1fr))] w-full md:mb-0 mb-3",
        head_cell:
          "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] w-full",
        row: "grid grid-cols-[repeat(7,minmax(45px,1fr))] w-full md:mt-2 md:gap-x-3",
        cell: "p-2 py-1 border-[1px] border-secondary-100 md:rounded-sm h-16 md:h-20 w-full text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "body-14-r w-full h-full font-normal p-0 rounded-none hover:bg-white hover:border-secondary-600",
        ),
        day_range_end: "day-range-end",
        day_selected: "",
        day_today: "",
        day_outside:
          "day-outside text-secondary-300 text-muted-foreground aria-selected:text-secondary-900",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
CustomCalendar.displayName = "Calendar";

export { CustomCalendar };
