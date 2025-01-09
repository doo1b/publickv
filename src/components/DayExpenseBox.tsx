import useModal from "@/hooks/useModal";
import { useDelExpense } from "@/querys/dataQuerys";
import { ExpenseInputWithId, FinancialInputWithId } from "@/type/type";
import { formatWithCommas } from "@/utils/formatWithCommas";
import Modal from "./ui/Modal";
import AddExpenditureForm from "@/app/expense/components/AddExpenditureForm";
import AddFinancialForm from "@/app/expense/financial/components/AddFinancialForm";

const DayExpenseBox = ({
  e,
}: {
  e: ExpenseInputWithId | FinancialInputWithId;
}) => {
  const deleteExpense = useDelExpense();
  const { isOpen, modalClose, modalOpen } = useModal();

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-y-3 rounded-md border-[1px] px-4 py-4">
        <div className="flex w-full items-start justify-between gap-x-4">
          <div>
            <p className="body-14-m md:body-16-m">{e.title}</p>
            <p className="caption md:body-14-r">{e.comment}</p>
          </div>
          <div className="caption mt-1 flex gap-x-1">
            <button onClick={modalOpen}>✏️</button>
            <button onClick={() => deleteExpense(e)}>❌</button>
          </div>
        </div>
        <p className="body-16-m md:title-18-m px-10">
          {formatWithCommas(e.amount)}원
        </p>
        <p className="caption md:body-14-r w-full text-right">
          {e.main} {`sub` in e && `, ${e.sub}`}
        </p>
      </div>
      {isOpen && (
        <Modal onClose={modalClose}>
          {`sub` in e ? (
            <AddExpenditureForm value={e} onClose={modalClose} />
          ) : (
            <AddFinancialForm value={e} onClose={modalClose} />
          )}
        </Modal>
      )}
    </>
  );
};

export default DayExpenseBox;
