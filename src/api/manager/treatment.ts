import { axiosInstance } from '@/shared/api/axios';

import type { TreatmentMenuListResponse } from "@/shared/types/treatment_menu";

export async function getTreatmentMenuList(params: {
  page?: number;
  size?: number;
  search?: string | null;
}): Promise<TreatmentMenuListResponse> {
  const { data } = await axiosInstance.get('/treatment-menus', { params });
  return data;
}
