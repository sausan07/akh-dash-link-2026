import { Suspense } from "react";
import TugasPage from "./TugasPage";

export default function TugasRoute() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-8 text-gray-500">Memuat...</div>}>
      <TugasPage />
    </Suspense>
  );
}
