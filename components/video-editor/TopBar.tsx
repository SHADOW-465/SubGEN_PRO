import { Star, Share2, MoreHorizontal, ArrowLeft } from "lucide-react";

export default function TopBar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 p-8 flex justify-between items-start pointer-events-none">
      <div className="flex items-center space-x-5 pointer-events-auto">
        <button className="w-12 h-12 bg-[#4A241B]/80 border border-[#E5352B]/30 rounded-full flex items-center justify-center text-white/80 hover:bg-[#E5352B]/20 transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center space-x-6 shadow-2xl">
          <span className="text-white text-xs font-black tracking-widest italic uppercase">
            SubGEN <span className="text-[#E5352B] not-italic">PRO</span>
          </span>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">SYSTEM LIVE</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto flex items-center space-x-3">
         <div className="flex bg-black/40 backdrop-blur-3xl border border-white/10 p-1.5 rounded-full shadow-2xl">
            <button className="px-5 py-2 text-[10px] font-black text-white/50 hover:text-white transition-all uppercase tracking-widest">SRT</button>
            <button className="px-6 py-2 bg-white/90 text-[#3A1C14] rounded-full text-[10px] font-black uppercase shadow-xl tracking-widest">VTT PRO</button>
         </div>
         <button className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white/80 border border-white/10 hover:bg-white/20 transition-all">
            <Share2 size={18} />
         </button>
         <button className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white/80 border border-white/10 hover:bg-white/20 transition-all">
            <MoreHorizontal size={18} />
         </button>
      </div>
    </header>
  );
}
