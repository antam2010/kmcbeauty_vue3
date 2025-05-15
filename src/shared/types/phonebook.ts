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

export interface PhonebookInput {
  name: string;
  phone_number: string;
  group_name?: string | null;
  memo?: string | null;
}

export interface PhonebookListResponse {
  items: Phonebook[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface PhonebookGroupResponse {
  group_name: string;
  count: number;
  itmes: Phonebook[] | [];
}
