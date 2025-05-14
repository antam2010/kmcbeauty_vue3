import { create } from "zustand";
import type { Phonebook } from "@/shared/types/phonebook";

interface CustomerModalState {
  isOpen: boolean;
  mode: "create" | "edit";
  data?: Phonebook | null;
  open: (mode: "create" | "edit", data?: Phonebook | null) => void;
  close: () => void;
}

export const useCustomerModalStore = create<CustomerModalState>((set) => ({
  isOpen: false,
  mode: "create",
  data: null,
  open: (mode, data = null) => set({ isOpen: true, mode, data }),
  close: () => set({ isOpen: false, data: null }),
}));
