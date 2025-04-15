import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/shared/stores/auth';

const Sidebar = () => {

  const clearToken = useAuthStore((state) => state.clearToken);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/manager/login');
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-md fixed left-0 top-0 p-6 space-y-6">
      <h1 className="text-xl font-bold mb-8">💼 매니저</h1>
      <nav className="space-y-4">
        <Link to="/manager/reservations" className="block text-gray-700 hover:text-blue-500">📅 예약</Link>

        <div>
          <div className="text-gray-500 font-semibold mb-1">💰 매출</div>
          <ul className="pl-4 space-y-1">
            <li><Link to="/manager/sales/new" className="block text-gray-700 hover:text-blue-500">- 매출 등록</Link></li>
            <li><Link to="/manager/sales/list" className="block text-gray-700 hover:text-blue-500">- 매출 리스트</Link></li>
            <li><Link to="/manager/sales/by-customer" className="block text-gray-700 hover:text-blue-500">- 고객별 매출</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-gray-500 font-semibold mb-1">👥 고객</div>
          <ul className="pl-4 space-y-1">
            <li><Link to="/manager/customers" className="block text-gray-700 hover:text-blue-500">- 고객 리스트</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-gray-500 font-semibold mb-1">🛠️ 관리</div>
          <ul className="pl-4 space-y-1">
            <li><Link to="/manager/menus" className="block text-gray-700 hover:text-blue-500">- 시술 메뉴</Link></li>
          </ul>
        </div>
         {/* 로그아웃 */}
        <button
          onClick={handleLogout}
          className="mt-6 text-sm text-red-500 hover:text-red-600"
        >
        로그아웃
      </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
