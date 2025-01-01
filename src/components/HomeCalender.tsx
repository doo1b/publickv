"use client";

import { useState } from "react";
import { CustomCalendar } from "./ui/CustomCalendar";
import { ko } from "date-fns/locale";
import { useExpenditure } from "@/querys/dataQuerys";
import { ExpenditureWithId } from "@/type/type";

const HomeCalender = () => {
  const [month, setMonth] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [viewType, setViewType] = useState("Detail");

  const { data: expenditureList } = useExpenditure(month);
  const eventMap = expenditureList?.reduce(
    (acc, exp) => {
      const eventDate = new Date(exp.date).toDateString();
      console.log(eventDate);
      if (!acc[eventDate]) acc[eventDate] = [];
      acc[eventDate].push(exp);
      return acc;
    },
    {} as Record<string, Array<ExpenditureWithId>>,
  );

  return (
    <div
      className={`relative ${viewType === "Simple" ? "w-[800px]" : "w-[1000px]"}`}
    >
      <button
        onClick={() => setViewType(viewType === "Detail" ? "Simple" : "Detail")}
        className={`body-14-r absolute left-0 top-0 z-10 rounded-full border-[1px] border-secondary-300 px-3 py-1 hover:border-secondary-700 ${viewType === "Simple" ? "left-0" : "left-[100px]"}`}
      >
        {viewType}
      </button>
      <CustomCalendar
        locale={ko}
        mode="single"
        selected={date}
        onSelect={setDate}
        onMonthChange={setMonth}
        viewType={viewType}
      />
    </div>
  );
};

export default HomeCalender;
