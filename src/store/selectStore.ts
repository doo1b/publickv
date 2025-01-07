import { create } from "zustand";

interface selectStore {
  selectedDate: Date;
  selectDate: (date: Date) => void;
}

const useSelectStore = create<selectStore>((set) => ({
  selectedDate: new Date(),
  selectDate: (date: Date) => set({ selectedDate: date }),
}));

export default useSelectStore;
