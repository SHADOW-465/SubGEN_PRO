import React from 'react';
import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Star,
  LayoutGrid,
  Settings
} from "lucide-react";
import { useEditor } from "./EditorContext";

export default function BottomBar() {
  const { isPlaying, togglePlay, seekTo, currentTime } = useEditor();

  return (
    <footer className="h-32 bg-[#0a0504]/90 backdrop-blur-[60px] border-t border-white/10 px-16 flex items-center justify-between shrink-0 isolation-auto z-50">
      <div className="flex items-center space-x-10">
        <button onClick={() => seekTo(currentTime - 5)} className="text-white/40 hover:text-white transition-all"><SkipBack size={26}/></button>
        <button
            className="w-18 h-18 bg-white text-[#3A1C14] rounded-full flex items-center justify-center hover:scale-110 shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all"
            onClick={togglePlay}
        >
          {isPlaying ? <Pause size={38} fill="currentColor" /> : <Play size={38} fill="currentColor" className="ml-1" />}
        </button>
        <button onClick={() => seekTo(currentTime + 5)} className="text-white/40 hover:text-white transition-all"><SkipForward size={26}/></button>
      </div>

      <div className="flex items-center space-x-6">
        <div className="h-14 px-10 rounded-full bg-white text-[#3A1C14] flex items-center space-x-4 shadow-white/20 shadow-2xl transform hover:scale-105 transition-all font-black text-xs uppercase tracking-[0.4em]">
          <Star size={18} fill="currentColor" /> <span>4K CINEMATIC</span>
        </div>
        <div className="h-14 px-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-[11px] font-black uppercase tracking-[0.3em] gap-4">
           <span className="text-white/20">FPS</span> <span>60</span>
        </div>
        <div className="h-14 px-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-[11px] font-black uppercase tracking-[0.3em] gap-4">
           <span className="text-white/20">SYNC</span> <span>AUTO</span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white border border-white/10">
            <LayoutGrid size={22}/>
        </button>
        <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white border border-white/10">
            <Settings size={22}/>
        </button>
      </div>
    </footer>
  );
}
