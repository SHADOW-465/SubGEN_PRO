import {
  ChevronsLeft,
  Play,
  ChevronsRight,
  LayoutGrid,
  Settings,
  Star
} from "lucide-react";

export default function BottomBar() {
  return (
    <div className="absolute bottom-6 left-6 right-6 h-16 bg-[#141418] rounded-[24px] flex items-center justify-between px-6 shadow-2xl z-30 border border-white/5">
      {/* Left Transport Cluster */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-[#1A1A1F] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
          <ChevronsLeft className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 rounded-full bg-[#1A1A1F] flex items-center justify-center text-white hover:text-[#D17F3A] hover:bg-white/5 transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] border border-white/5">
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </button>
        <button className="w-10 h-10 rounded-full bg-[#1A1A1F] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
          <ChevronsRight className="w-5 h-5" />
        </button>
      </div>

      {/* Center Configuration Pills */}
      <div className="flex items-center gap-3">
        <div className="h-9 px-4 rounded-full bg-[#1A1A1F] flex items-center text-xs font-medium text-white/80 border border-white/5 hover:border-white/20 cursor-pointer transition-colors">
          9:16
        </div>

        {/* Highlighted Resolution Pill */}
        <div className="h-9 px-4 rounded-full bg-white flex items-center gap-1.5 text-xs font-bold text-[#141418] shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer hover:scale-105 transition-transform">
          <Star className="w-3 h-3 fill-current" />
          <span>1440p</span>
        </div>

        <div className="h-9 px-4 rounded-full bg-[#1A1A1F] flex items-center text-xs font-medium text-white/80 border border-white/5 hover:border-white/20 cursor-pointer transition-colors">
          18s
        </div>
        <div className="h-9 px-4 rounded-full bg-[#1A1A1F] flex items-center gap-2 text-xs font-medium text-white/80 border border-white/5 hover:border-white/20 cursor-pointer transition-colors">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          None
        </div>
      </div>

      {/* Right Tools/Settings */}
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full bg-[#1A1A1F] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 rounded-full bg-[#1A1A1F] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
