import {
  ArrowLeft,
  Video,
  Mic,
  Music,
  Grid,
  User,
  Type
} from "lucide-react";

export default function LeftToolbar() {
  const tools = [
    { icon: Video, active: true },
    { icon: Mic, active: false },
    { icon: Music, active: false },
    { icon: Grid, active: false },
    { icon: User, active: false },
    { icon: Type, active: false },
  ];

  return (
    <div className="absolute top-24 left-6 bottom-32 w-14 flex flex-col items-center gap-4 z-20 pointer-events-none">
      {/* Back Button (Topmost, distinct) */}
      <div className="pointer-events-auto mb-2">
         {/* Note: The design description says "Back button (topmost) – separate from the tools, slightly larger, red-tinted brown."
             But there is also a back button in the TopBar. I will check the visual hierarchy.
             Based on "Left vertical toolbar... 1. Back button (topmost)", it seems duplicative or maybe the top-left one in TopBar IS this one?
             Actually, "Top-left houses a circular back button... Below it, aligned vertically, sits the left toolbar".
             So they are visually connected. I'll stick to the description.
             Wait, looking closely at description:
             "Top-left houses a circular back button... Below it... sits the left toolbar"
             "Left vertical toolbar... 1. Back button (topmost) – separate from the tools"
             It seems they refer to the same element or closely related.
             I implemented one in TopBar. I will implement the tool list here starting with Camera.
             Actually, let's include the "Back button" here if it's part of the ribbon, or assume the TopBar one covers it.
             Re-reading: "Top-left houses a circular back button... Below it... sits the left toolbar"
             So the one in TopBar is the back button. The LeftToolbar is below it.
             But then "Left vertical toolbar... 1. Back button (topmost)..."
             I will add it here too just in case, or maybe it's a "Home" button?
             Let's assuming the one in TopBar is the main navigation back.
             I'll stick to the tools for this component to avoid duplication if they overlap visually.
             Actually, let's look at the "green-hill" reference. It usually has a vertical sidebar.
             I will add a spacer or just start with tools.
         */}
      </div>

      <div className="flex flex-col gap-4 pointer-events-auto">
        {tools.map((item, index) => (
          <button
            key={index}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              item.active
                ? "bg-white text-[#3A1C14] shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-110"
                : "bg-[#3A1C14]/80 text-white/70 hover:bg-[#5D2D1E] hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
