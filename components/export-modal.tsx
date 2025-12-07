"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, Video, Loader2 } from "lucide-react"
import type { Subtitle } from "@/app/editor/[id]/page"

interface ExportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subtitles: Subtitle[]
}

export function ExportModal({ open, onOpenChange, subtitles }: ExportModalProps) {
  const [subtitleFormat, setSubtitleFormat] = useState("srt")
  const [videoResolution, setVideoResolution] = useState("1080p")
  const [stylePreset, setStylePreset] = useState("youtube")
  const [isExporting, setIsExporting] = useState(false)
  const [includeTranslations, setIncludeTranslations] = useState(false)

  const handleExportSubtitles = async () => {
    setIsExporting(true)

    // Generate subtitle file content
    let content = ""

    if (subtitleFormat === "srt") {
      content = subtitles
        .map((sub, index) => {
          const formatSrtTime = (seconds: number) => {
            const h = Math.floor(seconds / 3600)
            const m = Math.floor((seconds % 3600) / 60)
            const s = Math.floor(seconds % 60)
            const ms = Math.floor((seconds % 1) * 1000)
            return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")},${ms.toString().padStart(3, "0")}`
          }
          return `${index + 1}\n${formatSrtTime(sub.startTime)} --> ${formatSrtTime(sub.endTime)}\n${sub.text}\n`
        })
        .join("\n")
    } else if (subtitleFormat === "vtt") {
      const formatVttTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = Math.floor(seconds % 60)
        const ms = Math.floor((seconds % 1) * 1000)
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`
      }
      content =
        "WEBVTT\n\n" +
        subtitles
          .map((sub) => {
            return `${formatVttTime(sub.startTime)} --> ${formatVttTime(sub.endTime)}\n${sub.text}\n`
          })
          .join("\n")
    }

    // Simulate export delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Download file
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `subtitles.${subtitleFormat}`
    a.click()
    URL.revokeObjectURL(url)

    setIsExporting(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Export Project</DialogTitle>
          <DialogDescription>Choose your export format and settings.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="subtitles" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="subtitles" className="gap-2">
              <FileText className="h-4 w-4" />
              Subtitles
            </TabsTrigger>
            <TabsTrigger value="video" className="gap-2">
              <Video className="h-4 w-4" />
              Burned Video
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subtitles" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>Format</Label>
              <RadioGroup value={subtitleFormat} onValueChange={setSubtitleFormat} className="grid grid-cols-3 gap-2">
                {[
                  { value: "srt", label: "SRT", desc: "Most universal" },
                  { value: "vtt", label: "VTT", desc: "Web standard" },
                  { value: "ass", label: "ASS", desc: "Styled subtitles" },
                ].map((format) => (
                  <Label
                    key={format.value}
                    className={`flex cursor-pointer flex-col items-center rounded-lg border p-3 transition-all ${
                      subtitleFormat === format.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value={format.value} className="sr-only" />
                    <span className="font-medium">{format.label}</span>
                    <span className="text-xs text-muted-foreground">{format.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="translations"
                checked={includeTranslations}
                onCheckedChange={(checked) => setIncludeTranslations(!!checked)}
              />
              <Label htmlFor="translations" className="text-sm">
                Include translated versions (if available)
              </Label>
            </div>

            <Button className="w-full gap-2" onClick={handleExportSubtitles} disabled={isExporting}>
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Download {subtitleFormat.toUpperCase()}
            </Button>
          </TabsContent>

          <TabsContent value="video" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>Resolution</Label>
              <Select value={videoResolution} onValueChange={setVideoResolution}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="source">Source Quality</SelectItem>
                  <SelectItem value="4k">4K (3840x2160)</SelectItem>
                  <SelectItem value="1080p">1080p (1920x1080)</SelectItem>
                  <SelectItem value="720p">720p (1280x720)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Style Preset</Label>
              <Select value={stylePreset} onValueChange={setStylePreset}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube (yellow text, black outline)</SelectItem>
                  <SelectItem value="netflix">Netflix (white text, bottom left)</SelectItem>
                  <SelectItem value="tiktok">TikTok/Shorts (large, center)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">
                Estimated render time: <span className="font-medium text-foreground">2-3 minutes</span>
              </p>
            </div>

            <Button className="w-full gap-2">
              <Video className="h-4 w-4" />
              Render Video
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
