import { useEffect, useState } from 'react';
import type { Shop } from '@/shared/types/shop';
import { getShopList, setSelectShop } from '@/api/manager/shop';
import { useNavigate } from 'react-router-dom';

const ShopSelectList = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await getShopList();
        setShops(data.items);
      } catch (e) {
        console.error('상점 리스트 불러오기 실패', e);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  const handleSelect = async (shopId: number) => {
    try {
      await setSelectShop(shopId);
      navigate('/manager'); // 선택 후 이동
    } catch (e) {
      console.error('상점 선택 실패', e);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="space-y-4">
      {shops.map((shop) => (
        <button
          key={shop.id}
          onClick={() => handleSelect(shop.id)}
          className="block w-full text-left border p-4 rounded hover:bg-gray-50"
        >
          <div className="font-semibold">{shop.name}</div>
          <div className="text-sm text-gray-500">{shop.address} {shop.address_detail}</div>
          <div className="text-sm text-gray-400">{new Date(shop.created_at).toLocaleDateString()}</div>
        </button>
      ))}
    </div>
  );
};

export default ShopSelectList;
