
import ReservationForm from "./ReservationForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: {
    title: string;
    start: string;
    end: string;
    memo?: string;
    customerName?: string;
  }
  onSubmit: (form: Record<string, unknown>) => void;
};

export default function ReservationModal({ isOpen, onClose, defaultValues, onSubmit }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400">✕</button>
        <ReservationForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
