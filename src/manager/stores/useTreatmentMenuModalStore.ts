import { create } from "zustand";
import type { TreatmentMenu } from "@/shared/types/treatment_menu";

type ModalMode = "create" | "edit";

interface TreatmentMenuModalState {
  isOpen: boolean;
  mode: ModalMode;
  data: TreatmentMenu | null;
  open: (mode: ModalMode, data?: TreatmentMenu) => void;
  close: () => void;
}

export const useTreatmentMenuModalStore = create<TreatmentMenuModalState>(
  (set) => ({
    isOpen: false,
    mode: "create",
    data: null,
    open: (mode, data) => set({ isOpen: true, mode, data }),
    close: () => set({ isOpen: false, data: null }),
  }),
);
