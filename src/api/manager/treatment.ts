import { axiosInstance } from "@/shared/api/axios";

import type { Treatment, TreatmentStatus } from "@/shared/types/treatment";
import type { TreatmentMenuDetail } from "@/shared/types/treatment_menu";

export async function createTreatment(payload: {
  id: number;
  phonebook_id: number;
  reserved_at: string;
  memo: string | null;
  status: TreatmentStatus;
  finished_at: string | null;
  treatment_items: TreatmentMenuDetail[];
}): Promise<Treatment> {
  const response = await axiosInstance.post<Treatment>("/treatments/", payload);
  return response.data;
}

export async function getTreatmentList(params: {
  start_date?: string | null;
  end_date?: string | null;
  status?: TreatmentStatus | null;
  search?: string | null;
  sort_by?: "reserved_at" | string;
  sort_order?: "asc" | "desc";
  page?: number;
  size?: number;
}): Promise<{
  items: Treatment[];
  total: number;
  page: number;
  size: number;
  pages: number;
}> {
  const response = await axiosInstance.get("/treatments/", { params });
  return response.data;
}
