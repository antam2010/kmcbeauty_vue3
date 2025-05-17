import { Loader2 } from "lucide-react";

type Props = {
  message?: string;
  fullScreen?: boolean;
};

export default function LoadingSpinner({
  message = "잠시만 기다려주세요...",
  fullScreen = true,
}: Props) {
  const containerClass = fullScreen
    ? "flex items-center justify-center w-full h-screen bg-white"
    : "flex items-center justify-center";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-gray-700 text-sm">{message}</p>
      </div>
    </div>
  );
}
