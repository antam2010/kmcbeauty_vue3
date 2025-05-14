'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'
import { getPhonebookList } from '@/shared/api/phonebook'
import type { Phonebook } from '@/shared/types/phonebook'
import { Download, Eye, Pencil, Trash2 } from 'lucide-react'
import { saveAs } from 'file-saver'
import { useCallback } from 'react'
import useDebounce from '@/shared/hooks/useDebounce'

export default function CustomerList() {
  const [data, setData] = useState<Phonebook[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 150)
  const cache = useRef(new Map<string, { items: Phonebook[]; pages: number }>())

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const fetchData = useCallback(async () => {
    const keyword = debouncedSearch.trim()
    const cacheKey = `${keyword}_${page}`

    if (cache.current.has(cacheKey)) {
      const cached = cache.current.get(cacheKey)!
      setData(cached.items)
      setTotalPages(cached.pages)
      return
    }

    const res = await getPhonebookList({ page, size: 20, search: keyword || undefined })
    cache.current.set(cacheKey, { items: res.items, pages: res.pages })
    setData(res.items)
    setTotalPages(res.pages)
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const exportCSV = () => {
    const headers = ['이름', '연락처', '그룹', '메모', '등록일'];
    const rows = data.map(row => [
      row.name,
      row.phone_number,
      row.group_name ?? '',
      row.memo ?? '',
      new Date(row.created_at).toLocaleDateString(),
    ]);

    const bom = '\uFEFF';
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8' });

    const today = new Date().toISOString().slice(0, 10);
    saveAs(blob, `고객리스트_${today}.csv`);
  };

  const columns = useMemo<ColumnDef<Phonebook>[]>(
    () => [
      {
        accessorKey: 'name',
        header: '이름',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'phone_number',
        header: '연락처',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'group_name',
        header: '그룹',
        cell: info => info.getValue() || '-',
      },
      {
        accessorKey: 'memo',
        header: '메모',
        cell: info => info.getValue() || '-',
      },
      {
        accessorKey: 'created_at',
        header: '등록일',
        cell: info => new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: '액션',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button className="text-blue-500 hover:underline" onClick={() => alert(`보기: ${row.original.id}`)}>
              <Eye size={16} />
            </button>
            <button className="text-green-500 hover:underline" onClick={() => alert(`수정: ${row.original.id}`)}>
              <Pencil size={16} />
            </button>
            <button className="text-red-500 hover:underline" onClick={() => alert(`삭제: ${row.original.id}`)}>
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">고객 리스트</h2>
        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1 px-3 py-1 border rounded bg-white text-sm hover:bg-gray-100"
          >
            <Download size={14} /> CSV 다운로드
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="border px-2 py-1 rounded text-sm w-72"
          placeholder="이름, 연락처, 메모 등으로 검색"
        />
        <button
          className="border px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
          onClick={() => alert('등록')}
        >
          + 신규 등록
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="p-2 border cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
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
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded text-sm ${p === page ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
} 