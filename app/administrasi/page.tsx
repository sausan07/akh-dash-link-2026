import { Suspense } from "react";
import AdministrasiPage from "./AdministrasiPage";

export default function AdministrasiRoute() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-8 text-gray-500">Memuat...</div>}>
      <AdministrasiPage />
    </Suspense>
  );
}
