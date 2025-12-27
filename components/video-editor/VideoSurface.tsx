import { Upload } from "lucide-react";
import React from "react";
import { useEditor } from "./EditorContext";

export default function VideoSurface() {
  const { videoUrl, setVideoUrl, setVideoFile } = useEditor();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      setVideoUrl(URL.createObjectURL(file));
      setVideoFile(file);
    }
  };

  return (
    <div className="relative flex-1 w-full overflow-hidden">
       {/* Background - The "Eye" Abstract Art from Reference */}
       <div className="absolute inset-0 bg-black z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-90 scale-110" style={{
            background: `radial-gradient(circle at 35% 45%, #e5352b 0%, #3a1c14 30%, #1a0d0a 60%)`
          }}>
             <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-[#f9c35c]/10 blur-[80px] rounded-full rotate-45 animate-pulse" />
             <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[200px] bg-[#d17f3a]/20 blur-[100px] rounded-full -rotate-12" />
             <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[12px] border-[#d17f3a]/30 flex items-center justify-center shadow-[0_0_50px_rgba(209,127,58,0.2)]">
                 <div className="w-24 h-24 rounded-full bg-black/80 flex items-center justify-center overflow-hidden">
                     <div className="w-8 h-8 rounded-full bg-white/10 blur-[2px] animate-pulse" />
                 </div>
             </div>
          </div>
       </div>

       {/* Video Content */}
       <div className="relative z-10 w-full h-full flex items-center justify-center">
        {videoUrl ? (
          <video
            src={videoUrl}
            className="w-full h-full object-contain pointer-events-none"
            controls={false}
          />
        ) : (
          <div className="flex flex-col items-center justify-center z-20">
             {/* Upload Trigger aligned with the aesthetic */}
             <div
                onClick={() => document.getElementById('file-in')?.click()}
                className="w-24 h-24 rounded-full bg-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/10 hover:scale-105 transition-all shadow-[0_0_40px_rgba(0,0,0,0.5)] group"
             >
                <Upload size={32} className="text-white/50 group-hover:text-white transition-colors" />
             </div>
             <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">Drop Master Stream</p>
             <input id="file-in" type="file" hidden accept="video/*" onChange={handleFileUpload} />
          </div>
        )}
       </div>
    </div>
  );
}
