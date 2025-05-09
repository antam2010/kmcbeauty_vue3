import { axiosInstance } from '@/shared/api/axios';
import type { PhonebookListResponse } from "@/shared/types/phonebook";

export async function getPhonebookList(params: {
  page?: number;
  size?: number;
  search?: string | null;
}): Promise<PhonebookListResponse> {
  const { data } = await axiosInstance.get('/phonebooks', { params });
  return data;
}
