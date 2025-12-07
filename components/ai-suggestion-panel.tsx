"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wand2, AlertCircle, MessageSquare, Check, X, Loader2, Sparkles, RefreshCw } from "lucide-react"
import type { Subtitle } from "@/app/editor/[id]/page"

interface AISuggestionPanelProps {
  subtitles: Subtitle[]
  onApplySuggestion: (id: string, updates: Partial<Subtitle>) => void
}

interface Suggestion {
  id: string
  subtitleId: string
  type: "filler" | "grammar" | "speaker" | "confidence" | "line_break"
  message: string
  original: string
  suggested: string
  priority: "high" | "medium" | "low"
}

const mockSuggestions: Suggestion[] = [
  {
    id: "s1",
    subtitleId: "6",
    type: "confidence",
    message: "Low confidence detected in line 6",
    original: "The AI will automatically transcribe and detect speakers.",
    suggested: "The AI will automatically transcribe and detect speakers.",
    priority: "high",
  },
  {
    id: "s2",
    subtitleId: "5",
    type: "filler",
    message: "Consider removing filler word",
    original: "You can simply drag and drop any video or audio file.",
    suggested: "You can drag and drop any video or audio file.",
    priority: "medium",
  },
  {
    id: "s3",
    subtitleId: "8",
    type: "line_break",
    message: "Long subtitle could be split for better readability",
    original: "Great question. Our AI doesn't just transcribe, it refines the text.",
    suggested: "Great question.\nOur AI doesn't just transcribe—it refines the text.",
    priority: "low",
  },
  {
    id: "s4",
    subtitleId: "10",
    type: "speaker",
    message: "Possible speaker mismatch detected",
    original: "That's really impressive. And what about translations?",
    suggested: "That's really impressive. And what about translations?",
    priority: "medium",
  },
]

export function AISuggestionPanel({ subtitles, onApplySuggestion }: AISuggestionPanelProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions)
  const [isRefining, setIsRefining] = useState(false)
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  const activeSuggestions = suggestions.filter((s) => !dismissedIds.has(s.id))

  const handleApply = (suggestion: Suggestion) => {
    onApplySuggestion(suggestion.subtitleId, { text: suggestion.suggested })
    setDismissedIds((prev) => new Set([...prev, suggestion.id]))
  }

  const handleDismiss = (suggestionId: string) => {
    setDismissedIds((prev) => new Set([...prev, suggestionId]))
  }

  const handleRefineAll = async () => {
    setIsRefining(true)
    // Simulate AI refinement
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefining(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500"
      default:
        return "bg-blue-500/10 text-blue-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "filler":
        return <MessageSquare className="h-4 w-4" />
      case "grammar":
        return <Wand2 className="h-4 w-4" />
      case "speaker":
        return <AlertCircle className="h-4 w-4" />
      case "confidence":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">AI Suggestions</h2>
          {activeSuggestions.length > 0 && <Badge variant="secondary">{activeSuggestions.length}</Badge>}
        </div>
        <Button variant="ghost" size="sm" className="gap-2" onClick={handleRefineAll} disabled={isRefining}>
          {isRefining ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refine All
        </Button>
      </div>

      <Tabs defaultValue="suggestions" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-3 grid w-auto grid-cols-2">
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="flex-1 m-0 p-0">
          <ScrollArea className="flex-1 p-4">
            {activeSuggestions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-green-500/10 p-4">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="mb-2 font-medium">All Clear!</h3>
                <p className="text-sm text-muted-foreground">No more suggestions. Your subtitles look great.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeSuggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="overflow-hidden">
                    <CardContent className="p-3">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(suggestion.type)}
                          <span className="text-sm font-medium">{suggestion.message}</span>
                        </div>
                        <Badge variant="secondary" className={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority}
                        </Badge>
                      </div>

                      {suggestion.original !== suggestion.suggested && (
                        <div className="mb-3 space-y-2 text-sm">
                          <div className="rounded-md bg-red-500/5 p-2">
                            <span className="text-xs text-muted-foreground">Original:</span>
                            <p className="line-through opacity-60">{suggestion.original}</p>
                          </div>
                          <div className="rounded-md bg-green-500/5 p-2">
                            <span className="text-xs text-muted-foreground">Suggested:</span>
                            <p>{suggestion.suggested}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Button size="sm" className="flex-1 gap-1" onClick={() => handleApply(suggestion)}>
                          <Check className="h-3 w-3" />
                          Apply
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-1 bg-transparent"
                          onClick={() => handleDismiss(suggestion.id)}
                        >
                          <X className="h-3 w-3" />
                          Dismiss
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="presets" className="flex-1 m-0 p-4">
          <div className="space-y-3">
            {[
              { name: "YouTube Educational", desc: "42 chars/line, formal tone" },
              { name: "Netflix Cinematic", desc: "Synced with scene pacing" },
              { name: "TikTok/Reels Viral", desc: "25 chars/line, punchy" },
              { name: "Podcast Interview", desc: "Speaker labels, natural flow" },
              { name: "Corporate/Webinar", desc: "Professional, clean" },
            ].map((preset) => (
              <Card key={preset.name} className="cursor-pointer transition-all hover:border-primary">
                <CardContent className="flex items-center justify-between p-3">
                  <div>
                    <p className="font-medium">{preset.name}</p>
                    <p className="text-xs text-muted-foreground">{preset.desc}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    Apply
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
