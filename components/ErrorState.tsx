import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-red-50 rounded-full p-5 mb-4" aria-hidden="true">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-gray-700 font-semibold text-base mb-1">
        Gagal memuat data
      </h3>
      <p className="text-gray-500 text-sm max-w-sm mb-5">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#243B68] text-white text-sm font-medium rounded-xl hover:bg-[#1a2d52] focus:outline-none focus:ring-2 focus:ring-[#243B68]/40 transition"
          aria-label="Coba lagi memuat data"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          Coba Lagi
        </button>
      )}
    </div>
  );
}
