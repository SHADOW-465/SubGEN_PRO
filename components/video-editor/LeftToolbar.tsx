import React from 'react';
import {
  LayoutGrid,
  Mic,
  Sparkles,
  Type,
  Settings,
  Camera,
  Music,
  User
} from "lucide-react";
import { useEditor } from "./EditorContext";
import { LiquidButton } from "@/components/ui/LiquidButton";

export default function LeftToolbar() {
  const { activeTab, setActiveTab } = useEditor();

  const tools = [
    { id: 'camera', icon: Camera },
    { id: 'live', icon: Mic },
    { id: 'music', icon: Music },
    { id: 'timeline', icon: LayoutGrid },
    { id: 'user', icon: User },
    { id: 'styles', icon: Type }
  ];

  return (
    <div className="absolute top-24 left-6 z-30 flex flex-col space-y-4 pointer-events-none">
      {tools.map((tool) => (
        <div key={tool.id} className="relative flex items-center pointer-events-auto">
             {activeTab === tool.id && (
                 <div className="absolute left-[-24px] w-1.5 h-6 bg-[#E5352B] rounded-full shadow-[0_0_15px_rgba(229,53,43,0.8)]" />
             )}
             <LiquidButton
                active={activeTab === tool.id}
                size="lg"
                onClick={() => setActiveTab(tool.id)}
                icon={tool.icon}
             />
        </div>
      ))}
      <div className="h-[1px] w-8 bg-white/10 mx-auto my-2" />
      <div className="pointer-events-auto">
        <LiquidButton
            active={activeTab === 'prefs'}
            onClick={() => setActiveTab('prefs')}
            icon={Settings}
            size="lg"
        />
      </div>
    </div>
  );
}
