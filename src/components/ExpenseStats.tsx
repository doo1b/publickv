"use client";

import useSelectStore from "@/store/selectStore";

const ExpenseStats = () => {
  const { selectedYYMM } = useSelectStore();
  return (
    <div className="mt-5 flex flex-col items-center">
      <p className="title-18-s">{selectedYYMM} 지출 통계</p>
    </div>
  );
};

export default ExpenseStats;
