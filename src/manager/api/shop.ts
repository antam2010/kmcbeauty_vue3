import { axiosInstance } from '@/shared/api/axios';
import type { Shop, ShopListResponse } from "@/manager/types/shop";

export async function getShopList(): Promise<ShopListResponse> {
  const params = { page: 1, size: 100 };
  const { data } = await axiosInstance.get<ShopListResponse>("/shops", {
    params,
  });
  return data;
}


export async function getSelectedShop(): Promise<Shop> {
  const { data } = await axiosInstance.get<Shop>("/shops/selected");
  return data;

}

export async function setSelectShop(shopId: number): Promise<void> {
  await axiosInstance.post("/shops/selected", { shop_id: shopId });
}