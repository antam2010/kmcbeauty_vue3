"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Pencil, PlusCircle } from "lucide-react";

// 시술 메뉴
import { useTreatmentMenuList } from "@/shared/hooks/useTreatmentMenuList";
import TreatmentMenuFormModal from "@/manager/components/treatment_menu/TreatmentMenuFormModal";
import TreatmentDetailFormModal from "@/manager/components/treatment_menu/TreatmentDetailFormModal";
import { useTreatmentMenuModalStore } from "@/manager/stores/useTreatmentMenuModalStore";
import type { TreatmentMenu } from "@/shared/types/treatment_menu";

// 시술 메뉴 디테일
import { useTreatmentDetailModalStore } from "@/manager/stores/useTreatmentDetailModalStore";

// 공통 컴포넌트
import useDebounce from "@/shared/hooks/useDebounce";

export default function TreatmentMenuList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const pageSize = 3;

  const { data, refetch } = useTreatmentMenuList(
    debouncedSearch,
    page,
    pageSize
  );
  const menus = data?.items || [];
  const totalPages = data?.pages || 1;

  const openMenuModal = useTreatmentMenuModalStore((s) => s.open);
  const openDetailModal = useTreatmentDetailModalStore((s) => s.open);

  const columns = useMemo<ColumnDef<TreatmentMenu>[]>(
    () => [
      { accessorKey: "name", header: "메뉴 이름" },
      {
        accessorKey: "created_at",
        header: "등록일",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "액션",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => openMenuModal("edit", row.original)}
              className="text-blue-500"
            >
              <Pencil size={16} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: menus,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">시술 메뉴</h2>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          onClick={() => openMenuModal("create")}
        >
          + 메뉴 추가
        </button>
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-2 py-1 rounded text-sm w-72"
          placeholder="메뉴 이름으로 검색"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th key={header.id} className="p-2 border">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border align-top">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {menus.map((menu) => (
        <div key={menu.id} className="mt-4 bg-gray-50 rounded p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-sm">[ {menu.name} ] 시술 항목</h4>
            <button
              onClick={() => openDetailModal("create", { menu_id: menu.id })}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              <PlusCircle size={14} /> 항목 추가
            </button>
          </div>
          {menu.details && menu.details.length > 0 ? (
            <table className="w-full border text-sm">
              <thead className="bg-white text-left">
                <tr>
                  <th className="p-2 border">이름</th>
                  <th className="p-2 border">소요 시간</th>
                  <th className="p-2 border">가격</th>
                  <th className="p-2 border">등록일</th>
                  <th className="p-2 border">액션</th>
                </tr>
              </thead>
              <tbody>
                {menu.details.map((d) => (
                  <tr key={d.id}>
                    <td className="p-2 border">{d.name}</td>
                    <td className="p-2 border">{d.duration_min}분</td>
                    <td className="p-2 border">
                      {d.base_price.toLocaleString()}원
                    </td>
                    <td className="p-2 border">
                      {new Date(d.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-2 border">
                      <button
                        className="text-blue-500"
                        onClick={() => openDetailModal("edit", d)}
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-500">등록된 항목이 없습니다.</p>
          )}
        </div>
      ))}

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded text-sm ${
              p === page ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <TreatmentMenuFormModal onComplete={() => refetch()} />
      <TreatmentDetailFormModal onComplete={() => refetch()} />
    </div>
  );
}
