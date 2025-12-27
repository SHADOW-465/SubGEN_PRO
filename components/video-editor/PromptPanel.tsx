import React from 'react';
import { Sparkles, Eye, Activity, Plus, Send, X, Mic, AlertCircle } from "lucide-react";
import { useEditor } from "./EditorContext";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { extractAudio } from "@/utils/audio";
import { transcribeMedia } from "@/utils/gemini";

export default function PromptPanel() {
  const {
    activeTab, setActiveTab, subtitles, setSubtitles,
    isProcessing, setIsProcessing, videoFile, setStatusMessage
  } = useEditor();

  const handleAITranscribe = async () => {
    if (!videoFile) {
       alert("Please upload a video first.");
       return;
    }

    const apiKey = localStorage.getItem("subgen_api_key");
    if (!apiKey) {
       alert("Please configure your Gemini API Key in Settings (Dashboard).");
       return;
    }

    setIsProcessing(true);
    setStatusMessage("EXTRACTING AUDIO...");

    try {
        // 1. Extract Audio
        const audioBase64 = await extractAudio(videoFile);

        // 2. Transcribe
        setStatusMessage("NEURAL PROCESSING...");
        const newSubtitles = await transcribeMedia(apiKey, audioBase64);

        setSubtitles(newSubtitles);
        setStatusMessage("SYSTEM READY");

    } catch (error: any) {
        console.error(error);
        alert("Error: " + error.message);
        setStatusMessage("ERROR");
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <div className="absolute right-10 top-1/2 -translate-y-1/2 z-40 w-[360px] max-h-[70%] bg-[#2d150f]/40 backdrop-blur-[30px] rounded-[32px] border border-white/15 shadow-[0_32px_64px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.1)] p-7 flex flex-col pointer-events-auto">
      <div className="flex justify-between items-center mb-5 shrink-0">
         <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-white font-medium text-sm tracking-wide uppercase">Prompt</span>
         </div>
         <button onClick={() => setActiveTab('timeline')} className="text-white/30 hover:text-white transition-colors">
            <X size={20} />
         </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
         {activeTab === 'ai' ? (
             <>
               <div className="p-6 bg-gradient-to-br from-[#E5352B]/40 to-[#1a0d0a]/80 rounded-[20px] border border-[#E5352B]/30 mb-6 relative overflow-hidden group">
                   <p className="text-white/70 text-xs leading-relaxed font-light relative z-10">
                     Deploy Gemini 2.5 Flash to automatically reconstruct speech into frame-accurate segments.
                   </p>
                   <button
                       onClick={handleAITranscribe}
                       className="mt-4 w-full py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-white/20 transition-all"
                   >
                       {isProcessing ? 'PROCESSING...' : 'Start Neural Engine'}
                   </button>
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                       <Sparkles className="w-20 h-20 text-white" />
                   </div>
               </div>

               <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-3">Style Presets</p>
               <div className="flex space-x-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group relative w-20 h-20 rounded-[20px] overflow-hidden border border-white/10 shadow-xl flex-shrink-0 cursor-pointer">
                    <div className={`absolute inset-0 bg-gradient-to-br ${i === 1 ? 'from-red-800 to-orange-900' : i === 2 ? 'from-orange-800 to-yellow-900' : 'from-brown-800 to-red-950'} opacity-80 group-hover:scale-110 transition-transform duration-700`} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 transition-colors pointer-events-none rounded-[20px]" />
                  </div>
                ))}
              </div>
             </>
         ) : (
             <div className="space-y-3">
                 {subtitles.length === 0 && <p className="text-white/30 text-xs text-center py-4">No subtitles yet.</p>}
                 {subtitles.map(sub => (
                     <div key={sub.id} className="p-3 rounded-xl bg-black/40 border border-white/5">
                         <p className="text-white/80 text-xs font-medium">{sub.text}</p>
                         <p className="text-[#E5352B] text-[9px] font-mono mt-1">{sub.start.toFixed(1)}s - {sub.end.toFixed(1)}s</p>
                     </div>
                 ))}
             </div>
         )}
      </div>

      <div className="mt-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <LiquidButton size="sm"><Plus size={16} /></LiquidButton>
            <LiquidButton size="sm"><Mic size={16} /></LiquidButton>
            <LiquidButton size="sm"><Activity size={16} /></LiquidButton>
          </div>
          <button className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-[#3A1C14] shadow-[0_10px_30px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.1)] hover:scale-110 active:scale-95 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Send size={22} fill="currentColor" />
          </button>
      </div>
    </div>
  );
}
