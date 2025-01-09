import { ExpenseInputWithId, FinancialInputWithId } from "@/type/type";
import { formatWithCommas } from "@/utils/formatWithCommas";

const DayExpenseBox = ({
  e,
}: {
  e: ExpenseInputWithId | FinancialInputWithId;
}) => {
  const hasSubProperty = (
    e: ExpenseInputWithId | FinancialInputWithId,
  ): e is ExpenseInputWithId => {
    return "sub" in e;
  };
  return (
    <div className="flex flex-col items-center gap-y-3 rounded-md border-[1px] px-4 py-4">
      <div className="w-full">
        <p className="body-14-m md:body-16-m">{e.title}</p>
        <p className="caption md:body-14-r">{e.comment}</p>
      </div>
      <p className="body-16-m md:title-18-m px-10">
        {formatWithCommas(e.amount)}원
      </p>
      <p className="caption md:body-14-r w-full text-right">
        {e.main} {hasSubProperty(e) && `, ${e.sub}`}
      </p>
    </div>
  );
};

export default DayExpenseBox;
