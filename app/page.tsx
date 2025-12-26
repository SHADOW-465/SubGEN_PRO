import Link from "next/link";
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
    <div className="min-h-screen bg-transparent text-white overflow-y-auto">
      {/* Navigation - Glass Effect */}
      <header className="sticky top-0 z-50 px-6 py-4">
        <div className="glass-panel rounded-full h-16 flex items-center justify-between px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Sparkles className="h-4 w-4 text-[#E5352B]" />
              <span className="text-sm font-black tracking-widest uppercase italic">
                SubGEN <span className="text-[#E5352B] not-italic">PRO</span>
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#ai-features"
              className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              AI Powers
            </Link>
            <Link
              href="#pricing"
              className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button
                className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                Sign In
              </button>
            </Link>
            <Link href="/dashboard">
              <button
                className="pill-box px-6 py-2.5 bg-[#E5352B] hover:bg-[#c92a20] text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(229,53,43,0.4)]"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-24 text-center">
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5352B]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl z-10">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#E5352B]/30 bg-[#E5352B]/10 px-5 py-2">
            <Sparkles className="h-4 w-4 text-[#E5352B]" />
            <span className="text-[#E5352B] text-xs font-black uppercase tracking-widest">Powered by Gemini 2.5 Flash</span>
          </div>

          <h1 className="mb-8 text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              AI Subtitles
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5352B] to-[#d69e2e]">
              Reimagined
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-white/60 font-medium leading-relaxed">
            Transform raw transcripts into publish-ready masterpieces.
            Multi-speaker detection, intelligent refinement, and cinematic styles.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href="/dashboard">
              <button className="h-14 px-10 bg-[#E5352B] rounded-full text-white font-black text-xs uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(229,53,43,0.4)] hover:scale-105 transition-all flex items-center gap-3">
                Start Free <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <button
              className="h-14 px-10 pill-box text-white/80 font-black text-xs uppercase tracking-[0.3em] gap-3 hover:bg-white/10"
            >
              <Play className="h-4 w-4 fill-current" /> Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Stats Pill Grid */}
        <div className="mx-auto mt-24 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { val: "98%", label: "Accuracy" },
            { val: "100+", label: "Languages" },
            { val: "10x", label: "Faster" }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-8 rounded-[32px] flex flex-col items-center justify-center hover:bg-white/10 transition-all">
              <div className="text-5xl font-black text-white mb-2 tracking-tighter">{stat.val}</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Features Section - Liquid Cards */}
      <section id="ai-features" className="py-24 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest italic mb-4">
              Neural <span className="text-[#E5352B]">Engine</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Wand2, title: "Semantic Refiner", desc: "Fixes grammar and phrasing while keeping sync." },
              { icon: Languages, title: "Global Translator", desc: "Context-aware translation for 100+ locales." },
              { icon: Palette, title: "Tone Shifter", desc: "Rewrite dialogue: 'Formal', 'Hype', or 'Cinematic'." },
              { icon: TrendingUp, title: "Marketing Hooks", desc: "Generates viral hooks and hashtags instantly." },
              { icon: Mic, title: "Voice Refinement", desc: "Cleans up spoken stumbles in real-time." },
              { icon: Scissors, title: "Smart Trim", desc: "Auto-remove silence and fillers." }
            ].map((feature, i) => (
              <div key={i} className="glass-panel p-8 rounded-[40px] group hover:scale-[1.02] transition-transform duration-500 border-white/5 hover:border-[#E5352B]/30">
                <div className="mb-6 w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#E5352B] transition-colors duration-500 shadow-inner">
                  <feature.icon className="h-6 w-6 text-white/70 group-hover:text-white" />
                </div>
                <h3 className="mb-3 text-sm font-black text-white uppercase tracking-widest">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Glass Slabs */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest italic">
              Access <span className="text-[#E5352B]">Levels</span>
            </h2>
           </div>

          <div className="grid gap-8 md:grid-cols-3 items-center">
            {/* Free */}
            <div className="glass-panel p-8 rounded-[40px] opacity-80 hover:opacity-100 transition-opacity">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/50 mb-6">Starter</h3>
              <div className="text-4xl font-black text-white mb-8">$0</div>
              <ul className="space-y-4 mb-8">
                {["3 Videos/mo", "Basic Export", "1 Language"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full border border-white/20 text-white/60 font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                Get Started
              </button>
            </div>

            {/* Pro - Highlighted */}
            <div className="p-[1px] rounded-[48px] bg-gradient-to-b from-[#E5352B] to-[#1a0d0a] shadow-[0_20px_60px_rgba(229,53,43,0.3)] scale-105 z-10">
              <div className="bg-[#1a0d0a] p-10 rounded-[47px] h-full flex flex-col">
                <div className="mb-6 flex justify-between items-center">
                   <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#E5352B]">Pro</h3>
                   <div className="px-3 py-1 rounded-full bg-[#E5352B]/20 text-[#E5352B] text-[9px] font-black uppercase tracking-widest">Popular</div>
                </div>
                <div className="text-5xl font-black text-white mb-8">$19</div>
                <ul className="space-y-4 mb-10 flex-1">
                  {["Unlimited Videos", "4K Export", "All AI Tools", "Priority Render"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E5352B]" /> {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-5 rounded-full bg-[#E5352B] text-white font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-[0_0_20px_rgba(229,53,43,0.5)]">
                  Unlock Pro
                </button>
              </div>
            </div>

             {/* Studio */}
             <div className="glass-panel p-8 rounded-[40px] opacity-80 hover:opacity-100 transition-opacity">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/50 mb-6">Studio</h3>
              <div className="text-4xl font-black text-white mb-8">$49</div>
              <ul className="space-y-4 mb-8">
                {["API Access", "Team Seats", "Custom Models"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full border border-white/20 text-white/60 font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-[#E5352B]" />
            <span className="font-black text-white tracking-widest uppercase">SubGEN PRO</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
            © 2025 SubGEN PRO. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
