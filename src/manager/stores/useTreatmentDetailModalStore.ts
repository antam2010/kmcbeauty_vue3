import { create } from "zustand";
import type { TreatmentMenuDetail } from "@/shared/types/treatment_menu";

type ModalMode = "create" | "edit";
type ModalData = Partial<TreatmentMenuDetail>;

interface TreatmentDetailModalState {
  isOpen: boolean;
  mode: ModalMode;
  data: ModalData | null;
  open: (mode: ModalMode, data?: ModalData) => void;
  close: () => void;
}

export const useTreatmentDetailModalStore = create<TreatmentDetailModalState>(
  (set) => ({
    isOpen: false,
    mode: "create",
    data: null,
    open: (mode, data) => set({ isOpen: true, mode, data }),
    close: () => set({ isOpen: false, data: null }),
  })
);
