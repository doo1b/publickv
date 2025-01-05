import MainCalendar from "@/components/MainCalendar";
import { legend } from "@/utils/category";
import React from "react";
import { FaCheck } from "react-icons/fa6";

const page = () => {
  return (
    <main className="relative mt-3 w-full px-6 md:mt-5 md:w-[800px] md:px-0">
      <MainCalendar>
        <div className="caption mt-2 flex w-full justify-between md:hidden">
          {Object.entries(legend).map((o) => (
            <div key={o[0]} className="flex items-center gap-x-1">
              <FaCheck color={o[1]} />
              <p>{o[0]}</p>
            </div>
          ))}
        </div>
      </MainCalendar>
    </main>
  );
};

export default page;
