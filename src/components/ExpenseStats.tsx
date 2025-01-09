"use client";

import { useExpenditure, useFinancial } from "@/querys/dataQuerys";
import useSelectStore from "@/store/selectStore";
import { expenseMain } from "@/utils/category";
import ExpenseBox from "./ExpenseBox";
import FinBox from "./FinBox";
import { formatWithCommas } from "@/utils/formatWithCommas";

const ExpenseStats = () => {
  const { selectedDate } = useSelectStore();
  const { data: expenseData = [] } = useExpenditure(selectedDate);
  const { data: financialData = [] } = useFinancial(selectedDate);

  const totalExp = [...expenseData, ...financialData].reduce(
    (sum, exp) => sum + (exp.amount || 0),
    0,
  );

  return (
    <div className="mt-5 flex flex-col items-center gap-y-6">
      <p className="title-20-b">
        {`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 `}
        지출 통계
      </p>
      <p className="body-16-m">총 {formatWithCommas(totalExp)}원</p>
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
