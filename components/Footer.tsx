import { getCurrentYear } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#243B68] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-white/15 rounded-xl p-2">
              <BookOpen className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-base">Akhwat Student Hub</span>
          </div>
          <p className="text-white/70 text-sm max-w-sm">
            Portal informasi dan administrasi mahasiswi
          </p>
          <p className="text-white/50 text-xs">Dikelola oleh Tim Kemahasiswaan</p>
          <p className="text-white/40 text-xs border-t border-white/10 pt-4 w-full">
            &copy; {getCurrentYear()} Akhwat Student Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
