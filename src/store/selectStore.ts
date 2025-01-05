import { create } from "zustand";

interface selectStore {
  selectedYYMM: string;
  selectYYMM: (yymm: string) => void;
}

const useSelectStore = create<selectStore>((set) => ({
  selectedYYMM: `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월`,
  selectYYMM: (yymm: string) => set({ selectedYYMM: yymm }),
}));

export default useSelectStore;
