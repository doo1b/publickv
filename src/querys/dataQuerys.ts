import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebasedb";
import {
  ExpenseInputType,
  ExpenseOutputType,
  FinancialInputType,
} from "@/type/type";

export const useExpenditure = (viewDate: Date) => {
  const yymm =
    viewDate.getFullYear().toString() + "-" + viewDate.getMonth() + 1;
  return useQuery({
    queryKey: ["expenditure", yymm],
    queryFn: async () => {
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
    },
  });
};

export const useAddExp = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: ExpenseInputType) => {
      try {
        await addDoc(collection(db, "expense"), data);
      } catch (error) {
        console.error(error);
        alert("지출 등록 중 오류 발생");
      }
    },
    onSuccess: () => {
      alert("지출 등록 완료!");
    },
  });
  return (data: ExpenseInputType) => mutate(data);
};

export const useAddFin = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: FinancialInputType) => {
      try {
        await addDoc(collection(db, "financial"), data);
      } catch (error) {
        console.error(error);
        alert("지출 등록 중 오류 발생");
      }
    },
    onSuccess: () => {
      alert("지출 등록 완료!");
    },
  });
  return (data: FinancialInputType) => mutate(data);
};
