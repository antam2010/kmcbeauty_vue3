import { useState } from "react";

type Props = {
  defaultValues?: {
    title: string;
    start: string;
    end: string;
    memo?: string;
    customerName?: string;
  };
  onSubmit: (form: {
    title: string;
    start: string;
    end: string;
    memo?: string;
    customerName?: string;
  }) => void;
};

export default function ReservationForm({ defaultValues, onSubmit }: Props) {
  const [form, setForm] = useState(
    defaultValues ?? {
      title: "",
      start: "",
      end: "",
      memo: "",
      customerName: "",
    },
  );

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="시술명"
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="datetime-local"
        value={form.start}
        onChange={(e) => setForm({ ...form, start: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="datetime-local"
        value={form.end}
        onChange={(e) => setForm({ ...form, end: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <input
        value={form.customerName}
        onChange={(e) => setForm({ ...form, customerName: e.target.value })}
        placeholder="고객명"
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        value={form.memo}
        onChange={(e) => setForm({ ...form, memo: e.target.value })}
        placeholder="메모"
        className="w-full border rounded px-3 py-2"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        저장
      </button>
    </form>
  );
}
