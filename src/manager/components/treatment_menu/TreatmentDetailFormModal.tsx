"use client";

import { Dialog } from "@headlessui/react";
import { useTreatmentDetailModalStore } from "@/manager/stores/useTreatmentDetailModalStore";
import { useState, useEffect } from "react";

export default function TreatmentDetailFormModal({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const { isOpen, mode, data, close } = useTreatmentDetailModalStore();

  const [name, setName] = useState("");
  const [durationMin, setDurationMin] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    if (mode === "edit" && data) {
      setName(data.name ?? "");
      setDurationMin(data.duration_min ?? 0);
      setBasePrice(data.base_price ?? 0);
    } else {
      setName("");
      setDurationMin(0);
      setBasePrice(0);
    }
  }, [mode, data]);

  const handleSubmit = async () => {
    // TODO: API 호출
    console.log(mode, { name, durationMin, basePrice, menu_id: data?.menu_id });

    onComplete?.();
    close();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="z-10 bg-white p-6 rounded shadow w-[360px]">
        <h3 className="font-bold text-lg mb-2">
          {mode === "create" ? "항목 추가" : "항목 수정"}
        </h3>
        <input
          className="w-full border rounded px-2 py-1 text-sm mb-2"
          placeholder="항목 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border rounded px-2 py-1 text-sm mb-2"
          type="number"
          placeholder="소요 시간 (분)"
          value={durationMin}
          onChange={(e) => setDurationMin(Number(e.target.value))}
        />
        <input
          className="w-full border rounded px-2 py-1 text-sm mb-4"
          type="number"
          placeholder="기본 가격 (원)"
          value={basePrice}
          onChange={(e) => setBasePrice(Number(e.target.value))}
        />
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded" onClick={close}>
            취소
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            저장
          </button>
        </div>
      </div>
    </Dialog>
  );
}
