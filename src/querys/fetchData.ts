import { ExpenseOutputType, FinancialOutputType } from "@/type/type";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebasedb";

export const fetchExpense = async (viewDate: Date) => {
  const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const end = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
    23,
    59,
  ); // 늦게 등록한 것도 집계될 수 있도록
  const querySnapshot = await getDocs(
    query(
      collection(db, "expense"),
      where("date", ">=", start),
      where("date", "<=", end),
    ),
  );
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as ExpenseOutputType),
  }));
  return data.map((d) => ({ ...d, date: d.date.toDate() }));
};

export const fetchFinancial = async (viewDate: Date) => {
  const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const end = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
    23,
    59,
  ); // 늦게 등록한 것도 집계될 수 있도록
  const querySnapshot = await getDocs(
    query(
      collection(db, "financial"),
      where("date", ">=", start),
      where("date", "<=", end),
    ),
  );
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as FinancialOutputType),
  }));
  return data.map((d) => ({ ...d, date: d.date.toDate() }));
};
