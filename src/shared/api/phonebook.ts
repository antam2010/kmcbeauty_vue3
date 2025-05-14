import { axiosInstance } from '@/shared/api/axios';
import type { Phonebook, PhonebookListResponse } from "@/shared/types/phonebook";

export async function getPhonebookList(params: {
  page?: number;
  size?: number;
  search?: string | null;
}): Promise<PhonebookListResponse> {
  const { data } = await axiosInstance.get('/phonebooks', { params });
  return data;
}

export async function createPhonebook(params: {
  name: string;
  phone_number: string;
  group_name?: string;
  memo?: string;
}): Promise<Phonebook> {
  const { data } = await axiosInstance.post("/phonebooks", params);
  return data;
}

export async function updatePhonebook(
  id: number,
  params: {
    name?: string;
    phone_number?: string;
    group_name?: string;
    memo?: string;
  }
): Promise<Phonebook> {
  const { data } = await axiosInstance.put(`/phonebooks/${id}`, params);
  return data;
}