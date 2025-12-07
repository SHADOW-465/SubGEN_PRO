import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Globe, Users, Wand2, Download, Clock, CheckCircle2, ArrowRight, Play, Sparkles } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SubtitleAI</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Powered by Gemini 2.5 Flash AI</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
            AI Subtitles That Think Like an Editor
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-pretty">
            Transform raw transcripts into publish-ready subtitles in minutes. Multi-speaker detection, 100+ languages,
            and intelligent refinement that saves you hours of manual editing.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Start Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              <Play className="h-4 w-4" /> Watch Demo
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">No credit card required. 3 free videos per month.</p>
        </div>

        {/* Hero Stats */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="text-3xl font-bold">95-98%</div>
            <div className="text-sm text-muted-foreground">Transcription Accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold">100+</div>
            <div className="text-sm text-muted-foreground">Languages Supported</div>
          </div>
          <div>
            <div className="text-3xl font-bold">90%</div>
            <div className="text-sm text-muted-foreground">Time Saved vs Manual</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Everything You Need for Perfect Subtitles</h2>
            <p className="text-muted-foreground">From transcription to localization, all powered by advanced AI.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Lightning Fast Transcription</h3>
                <p className="text-sm text-muted-foreground">
                  Transcribe hours of video in minutes with Gemini 2.5 Flash. Word-level timestamps and automatic
                  punctuation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Multi-Speaker Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically detect and label up to 10 speakers with 95%+ accuracy. Perfect for interviews and
                  podcasts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Wand2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">AI Refinement</h3>
                <p className="text-sm text-muted-foreground">
                  Context-aware editing that fixes grammar, removes fillers, and optimizes line breaks for readability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">True Localization</h3>
                <p className="text-sm text-muted-foreground">
                  Translate to 100+ languages with cultural adaptation, not just literal translation. Preserve humor and
                  context.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Flexible Export</h3>
                <p className="text-sm text-muted-foreground">
                  Export to SRT, VTT, ASS, and more. Burn subtitles into video with customizable styles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Highlight Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically find viral moments in long videos. Generate clips for TikTok, Reels, and Shorts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">From upload to export in 4 simple steps.</p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-4">
            {[
              { step: "1", title: "Upload", desc: "Drag & drop your video or paste a URL" },
              { step: "2", title: "Transcribe", desc: "AI generates accurate subtitles" },
              { step: "3", title: "Refine", desc: "Review and edit with AI suggestions" },
              { step: "4", title: "Export", desc: "Download in your preferred format" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-border bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">Start free, upgrade when you need more.</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {/* Free Plan */}
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">Free</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />3 videos/month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Up to 30 min each
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />1 language
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Standard presets
                  </li>
                </ul>
                <Link href="/dashboard" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Creator Plan */}
            <Card className="border-primary bg-card relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </span>
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">Creator</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$9</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    20 videos/month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Up to 2 hours each
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Unlimited languages
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    All style presets
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Glossary support
                  </li>
                </ul>
                <Link href="/dashboard" className="block">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">Pro</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    100 videos/month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Up to 10 hours each
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Priority processing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Team collaboration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    API access
                  </li>
                </ul>
                <Link href="/dashboard" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Save Hours on Every Video?</h2>
            <p className="mb-8 text-muted-foreground">Join thousands of creators using AI-powered subtitles.</p>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold">SubtitleAI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 SubtitleAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
