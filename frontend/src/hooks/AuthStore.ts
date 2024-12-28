import { create } from "zustand";
import { user as userType } from "@/lib/types";

type useStoreType = {
  user: userType | null;
  setUser: (data: userType | null) => void;
  clearUser: () => void;
};
export const useStore = create<useStoreType>((set) => ({
  user: { name: "Gowtham", avatar: "https://google.com" },
  // user: null,
  setUser: (data) => set(() => ({ user: data })),
  clearUser: () => {},
}));
