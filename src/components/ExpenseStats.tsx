"use client";

import { useExpenditure, useFinancial } from "@/querys/dataQuerys";
import useSelectStore from "@/store/selectStore";
import { expenseMain } from "@/utils/category";
import ExpenseBox from "./ExpenseBox";
import FinBox from "./FinBox";

const ExpenseStats = () => {
  const { selectedDate } = useSelectStore();
  const { data: expenseData = [] } = useExpenditure(selectedDate);
  const { data: financialData = [] } = useFinancial(selectedDate);

  return (
    <div className="mt-5 flex flex-col items-center gap-y-6">
      <p className="title-20-b">
        {`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 `}
        지출 통계
      </p>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-[repeat(4,minmax(200px,1fr))]">
        {expenseMain.map((m) => {
          return <ExpenseBox key={m} m={m} expenseData={expenseData} />;
        })}
        <FinBox financialData={financialData} />
      </div>
    </div>
  );
};

export default ExpenseStats;
