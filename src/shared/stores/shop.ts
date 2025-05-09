import { create } from "zustand";
import type { Shop } from "@/shared/types/shop";

interface ShopState {
  shops: Shop[];
  setShops: (shops: Shop[]) => void;
}

export const useShopStore = create<ShopState>((set) => ({
  shops: [],
  setShops: (shops) => set({ shops }),
}));
