"use client";

import { useState } from "react";
import { CustomCalendar } from "./ui/CustomCalendar";
import { ko } from "date-fns/locale";
import { useExpenditure } from "@/querys/dataQuerys";
import { ExpenseInputWithId } from "@/type/type";
import { DayContentProps, DayProps } from "react-day-picker";

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
    <div className={`relative w-[1000px]`}>
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
            return (
              <div className="flex h-full w-full flex-col">
                <button
                  className={`${isOutside ? "text-secondary-200" : "text-secondary-900"}`}
                >
                  {props.date.getDate()}
                </button>
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default HomeCalender;
