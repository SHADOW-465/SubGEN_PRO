import React from 'react';
import { Sparkles, Eye, Activity, Plus, Send, X } from "lucide-react";
import { useEditor } from "./EditorContext";

export default function PromptPanel() {
  const { activeTab, setActiveTab, subtitles, setSubtitles, isProcessing, setIsProcessing } = useEditor();

  const handleAITranscribe = async () => {
    // Placeholder for real logic integration
    // In a real scenario, this would call the API
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
    }, 2000);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 100);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-[450px] my-14 mr-14 bg-white/[0.03] backdrop-blur-[60px] rounded-[48px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] p-10 flex flex-col isolation-isolate z-40 transform-gpu overflow-hidden">
      <div className="flex justify-between items-center mb-10 shrink-0">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
              <Sparkles size={20} className="text-white/80" />
            </div>
            <span className="text-white/90 font-black text-xs tracking-[0.4em] uppercase italic">
                STUDIO <span className="text-[#E5352B] not-italic">HUB</span>
            </span>
         </div>
         <button onClick={() => setActiveTab('timeline')} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/30 hover:text-white transition-all">
            <X size={20} />
         </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar space-y-10">
        {activeTab === 'ai' ? (
             <div className="space-y-10">
                <div className="p-10 bg-gradient-to-br from-[#E5352B]/40 to-[#1a0d0a]/80 rounded-[40px] border border-[#E5352B]/30 relative overflow-hidden group shadow-2xl">
                   <Sparkles className="absolute -right-12 -top-12 text-white opacity-10 group-hover:opacity-20 transition-opacity" size={160} />
                   <h4 className="text-white font-black text-[14px] uppercase tracking-[0.2em] mb-4 italic">NEURAL DECIPHER</h4>
                   <p className="text-white/60 text-[11px] leading-relaxed mb-10 font-medium">Deploy Gemini 2.5 Flash to automatically reconstruct speech into frame-accurate segments.</p>
                   <button onClick={handleAITranscribe} className="w-full py-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-[12px] uppercase tracking-[0.3em] rounded-3xl hover:bg-white/20 transition-all">
                       {isProcessing ? 'PROCESSING...' : 'Start Neural Engine'}
                   </button>
                </div>

                <div className="flex space-x-3">
                   <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/50 hover:bg-white/20 border border-white/10"><Eye size={18} /></button>
                   <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/50 hover:bg-white/20 border border-white/10"><Activity size={18} /></button>
                </div>
             </div>
        ) : (
            <div className="space-y-4">
              {subtitles.map((sub, idx) => (
                <div key={sub.id} className="p-6 rounded-[32px] bg-black/40 border border-white/5 transition-all">
                   <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-black text-[#E5352B] bg-black/40 px-3 py-1 rounded-full shadow-inner">{formatTime(sub.start)}</span>
                  </div>
                  <textarea value={sub.text} onChange={(e) => {
                    const newSubs = [...subtitles]; newSubs[idx] = { ...newSubs[idx], text: e.target.value };
                    setSubtitles(newSubs);
                  }} className="w-full bg-transparent border-none p-0 text-[14px] font-bold leading-relaxed resize-none focus:ring-0 text-white/80 outline-none" rows={2} />
                </div>
              ))}
            </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between shrink-0">
         <button className="w-16 h-16 bg-white text-[#3A1C14] rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(255,255,255,0.3)] hover:scale-110 transition-all">
           <Send size={28} fill="currentColor" className="ml-1" />
         </button>
         <button className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-white/20 border border-white/10 hover:border-white/40">
            <Plus size={24} />
         </button>
      </div>
    </div>
  );
}
