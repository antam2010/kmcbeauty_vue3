import { useQuery } from "@tanstack/react-query";
import { getPhonebookList } from "@/shared/api/phonebook";
import type { PhonebookListResponse } from "@/shared/types/phonebook";

import { useShopStore } from "@/shared/stores/useShopStore";

export const usePhonebookList = (
  search: string,
  page: number,
  size: number
) => {
  const shopId = useShopStore((state) => state.selectedShop?.id);

  return useQuery<PhonebookListResponse>({
    queryKey: ["phonebookList", { shopId, search, page, size }],
    queryFn: () => getPhonebookList({ search, page, size }),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
    enabled: !!shopId, // shopId 없으면 호출 안함
  });
};
