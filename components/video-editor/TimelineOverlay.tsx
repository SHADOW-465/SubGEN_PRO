import React from 'react';
import { useEditor } from "./EditorContext";

// The new design uses a "Liquid Tape" style (Pink/Red Bar)
// This component replaces the old TimelineOverlay with the new aesthetic

export default function TimelineOverlay() {
  const { duration, currentTime, subtitles } = useEditor();
  const zoomLevel = 25;

  return (
    <div className="absolute bottom-32 left-0 right-0 z-30 h-16 flex flex-col justify-end pointer-events-none">
      <div className="mx-20 flex items-center bg-gradient-to-r from-[#E5352B]/40 to-[#E5352B]/10 backdrop-blur-3xl rounded-full p-2.5 overflow-hidden border border-white/10 shadow-2xl pointer-events-auto relative">
         <div className="flex-1 h-10 relative overflow-x-auto no-scrollbar">
            <div className="h-full relative" style={{ width: `${Math.max(duration, 60) * zoomLevel * 2}px` }}> {/* Ensure min width */}
               {subtitles.map((sub) => {
                  const isActive = currentTime >= sub.start && currentTime <= sub.end;
                  return (
                    <div
                      key={sub.id}
                      className={`absolute h-7 top-1.5 rounded-full border flex items-center justify-center px-4 cursor-grab transition-all
                        ${isActive
                            ? 'bg-white text-[#3A1C14] border-white shadow-lg z-10 scale-105'
                            : 'bg-black/40 border-white/10 text-white/30'
                        }`}
                      style={{ left: `${sub.start * zoomLevel}px`, width: `${(sub.end - sub.start) * zoomLevel}px` }}
                    >
                      <span className="text-[9px] font-black truncate uppercase tracking-tighter">{sub.text}</span>
                    </div>
                  );
               })}

               {/* Playhead */}
               <div className="absolute top-0 bottom-0 w-[2.5px] bg-white z-40 shadow-white shadow-lg" style={{ left: `${currentTime * zoomLevel}px` }}>
                  <div className="absolute -top-1 -left-[5px] w-3 h-3 bg-white rounded-full" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
