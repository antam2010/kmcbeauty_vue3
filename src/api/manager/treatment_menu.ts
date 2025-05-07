import { axiosInstance } from '@/shared/api/axios';

export interface TreatmentMenu {
  id: number;
  shop_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  details?: TreatmentMenuDetail[];
}

export interface TreatmentMenuDetail {
  id: number;
  menu_id: number;
  name: string;
  duration_min: number;
  base_price: number;
  created_at: string;
  updated_at: string;
}

export interface TreatmentMenuListResponse {
  items: TreatmentMenu[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export async function getTreatmentMenuList(params: {
  page?: number;
  size?: number;
  search?: string | null;
}): Promise<TreatmentMenuListResponse> {
  const { data } = await axiosInstance.get('/treatment-menus', { params });
  return data;
}
