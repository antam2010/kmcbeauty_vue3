export interface Shop {
  id: number;
  name: string;
  address: string;
  address_detail: string;
  phone: string | null;
  business_number: string;
  created_at: string;
  updated_at: string;
}

export interface ShopListResponse {
  items: Shop[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
