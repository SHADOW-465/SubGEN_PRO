"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Trash2, Merge, Split, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Subtitle } from "@/app/editor/[id]/page"

interface SubtitleEditorProps {
  subtitles: Subtitle[]
  selectedSubtitleId: string | null
  currentTime: number
  onSelect: (id: string | null) => void
  onUpdate: (id: string, updates: Partial<Subtitle>) => void
  onDelete: (id: string) => void
  onSeek: (time: number) => void
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 100)
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`
}

function parseTime(timeStr: string): number {
  const parts = timeStr.split(":")
  if (parts.length !== 2) return 0
  const [mins, rest] = parts
  const [secs, ms = "0"] = rest.split(".")
  return Number.parseInt(mins) * 60 + Number.parseInt(secs) + Number.parseInt(ms) / 100
}

export function SubtitleEditor({
  subtitles,
  selectedSubtitleId,
  currentTime,
  onSelect,
  onUpdate,
  onDelete,
  onSeek,
}: SubtitleEditorProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Auto-scroll to current subtitle
  useEffect(() => {
    const currentSub = subtitles.find((s) => currentTime >= s.startTime && currentTime <= s.endTime)
    if (currentSub && scrollRef.current) {
      const element = document.getElementById(`subtitle-${currentSub.id}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [currentTime, subtitles])

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500"
    if (confidence >= 0.7) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <ScrollArea className="flex-1" ref={scrollRef}>
      <div className="p-2">
        {subtitles.map((subtitle, index) => {
          const isActive = currentTime >= subtitle.startTime && currentTime <= subtitle.endTime
          const isSelected = selectedSubtitleId === subtitle.id

          return (
            <div
              key={subtitle.id}
              id={`subtitle-${subtitle.id}`}
              className={cn(
                "group mb-2 rounded-lg border p-3 transition-all cursor-pointer",
                isActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                isSelected && "ring-2 ring-primary ring-offset-2",
              )}
              onClick={() => {
                onSelect(subtitle.id)
                onSeek(subtitle.startTime)
              }}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">#{index + 1}</span>
                  <div className={cn("h-2 w-2 rounded-full", getConfidenceColor(subtitle.confidence))} />
                  {subtitle.speaker && (
                    <Badge variant="secondary" className="text-xs">
                      {subtitle.speaker}
                    </Badge>
                  )}
                  {subtitle.confidence < 0.9 && <AlertCircle className="h-3 w-3 text-yellow-500" />}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Split className="mr-2 h-4 w-4" />
                      Split Subtitle
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={index === subtitles.length - 1}>
                      <Merge className="mr-2 h-4 w-4" />
                      Merge with Next
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(subtitle.id)
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Input
                  value={formatTime(subtitle.startTime)}
                  onChange={(e) => {
                    const time = parseTime(e.target.value)
                    if (!isNaN(time)) {
                      onUpdate(subtitle.id, { startTime: time })
                    }
                  }}
                  className="h-6 w-20 px-1 text-center text-xs"
                  onClick={(e) => e.stopPropagation()}
                />
                <span>→</span>
                <Input
                  value={formatTime(subtitle.endTime)}
                  onChange={(e) => {
                    const time = parseTime(e.target.value)
                    if (!isNaN(time)) {
                      onUpdate(subtitle.id, { endTime: time })
                    }
                  }}
                  className="h-6 w-20 px-1 text-center text-xs"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <Textarea
                value={subtitle.text}
                onChange={(e) => onUpdate(subtitle.id, { text: e.target.value })}
                className="min-h-[60px] resize-none text-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
