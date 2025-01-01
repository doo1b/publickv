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
  viewType,
  ...props
}: CalendarProps) {
  return viewType === "Simple" ? (
    // 간단히 봤을 때
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
        nav_button_previous: "absolute left-[250px]",
        nav_button_next: "absolute right-[250px]",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] w-full",
        row: "bg-accent flex w-full py-[1px] gap-x-[1px] px-[1px]",
        cell: "text-center p-1 h-20 w-full text-sm p-0 relative bg-white  focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "caption h-fit w-4 p-0 font-normal border-b-2 border-transparent rounded-none hover:bg-white hover:border-secondary-600",
        ),
        day_range_end: "day-range-end",
        day_selected: "border-b-2 aria-selected:!border-secondary-900 ",
        day_today:
          "border-b-2 !border-secondary-300 hover:!border-secondary-600",
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
  ) : (
    // 자세히 볼 때
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
        nav_button_previous: "absolute left-[350px]",
        nav_button_next: "absolute right-[350px]",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] w-full",
        row: "flex w-full mt-2 gap-x-3",
        cell: "py-2 px-3 border-[1px] border-secondary-100 rounded-sm h-32 w-full text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "caption h-fit py-0 w-5 px-0 font-normal  border-b-2 border-transparent rounded-none hover:bg-white hover:border-secondary-600",
        ),
        day_range_end: "day-range-end",
        day_selected: "border-b-2 aria-selected:!border-secondary-900 ",
        day_today:
          "border-b-2 !border-secondary-300 hover:!border-secondary-600",
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
