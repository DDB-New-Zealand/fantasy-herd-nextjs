import { CowData } from "@/constants/cows";
import { create } from "zustand";

interface CowDetailState {
  cowData: CowData | null;
  setCowData: (data: CowData | null) => void;
}

export const useCowDetailStore = create<CowDetailState>((set) => ({
  cowData: null,
  setCowData: (data) => set({ cowData: data }),
}));
