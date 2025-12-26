import { X, Sparkles, Plus, Mic, Activity, Send } from "lucide-react";

export default function PromptPanel() {
  return (
    <div className="absolute top-1/2 right-12 -translate-y-[60%] w-80 bg-[#5D2D1E]/40 backdrop-blur-2xl rounded-[24px] border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col z-30">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-white font-medium">Prompt</span>
        </div>
        <button className="text-white/60 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-2 flex-1 overflow-y-auto custom-scrollbar">
        <p className="text-[13px] leading-relaxed text-white/90 font-light">
          A striking close-up of a human eye, the iris shimmering with shades of copper and gold. The skin around the eye is adorned with small, delicate red feathers that seem to merge seamlessly with the eyelashes, creating a surreal and organic texture.
        </p>
        <div className="h-4" />
        <p className="text-[13px] leading-relaxed text-white/90 font-light">
          The lighting is warm and cinematic, highlighting the intricate details of the feathers and the glossy reflection in the eye. The overall mood is mysterious and mythical, with deep shadows emphasizing the fiery red and gold color palette.
        </p>
      </div>

      {/* Thumbnails */}
      <div className="px-4 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex-shrink-0 border border-white/10 shadow-lg relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform"
            >
              {/* Placeholder for thumbnail */}
              <div className={`absolute inset-0 opacity-50 ${i === 1 ? 'bg-[#E5352B]' : i === 2 ? 'bg-[#D17F3A]' : 'bg-[#5D2D1E]'}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <Mic className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <Activity className="w-4 h-4" />
          </button>
        </div>

        <button className="w-10 h-10 rounded-full bg-white text-[#3A1C14] flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
          <Send className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Scroll Indicator (Visual only as CSS scrollbar handles functionality usually, but adding visual cue) */}
      <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-12 bg-white/20 rounded-full" />
    </div>
  );
}
