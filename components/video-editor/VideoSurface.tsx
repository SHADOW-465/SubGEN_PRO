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
    <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-14 relative overflow-hidden">
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[48px] overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,1)] border border-white/10 group transform-gpu transition-all duration-1000 z-10">
          {/* Hover purple glow border simulation */}
          <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-[48px] pointer-events-none group-hover:border-indigo-500/40 transition-all duration-700" />

        {videoUrl ? (
          <video
            src={videoUrl}
            className="w-full h-full object-contain pointer-events-none"
            controls={false}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-32 h-32 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center shadow-inner mb-8">
              <Upload size={40} className="text-white/20" />
            </div>
            <button onClick={() => document.getElementById('file-in')?.click()} className="px-12 py-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full text-white/80 font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all cursor-pointer">Import Master Stream</button>
            <input id="file-in" type="file" hidden accept="video/*" onChange={handleFileUpload} />
          </div>
        )}
      </div>

       {/* Background ambient glow behind the video surface for depth */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-white/5 to-transparent blur-[100px] pointer-events-none z-0" />
    </div>
  );
}
