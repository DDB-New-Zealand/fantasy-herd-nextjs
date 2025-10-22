"use client";

import { COW_DATA, CowData } from "@/constants/cows";
import { useEffect, useState } from "react";
import { create } from "zustand";

export type Herd = {
  "starter-1": CowData | undefined;
  "starter-2": CowData | undefined;
  "starter-3": CowData | undefined;
  "starter-4": CowData | undefined;
  "starter-5": CowData | undefined;
  "benched-1": CowData | undefined;
  "benched-2": CowData | undefined;
  "benched-3": CowData | undefined;
  "benched-4": CowData | undefined;
  "benched-5": CowData | undefined;
};
interface UserState {
  isLoggedIn: boolean | null;

  currentSeason: "pre-season" | "in-season" | "post-season";

  herdName: string;
  herd: Herd;
  herdEntered: boolean;
  autoPickHerd: () => void;
  resetHerd: () => void;
  addCowToHerd: (cow: CowData, slot: keyof Herd) => void;
  removeCowFromHerd: (slot: keyof Herd) => void;
  enterHerd: (herd: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  // logged in status
  isLoggedIn: null,

  // seasons
  currentSeason: "pre-season",

  // cows
  herdName: "",
  herdEntered: false,
  herd: {
    "starter-1": undefined,
    "starter-2": undefined,
    "starter-3": undefined,
    "starter-4": undefined,
    "starter-5": undefined,
    "benched-1": undefined,
    "benched-2": undefined,
    "benched-3": undefined,
    "benched-4": undefined,
    "benched-5": undefined,
  },
  autoPickHerd: () => {
    const sortedCows = [...COW_DATA].sort((a, b) => {
      const ratingOrder = ["C", "C+", "B", "B+", "A", "A+", "S"];
      const getRatingIndex = (r: string) => ratingOrder.indexOf(r);
      return getRatingIndex(b.rating) - getRatingIndex(a.rating);
    });
    const picked = sortedCows.slice(0, 10);

    set({
      herd: {
        "starter-1": picked[0],
        "starter-2": picked[1],
        "starter-3": picked[2],
        "starter-4": picked[3],
        "starter-5": picked[4],
        "benched-1": picked[5],
        "benched-2": picked[6],
        "benched-3": picked[7],
        "benched-4": picked[8],
        "benched-5": picked[9],
      },
    });
  },
  resetHerd: () => {
    set({
      herd: {
        "starter-1": undefined,
        "starter-2": undefined,
        "starter-3": undefined,
        "starter-4": undefined,
        "starter-5": undefined,
        "benched-1": undefined,
        "benched-2": undefined,
        "benched-3": undefined,
        "benched-4": undefined,
        "benched-5": undefined,
      },
    });
  },
  addCowToHerd: (cow: CowData, slot: keyof Herd) => {
    set((state) => ({
      herd: {
        ...state.herd,
        [slot]: cow,
      },
    }));
  },
  removeCowFromHerd: (slot: keyof Herd) => {
    set((state) => ({
      herd: {
        ...state.herd,
        [slot]: undefined,
      },
    }));
  },
  enterHerd: (herd: string) => {
    set({ herdEntered: true, herdName: herd });
  },
}));

export const UserProvider: React.FC<{ isLoggedIn: boolean }> = (props) => {
  const [isLoggedIn] = useState(props.isLoggedIn);

  useEffect(() => {
    useUserStore.setState({
      isLoggedIn,
    });
  }, [isLoggedIn]);

  return null;
};

export default useUserStore;
