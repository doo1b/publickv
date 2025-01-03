"use client";

import { useState } from "react";
import { CustomCalendar } from "./ui/CustomCalendar";
import { ko } from "date-fns/locale";
import { useExpenditure } from "@/querys/dataQuerys";
import { ExpenseInputWithId } from "@/type/type";
import { DayContentProps } from "react-day-picker";

const HomeCalender = () => {
  const [month, setMonth] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: expenditureList } = useExpenditure(month);
  const eventMap = expenditureList?.reduce(
    (acc, exp) => {
      const eventDate = new Date(exp.date).toDateString();
      if (!acc[eventDate]) acc[eventDate] = [];
      acc[eventDate].push(exp);
      return acc;
    },
    {} as Record<string, Array<ExpenseInputWithId>>,
  );

  return (
    <div className={`relative w-full`}>
      <CustomCalendar
        locale={ko}
        mode="single"
        selected={date}
        onSelect={setDate}
        onMonthChange={setMonth}
        components={{
          DayContent: (props: DayContentProps) => {
            const today = props.date.toDateString();
            const isOutside = props.activeModifiers.outside;
            const isSelected = props.activeModifiers.selected;
            const isToday = props.activeModifiers.today;
            const events = eventMap?.[today];
            return (
              <div className="group flex h-full w-full flex-col">
                <p
                  className={`${isOutside ? "text-secondary-200" : "text-secondary-900"} border-b-2 ${isSelected ? "border-secondary-900" : isToday ? "border-secondary-300" : "border-transparent"} w-5 ${!isSelected && "group-hover:border-secondary-300"}`}
                >
                  {props.date.getDate()}
                </p>
                {events?.map((e) => (
                  <div key={e.id} className={`h-2 w-2 rounded-full`}></div>
                ))}
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default HomeCalender;
