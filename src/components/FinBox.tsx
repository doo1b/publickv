import { FinancialInputWithId } from "@/type/type";
import MainBox from "./MainBox";
import { financialMain } from "@/utils/category";

const FinBox = ({
  financialData,
}: {
  financialData: FinancialInputWithId[];
}) => {
  const totalFin = financialData.reduce(
    (sum, fin) => sum + (fin.amount || 0),
    0,
  );
  return (
    <div className="rounded-md border-[1px] border-secondary-900 px-4 py-3">
      <MainBox m="금융 비용" totalMain={totalFin} />
      <div className="flex flex-col justify-end divide-y divide-secondary-500">
        {financialMain.map((m) => {
          const mainFin = financialData.filter((f) => f.main === m);
          const totalMain = mainFin.reduce(
            (sum, fin) => sum + (fin.amount || 0),
            0,
          );
          return (
            <div key={m} className="flex justify-between py-1">
              <p>{m}</p>
              <p>{totalMain}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinBox;
