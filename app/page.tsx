import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Globe,
  Users,
  Wand2,
  Download,
  Clock,
  CheckCircle2,
  ArrowRight,
  Play,
  Sparkles,
  Mic,
  TrendingUp,
  Palette,
  Scissors,
  Languages,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090b0f] text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090b0f]/95 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#1a365d] to-[#1a365d]/50">
              <Sparkles className="h-5 w-5 text-[#d69e2e]" />
              <span className="text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                SubGEN PRO
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#ai-features"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              AI Powers
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/80 text-black font-semibold hover:from-[#d69e2e]/90 hover:to-[#d69e2e]/70"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-24 text-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a365d]/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d69e2e]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d69e2e]/30 bg-[#d69e2e]/10 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-[#d69e2e]" />
            <span className="text-[#d69e2e]">Powered by Gemini 2.5 Flash AI</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              AI Subtitles That
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/60 bg-clip-text text-transparent">
              Think Like an Editor
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60">
            Transform raw transcripts into publish-ready subtitles in minutes.
            Multi-speaker detection, 100+ languages, and intelligent refinement
            that saves you hours of manual editing.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/80 text-black font-semibold hover:from-[#d69e2e]/90 hover:to-[#d69e2e]/70 px-8"
              >
                Start Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              <Play className="h-4 w-4" /> Watch Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/40">
            No credit card required. 3 free videos per month.
          </p>
        </div>

        {/* Hero Stats */}
        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-4xl font-bold text-[#d69e2e]">98%</div>
            <div className="text-sm text-white/60">Transcription Accuracy</div>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-4xl font-bold text-[#d69e2e]">100+</div>
            <div className="text-sm text-white/60">Languages Supported</div>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-4xl font-bold text-[#d69e2e]">90%</div>
            <div className="text-sm text-white/60">Time Saved vs Manual</div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section
        id="ai-features"
        className="py-24 border-t border-white/10 bg-gradient-to-b from-[#0d1117] to-[#090b0f]"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1a365d]/50 bg-[#1a365d]/20 px-4 py-2 text-sm text-white/80">
              <Zap className="h-4 w-4 text-[#d69e2e]" />
              LLM-Powered Features
            </div>
            <h2 className="mb-4 text-4xl font-bold text-white">
              The AI Brain Behind SubGEN PRO
            </h2>
            <p className="text-white/60">
              Harness the power of Gemini to transform your subtitle workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-white/10 bg-gradient-to-br from-[#1a365d]/20 to-[#090b0f] backdrop-blur-sm hover:border-[#d69e2e]/30 transition-all group">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#d69e2e]/10 group-hover:bg-[#d69e2e]/20 transition-colors">
                  <Wand2 className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  ✨ AI Semantic Refiner
                </h3>
                <p className="text-sm text-white/60">
                  Analyzes the entire subtitle track to fix punctuation,
                  capitalization, and awkward phrasing while maintaining perfect
                  timestamp synchronization.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-[#1a365d]/20 to-[#090b0f] backdrop-blur-sm hover:border-[#d69e2e]/30 transition-all group">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#d69e2e]/10 group-hover:bg-[#d69e2e]/20 transition-colors">
                  <Languages className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  ✨ AI Global Translator
                </h3>
                <p className="text-sm text-white/60">
                  Uses context-aware translation to convert your subtitles into
                  any target language without losing the "soul" of the dialogue.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-[#1a365d]/20 to-[#090b0f] backdrop-blur-sm hover:border-[#d69e2e]/30 transition-all group">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#d69e2e]/10 group-hover:bg-[#d69e2e]/20 transition-colors">
                  <Palette className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  ✨ AI Tone Shifter
                </h3>
                <p className="text-sm text-white/60">
                  A creative tool that rewrites your dialogue to match a specific
                  vibe, such as "Formal", "Hype/Viral", or "Dramatic Cinematic".
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-[#1a365d]/20 to-[#090b0f] backdrop-blur-sm hover:border-[#d69e2e]/30 transition-all group">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#d69e2e]/10 group-hover:bg-[#d69e2e]/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  ✨ AI Marketing Hooks
                </h3>
                <p className="text-sm text-white/60">
                  Scans the transcript to generate viral-ready summaries, hooks,
                  and hashtags for social media distribution.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-[#1a365d]/20 to-[#090b0f] backdrop-blur-sm hover:border-[#d69e2e]/30 transition-all group">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#d69e2e]/10 group-hover:bg-[#d69e2e]/20 transition-colors">
                  <Mic className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  ✨ AI Voice Refinement
                </h3>
                <p className="text-sm text-white/60">
                  In Live Capture mode, Gemini cleans up your spoken words into
                  polished, broadcast-ready subtitles as you record.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-[#1a365d]/20 to-[#090b0f] backdrop-blur-sm hover:border-[#d69e2e]/30 transition-all group">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#d69e2e]/10 group-hover:bg-[#d69e2e]/20 transition-colors">
                  <Scissors className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  ✨ Smart Timeline Editor
                </h3>
                <p className="text-sm text-white/60">
                  Professional-grade timeline with zoom, split tools, draggable
                  pills, and precise timing controls like Premiere Pro.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="border-t border-white/10 bg-[#090b0f] py-24"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Everything You Need for Perfect Subtitles
            </h2>
            <p className="text-white/60">
              From transcription to localization, all powered by advanced AI.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a365d]/30">
                  <Zap className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Lightning Fast Transcription
                </h3>
                <p className="text-sm text-white/60">
                  Transcribe hours of video in minutes with Gemini 2.5 Flash.
                  Word-level timestamps and automatic punctuation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a365d]/30">
                  <Users className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Multi-Speaker Detection
                </h3>
                <p className="text-sm text-white/60">
                  Automatically detect and label up to 10 speakers with 95%+
                  accuracy. Perfect for interviews and podcasts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a365d]/30">
                  <Globe className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  True Localization
                </h3>
                <p className="text-sm text-white/60">
                  Translate to 100+ languages with cultural adaptation, not just
                  literal translation. Preserve humor and context.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a365d]/30">
                  <Download className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Flexible Export
                </h3>
                <p className="text-sm text-white/60">
                  Export to SRT, VTT, ASS, and more. Burn subtitles into video
                  with customizable styles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a365d]/30">
                  <Clock className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Highlight Detection
                </h3>
                <p className="text-sm text-white/60">
                  Automatically find viral moments in long videos. Generate clips
                  for TikTok, Reels, and Shorts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a365d]/30">
                  <Wand2 className="h-6 w-6 text-[#d69e2e]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  AI Refinement
                </h3>
                <p className="text-sm text-white/60">
                  Context-aware editing that fixes grammar, removes fillers, and
                  optimizes line breaks for readability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="border-t border-white/10 bg-gradient-to-b from-[#0d1117] to-[#090b0f] py-24"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-white/60">
              Start free, upgrade when you need more.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {/* Free Plan */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-white">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-white/60">/month</span>
                </div>
                <ul className="mb-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />3
                    videos/month
                  </li>
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    Up to 30 min each
                  </li>
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />1 language
                  </li>
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    Standard presets
                  </li>
                </ul>
                <Link href="/dashboard" className="block">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Creator Plan */}
            <Card className="border-[#d69e2e]/50 bg-gradient-to-br from-[#1a365d]/30 to-[#090b0f] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/80 px-4 py-1 text-xs font-semibold text-black">
                  Popular
                </span>
              </div>
              <CardContent className="p-6 pt-8">
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Creator
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#d69e2e]">$9</span>
                  <span className="text-white/60">/month</span>
                </div>
                <ul className="mb-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    20 videos/month
                  </li>
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    Up to 2 hours each
                  </li>
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    Unlimited languages
                  </li>
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    All AI features
                  </li>
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    Priority support
                  </li>
                </ul>
                <Link href="/dashboard" className="block">
                  <Button className="w-full bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/80 text-black font-semibold hover:from-[#d69e2e]/90 hover:to-[#d69e2e]/70">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-white">Pro</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">$29</span>
                  <span className="text-white/60">/month</span>
                </div>
                <ul className="mb-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    100 videos/month
                  </li>
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    Up to 10 hours each
                  </li>
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    Priority processing
                  </li>
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    Team collaboration
                  </li>
                  <li className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#d69e2e]" />
                    API access
                  </li>
                </ul>
                <Link href="/dashboard" className="block">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Ready to Save Hours on Every Video?
            </h2>
            <p className="mb-8 text-white/60">
              Join thousands of creators using AI-powered subtitles.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/80 text-black font-semibold hover:from-[#d69e2e]/90 hover:to-[#d69e2e]/70 px-8"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-[#0d1117]">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#d69e2e]" />
            <span className="font-semibold text-white">SubGEN PRO</span>
          </div>
          <p className="text-sm text-white/40">
            © 2025 SubGEN PRO. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
