import React from 'react';
import TopBar from "./TopBar";
import LeftToolbar from "./LeftToolbar";
import VideoSurface from "./VideoSurface";
import PromptPanel from "./PromptPanel";
import TimelineOverlay from "./TimelineOverlay";
import BottomBar from "./BottomBar";
import { EditorProvider } from "./EditorContext";

export default function MainPanel() {
  return (
    <EditorProvider>
      <div className="flex h-screen w-full items-center justify-center p-4 lg:p-8 font-sans overflow-hidden relative">
        <main className="relative z-10 w-full max-w-[1550px] h-[92vh] bg-gradient-to-br from-[#3A1C14] to-[#1a0d0a] rounded-[48px] shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col border border-white/10 isolation-isolate">

          {/* Top Navigation */}
          <TopBar />

          {/* Sidebar & Main Content */}
          <div className="flex-1 flex overflow-hidden relative">

            {/* Floating Action Sidebar */}
            <LeftToolbar />

            {/* Video Preview Canvas */}
            <VideoSurface />

            {/* STUDIO HUB Inspector (Right Panel) */}
            <PromptPanel />
          </div>

          {/* Timeline Overlay */}
          <TimelineOverlay />

          {/* Transport HUD Footer */}
          <BottomBar />

        </main>

        <style dangerouslySetInnerHTML={{ __html: `
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 20px; }
        `}} />
      </div>
    </EditorProvider>
  );
}
