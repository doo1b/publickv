import { useExpenditure, useFinancial } from "@/querys/dataQuerys";
import { ExpenseInputWithId, FinancialInputWithId } from "@/type/type";

const useExpenseData = (month: Date) => {
  const { data: expenditureList = [] } = useExpenditure(month);
  const { data: financialList = [] } = useFinancial(month);

  const totalList = [...expenditureList, ...financialList];

  const eventMap = totalList?.reduce(
    (acc, exp) => {
      const eventDate = new Date(exp.date).toDateString();
      if (!acc[eventDate]) acc[eventDate] = [];
      acc[eventDate].push(exp);
      return acc;
    },
    {} as Record<string, Array<ExpenseInputWithId | FinancialInputWithId>>,
  );

  const totalByDate = Object.entries(eventMap).reduce<Record<string, number>>(
    (acc, [date, expenses]) => {
      const totalAmount = expenses.reduce(
        (sum, exp) => sum + (exp.amount || 0),
        0,
      ); // 날짜별 합계 계산
      acc[date] = totalAmount;
      return acc;
    },
    {},
  );
  return { eventMap, totalByDate };
};

export default useExpenseData;
