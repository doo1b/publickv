import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebasedb";
import {
  CardData,
  FsGeneralExpenditureType,
  FsLoanExpenditureType,
  GeneralExpenditureType,
  LoanExpenditureType,
  MainCategoryData,
  SubCategoryData,
} from "@/type/type";

export const useExpenditure = (month: Date) => {
  return useQuery({
    queryKey: ["expenditure", month],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "지출"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as FsGeneralExpenditureType | FsLoanExpenditureType),
      }));
      return data.map((d) => ({ ...d, date: d.date.toDate() }));
    },
  });
};

export const useCardList = () => {
  return useQuery({
    queryKey: ["card"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "카드"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as CardData),
      }));
    },
  });
};

export const useAddCard = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: CardData) => {
      try {
        await addDoc(collection(db, "카드"), data);
      } catch (error) {
        console.error(error);
        alert("추가 중 오류 발생");
      }
    },
    onSuccess: () => {
      alert("추가 완료!");
      queryClient.invalidateQueries({
        queryKey: ["card"],
      });
    },
  });
  return mutate;
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({ data, id }: { data: CardData; id: string }) => {
      try {
        await updateDoc(doc(db, "카드", id), {
          name: data.name,
          company: data.company,
          type: data.type,
          total: data.total,
        });
      } catch (error) {
        console.error(error);
        alert("수정 중 오류 발생");
      }
    },
    onSuccess: () => {
      alert("수정 완료!");
      queryClient.invalidateQueries({
        queryKey: ["card"],
      });
    },
  });
  return mutate;
};

export const useDelCard = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      try {
        await deleteDoc(doc(db, "카드", id));
      } catch (error) {
        console.error(error);
        alert("삭제 중 오류 발생");
      }
    },
    onSuccess: () => {
      alert("삭제 완료!");
      queryClient.invalidateQueries({
        queryKey: ["card"],
      });
    },
  });
  return mutate;
};

export const useCategory = (type: string, id?: string) => {
  return useQuery({
    queryKey: type === "main" ? ["category", "main"] : ["category", id, "sub"],
    queryFn: async () => {
      if (type === "main") {
        const querySnapshot = await getDocs(
          query(collection(db, "카테고리"), where("type", "==", "main")),
        );
        return querySnapshot.docs.map((doc) => ({
          id: doc.id, // 문서 ID 포함
          ...(doc.data() as MainCategoryData), // 문서 데이터
        }));
      } else {
        const querySnapshot = await getDocs(
          query(
            collection(db, "카테고리"),
            where("type", "==", "sub"),
            where("parentId", "==", id),
          ),
        );
        return querySnapshot.docs.map((doc) => ({
          id: doc.id, // 문서 ID 포함
          ...(doc.data() as SubCategoryData), // 문서 데이터
        }));
      }
    },
    enabled: type === "main" || !!id,
  });
};

export const useAddExp = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: GeneralExpenditureType | LoanExpenditureType) => {
      try {
        await addDoc(collection(db, "지출"), data);
      } catch (error) {
        console.error(error);
        alert("지출 등록 중 오류 발생");
      }
    },
    onSuccess: () => {
      alert("지출 등록 완료!");
    },
  });
  return (data: GeneralExpenditureType | LoanExpenditureType) => mutate(data);
};
