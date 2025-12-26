import TopBar from "./TopBar";
import LeftToolbar from "./LeftToolbar";
import VideoSurface from "./VideoSurface";
import PromptPanel from "./PromptPanel";
import TimelineOverlay from "./TimelineOverlay";
import BottomBar from "./BottomBar";

export default function MainPanel() {
  return (
    <div className="relative w-full h-full max-w-[1600px] max-h-[900px] bg-gradient-to-br from-[#3A1C14] to-[#5D2D1E] rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-white/5 mx-auto my-auto ring-1 ring-white/10">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content Area */}
      <div className="flex-1 relative w-full h-full overflow-hidden">
        {/* Video Canvas Layer */}
        <VideoSurface />

        {/* Left Toolbar Layer */}
        <LeftToolbar />

        {/* Floating UI Layers */}
        <PromptPanel />
        <TimelineOverlay />
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
}
