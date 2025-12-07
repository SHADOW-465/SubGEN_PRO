"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
  Maximize,
  Undo,
  Redo,
  Globe,
  ChevronDown,
  Plus,
  Search,
} from "lucide-react"
import { SubtitleEditor } from "@/components/subtitle-editor"
import { AISuggestionPanel } from "@/components/ai-suggestion-panel"
import { ExportModal } from "@/components/export-modal"
import { TranslateModal } from "@/components/translate-modal"

export interface Subtitle {
  id: string
  startTime: number
  endTime: number
  text: string
  speaker?: string
  confidence: number
}

const mockSubtitles: Subtitle[] = [
  {
    id: "1",
    startTime: 0,
    endTime: 3.5,
    text: "Welcome to our product demonstration video.",
    speaker: "Host",
    confidence: 0.98,
  },
  {
    id: "2",
    startTime: 3.8,
    endTime: 7.2,
    text: "Today we'll be showing you the key features of SubtitleAI.",
    speaker: "Host",
    confidence: 0.96,
  },
  {
    id: "3",
    startTime: 7.5,
    endTime: 11.8,
    text: "Our platform uses advanced AI to generate accurate subtitles.",
    speaker: "Host",
    confidence: 0.94,
  },
  {
    id: "4",
    startTime: 12.0,
    endTime: 15.3,
    text: "Let's start by looking at the upload process.",
    speaker: "Host",
    confidence: 0.97,
  },
  {
    id: "5",
    startTime: 15.8,
    endTime: 19.5,
    text: "You can simply drag and drop any video or audio file.",
    speaker: "Host",
    confidence: 0.92,
  },
  {
    id: "6",
    startTime: 20.0,
    endTime: 24.2,
    text: "The AI will automatically transcribe and detect speakers.",
    speaker: "Host",
    confidence: 0.89,
  },
  {
    id: "7",
    startTime: 24.8,
    endTime: 28.5,
    text: "What makes this different from other tools?",
    speaker: "Guest",
    confidence: 0.95,
  },
  {
    id: "8",
    startTime: 29.0,
    endTime: 33.8,
    text: "Great question. Our AI doesn't just transcribe, it refines the text.",
    speaker: "Host",
    confidence: 0.91,
  },
  {
    id: "9",
    startTime: 34.2,
    endTime: 38.5,
    text: "It fixes grammar, removes fillers, and optimizes line breaks.",
    speaker: "Host",
    confidence: 0.93,
  },
  {
    id: "10",
    startTime: 39.0,
    endTime: 43.5,
    text: "That's really impressive. And what about translations?",
    speaker: "Guest",
    confidence: 0.88,
  },
]

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 100)
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`
}

export default function EditorPage() {
  const [subtitles, setSubtitles] = useState<Subtitle[]>(mockSubtitles)
  const [selectedSubtitleId, setSelectedSubtitleId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(120)
  const [volume, setVolume] = useState(80)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [translateModalOpen, setTranslateModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const currentSubtitle = subtitles.find((s) => currentTime >= s.startTime && currentTime <= s.endTime)

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (time: number) => {
    setCurrentTime(time)
  }

  const handleSubtitleUpdate = (id: string, updates: Partial<Subtitle>) => {
    setSubtitles((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  const handleSubtitleDelete = (id: string) => {
    setSubtitles((prev) => prev.filter((s) => s.id !== id))
  }

  const handleSubtitleAdd = () => {
    const lastSubtitle = subtitles[subtitles.length - 1]
    const newSubtitle: Subtitle = {
      id: Date.now().toString(),
      startTime: lastSubtitle ? lastSubtitle.endTime + 0.5 : 0,
      endTime: lastSubtitle ? lastSubtitle.endTime + 3 : 3,
      text: "New subtitle",
      confidence: 1,
    }
    setSubtitles((prev) => [...prev, newSubtitle])
  }

  // Simulate playback
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.1
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  return (
    <TooltipProvider>
      <div className="flex h-screen flex-col bg-background">
        {/* Top Toolbar */}
        <header className="flex h-14 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <Input
                defaultValue="Marketing Webinar Q3"
                className="h-8 w-48 border-0 bg-transparent font-medium focus-visible:ring-1"
              />
            </div>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500">
              Auto-saved
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
            </Tooltip>

            <div className="mx-2 h-6 w-px bg-border" />

            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={() => setTranslateModalOpen(true)}
            >
              <Globe className="h-4 w-4" />
              Translate
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setExportModalOpen(true)}>
                  Export Subtitles (SRT, VTT)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setExportModalOpen(true)}>
                  Export Video with Subtitles
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Editor Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel: Video Player */}
          <div className="flex w-[35%] flex-col border-r border-border">
            <div className="flex-1 bg-black p-4">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <video
                  ref={videoRef}
                  className="h-full w-full object-contain"
                  poster="/placeholder.svg?height=480&width=854"
                />
                {/* Subtitle Overlay */}
                {currentSubtitle && (
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <span className="rounded bg-black/80 px-4 py-2 text-lg font-medium text-white">
                      {currentSubtitle.text}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Video Controls */}
            <div className="border-t border-border p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={0.1}
                  onValueChange={([value]) => handleSeek(value)}
                  className="cursor-pointer"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleSeek(Math.max(0, currentTime - 5))}>
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button variant="default" size="icon" onClick={handlePlay}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleSeek(Math.min(duration, currentTime + 5))}>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider value={[volume]} max={100} className="w-24" onValueChange={([value]) => setVolume(value)} />
                </div>

                <Button variant="ghost" size="icon">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Middle Panel: Subtitle List */}
          <div className="flex w-[40%] flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Subtitles</h2>
                <Badge variant="outline">{subtitles.length}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSubtitleAdd}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <SubtitleEditor
              subtitles={subtitles}
              selectedSubtitleId={selectedSubtitleId}
              currentTime={currentTime}
              onSelect={setSelectedSubtitleId}
              onUpdate={handleSubtitleUpdate}
              onDelete={handleSubtitleDelete}
              onSeek={handleSeek}
            />
          </div>

          {/* Right Panel: AI Suggestions */}
          <div className="flex w-[25%] flex-col border-l border-border">
            <AISuggestionPanel subtitles={subtitles} onApplySuggestion={handleSubtitleUpdate} />
          </div>
        </div>

        <ExportModal open={exportModalOpen} onOpenChange={setExportModalOpen} subtitles={subtitles} />
        <TranslateModal open={translateModalOpen} onOpenChange={setTranslateModalOpen} subtitles={subtitles} />
      </div>
    </TooltipProvider>
  )
}
