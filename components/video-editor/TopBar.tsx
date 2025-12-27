import { Star, Share2, MoreHorizontal, ArrowLeft } from "lucide-react";
import { LiquidButton } from "@/components/ui/LiquidButton";

export default function TopBar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 p-8 flex justify-between items-start pointer-events-none">
      <div className="flex items-center space-x-5 pointer-events-auto">
        <LiquidButton size="lg" className="!bg-[#4A241B]/80 !border-[#E5352B]/30 !text-white/80">
           <ArrowLeft size={24} />
        </LiquidButton>

        <div className="pointer-events-auto px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center space-x-6 transform hover:bg-white/10 transition-all cursor-default">
          <span className="text-white text-xs font-black tracking-widest italic uppercase">
            SubGEN <span className="text-[#E5352B] not-italic">PRO</span>
          </span>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">SYSTEM LIVE</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto flex items-center space-x-3">
         <div className="flex bg-black/40 backdrop-blur-3xl border border-white/10 p-1.5 rounded-full shadow-2xl mr-3">
            <button className="px-5 py-2 text-[10px] font-black text-white/50 hover:text-white transition-all uppercase tracking-widest">SRT</button>
            <button className="px-6 py-2 bg-white/90 text-[#3A1C14] rounded-full text-[10px] font-black uppercase shadow-xl tracking-widest">VTT PRO</button>
         </div>
         <LiquidButton icon={Share2} />
         <LiquidButton icon={MoreHorizontal} />
      </div>
    </header>
  );
}
