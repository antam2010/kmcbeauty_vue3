"use client";

import { Dialog } from "@headlessui/react";
import { useTreatmentMenuModalStore } from "@/manager/stores/useTreatmentMenuModalStore";
import { useState, useEffect } from "react";

export default function TreatmentMenuFormModal({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const { isOpen, mode, data, close } = useTreatmentMenuModalStore();

  const [name, setName] = useState("");

  useEffect(() => {
    if (mode === "edit" && data) {
      setName(data.name);
    } else {
      setName("");
    }
  }, [mode, data]);

  const handleSubmit = async () => {
    // TODO: API 호출
    console.log(mode, name);

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
      <div className="z-10 bg-white p-6 rounded shadow w-[300px]">
        <h3 className="font-bold text-lg mb-2">
          {mode === "create" ? "메뉴 추가" : "메뉴 수정"}
        </h3>
        <input
          className="w-full border rounded px-2 py-1 text-sm mb-4"
          placeholder="메뉴 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
