import { axiosInstance } from '@/shared/api/axios';

export interface Phonebook {
  id: number;
  user_id: number;
  group_name: string | null;
  name: string;
  phone_number: string;
  memo: string | null;
  created_at: string;
  updated_at: string;
}

export interface PhonebookListResponse {
  items: Phonebook[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export async function getPhonebookList(params: {
  page?: number;
  size?: number;
  search?: string | null;
}): Promise<PhonebookListResponse> {
  const { data } = await axiosInstance.get('/phonebooks', { params });
  return data;
}
