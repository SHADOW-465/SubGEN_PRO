import React from 'react';
import {
  LayoutGrid,
  Mic,
  Sparkles,
  Type,
  Settings
} from "lucide-react";
import { useEditor } from "./EditorContext";

// Atom for the liquid button
const LiquidIconBtn = ({ icon: Icon, active = false, onClick }: { icon: any, active?: boolean, onClick?: () => void }) => (
  <div className="relative flex items-center">
    {active && <div className="absolute left-[-28px] w-1.5 h-6 bg-[#E5352B] rounded-full shadow-[0_0_15px_rgba(229,53,43,0.8)]" />}
    <button
      onClick={onClick}
      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 relative group
        ${active
          ? 'bg-white text-[#3A1C14] shadow-[0_0_30px_rgba(255,255,255,0.4),inset_0_2px_4px_rgba(255,255,255,0.8)] scale-110'
          : 'bg-white/10 text-white/70 backdrop-blur-xl border border-white/10 hover:bg-white/20 active:scale-95'
        }`}
    >
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    </button>
  </div>
);

export default function LeftToolbar() {
  const { activeTab, setActiveTab } = useEditor();

  return (
    <div className="flex flex-col space-y-5 px-8 justify-center z-40 pointer-events-auto">
      <LiquidIconBtn active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} icon={LayoutGrid} />
      <LiquidIconBtn active={activeTab === 'live'} onClick={() => setActiveTab('live')} icon={Mic} />
      <LiquidIconBtn active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={Sparkles} />
      <LiquidIconBtn active={activeTab === 'styles'} onClick={() => setActiveTab('styles')} icon={Type} />
      <div className="h-[1px] w-8 bg-white/10 mx-auto" />
      <LiquidIconBtn active={activeTab === 'prefs'} onClick={() => setActiveTab('prefs')} icon={Settings} />
    </div>
  );
}
