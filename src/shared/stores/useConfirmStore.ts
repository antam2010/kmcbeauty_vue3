import { create } from "zustand";

interface ConfirmState {
  open: boolean;
  title: string;
  description?: string;
  resolve?: (result: boolean) => void;
  showConfirm: (title: string, description?: string) => Promise<boolean>;
  close: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  open: false,
  title: "",
  description: "",
  resolve: undefined,

  showConfirm: (title, description) => {
    return new Promise<boolean>((resolve) => {
      set({ open: true, title, description, resolve });
    });
  },

  close: () => {
    set({ open: false, resolve: undefined });
  },
}));
