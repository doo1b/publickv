import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebasedb";
import {
  ExpenseInputType,
  ExpenseInputWithId,
  FinancialInputType,
  FinancialInputWithId,
} from "@/type/type";
import { fetchExpense, fetchFinancial } from "./fetchData";

export const useExpenditure = (viewDate: Date) => {
  const yymm =
    viewDate.getFullYear().toString() + "-" + viewDate.getMonth() + 1;
  return useQuery({
    queryKey: ["expense", "house", yymm],
    queryFn: () => fetchExpense(viewDate),
  });
};

export const useFinancial = (viewDate: Date) => {
  const yymm =
    viewDate.getFullYear().toString() + "-" + viewDate.getMonth() + 1;
  return useQuery({
    queryKey: ["expense", "financial", yymm],
    queryFn: () => fetchFinancial(viewDate),
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
      queryClient.invalidateQueries({ queryKey: ["expense", "house"] });
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
      queryClient.invalidateQueries({ queryKey: ["expense", "financial"] });
    },
  });
  return (data: FinancialInputType) => mutate(data);
};

export const useDelExpense = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: FinancialInputWithId | ExpenseInputWithId) => {
      try {
        if (`sub` in data) {
          await deleteDoc(doc(db, "expense", data.id));
        } else {
          await deleteDoc(doc(db, "financial", data.id));
        }
      } catch (error) {
        console.error(error);
        alert("지출 삭제 중 오류 발생");
      }
    },
    onSuccess: () => {
      alert("지출 삭제 완료!");
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
  });
  return (data: FinancialInputWithId | ExpenseInputWithId) => mutate(data);
};
