"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Globe, Loader2, Sparkles } from "lucide-react"
import type { Subtitle } from "@/app/editor/[id]/page"

interface TranslateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subtitles: Subtitle[]
}

const languages = [
  { code: "es", name: "Spanish", region: "Spain" },
  { code: "es-mx", name: "Spanish", region: "Latin America" },
  { code: "fr", name: "French", region: "France" },
  { code: "de", name: "German", region: "Germany" },
  { code: "it", name: "Italian", region: "Italy" },
  { code: "pt", name: "Portuguese", region: "Brazil" },
  { code: "ja", name: "Japanese", region: "Japan" },
  { code: "ko", name: "Korean", region: "Korea" },
  { code: "zh", name: "Chinese", region: "Simplified" },
  { code: "zh-tw", name: "Chinese", region: "Traditional" },
  { code: "hi", name: "Hindi", region: "India" },
  { code: "ar", name: "Arabic", region: "Standard" },
  { code: "ru", name: "Russian", region: "Russia" },
  { code: "nl", name: "Dutch", region: "Netherlands" },
  { code: "sv", name: "Swedish", region: "Sweden" },
]

export function TranslateModal({ open, onOpenChange, subtitles }: TranslateModalProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [translationMode, setTranslationMode] = useState("localized")
  const [isTranslating, setIsTranslating] = useState(false)

  const handleLanguageToggle = (code: string) => {
    setSelectedLanguages((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]))
  }

  const handleTranslate = async () => {
    if (selectedLanguages.length === 0) return

    setIsTranslating(true)
    // Simulate translation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsTranslating(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Translate Subtitles
          </DialogTitle>
          <DialogDescription>
            Translate your subtitles into multiple languages with AI-powered localization.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Translation Mode</Label>
            <RadioGroup value={translationMode} onValueChange={setTranslationMode} className="grid grid-cols-3 gap-2">
              <Label
                className={`flex cursor-pointer flex-col items-center rounded-lg border p-3 text-center transition-all ${
                  translationMode === "literal"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value="literal" className="sr-only" />
                <span className="text-sm font-medium">Literal</span>
                <span className="text-xs text-muted-foreground">Word-for-word</span>
              </Label>
              <Label
                className={`flex cursor-pointer flex-col items-center rounded-lg border p-3 text-center transition-all ${
                  translationMode === "localized"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value="localized" className="sr-only" />
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span className="text-sm font-medium">Localized</span>
                </div>
                <span className="text-xs text-muted-foreground">Cultural adapt</span>
              </Label>
              <Label
                className={`flex cursor-pointer flex-col items-center rounded-lg border p-3 text-center transition-all ${
                  translationMode === "simplified"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value="simplified" className="sr-only" />
                <span className="text-sm font-medium">Simplified</span>
                <span className="text-xs text-muted-foreground">Easy to read</span>
              </Label>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Target Languages</Label>
              {selectedLanguages.length > 0 && <Badge variant="secondary">{selectedLanguages.length} selected</Badge>}
            </div>
            <ScrollArea className="h-64 rounded-lg border border-border">
              <div className="grid grid-cols-2 gap-2 p-3">
                {languages.map((lang) => (
                  <Label
                    key={lang.code}
                    className={`flex cursor-pointer items-center gap-3 rounded-md border p-2 transition-all ${
                      selectedLanguages.includes(lang.code)
                        ? "border-primary bg-primary/5"
                        : "border-transparent hover:bg-muted"
                    }`}
                  >
                    <Checkbox
                      checked={selectedLanguages.includes(lang.code)}
                      onCheckedChange={() => handleLanguageToggle(lang.code)}
                    />
                    <div>
                      <p className="text-sm font-medium">{lang.name}</p>
                      <p className="text-xs text-muted-foreground">{lang.region}</p>
                    </div>
                  </Label>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Button
            className="w-full gap-2"
            onClick={handleTranslate}
            disabled={selectedLanguages.length === 0 || isTranslating}
          >
            {isTranslating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Translating...
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" />
                Translate to {selectedLanguages.length} language{selectedLanguages.length !== 1 ? "s" : ""}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
