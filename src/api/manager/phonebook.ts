import { axiosInstance } from '@/shared/api/axios';
import type { PhonebookListResponse } from "@/shared/types/phonebook"; // access_token, token_type 인터페이스

export async function getPhonebookList(params: {
  page?: number;
  size?: number;
  search?: string | null;
}): Promise<PhonebookListResponse> {
  const { data } = await axiosInstance.get('/phonebooks', { params });
  return data;
}
