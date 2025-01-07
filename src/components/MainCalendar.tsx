"use client";

import React from "react";
import { useState } from "react";
import { CustomCalendar } from "./ui/CustomCalendar";
import { ko } from "date-fns/locale";
import { DayContentProps } from "react-day-picker";
import useExpenseData from "@/hooks/useExpenseData";
import useModal from "@/hooks/useModal";
import Modal from "./ui/Modal";
import { ExpenseInputWithId, FinancialInputWithId } from "@/type/type";
import { FaCheck } from "react-icons/fa6";
import useSelectStore from "@/store/selectStore";

const MainCalendar = ({ children }: { children: React.ReactNode }) => {
  const { modalClose, modalOpen, isOpen } = useModal();
  const [month, setMonth] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isView, setIsView] = useState(true);
  const { selectDate } = useSelectStore();

  const { totalByDate, eventMap } = useExpenseData(month);

  const hasSubProperty = (
    e: ExpenseInputWithId | FinancialInputWithId,
  ): e is ExpenseInputWithId => {
    return "sub" in e;
  };

  const changeMonth = (date: Date) => {
    selectDate(date);
    setMonth(date);
  };

  return (
    <div className="mx-auto w-full md:w-[800px]">
      <CustomCalendar
        isView={isView}
        onDayClick={modalOpen}
        locale={ko}
        mode="single"
        selected={date}
        onSelect={setDate}
        onMonthChange={changeMonth}
        components={{
          DayContent: (props: DayContentProps) => {
            const today = props.date.toDateString();
            const isOutside = props.activeModifiers.outside;
            const isSelected = props.activeModifiers.selected;
            const isToday = props.activeModifiers.today;
            const events = eventMap?.[today];
            const total = totalByDate?.[today];
            return (
              <div
                className="group flex h-full w-full flex-col items-center gap-y-2 md:gap-y-3"
                onClick={() => setSelectedDate(props.date.toDateString())}
              >
                <p
                  className={`${isOutside ? "text-secondary-200" : "text-secondary-900"} border-b-2 ${isSelected ? "border-secondary-900" : isToday ? "border-secondary-300" : "border-transparent"} w-4 ${!isSelected && "group-hover:border-secondary-300"}`}
                >
                  {props.date.getDate()}
                </p>
                <p className="hidden md:block">
                  {total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
                {events && (
                  <FaCheck
                    className={`h-2 w-2 rounded-full md:hidden`}
                    color={
                      total <= 500000
                        ? "black"
                        : total <= 1000000
                          ? "green"
                          : total <= 5000000
                            ? "blue"
                            : "red"
                    }
                  ></FaCheck>
                )}
              </div>
            );
          },
        }}
      />
      {isView && children}
      <button
        onClick={() => setIsView(!isView)}
        className="caption md:body-14-r mt-4 rounded-md border-[1px] px-2 py-1 hover:bg-accent"
      >
        {isView ? "달력 접기" : "달력 펼치기"}
      </button>
      {isOpen && (
        <Modal onClose={modalClose}>
          <div className="grid gap-x-4 gap-y-2 md:grid-cols-3">
            {!eventMap?.[selectedDate] ? (
              <p className="body-14-r md:body-16-r">지출이 없습니다.</p>
            ) : (
              eventMap[selectedDate].map((e) => (
                <div
                  key={e.id}
                  className="flex flex-col items-center gap-y-3 rounded-md border-[1px] px-4 py-4"
                >
                  <p className="body-14-r md:body-16-r w-full text-left">
                    {e.title}
                  </p>

                  <p className="body-16-m md:title-18-m px-10">
                    {e.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </p>
                  <p className="caption md:body-14-r w-full text-right">
                    {e.main} {hasSubProperty(e) && `, ${e.sub}`}
                  </p>
                </div>
              ))
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MainCalendar;
