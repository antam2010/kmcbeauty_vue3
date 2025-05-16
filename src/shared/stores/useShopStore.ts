import { create } from "zustand";
import type { Shop } from "@/shared/types/shop";

type ShopState = {
  selectedShop: Shop | null;
  setSelectedShop: (shop: Shop) => void;
};

export const useShopStore = create<ShopState>((set) => ({
  selectedShop: null,
  setSelectedShop: (shop) => set({ selectedShop: shop }),
}));
