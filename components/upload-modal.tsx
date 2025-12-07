"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, LinkIcon, Loader2, FileVideo, X } from "lucide-react"

interface UploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const languages = [
  { value: "auto", label: "Auto-detect" },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "hi", label: "Hindi" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese" },
  { value: "pt", label: "Portuguese" },
  { value: "ar", label: "Arabic" },
]

const presets = [
  { value: "youtube", label: "YouTube Educational" },
  { value: "netflix", label: "Netflix Cinematic" },
  { value: "tiktok", label: "TikTok/Reels Viral" },
  { value: "podcast", label: "Podcast Interview" },
  { value: "corporate", label: "Corporate/Webinar" },
]

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState("")
  const [language, setLanguage] = useState("auto")
  const [preset, setPreset] = useState("youtube")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStage, setProcessingStage] = useState("")

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type.startsWith("video/") || droppedFile.type.startsWith("audio/"))) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSubmit = async () => {
    if (!file && !url) return

    setIsUploading(true)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setUploadProgress(i)
    }

    setIsUploading(false)
    setIsProcessing(true)

    // Simulate processing stages
    const stages = [
      "Extracting audio...",
      "Transcribing with Gemini AI...",
      "Detecting speakers...",
      "Refining subtitles...",
      "Finalizing...",
    ]

    for (const stage of stages) {
      setProcessingStage(stage)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    // Navigate to editor
    router.push("/editor/new")
    onOpenChange(false)
    resetState()
  }

  const resetState = () => {
    setFile(null)
    setUrl("")
    setUploadProgress(0)
    setIsUploading(false)
    setIsProcessing(false)
    setProcessingStage("")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Upload a video or audio file to generate AI subtitles.</DialogDescription>
        </DialogHeader>

        {isProcessing ? (
          <div className="flex flex-col items-center py-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Processing Your Video</h3>
            <p className="text-sm text-muted-foreground">{processingStage}</p>
          </div>
        ) : isUploading ? (
          <div className="py-8">
            <div className="mb-4 flex items-center gap-3">
              <FileVideo className="h-10 w-10 text-primary" />
              <div className="flex-1">
                <p className="font-medium">{file?.name}</p>
                <p className="text-sm text-muted-foreground">{file && formatFileSize(file.size)}</p>
              </div>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <p className="mt-2 text-center text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
          </div>
        ) : (
          <>
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload File
                </TabsTrigger>
                <TabsTrigger value="url" className="gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Import URL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-4">
                {file ? (
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
                    <FileVideo className="h-10 w-10 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                      isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="video/*,audio/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
                    <p className="mb-1 font-medium">Drag and drop your file here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                    <p className="mt-2 text-xs text-muted-foreground">MP4, MOV, MKV, MP3, WAV up to 2GB</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="url" className="mt-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Video URL</Label>
                  <Input
                    id="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Supports YouTube, Vimeo, Loom, and direct video links</p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Primary Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Style Preset</Label>
                <Select value={preset} onValueChange={setPreset}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {presets.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!file && !url} className="gap-2">
                Start Processing
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
