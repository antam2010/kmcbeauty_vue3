import { useQuery } from "@tanstack/react-query";
import { getTreatmentMenuList } from "@/shared/api/treatment_menu";
import { useShopStore } from "@/shared/stores/useShopStore";

import type { TreatmentMenuListResponse } from "@/shared/types/treatment_menu";

export const useTreatmentMenuList = (
  search: string,
  page: number,
  size: number
) => {
  const shopId = useShopStore((state) => state.selectedShop?.id);

  return useQuery<TreatmentMenuListResponse>({
    queryKey: ["treatmentMenuList", { shopId, search, page, size }],
    queryFn: () =>
      getTreatmentMenuList({
        search,
        page,
        size,
      }),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
    enabled: !!shopId, // shopId 없으면 호출 안함
  });
};
