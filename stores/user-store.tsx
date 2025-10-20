"use client";

import { useEffect } from "react";
import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean | null;
}

const useUserStore = create<UserState>((set) => ({
  isLoggedIn: null,
}));

export const UserProvider: React.FC<UserState> = (props) => {
  useEffect(() => {
    useUserStore.setState(props);
  }, [props]);

  return null;
};

export default useUserStore;
