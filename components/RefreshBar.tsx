"use client";

import { RefreshCw, Clock } from "lucide-react";

interface RefreshBarProps {
  lastUpdated: Date | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export default function RefreshBar({ lastUpdated, isLoading, onRefresh }: RefreshBarProps) {
  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : null;

  return (
    <div className="flex items-center gap-3 justify-end">
      {timeStr && (
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          Diperbarui {timeStr}
        </span>
      )}
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#243B68] bg-[#243B68]/8 rounded-lg hover:bg-[#243B68]/15 focus:outline-none focus:ring-2 focus:ring-[#243B68]/40 disabled:opacity-50 transition"
        aria-label="Refresh data"
      >
        <RefreshCw
          className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
          aria-hidden="true"
        />
        {isLoading ? "Memuat..." : "Refresh"}
      </button>
    </div>
  );
}
