
import type { Phonebook } from '@/shared/types/phonebook';
import type { TreatmentMenuDetail } from '@/shared/types/treatment_menu';

export type TreatmentStatus = "RESERVED" | "CANCELLED" | "FINISHED"; // 필요시 확장

export interface Treatment {
  id: number;
  phonebook_id: number;
  reserved_at: string;
  memo: string;
  status: TreatmentStatus;
  finished_at: string;
  treatment_items: TreatmentMenuDetail[];
  phonebook: Phonebook;
}
