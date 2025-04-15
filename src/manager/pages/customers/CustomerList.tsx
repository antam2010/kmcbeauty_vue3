import { useEffect, useState } from 'react';
import { getPhonebookList, Phonebook } from '@/api/manager/phonebook';

const CustomerList = () => {
  const [customers, setCustomers] = useState<Phonebook[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    (async () => {
      const data = await getPhonebookList({ page, size: 50 });
      setCustomers(data.items);
      setTotalPages(data.pages);
    })();
  }, [page]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">고객 리스트</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">이름</th>
            <th className="p-2 border">연락처</th>
            <th className="p-2 border">그룹</th>
            <th className="p-2 border">메모</th>
            <th className="p-2 border">등록일</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.phone_number}</td>
              <td className="p-2 border">{c.group_name || '-'}</td>
              <td className="p-2 border">{c.memo || '-'}</td>
              <td className="p-2 border">{new Date(c.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center space-x-2">
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

export default CustomerList;
