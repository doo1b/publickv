import { ExpenseInputWithId, FinancialInputWithId } from "@/type/type";
import { formatWithCommas } from "@/utils/formatWithCommas";

const EditForm = ({ e }: { e: ExpenseInputWithId | FinancialInputWithId }) => {
  const hasSubProperty = (
    e: ExpenseInputWithId | FinancialInputWithId,
  ): e is ExpenseInputWithId => {
    return "sub" in e;
  };

  return (
    <form className="flex flex-col items-center justify-between gap-y-3 rounded-md border-[1px] px-4 py-4">
      <div className="flex w-full items-start justify-between gap-x-4">
        <div>
          <input className="body-14-m md:body-16-m">{e.title}</input>
          <p className="caption md:body-14-r">{e.comment}</p>
        </div>
        <div className="caption mt-1 flex gap-x-1">
          <button>✔️</button>
        </div>
      </div>
      <p className="body-16-m md:title-18-m px-10">
        {formatWithCommas(e.amount)}원
      </p>
      <p className="caption md:body-14-r w-full text-right">
        {e.main} {hasSubProperty(e) && `, ${e.sub}`}
      </p>
    </form>
  );
};

export default EditForm;
