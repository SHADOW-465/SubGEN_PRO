import React, { useRef, useState } from 'react';
import { useEditor } from "./EditorContext";

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

  // Add global mouse up listener to handle release outside container
  // In a real app we'd use useEffect to bind window mouseup/mousemove,
  // but for this scope sticking to container events or ensuring wide capture area

  return (
    <div
        className="absolute bottom-32 left-0 right-0 z-30 h-16 flex flex-col justify-end pointer-events-none"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
    >
      <div className="mx-20 flex items-center bg-gradient-to-r from-[#E5352B]/40 to-[#E5352B]/10 backdrop-blur-3xl rounded-full p-2.5 overflow-hidden border border-white/10 shadow-2xl pointer-events-auto relative">
         <div
            ref={timelineContainerRef}
            className="flex-1 h-10 relative overflow-x-auto no-scrollbar cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseDown={(e) => {
               // Only seek if clicking empty space
               if (e.target === e.currentTarget) {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const x = e.clientX - rect.left + e.currentTarget.scrollLeft;
                   seekTo(x / zoomLevel);
               }
            }}
         >
            <div className="h-full relative" style={{ width: `${Math.max(duration, 60) * zoomLevel * 2}px` }}>

               {/* Time Markers / Grid lines could go here */}

               {subtitles.map((sub) => {
                  const isActive = currentTime >= sub.start && currentTime <= sub.end;
                  return (
                    <div
                      key={sub.id}
                      onMouseDown={(e) => handleMouseDown(e, sub.id)}
                      className={`absolute h-7 top-1.5 rounded-full border flex items-center justify-center px-4 cursor-grab active:cursor-grabbing transition-colors group
                        ${isActive
                            ? 'bg-white text-[#3A1C14] border-white shadow-lg z-10'
                            : 'bg-black/40 border-white/10 text-white/30 hover:bg-black/60 hover:text-white/50'
                        }`}
                      style={{
                          left: `${sub.start * zoomLevel}px`,
                          width: `${Math.max((sub.end - sub.start) * zoomLevel, 20)}px` // Min width for visibility
                      }}
                    >
                      {/* Resize Handles */}
                      <div className="absolute left-0 top-0 bottom-0 w-2 cursor-w-resize opacity-0 group-hover:opacity-100" />
                      <div className="absolute right-0 top-0 bottom-0 w-2 cursor-e-resize opacity-0 group-hover:opacity-100" />

                      <span className="text-[9px] font-black truncate uppercase tracking-tighter select-none pointer-events-none">{sub.text}</span>
                    </div>
                  );
               })}

               {/* Playhead */}
               <div className="absolute top-0 bottom-0 w-[2.5px] bg-white z-40 shadow-white shadow-lg pointer-events-none" style={{ left: `${currentTime * zoomLevel}px` }}>
                  <div className="absolute -top-1 -left-[5px] w-3 h-3 bg-white rounded-full" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
