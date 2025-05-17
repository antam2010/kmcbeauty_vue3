import { axiosInstance } from "@/shared/api/axios";
import type {
  Phonebook,
  PhonebookInput,
  PhonebookListResponse,
  PhonebookGroupResponse,
} from "@/shared/types/phonebook";

export async function getPhonebookList(params: {
  page?: number;
  size?: number;
  search?: string | null;
}): Promise<PhonebookListResponse> {
  const { data } = await axiosInstance.get<PhonebookListResponse>(
    "/phonebooks",
    {
      params,
    },
  );
  return data;
}

export async function createPhonebook(
  params: PhonebookInput,
): Promise<Phonebook> {
  const { data } = await axiosInstance.post<Phonebook>("/phonebooks", params);
  return data;
}

export async function updatePhonebook(
  id: number,
  params: PhonebookInput,
): Promise<Phonebook> {
  const { data } = await axiosInstance.put<Phonebook>(
    `/phonebooks/${id}`,
    params,
  );
  return data;
}

export async function getPhonebookGroupList(
  with_items: boolean = false,
): Promise<PhonebookGroupResponse[]> {
  const { data } = await axiosInstance.get<PhonebookGroupResponse[]>(
    "/phonebooks/groups",
    {
      params: {
        with_items,
      },
    },
  );
  return data;
}

export async function deletePhonebook(id: number): Promise<void> {
  await axiosInstance.delete(`/phonebooks/${id}`);
}
