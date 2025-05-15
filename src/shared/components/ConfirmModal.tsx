import { Dialog } from "@headlessui/react";
import { useConfirmStore } from "@/shared/stores/useConfirmStore";

export default function ConfirmModal() {
  const { open, title, description, resolve, close } = useConfirmStore();

  const handleConfirm = () => {
    resolve?.(true);
    close();
  };

  const handleCancel = () => {
    resolve?.(false);
    close();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      />

      <div className="z-10 bg-white p-6 rounded shadow w-[300px]">
        <h3 className="font-bold text-lg">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-200"
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            className="px-3 py-1 rounded bg-red-500 text-white"
            onClick={handleConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </Dialog>
  );
}
