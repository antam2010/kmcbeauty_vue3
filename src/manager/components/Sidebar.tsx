import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getSelectedShop } from '@/api/manager/shop';
import { logout } from '@/api/manager/auth';
import { useAuthStore } from '@/shared/stores/auth';
import type { AxiosError } from 'axios';
import type { Shop } from '@/shared/types/shop';

import {
  Home,
  CalendarDays,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const MenuItem = ({
    to,
    icon: Icon,
    label,
  }: {
    to: string;
    icon: React.ElementType;
    label: string;
  }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          active
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
        }`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </Link>
    );
  };

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm flex flex-col justify-between p-4">
      <div>
        {/* 상점 정보 */}
        <div className="bg-gray-50 p-3 rounded-lg mb-6 border border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 font-medium">선택된 상점</div>
            <div className="text-sm font-semibold text-gray-800">
              {selectedShop?.name || '없음'}
            </div>
          </div>
          <button
            onClick={() => navigate('/manager/shops/selected')}
            className="text-[11px] text-blue-500 hover:underline"
          >
            변경
          </button>
        </div>

        <nav className="space-y-4">
          <MenuItem to="/manager" icon={Home} label="홈" />
          <MenuItem to="/manager/reservations" icon={CalendarDays} label="예약 관리" />
          <MenuItem to="/manager/sales/new" icon={ShoppingCart} label="매출 등록" />
          <MenuItem to="/manager/sales/list" icon={ShoppingCart} label="매출 리스트" />
          <MenuItem to="/manager/sales/by-customer" icon={Users} label="고객별 매출" />
          <MenuItem to="/manager/customers" icon={Users} label="고객 리스트" />
          <MenuItem to="/manager/treatment-menus" icon={Settings} label="시술 메뉴" />
        </nav>
      </div>

      <div className="pt-6 border-t mt-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
        >
          <LogOut className="w-4 h-4" />
          로그아웃
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
