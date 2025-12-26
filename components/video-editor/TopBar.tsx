import { Star, Share2, MoreHorizontal, ArrowLeft } from "lucide-react";

export default function TopBar() {
  return (
    <div className="absolute top-0 left-0 right-0 h-20 px-8 flex items-center justify-between z-20 pointer-events-none">
      {/* Top-left: Back button */}
      <div className="pointer-events-auto">
        <button className="w-10 h-10 rounded-full bg-[#5D2D1E] bg-opacity-90 flex items-center justify-center text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] hover:brightness-110 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Top-center: Project Name */}
      <div className="pointer-events-auto">
        <div className="h-10 px-6 flex items-center justify-center bg-[#5D2D1E]/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
          <span className="text-white font-medium text-sm tracking-wide">Silent Passage</span>
        </div>
      </div>

      {/* Top-right: Session Actions */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {[Star, Share2, MoreHorizontal].map((Icon, i) => (
          <button
            key={i}
            className="w-10 h-10 rounded-full bg-[#5D2D1E]/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#D17F3A]/60 hover:shadow-[0_0_15px_rgba(209,127,58,0.5)] border border-transparent hover:border-white/30 transition-all duration-300 group"
          >
            <Icon className="w-5 h-5 group-hover:text-white" />
          </button>
        ))}
      </div>
    </div>
  );
}
