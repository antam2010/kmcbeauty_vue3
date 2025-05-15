import { useQuery } from "@tanstack/react-query";
import { getPhonebookList } from "@/shared/api/phonebook";
import type { PhonebookListResponse } from "@/shared/types/phonebook";

export const usePhonebookList = (
  search: string,
  page: number,
  size: number
) => {
  return useQuery<PhonebookListResponse>({
    queryKey: ["phonebookList", search, page, size],
    queryFn: () => getPhonebookList({ search, page, size }),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
