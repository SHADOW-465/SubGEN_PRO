"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sparkles,
  ArrowLeft,
  Download,
  Share2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Undo,
  Redo,
  Globe,
  ChevronDown,
  Plus,
  Search,
  Scissors,
  Mic,
  Zap,
  Wand2,
  MessageSquare,
  Palette,
  ZoomIn,
  ZoomOut,
  Trash2,
  Copy,
  Check,
  Loader2,
  Square,
  Settings,
  FileText,
  TrendingUp,
  Hash,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Move,
  Layers,
} from "lucide-react";
import {
  Subtitle,
  StyleSettings,
  defaultStyleSettings,
  formatTime,
  simulateAIFetch,
  generateSRT,
  generateVTT,
  generateASS,
  mockAIResponses,
} from "@/lib/store";

// Mock subtitles for demo
const initialSubtitles: Subtitle[] = [
  {
    id: "1",
    startTime: 0,
    endTime: 3.5,
    text: "Welcome to SubGEN PRO, the ultimate subtitle editor.",
    speaker: "Host",
    confidence: 0.98,
    track: "master",
  },
  {
    id: "2",
    startTime: 3.8,
    endTime: 7.2,
    text: "Today we'll explore all the powerful AI features.",
    speaker: "Host",
    confidence: 0.96,
    track: "master",
  },
  {
    id: "3",
    startTime: 7.5,
    endTime: 11.8,
    text: "Our neural transcription engine is incredibly accurate.",
    speaker: "Host",
    confidence: 0.94,
    track: "master",
  },
  {
    id: "4",
    startTime: 12.0,
    endTime: 15.3,
    text: "Let's start by looking at the timeline editor.",
    speaker: "Host",
    confidence: 0.97,
    track: "master",
  },
  {
    id: "5",
    startTime: 15.8,
    endTime: 19.5,
    text: "You can drag and resize any subtitle segment easily.",
    speaker: "Host",
    confidence: 0.92,
    track: "master",
  },
  {
    id: "6",
    startTime: 20.0,
    endTime: 24.2,
    text: "The AI will help refine your subtitles automatically.",
    speaker: "Host",
    confidence: 0.89,
    track: "master",
  },
  {
    id: "7",
    startTime: 24.8,
    endTime: 28.5,
    text: "Export to SRT, VTT, or ASS with one click.",
    speaker: "Host",
    confidence: 0.95,
    track: "master",
  },
  {
    id: "8",
    startTime: 29.0,
    endTime: 33.8,
    text: "Translation supports over 100 languages worldwide.",
    speaker: "Host",
    confidence: 0.91,
    track: "master",
  },
];

export default function SubGENProEditor() {
  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(60);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [showSafetyZones, setShowSafetyZones] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Subtitle State
  const [subtitles, setSubtitles] = useState<Subtitle[]>(initialSubtitles);
  const [translationSubtitles, setTranslationSubtitles] = useState<Subtitle[]>(
    []
  );
  const [selectedSubtitleId, setSelectedSubtitleId] = useState<string | null>(
    null
  );
  const [activeTrack, setActiveTrack] = useState<"master" | "translation">(
    "master"
  );

  // Timeline State
  const [zoom, setZoom] = useState(20);
  const [timelineScroll, setTimelineScroll] = useState(0);
  const [activeTool, setActiveTool] = useState<"select" | "scissors" | "add">(
    "select"
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<
    "move" | "resize-start" | "resize-end" | null
  >(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Style State
  const [styleSettings, setStyleSettings] =
    useState<StyleSettings>(defaultStyleSettings);

  // AI State
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [aiTask, setAiTask] = useState<string | null>(null);
  const [aiProgress, setAiProgress] = useState(0);

  // Live Capture State
  const [isLiveCapture, setIsLiveCapture] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // UI State
  const [inspectorTab, setInspectorTab] = useState("transcribe");

  // Get current subtitle based on playhead position
  const currentSubtitle = subtitles.find(
    (s) => currentTime >= s.startTime && currentTime <= s.endTime
  );

  // Playback simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Handlers
  const handlePlay = () => setIsPlaying(!isPlaying);

  const handleSeek = useCallback((time: number) => {
    setCurrentTime(Math.max(0, Math.min(time, 60)));
  }, []);

  const handleSubtitleUpdate = useCallback(
    (id: string, updates: Partial<Subtitle>) => {
      setSubtitles((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    },
    []
  );

  const handleSubtitleDelete = useCallback((id: string) => {
    setSubtitles((prev) => prev.filter((s) => s.id !== id));
    setSelectedSubtitleId(null);
  }, []);

  const handleAddSubtitle = useCallback(() => {
    const newId = Date.now().toString();
    const lastSub = subtitles[subtitles.length - 1];
    const startTime = lastSub ? lastSub.endTime + 0.5 : currentTime;

    setSubtitles((prev) => [
      ...prev,
      {
        id: newId,
        startTime,
        endTime: startTime + 3,
        text: "New subtitle",
        confidence: 1,
        track: "master",
      },
    ]);
    setSelectedSubtitleId(newId);
  }, [subtitles, currentTime]);

  const handleSplitSubtitle = useCallback(() => {
    const subToSplit = subtitles.find(
      (s) => currentTime > s.startTime && currentTime < s.endTime
    );
    if (!subToSplit) return;

    const splitPoint = currentTime;
    const newId = Date.now().toString();

    setSubtitles((prev) => {
      const index = prev.findIndex((s) => s.id === subToSplit.id);
      const first = {
        ...subToSplit,
        endTime: splitPoint - 0.1,
        text: subToSplit.text.split(" ").slice(0, -2).join(" ") || "...",
      };
      const second = {
        ...subToSplit,
        id: newId,
        startTime: splitPoint,
        text: subToSplit.text.split(" ").slice(-2).join(" ") || "...",
      };
      const newSubs = [...prev];
      newSubs.splice(index, 1, first, second);
      return newSubs;
    });
  }, [currentTime, subtitles]);

  // AI Functions
  const runAITask = async (
    taskName: string,
    task: () => Promise<void>
  ) => {
    setIsAIProcessing(true);
    setAiTask(taskName);
    setAiProgress(0);

    const progressInterval = setInterval(() => {
      setAiProgress((prev) => Math.min(prev + Math.random() * 20, 90));
    }, 300);

    try {
      await task();
      setAiProgress(100);
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsAIProcessing(false);
        setAiTask(null);
        setAiProgress(0);
      }, 500);
    }
  };

  const handleNeuralTranscribe = async () => {
    await runAITask("Neural Transcription", async () => {
      const result = await simulateAIFetch(mockAIResponses.transcribe(duration));
      setSubtitles(result);
    });
  };

  const handleSemanticRefine = async () => {
    await runAITask("Semantic Refinement", async () => {
      const result = await simulateAIFetch(mockAIResponses.refine(subtitles));
      setSubtitles(result);
    });
  };

  const handleTranslate = async (targetLang: string) => {
    await runAITask(`Translating to ${targetLang.toUpperCase()}`, async () => {
      const result = await simulateAIFetch(
        mockAIResponses.translate(subtitles, targetLang)
      );
      setTranslationSubtitles(result);
      setActiveTrack("translation");
    });
  };

  const handleToneShift = async (tone: "hype" | "formal" | "dramatic") => {
    await runAITask(`Shifting tone to ${tone}`, async () => {
      const result = await simulateAIFetch(
        mockAIResponses.shiftTone(subtitles, tone)
      );
      setSubtitles(result);
    });
  };

  // Export handlers
  const handleExport = (format: "srt" | "vtt" | "ass") => {
    let content: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case "srt":
        content = generateSRT(subtitles);
        filename = "subtitles.srt";
        mimeType = "text/plain";
        break;
      case "vtt":
        content = generateVTT(subtitles);
        filename = "subtitles.vtt";
        mimeType = "text/vtt";
        break;
      case "ass":
        content = generateASS(subtitles, styleSettings);
        filename = "subtitles.ass";
        mimeType = "text/plain";
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Timeline calculations
  const pixelsPerSecond = zoom * 2;
  const timelineWidth = duration * pixelsPerSecond;

  return (
    <TooltipProvider>
      <div className="flex h-screen flex-col bg-[#090b0f] text-white overflow-hidden">
        {/* ===== TOP TOOLBAR ===== */}
        <header className="flex h-14 items-center justify-between border-b border-white/10 px-4 bg-[#090b0f]/95 backdrop-blur-xl z-50">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#1a365d] to-[#1a365d]/50">
                <Sparkles className="h-5 w-5 text-[#d69e2e]" />
                <span className="text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  SubGEN PRO
                </span>
              </div>
              <Input
                defaultValue="Project_Demo_Video"
                className="h-8 w-48 border-0 bg-white/5 font-medium focus-visible:ring-1 focus-visible:ring-[#d69e2e] text-white"
              />
            </div>
            <Badge
              variant="secondary"
              className="bg-green-500/20 text-green-400 border-green-500/30"
            >
              <Check className="h-3 w-3 mr-1" />
              Auto-saved
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
            </Tooltip>

            <div className="mx-2 h-6 w-px bg-white/10" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="gap-2 bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/80 text-black font-semibold hover:from-[#d69e2e]/90 hover:to-[#d69e2e]/70"
                >
                  <Download className="h-4 w-4" />
                  Export
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#0d1117] border-white/10"
              >
                <DropdownMenuItem
                  onClick={() => handleExport("srt")}
                  className="text-white hover:bg-white/10"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Export as SRT
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleExport("vtt")}
                  className="text-white hover:bg-white/10"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Export as VTT
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleExport("ass")}
                  className="text-white hover:bg-white/10"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Export as ASS
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* ===== MAIN CONTENT AREA ===== */}
        <div className="flex flex-1 overflow-hidden">
          {/* ===== LEFT SIDEBAR: SCRIPT VIEW ===== */}
          <aside className="w-72 border-r border-white/10 bg-[#0d1117]/50 backdrop-blur-xl flex flex-col">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#d69e2e]" />
                  Script View
                </h2>
                <Badge variant="outline" className="border-white/20 text-white/70">
                  {subtitles.length}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={activeTrack === "master" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTrack("master")}
                  className={
                    activeTrack === "master"
                      ? "bg-[#1a365d] text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                >
                  Master
                </Button>
                <Button
                  variant={activeTrack === "translation" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTrack("translation")}
                  className={
                    activeTrack === "translation"
                      ? "bg-[#1a365d] text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                >
                  Translation
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {(activeTrack === "master" ? subtitles : translationSubtitles).map(
                  (sub, index) => (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${selectedSubtitleId === sub.id
                          ? "bg-[#1a365d]/50 border border-[#d69e2e]/50"
                          : currentSubtitle?.id === sub.id
                            ? "bg-[#d69e2e]/10 border border-[#d69e2e]/30"
                            : "bg-white/5 hover:bg-white/10 border border-transparent"
                        }`}
                      onClick={() => {
                        setSelectedSubtitleId(sub.id);
                        handleSeek(sub.startTime);
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#d69e2e] font-mono">
                          {formatTime(sub.startTime)}
                        </span>
                        {sub.speaker && (
                          <Badge
                            variant="outline"
                            className="text-[10px] border-white/20 text-white/60"
                          >
                            {sub.speaker}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-white/90 leading-relaxed">
                        {sub.text}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </ScrollArea>

            <div className="p-3 border-t border-white/10">
              <Button
                onClick={handleAddSubtitle}
                className="w-full gap-2 bg-white/10 hover:bg-white/20 text-white"
              >
                <Plus className="h-4 w-4" />
                Add Subtitle
              </Button>
            </div>
          </aside>

          {/* ===== MAIN WORKSPACE ===== */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Video Player Section */}
            <div className="flex-1 flex flex-col bg-black/50 min-h-0">
              <div className="flex-1 flex items-center justify-center p-4 relative">
                <div className="relative w-full max-w-4xl aspect-video bg-gradient-to-br from-[#1a365d]/20 to-[#090b0f] rounded-xl overflow-hidden border border-white/10">
                  {/* Video Element */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    poster="/placeholder.svg?height=720&width=1280"
                  />

                  {/* Safety Zone Overlay */}
                  <AnimatePresence>
                    {showSafetyZones && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        {/* TikTok/Reels Safe Zone */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[56%] h-full border-2 border-dashed border-[#d69e2e]/50 rounded-lg relative">
                            <span className="absolute top-2 left-2 text-xs text-[#d69e2e]/70 bg-black/50 px-2 py-1 rounded">
                              9:16 Safe Zone
                            </span>
                          </div>
                        </div>
                        {/* Caption Safe Area */}
                        <div className="absolute bottom-[15%] left-[10%] right-[10%] h-[15%] border border-dashed border-green-500/50 rounded">
                          <span className="absolute top-1 left-2 text-xs text-green-500/70 bg-black/50 px-2 py-0.5 rounded">
                            Caption Safe
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Subtitle Overlay */}
                  <AnimatePresence>
                    {currentSubtitle && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 flex justify-center px-4"
                        style={{
                          bottom: `${100 - styleSettings.yPosition}%`,
                        }}
                      >
                        <span
                          className="px-4 py-2 rounded-lg max-w-[80%] text-center"
                          style={{
                            fontSize: `${styleSettings.fontSize}px`,
                            textAlign: styleSettings.textAlign,
                            backgroundColor: `rgba(0,0,0,${styleSettings.bgOpacity / 100})`,
                            color: styleSettings.textColor,
                            fontFamily: styleSettings.fontFamily,
                          }}
                        >
                          {currentSubtitle.text}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Time Display */}
                  <div className="absolute top-4 left-4 bg-black/70 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    <span className="font-mono text-sm text-white">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Controls */}
              <div className="px-6 py-4 border-t border-white/10 bg-[#0d1117]/50 backdrop-blur-xl">
                {/* Progress Bar */}
                <div className="mb-4">
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={0.1}
                    onValueChange={([value]) => handleSeek(value)}
                    className="cursor-pointer"
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSeek(Math.max(0, currentTime - 5))}
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          <SkipBack className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>-5 seconds</TooltipContent>
                    </Tooltip>

                    <Button
                      size="icon"
                      onClick={handlePlay}
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/80 text-black hover:from-[#d69e2e]/90 hover:to-[#d69e2e]/70"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5 ml-0.5" />
                      )}
                    </Button>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleSeek(Math.min(duration, currentTime + 5))
                          }
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>+5 seconds</TooltipContent>
                    </Tooltip>

                    <div className="ml-4 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white/70 hover:text-white hover:bg-white/10"
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Button>
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        max={100}
                        className="w-24"
                        onValueChange={([value]) => {
                          setVolume(value);
                          setIsMuted(value === 0);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 mr-4">
                      <Switch
                        id="safety-zones"
                        checked={showSafetyZones}
                        onCheckedChange={setShowSafetyZones}
                      />
                      <Label
                        htmlFor="safety-zones"
                        className="text-xs text-white/70"
                      >
                        Safety Zones
                      </Label>
                    </div>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Fullscreen</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== TIMELINE SECTION ===== */}
            <div className="h-48 border-t border-white/10 bg-[#0d1117]/80 backdrop-blur-xl flex flex-col">
              {/* Timeline Toolbar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeTool === "select" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setActiveTool("select")}
                        className={
                          activeTool === "select"
                            ? "bg-[#1a365d] text-white"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }
                      >
                        <Move className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Select Tool (V)</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeTool === "scissors" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setActiveTool("scissors")}
                        className={
                          activeTool === "scissors"
                            ? "bg-[#1a365d] text-white"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }
                      >
                        <Scissors className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Split Tool (S)</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeTool === "add" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setActiveTool("add")}
                        className={
                          activeTool === "add"
                            ? "bg-[#1a365d] text-white"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add Tool (A)</TooltipContent>
                  </Tooltip>

                  <div className="w-px h-6 bg-white/10 mx-2" />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSplitSubtitle}
                    className="gap-2 text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Scissors className="h-4 w-4" />
                    Split at Playhead
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setZoom(Math.max(5, zoom - 5))}
                      className="text-white/70 hover:text-white hover:bg-white/10 h-7 w-7"
                    >
                      <ZoomOut className="h-3 w-3" />
                    </Button>
                    <span className="text-xs text-white/50 w-10 text-center">
                      {zoom}x
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setZoom(Math.min(100, zoom + 5))}
                      className="text-white/70 hover:text-white hover:bg-white/10 h-7 w-7"
                    >
                      <ZoomIn className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Timeline Tracks */}
              <div className="flex-1 overflow-hidden relative">
                <ScrollArea className="h-full">
                  <div
                    ref={timelineRef}
                    className="relative h-full"
                    style={{ width: `${timelineWidth}px`, minWidth: "100%" }}
                  >
                    {/* Time Ruler */}
                    <div className="h-6 border-b border-white/10 flex items-end relative">
                      {Array.from({ length: Math.ceil(duration) + 1 }).map(
                        (_, i) => (
                          <div
                            key={i}
                            className="absolute bottom-0 flex flex-col items-center"
                            style={{ left: `${i * pixelsPerSecond}px` }}
                          >
                            <span className="text-[10px] text-white/40 mb-1">
                              {formatTime(i)}
                            </span>
                            <div className="w-px h-2 bg-white/20" />
                          </div>
                        )
                      )}
                    </div>

                    {/* Master Track */}
                    <div className="h-12 relative border-b border-white/10">
                      <div className="absolute left-0 top-0 w-16 h-full bg-[#1a365d]/30 flex items-center justify-center text-xs text-white/50 border-r border-white/10">
                        Master
                      </div>
                      <div className="ml-16 h-full relative">
                        {subtitles.map((sub) => (
                          <motion.div
                            key={sub.id}
                            className={`absolute top-1 h-10 rounded-md cursor-pointer transition-all ${selectedSubtitleId === sub.id
                                ? "bg-[#d69e2e] border-2 border-[#d69e2e]"
                                : "bg-[#1a365d] border border-[#1a365d]/50 hover:border-[#d69e2e]/50"
                              }`}
                            style={{
                              left: `${sub.startTime * pixelsPerSecond}px`,
                              width: `${(sub.endTime - sub.startTime) * pixelsPerSecond}px`,
                            }}
                            onClick={() => {
                              setSelectedSubtitleId(sub.id);
                              handleSeek(sub.startTime);
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="px-2 py-1 overflow-hidden h-full flex items-center">
                              <span
                                className={`text-xs truncate ${selectedSubtitleId === sub.id
                                    ? "text-black font-medium"
                                    : "text-white/80"
                                  }`}
                              >
                                {sub.text}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Translation Track */}
                    <div className="h-12 relative">
                      <div className="absolute left-0 top-0 w-16 h-full bg-[#1a365d]/20 flex items-center justify-center text-xs text-white/40 border-r border-white/10">
                        Trans.
                      </div>
                      <div className="ml-16 h-full relative">
                        {translationSubtitles.map((sub) => (
                          <motion.div
                            key={sub.id}
                            className="absolute top-1 h-10 rounded-md bg-green-600/50 border border-green-500/30 cursor-pointer"
                            style={{
                              left: `${sub.startTime * pixelsPerSecond}px`,
                              width: `${(sub.endTime - sub.startTime) * pixelsPerSecond}px`,
                            }}
                          >
                            <div className="px-2 py-1 overflow-hidden h-full flex items-center">
                              <span className="text-xs text-white/80 truncate">
                                {sub.text}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Playhead */}
                    <motion.div
                      className="absolute top-0 bottom-0 w-0.5 bg-[#d69e2e] z-20 pointer-events-none"
                      style={{ left: `${currentTime * pixelsPerSecond + 64}px` }}
                      animate={{
                        boxShadow: [
                          "0 0 10px #d69e2e, 0 0 20px #d69e2e50",
                          "0 0 15px #d69e2e, 0 0 30px #d69e2e50",
                          "0 0 10px #d69e2e, 0 0 20px #d69e2e50",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="absolute -top-1 -left-2 w-4 h-4 bg-[#d69e2e] rotate-45" />
                    </motion.div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </main>

          {/* ===== RIGHT SIDEBAR: AI INSPECTOR ===== */}
          <aside className="w-80 border-l border-white/10 bg-[#0d1117]/50 backdrop-blur-xl flex flex-col">
            <Tabs
              value={inspectorTab}
              onValueChange={setInspectorTab}
              className="flex flex-col h-full"
            >
              <div className="p-3 border-b border-white/10">
                <TabsList className="w-full grid grid-cols-4 bg-white/5">
                  <TabsTrigger
                    value="transcribe"
                    className="data-[state=active]:bg-[#1a365d] data-[state=active]:text-white text-white/60 text-xs"
                  >
                    <Mic className="h-3 w-3" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="refine"
                    className="data-[state=active]:bg-[#1a365d] data-[state=active]:text-white text-white/60 text-xs"
                  >
                    <Wand2 className="h-3 w-3" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="marketing"
                    className="data-[state=active]:bg-[#1a365d] data-[state=active]:text-white text-white/60 text-xs"
                  >
                    <TrendingUp className="h-3 w-3" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="style"
                    className="data-[state=active]:bg-[#1a365d] data-[state=active]:text-white text-white/60 text-xs"
                  >
                    <Palette className="h-3 w-3" />
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* AI Processing Overlay */}
              <AnimatePresence>
                {isAIProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-[#090b0f]/90 backdrop-blur-sm flex flex-col items-center justify-center"
                  >
                    <Loader2 className="h-8 w-8 text-[#d69e2e] animate-spin mb-4" />
                    <p className="text-white font-medium mb-2">{aiTask}</p>
                    <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/50"
                        initial={{ width: 0 }}
                        animate={{ width: `${aiProgress}%` }}
                      />
                    </div>
                    <p className="text-white/50 text-sm mt-2">{Math.round(aiProgress)}%</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <ScrollArea className="flex-1">
                {/* Transcription Tab */}
                <TabsContent value="transcribe" className="m-0 p-4 space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#d69e2e]" />
                      Neural Transcribe
                    </h3>
                    <p className="text-xs text-white/60">
                      Use Gemini 2.5 to transcribe your video with 98% accuracy and
                      automatic speaker detection.
                    </p>
                    <Button
                      onClick={handleNeuralTranscribe}
                      disabled={isAIProcessing}
                      className="w-full gap-2 bg-gradient-to-r from-[#1a365d] to-[#1a365d]/80 hover:from-[#1a365d]/90 hover:to-[#1a365d]/70"
                    >
                      <Sparkles className="h-4 w-4" />
                      Start Neural Transcribe
                    </Button>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Mic className="h-4 w-4 text-[#d69e2e]" />
                      Live Voice Capture
                    </h3>
                    <p className="text-xs text-white/60">
                      Record your voice in real-time and watch AI generate
                      polished subtitles as you speak.
                    </p>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="live-capture"
                        checked={isLiveCapture}
                        onCheckedChange={setIsLiveCapture}
                      />
                      <Label htmlFor="live-capture" className="text-sm text-white">
                        Enable Live Mode
                      </Label>
                    </div>
                    {isLiveCapture && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Button
                          onClick={() => setIsRecording(!isRecording)}
                          variant={isRecording ? "destructive" : "default"}
                          className={`w-full gap-2 ${isRecording
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-[#d69e2e] text-black hover:bg-[#d69e2e]/90"
                            }`}
                        >
                          {isRecording ? (
                            <>
                              <Square className="h-4 w-4" />
                              Stop Recording
                            </>
                          ) : (
                            <>
                              <Mic className="h-4 w-4" />
                              Start Recording
                            </>
                          )}
                        </Button>
                        {isRecording && (
                          <motion.div
                            className="flex items-center gap-2 text-red-400 text-sm"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            Recording...
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </TabsContent>

                {/* Refinement Tab */}
                <TabsContent value="refine" className="m-0 p-4 space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Wand2 className="h-4 w-4 text-[#d69e2e]" />
                      AI Semantic Refiner
                    </h3>
                    <p className="text-xs text-white/60">
                      Fix punctuation, grammar, and awkward phrasing while
                      maintaining perfect timestamp sync.
                    </p>
                    <Button
                      onClick={handleSemanticRefine}
                      disabled={isAIProcessing}
                      className="w-full gap-2 bg-gradient-to-r from-[#1a365d] to-[#1a365d]/80"
                    >
                      <Sparkles className="h-4 w-4" />
                      Refine All Subtitles
                    </Button>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#d69e2e]" />
                      AI Global Translator
                    </h3>
                    <p className="text-xs text-white/60">
                      Context-aware translation to 100+ languages without losing
                      the soul of your dialogue.
                    </p>
                    <Select onValueChange={(v) => handleTranslate(v)}>
                      <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select target language" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0d1117] border-white/10">
                        <SelectItem value="es" className="text-white">
                          🇪🇸 Spanish
                        </SelectItem>
                        <SelectItem value="ja" className="text-white">
                          🇯🇵 Japanese
                        </SelectItem>
                        <SelectItem value="hi" className="text-white">
                          🇮🇳 Hindi
                        </SelectItem>
                        <SelectItem value="fr" className="text-white">
                          🇫🇷 French
                        </SelectItem>
                        <SelectItem value="de" className="text-white">
                          🇩🇪 German
                        </SelectItem>
                        <SelectItem value="zh" className="text-white">
                          🇨🇳 Chinese
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-[#d69e2e]" />
                      AI Tone Shifter
                    </h3>
                    <p className="text-xs text-white/60">
                      Rewrite your subtitles to match a specific vibe or style.
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToneShift("hype")}
                        disabled={isAIProcessing}
                        className="bg-white/5 border-white/10 text-white hover:bg-[#d69e2e]/20 hover:border-[#d69e2e]/50"
                      >
                        🔥 Hype
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToneShift("formal")}
                        disabled={isAIProcessing}
                        className="bg-white/5 border-white/10 text-white hover:bg-[#1a365d]/20 hover:border-[#1a365d]/50"
                      >
                        👔 Formal
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToneShift("dramatic")}
                        disabled={isAIProcessing}
                        className="bg-white/5 border-white/10 text-white hover:bg-purple-500/20 hover:border-purple-500/50"
                      >
                        🎭 Drama
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Marketing Tab */}
                <TabsContent value="marketing" className="m-0 p-4 space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-[#d69e2e]" />
                      AI Social Hooks
                    </h3>
                    <p className="text-xs text-white/60">
                      Generate viral-ready summaries and hooks for social media
                      distribution.
                    </p>
                    <Button
                      onClick={async () => {
                        await runAITask("Generating Marketing Hooks", async () => {
                          const result = await simulateAIFetch(
                            mockAIResponses.generateHooks(subtitles)
                          );
                          // Display the results (in a real app, you'd show these in the UI)
                          console.log(result);
                        });
                      }}
                      disabled={isAIProcessing}
                      className="w-full gap-2 bg-gradient-to-r from-[#1a365d] to-[#1a365d]/80"
                    >
                      <Sparkles className="h-4 w-4" />
                      Generate Hooks
                    </Button>
                  </div>

                  <div className="space-y-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Hash className="h-3 w-3" />
                      Suggested Hashtags
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {["#AI", "#VideoEditing", "#Subtitles", "#ContentCreator"].map(
                        (tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-[#1a365d]/30 text-white/80 text-xs"
                          >
                            {tag}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-white/60">Generated Hook</Label>
                    <Textarea
                      readOnly
                      value="🎬 You won't believe what this AI can do with your videos! Watch till the end for the magic..."
                      className="bg-white/5 border-white/10 text-white min-h-[80px] text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 bg-white/5 border-white/10 text-white"
                    >
                      <Copy className="h-3 w-3" />
                      Copy to Clipboard
                    </Button>
                  </div>
                </TabsContent>

                {/* Style Tab */}
                <TabsContent value="style" className="m-0 p-4 space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Palette className="h-4 w-4 text-[#d69e2e]" />
                      Subtitle Styling
                    </h3>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-white/60">Font Size</Label>
                          <span className="text-xs text-white/50">
                            {styleSettings.fontSize}px
                          </span>
                        </div>
                        <Slider
                          value={[styleSettings.fontSize]}
                          min={12}
                          max={48}
                          step={1}
                          onValueChange={([v]) =>
                            setStyleSettings((s) => ({ ...s, fontSize: v }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-white/60">Y Position</Label>
                          <span className="text-xs text-white/50">
                            {styleSettings.yPosition}%
                          </span>
                        </div>
                        <Slider
                          value={[styleSettings.yPosition]}
                          min={10}
                          max={95}
                          step={1}
                          onValueChange={([v]) =>
                            setStyleSettings((s) => ({ ...s, yPosition: v }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-white/60">Text Alignment</Label>
                        <div className="flex gap-1">
                          <Button
                            variant={
                              styleSettings.textAlign === "left"
                                ? "secondary"
                                : "ghost"
                            }
                            size="icon"
                            onClick={() =>
                              setStyleSettings((s) => ({ ...s, textAlign: "left" }))
                            }
                            className={
                              styleSettings.textAlign === "left"
                                ? "bg-[#1a365d]"
                                : "text-white/60 hover:text-white"
                            }
                          >
                            <AlignLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={
                              styleSettings.textAlign === "center"
                                ? "secondary"
                                : "ghost"
                            }
                            size="icon"
                            onClick={() =>
                              setStyleSettings((s) => ({
                                ...s,
                                textAlign: "center",
                              }))
                            }
                            className={
                              styleSettings.textAlign === "center"
                                ? "bg-[#1a365d]"
                                : "text-white/60 hover:text-white"
                            }
                          >
                            <AlignCenter className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={
                              styleSettings.textAlign === "right"
                                ? "secondary"
                                : "ghost"
                            }
                            size="icon"
                            onClick={() =>
                              setStyleSettings((s) => ({
                                ...s,
                                textAlign: "right",
                              }))
                            }
                            className={
                              styleSettings.textAlign === "right"
                                ? "bg-[#1a365d]"
                                : "text-white/60 hover:text-white"
                            }
                          >
                            <AlignRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-white/60">
                            Background Opacity
                          </Label>
                          <span className="text-xs text-white/50">
                            {styleSettings.bgOpacity}%
                          </span>
                        </div>
                        <Slider
                          value={[styleSettings.bgOpacity]}
                          min={0}
                          max={100}
                          step={5}
                          onValueChange={([v]) =>
                            setStyleSettings((s) => ({ ...s, bgOpacity: v }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-white/60">Font Family</Label>
                        <Select
                          value={styleSettings.fontFamily}
                          onValueChange={(v) =>
                            setStyleSettings((s) => ({ ...s, fontFamily: v }))
                          }
                        >
                          <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0d1117] border-white/10">
                            <SelectItem value="Inter" className="text-white">
                              Inter
                            </SelectItem>
                            <SelectItem value="Roboto" className="text-white">
                              Roboto
                            </SelectItem>
                            <SelectItem value="Arial" className="text-white">
                              Arial
                            </SelectItem>
                            <SelectItem value="Georgia" className="text-white">
                              Georgia
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </aside>
        </div>
      </div>
    </TooltipProvider>
  );
}
