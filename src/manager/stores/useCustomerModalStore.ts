import { create } from "zustand";
import type { Phonebook } from "@/shared/types/phonebook";

type ModalMode = "create" | "edit";

interface CustomerModalState {
  isOpen: boolean;
  mode: ModalMode;
  data: Phonebook | null;
  open: (mode: ModalMode, data?: Phonebook) => void;
  close: () => void;
}

export const useCustomerModalStore = create<CustomerModalState>((set) => ({
  isOpen: false,
  mode: "create",
  data: null,
  open: (mode, data) => set({ isOpen: true, mode, data }),
  close: () => set({ isOpen: false, data: null, mode: "create" }),
}));
