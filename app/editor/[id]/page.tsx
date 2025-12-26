"use client";

import MainPanel from "@/components/video-editor/MainPanel";

export default function EditorPage() {
  return (
    <div className="w-full h-screen bg-[#141418] bg-grid-squares flex items-center justify-center p-8 overflow-hidden">
      <MainPanel />
    </div>
  );
}
