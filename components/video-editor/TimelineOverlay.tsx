import React, { useRef, useState } from 'react';
import { useEditor } from "./EditorContext";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { LiquidButton } from "@/components/ui/LiquidButton";

// The new design uses a "Liquid Tape" style (Pink/Red Bar)
// This component replaces the old TimelineOverlay with the new aesthetic

interface DraggingState {
  id: number;
  startOffset: number;
}

interface ResizingState {
  id: number;
  side: 'left' | 'right';
}

export default function TimelineOverlay() {
  const { duration, currentTime, subtitles, setSubtitles, zoomLevel, seekTo } = useEditor();
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  const [draggingSub, setDraggingSub] = useState<DraggingState | null>(null);
  const [resizingSub, setResizingSub] = useState<ResizingState | null>(null);

  const handleMouseDown = (e: React.MouseEvent, subId: number) => {
    e.stopPropagation();
    if (!timelineContainerRef.current) return;

    // Check if clicking near edges for resize
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const edgeThreshold = 10; // px

    if (x < edgeThreshold) {
      setResizingSub({ id: subId, side: 'left' });
    } else if (x > width - edgeThreshold) {
      setResizingSub({ id: subId, side: 'right' });
    } else {
      // Dragging logic
      // Calculate offset from start of clip
      const sub = subtitles.find(s => s.id === subId);
      if (sub) {
          // current mouse X relative to timeline container start
          const containerRect = timelineContainerRef.current.getBoundingClientRect();
          const mouseXInContainer = e.clientX - containerRect.left + timelineContainerRef.current.scrollLeft;
          const mouseTime = mouseXInContainer / zoomLevel;
          setDraggingSub({ id: subId, startOffset: mouseTime - sub.start });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!timelineContainerRef.current) return;

    // Playhead seek on click/drag if not dragging sub
    if (!draggingSub && !resizingSub && e.buttons === 1) {
       const rect = timelineContainerRef.current.getBoundingClientRect();
       const x = e.clientX - rect.left + timelineContainerRef.current.scrollLeft;
       const time = x / zoomLevel;
       // Only seek if we are clicking in the ruler area or empty space
       // Logic simplified for this view
       seekTo(time);
       return;
    }

    if (draggingSub) {
      const rect = timelineContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + timelineContainerRef.current.scrollLeft;
      const timeAtMouse = x / zoomLevel;

      setSubtitles((prev) => prev.map(s => {
        if (s.id === draggingSub.id) {
          const dur = s.end - s.start;
          const newStart = Math.max(0, timeAtMouse - draggingSub.startOffset);
          return { ...s, start: newStart, end: newStart + dur };
        }
        return s;
      }));
    } else if (resizingSub) {
      const rect = timelineContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + timelineContainerRef.current.scrollLeft;
      const timeAtMouse = x / zoomLevel;

      setSubtitles((prev) => prev.map(s => {
        if (s.id === resizingSub.id) {
          if (resizingSub.side === 'left') {
             const newStart = Math.min(timeAtMouse, s.end - 0.2); // Min 0.2s duration
             return { ...s, start: Math.max(0, newStart) };
          } else {
             const newEnd = Math.max(timeAtMouse, s.start + 0.2);
             return { ...s, end: newEnd };
          }
        }
        return s;
      }));
    }
  };

  const handleMouseUp = () => {
    setDraggingSub(null);
    setResizingSub(null);
  };

  return (
    <div
        className="absolute bottom-0 left-0 right-0 z-20 h-64 bg-gradient-to-t from-[#1a0d0a] via-[#3A1C14]/40 to-transparent backdrop-blur-[8px] p-8 flex flex-col justify-end pointer-events-none"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
    >
        <div className="pointer-events-auto w-full">
            {/* Timeline Ruler */}
            <div className="relative w-full h-12 mb-8 px-4">
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5" />
              <div className="absolute inset-0 flex justify-between items-end pb-2">
                {[0, 10, 20, 30, 40, 50, 60].map((t) => (
                  <div key={t} className="flex flex-col items-center">
                    <span className="text-[10px] text-white/30 mb-2 font-mono tracking-tighter">{t}s</span>
                    <div className={`w-[1px] bg-white/10 ${t % 10 === 0 ? 'h-3' : 'h-1.5'}`} />
                  </div>
                ))}
              </div>

              {/* Range Handle Placeholder - Static for visual matching */}
              <div className="absolute top-0 bottom-0 left-[15%] w-24 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-between px-3 shadow-lg cursor-ew-resize hover:bg-white/20 transition-all">
                 <ChevronLeft size={14} className="text-white/80" />
                 <ChevronRight size={14} className="text-white/80" />
              </div>

              {/* Playhead */}
              <div
                className="absolute top-[-10px] bottom-[-10px] w-[2px] bg-white/60 z-10 pointer-events-none transition-all duration-75"
                style={{ left: `${(currentTime / (duration || 60)) * 100}%` }}
              >
                <div className="absolute -top-1 -left-[6px] w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
              </div>
            </div>

            {/* Clip Strip - Pill Box Container */}
            <div className="flex items-center space-x-4 h-20">
              <div
                ref={timelineContainerRef}
                className="flex-1 flex items-center bg-[#1a0d0a]/60 backdrop-blur-3xl rounded-full h-16 p-2 overflow-x-auto no-scrollbar relative border border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] cursor-crosshair"
                onMouseMove={handleMouseMove}
              >
                {/* Render Subtitles inside the pill container */}
                {/* Note: The reference implementation uses a fixed list [1..7] for visuals.
                    I must adapt my real subtitle logic to render INSIDE this strip properly.
                    Since the strip is horizontal scroll, I need a container with proper width.
                */}
                <div className="relative h-full" style={{ width: `${Math.max(duration, 60) * zoomLevel}px`, minWidth: '100%' }}>
                     {subtitles.map((sub) => {
                        const isActive = currentTime >= sub.start && currentTime <= sub.end;
                        return (
                            <div
                                key={sub.id}
                                onMouseDown={(e) => handleMouseDown(e, sub.id)}
                                className={`absolute top-1 bottom-1 rounded-full transition-all duration-200 overflow-hidden cursor-grab active:cursor-grabbing group flex items-center justify-center
                                ${isActive
                                    ? 'bg-[#E5352B] shadow-[0_0_25px_rgba(229,53,43,0.3)] ring-1 ring-white/40 z-10'
                                    : 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40 opacity-40 hover:opacity-100 border border-white/10'
                                }`}
                                style={{
                                    left: `${sub.start * zoomLevel}px`,
                                    width: `${Math.max((sub.end - sub.start) * zoomLevel, 30)}px`
                                }}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronLeft size={14} className="text-white drop-shadow-md" />
                                        <ChevronRight size={14} className="text-white drop-shadow-md" />
                                    </div>
                                )}
                                <span className="text-[10px] font-bold text-white truncate px-2 pointer-events-none">{sub.text.substring(0, 10)}</span>
                            </div>
                        );
                     })}
                </div>
              </div>
              <LiquidButton size="lg" className="!rounded-full !w-16 h-16 flex-shrink-0"><Plus size={28} /></LiquidButton>
            </div>
        </div>
    </div>
  );
}
