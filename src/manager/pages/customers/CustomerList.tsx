"use client";

import { useState, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Download, Pencil, Trash2 } from "lucide-react";
import { saveAs } from "file-saver";

// 고객 전화번호
import CustomerFormModal from "@/manager/components/customers/CustomerFormModal";
import { useCustomerModalStore } from "@/manager/stores/useCustomerModalStore";
import { usePhonebookList } from "@/shared/hooks/usePhonebookList";
import { deletePhonebook } from "@/shared/api/phonebook";
import type { Phonebook } from "@/shared/types/phonebook";

// 공통 컴포넌트
import useDebounce from "@/shared/hooks/useDebounce";
import { useConfirmStore } from "@/shared/stores/useConfirmStore";
import { useNotificationStore } from "@/shared/stores/useNotificationStore";
import { parseErrorMessage } from "@/shared/utils/parseErrorMessage";

export default function CustomerList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 10;
  const debouncedSearch = useDebounce(search);

  const { data, refetch: refetchPhonebook } = usePhonebookList(
    debouncedSearch,
    page,
    pageSize
  );
  const phonebooks = data?.items || [];
  const totalPages = data?.pages || 1;

  const [sorting, setSorting] = useState<SortingState>([]);

  const openModal = useCustomerModalStore((s) => s.open);

  const exportCSV = () => {
    const headers = ["이름", "연락처", "그룹", "메모", "등록일"];
    const rows = phonebooks.map((row) => [
      row.name,
      row.phone_number,
      row.group_name ?? "",
      row.memo ?? "",
      new Date(row.created_at).toLocaleDateString(),
    ]);

    const bom = "\uFEFF";
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8" });

    const today = new Date().toISOString().slice(0, 10);
    saveAs(blob, `고객리스트_${today}.csv`);
  };

  const onDeleteClick = useCallback(
    async (id: number) => {
      const confirmed = await useConfirmStore
        .getState()
        .showConfirm(
          "정말 삭제하시겠습니까?",
          "삭제된 정보는 복구할 수 없습니다."
        );
      if (!confirmed) return;
      try {
        await deletePhonebook(id);
        useNotificationStore.getState().show("삭제되었습니다.", "success");
        refetchPhonebook();
      } catch (e) {
        useNotificationStore.getState().show(parseErrorMessage(e), "error");
      }
    },
    [refetchPhonebook]
  );

  const columns = useMemo<ColumnDef<Phonebook>[]>(
    () => [
      { accessorKey: "name", header: "이름" },
      { accessorKey: "phone_number", header: "연락처" },
      {
        accessorKey: "group_name",
        header: "그룹",
        cell: (info) => info.getValue() || "-",
      },
      {
        accessorKey: "memo",
        header: "메모",
        cell: (info) => info.getValue() || "-",
      },
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
            <button onClick={() => openModal("edit", row.original)}>
              <Pencil size={16} />
            </button>
            <button onClick={() => onDeleteClick(row.original.id)}>
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    [openModal, onDeleteClick]
  );

  const table = useReactTable({
    data: phonebooks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // 페이지네이션 계산
  const maxVisiblePages = 5;
  const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">고객 리스트</h2>
        <button
          onClick={exportCSV}
          className="flex items-center gap-1 px-3 py-1 border rounded bg-white text-sm hover:bg-gray-100"
        >
          <Download size={14} /> CSV 다운로드
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
          placeholder="이름, 연락처, 메모 등으로 검색"
        />
        <button
          className="border px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
          onClick={() => openModal("create")}
        >
          + 신규 등록
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 border cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded text-sm bg-white disabled:opacity-50"
        >
          이전
        </button>

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((p) => (
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

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded text-sm bg-white disabled:opacity-50"
        >
          다음
        </button>
      </div>

      <CustomerFormModal onComplete={refetchPhonebook} />
    </div>
  );
}
