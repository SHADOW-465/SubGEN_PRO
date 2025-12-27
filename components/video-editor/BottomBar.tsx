import React from 'react';
import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Star,
  LayoutGrid,
  Settings,
  Grid
} from "lucide-react";
import { useEditor } from "./EditorContext";
import { LiquidButton } from "@/components/ui/LiquidButton";

export default function BottomBar() {
  const { isPlaying, togglePlay, seekTo, currentTime } = useEditor();

  return (
    <div className="h-28 bg-[#0a0504]/80 backdrop-blur-3xl border-t border-white/10 px-10 flex items-center justify-between z-50 pointer-events-auto">
      <div className="flex items-center space-x-4">
        <LiquidButton onClick={() => seekTo(currentTime - 5)} icon={SkipBack} size="md" />
        <LiquidButton size="lg" className="!bg-white/15 hover:!bg-white/25" onClick={togglePlay}>
          {isPlaying ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" className="ml-1" />}
        </LiquidButton>
        <LiquidButton onClick={() => seekTo(currentTime + 5)} icon={SkipForward} size="md" />
      </div>

      <div className="flex items-center space-x-3">
        <div className="h-11 px-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/15 transition-all text-white/80 text-xs font-medium">
          9:16
        </div>
        <div className="h-11 px-6 rounded-full bg-white text-[#3A1C14] flex items-center space-x-2 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.4)] transform hover:scale-105 transition-transform font-bold text-xs">
          <Star size={14} fill="currentColor" />
          <span>1440p</span>
        </div>
        <div className="h-11 px-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/15 transition-all text-white/80 text-xs font-medium">
          18s
        </div>
        <div className="h-11 px-6 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center space-x-2 cursor-pointer hover:bg-white/15 transition-all text-xs font-medium">
          <span className="text-white/30 uppercase tracking-tighter">Style</span>
          <span className="text-white/90">None</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <LiquidButton icon={Grid} />
        <LiquidButton icon={Settings} />
      </div>
    </div>
  );
}
