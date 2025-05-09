import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';

import { logout } from '@/api/manager/auth';
import { getSelectedShop } from '@/api/manager/shop';
import { useAuthStore } from '@/shared/stores/auth';

import type { Shop } from '@/shared/types/shop';

const Sidebar = () => {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  useEffect(() => {
    const fetchSelectedShop = async () => {
      try {
        const shop = await getSelectedShop();
        setSelectedShop(shop);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 404) {
          navigate('/manager/shops/selected');
        } else {
          console.error('선택된 상점 로딩 실패', err);
        }
      }
    };
    fetchSelectedShop();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('로그아웃 실패', err);
    } finally {
      clearToken();
      navigate('/manager/login');
    }
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-md fixed left-0 top-0 p-6 flex flex-col justify-between">
      <div>
        {/* 선택된 상점 */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <label className="block text-xs text-gray-500 mb-1">선택된 상점</label>
          <div className="text-sm font-semibold text-gray-900">
            {selectedShop?.name || '상점 정보 없음'}
          </div>
          <button
            onClick={() => navigate('/manager/shops/selected')}
            className="mt-2 text-xs text-blue-500 hover:underline"
          >
            상점 바꾸기
          </button>
        </div>

        {/* 타이틀 */}
        <h1 className="text-xl font-bold mb-4 text-gray-900">매니저</h1>

        {/* 메뉴 */}
        <nav className="space-y-6">
          <div>
            <div className="text-gray-400 text-xs font-semibold mb-1">예약</div>
            <Link to="/manager/reservations" className="block px-2 py-1 rounded hover:bg-gray-100 text-gray-800 text-sm">
              예약 관리
            </Link>
          </div>

          <div>
            <div className="text-gray-400 text-xs font-semibold mb-1">매출</div>
            <ul className="space-y-1 pl-2">
              <li><Link to="/manager/sales/new" className="block hover:text-blue-500 text-sm text-gray-700">- 매출 등록</Link></li>
              <li><Link to="/manager/sales/list" className="block hover:text-blue-500 text-sm text-gray-700">- 매출 리스트</Link></li>
              <li><Link to="/manager/sales/by-customer" className="block hover:text-blue-500 text-sm text-gray-700">- 고객별 매출</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-gray-400 text-xs font-semibold mb-1">고객</div>
            <ul className="space-y-1 pl-2">
              <li><Link to="/manager/customers" className="block hover:text-blue-500 text-sm text-gray-700">- 고객 리스트</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-gray-400 text-xs font-semibold mb-1">관리</div>
            <ul className="space-y-1 pl-2">
              <li><Link to="/manager/treatment-menus" className="block hover:text-blue-500 text-sm text-gray-700">- 시술 메뉴</Link></li>
            </ul>
          </div>
        </nav>
      </div>

      {/* 로그아웃 */}
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-600"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
