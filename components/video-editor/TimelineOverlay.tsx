import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function TimelineOverlay() {
  const duration = 60;
  const currentTime = 40;

  return (
    <div className="absolute bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-[#3A1C14]/90 to-transparent flex flex-col justify-end z-20 pointer-events-none">
      <div className="pointer-events-auto w-full h-full relative">
        {/* Ruler */}
        <div className="absolute top-8 left-0 right-0 h-8 border-b border-white/20 flex items-end px-10">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center relative">
              <div className="h-1.5 w-px bg-white/40" />
              <span className="text-[10px] text-white/60 mt-1 absolute top-2">{i * 5}s</span>
            </div>
          ))}
        </div>

        {/* Range Handle (at ~10s) */}
        <div className="absolute top-4 left-[16.6%] -translate-x-1/2 flex flex-col items-center group cursor-grab">
           <div className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Start</div>
           <div className="w-12 h-6 bg-white rounded-md flex items-center justify-between px-1 shadow-[0_0_10px_rgba(255,255,255,0.4)]">
             <ChevronLeft className="w-3 h-3 text-black/70" />
             <ChevronRight className="w-3 h-3 text-black/70" />
           </div>
           <div className="w-px h-32 bg-white/50 dashed" />
        </div>

        {/* Playhead (at ~40s) */}
        <div className="absolute top-0 left-[66.6%] -translate-x-1/2 h-full flex flex-col items-center z-30">
          <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] mb-0.5" />
          <div className="w-px flex-1 bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
        </div>

        {/* Clip Strip */}
        <div className="absolute bottom-4 left-10 right-10 h-16 flex items-center gap-2">
           {/* Clips */}
           <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar mask-image-linear-gradient">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className={`h-12 w-20 rounded-lg flex-shrink-0 border ${i === 5 ? 'border-white/80 scale-110 z-10 shadow-lg' : 'border-white/10 opacity-70'} overflow-hidden relative transition-all duration-300`}
                >
                  <div className={`absolute inset-0 ${i % 2 === 0 ? 'bg-orange-900' : 'bg-blue-900'} opacity-60`} />
                  {/* Mock content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1/2 bg-white/10" />
                  </div>
                </div>
              ))}
           </div>

           {/* Active Clip Controls (Centered visually on active clip in a real app, here statically placed near center or as overlay) */}
           {/* Implementing as described: "The active clip is centered and highlighted using a dark, pill-shaped container..." */}
           {/* In this static mockup, I'll place the controls over the 5th clip (index 4) which is scaled up */}

           <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 flex items-center gap-2 bg-[#141418] backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10 shadow-lg z-40">
              <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"><ChevronLeft className="w-3 h-3" /></button>
              <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"><ChevronRight className="w-3 h-3" /></button>
           </div>

           {/* Add Button */}
           <button className="w-10 h-10 rounded-full bg-[#1A1A1F] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors ml-2 flex-shrink-0">
             <Plus className="w-5 h-5" />
           </button>
        </div>

        {/* Red-orange background band behind clips */}
        <div className="absolute bottom-7 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-[#E5352B]/20 to-transparent blur-xl -z-10" />
      </div>
    </div>
  );
}
