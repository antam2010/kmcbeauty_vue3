'use client';

import { useEffect, useState } from 'react';
import { getTreatmentMenuList } from '@/shared/api/treatment_menu';
import type { TreatmentMenu, TreatmentMenuDetail } from "@/shared/types/treatment_menu";

const TreatmentMenuList = () => {
  const [menus, setMenus] = useState<TreatmentMenu[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMenus = async () => {
      const data = await getTreatmentMenuList({ page, size: 10, search: search || undefined });
      setMenus(data.items);
      setTotalPages(data.pages);
    };

    fetchMenus();
  }, [page, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">시술 관리 메뉴</h2>

      <div className="mb-4 flex items-center space-x-2">
        <label htmlFor="search" className="text-sm font-medium">
          검색:
        </label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleSearchChange}
          className="border px-2 py-1 rounded text-sm"
          placeholder="메뉴 이름 등 검색"
        />
      </div>

      {menus.map((menu) => (
        <div key={menu.id} className="mb-8 border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">{menu.name}</h3>
          <p className="text-sm text-gray-500 mb-4">
            등록일: {new Date(menu.created_at).toLocaleDateString()} | 항목 수: {menu.details?.length ?? 0}
          </p>

          {menu.details && menu.details.length > 0 ? (
            <table className="w-full border text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2 border">항목 이름</th>
                  <th className="p-2 border">소요 시간(분)</th>
                  <th className="p-2 border">기본 가격(원)</th>
                  <th className="p-2 border">등록일</th>
                </tr>
              </thead>
              <tbody>
                {menu.details.map((detail:TreatmentMenuDetail) => (
                  <tr key={detail.id ?? `${menu.id}-new`} className="hover:bg-gray-50">
                    <td className="p-2 border">{detail.name || '-'}</td>
                    <td className="p-2 border">{detail.duration_min ?? '-'}</td>
                    <td className="p-2 border">{detail.base_price?.toLocaleString() ?? '-'}</td>
                    <td className="p-2 border">
                      {detail.created_at ? new Date(detail.created_at).toLocaleString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-400">등록된 시술 항목이 없습니다.</p>
          )}
        </div>
      ))}

      <div className="mt-8 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded ${p === page ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TreatmentMenuList;
