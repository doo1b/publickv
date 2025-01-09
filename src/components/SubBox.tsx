import { ExpenseInputWithId } from "@/type/type";
import { expenseSub } from "@/utils/category";
import { formatWithCommas } from "@/utils/formatWithCommas";

const SubBox = ({
  m,
  mainExp,
}: {
  m: string;
  mainExp: ExpenseInputWithId[];
}) => {
  return (
    <div className="flex flex-col justify-end divide-y divide-secondary-500">
      {expenseSub[m].map((s) => {
        const subExp = mainExp.filter((e) => e.sub === s);
        const totalSub = subExp.reduce(
          (sum, exp) => sum + (exp.amount || 0),
          0,
        );
        return (
          <div key={s} className="flex justify-between py-1">
            <p>{s}</p>
            <p>{formatWithCommas(totalSub)} 원</p>
          </div>
        );
      })}
    </div>
  );
};

export default SubBox;
