import { useQuery } from "@tanstack/react-query";
import { getTreatmentMenuList } from "@/shared/api/treatment_menu";

export const useTreatmentMenuList = (
  search: string,
  page: number,
  size: number
) => {
  return useQuery({
    queryKey: ["treatmentMenuList", { search, page, size }],
    queryFn: () =>
      getTreatmentMenuList({
        search,
        page,
        size,
      }),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });
};
