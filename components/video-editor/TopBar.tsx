import { Star, Share2, MoreHorizontal, ArrowLeft, Download } from "lucide-react";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { useEditor } from "./EditorContext";

export default function TopBar() {
  const { subtitles } = useEditor();

  const downloadSRT = () => {
    if (subtitles.length === 0) return;
    let content = "";
    subtitles.forEach((sub, i) => {
        const start = formatTime(sub.start);
        const end = formatTime(sub.end);
        content += `${i + 1}\n${start} --> ${end}\n${sub.text}\n\n`;
    });
    downloadFile(content, "subtitles.srt");
  };

  const downloadVTT = () => {
    if (subtitles.length === 0) return;
    let content = "WEBVTT\n\n";
    subtitles.forEach((sub) => {
        const start = formatTime(sub.start, true);
        const end = formatTime(sub.end, true);
        content += `${start} --> ${end}\n${sub.text}\n\n`;
    });
    downloadFile(content, "subtitles.vtt");
  };

  const formatTime = (seconds: number, isVTT = false) => {
      const date = new Date(0);
      date.setMilliseconds(seconds * 1000);
      const iso = date.toISOString();
      // SRT: 00:00:00,000  VTT: 00:00:00.000
      let timeStr = iso.substr(11, 12);
      if (!isVTT) timeStr = timeStr.replace('.', ',');
      return timeStr;
  };

  const downloadFile = (content: string, filename: string) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-40 p-8 flex justify-between items-start pointer-events-none">
      <div className="flex items-center space-x-5 pointer-events-auto">
        <LiquidButton size="lg" className="!bg-[#4A241B]/80 !border-[#E5352B]/30 !text-white/80">
           <ArrowLeft size={24} />
        </LiquidButton>

        <div className="pointer-events-auto px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center space-x-6 transform hover:bg-white/10 transition-all cursor-default">
          <span className="text-white text-xs font-black tracking-widest italic uppercase">
            SubGEN <span className="text-[#E5352B] not-italic">PRO</span>
          </span>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">SYSTEM LIVE</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto flex items-center space-x-3">
         <div className="flex bg-black/40 backdrop-blur-3xl border border-white/10 p-1.5 rounded-full shadow-2xl mr-3">
            <button
                onClick={downloadSRT}
                disabled={subtitles.length === 0}
                className="px-5 py-2 text-[10px] font-black text-white/50 hover:text-white transition-all uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed"
            >
                SRT
            </button>
            <button
                onClick={downloadVTT}
                disabled={subtitles.length === 0}
                className="px-6 py-2 bg-white/90 text-[#3A1C14] rounded-full text-[10px] font-black uppercase shadow-xl tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white"
            >
                VTT PRO
            </button>
         </div>
         <LiquidButton icon={Share2} />
         <LiquidButton icon={MoreHorizontal} />
      </div>
    </header>
  );
}
