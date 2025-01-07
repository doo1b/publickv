import { ExpenseInputWithId } from "@/type/type";

import MainBox from "./MainBox";
import SubBox from "./SubBox";

const ExpenseBox = ({
  expenseData,
  m,
}: {
  m: string;
  expenseData: ExpenseInputWithId[];
}) => {
  const mainExp = expenseData.filter((d) => d.main === m);
  const totalMain = mainExp.reduce((sum, exp) => sum + (exp.amount || 0), 0);
  return (
    <div className="rounded-md border-[1px] border-secondary-900 px-4 py-3">
      <MainBox totalMain={totalMain} m={m} />
      <SubBox m={m} mainExp={mainExp} />
    </div>
  );
};

export default ExpenseBox;
