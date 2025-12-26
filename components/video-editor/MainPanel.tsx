"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Play, Pause, Upload, Download, Edit3, Settings,
  Trash2, Plus, Scissors, Languages, Sparkles,
  Volume2, Type, Clock, Save, ChevronRight,
  CheckCircle2, AlertCircle, RefreshCw, Layers,
  Maximize2, SkipBack, SkipForward, Layout,
  MousePointer2, Hand, History, Share2, Filter,
  AlignLeft, AlignCenter, AlignRight, Wand2,
  FileText, MessageSquare, Globe, Zap,
  FastForward, Rewind, Info, Mic, Radio, Eye, Target,
  ArrowLeft, Send, Activity, X, MoreHorizontal, LayoutGrid,
  Star
} from 'lucide-react';

// --- Global Configuration ---
const THEME = {
  primary: "#3A1C14",
  secondary: "#1a0d0a",
  accent: "#E5352B",
  gold: "#d69e2e"
};

const MainPanel = () => {
  // --- Core Media State ---
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  // --- Track & Transcription State ---
  const [tracks, setTracks] = useState([{ id: 'track-1', name: 'Master Track', language: 'en', subtitles: [] as any[], active: true }]);
  const [activeTrackId, setActiveTrackId] = useState('track-1');

  // --- UI State ---
  const [activeTab, setActiveTab] = useState('ai');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: 'System Live' });
  const [zoomLevel, setZoomLevel] = useState(25);
  const [draggingSub, setDraggingSub] = useState<{ id: number, startOffset: number } | null>(null);
  const [resizingSub, setResizingSub] = useState<{ id: number, side: 'left' | 'right' } | null>(null);
  const [showSafetyZones, setShowSafetyZones] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [aiInsights, setAiInsights] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [globalStyles, setGlobalStyles] = useState({
    fontFamily: 'Inter, sans-serif',
    fontSize: 22,
    color: '#FFFFFF',
    outlineColor: '#000000',
    outlineWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.85)',
    verticalPosition: 82,
    textAlign: 'center' as 'left' | 'center' | 'right',
    borderRadius: 16
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("gemini_api_key");
    if (stored) setApiKey(stored);
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("gemini_api_key", key);
  }

  // --- Derived State ---
  const activeTrack = useMemo(() => tracks.find(t => t.id === activeTrackId) || tracks[0], [tracks, activeTrackId]);
  const activeSubtitles = activeTrack.subtitles;
  const visibleSubtitle = useMemo(() => activeSubtitles.find(s => currentTime >= s.start && currentTime <= s.end), [activeSubtitles, currentTime]);

  // --- Gemini AI Integration ---
  const callGemini = async (prompt: string, system = "", useJson = true) => {
    if (!apiKey) {
      setStatus({ type: 'error', message: 'Missing API Key' });
      setActiveTab('prefs');
      throw new Error("Missing API Key");
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: system }] },
      generationConfig: useJson ? { responseMimeType: "application/json" } : {}
    };

    const delays = [1000, 2000, 4000, 8000];
    for (let i = 0; i <= delays.length; i++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error();
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } catch (e) {
        if (i === delays.length) throw e;
        await new Promise(r => setTimeout(r, delays[i]));
      }
    }
  };

  const handleAITranscribe = async () => {
    if (!videoFile) return;
    setIsProcessing(true);
    setStatus({ type: 'processing', message: '✨ Analyzing Media...' });

    try {
      if (videoFile.size > 20 * 1024 * 1024) { // 20MB limit for browser-based base64 handling safety
         throw new Error("File too large for client-side AI analysis (Limit: 20MB). Please use a shorter clip.");
      }

      const reader = new FileReader();
      const base64Data = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          // Remove data URL prefix (e.g., "data:video/mp4;base64,")
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(videoFile);
      });

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{
          parts: [
            { text: `Transcribe this video file. Return JSON: { "subtitles": [{ "start": float, "end": float, "text": "string" }] }. Keep segments under 4 seconds.` },
            { inlineData: { mimeType: videoFile.type, data: base64Data } }
          ]
        }],
        generationConfig: { responseMimeType: "application/json" }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
         const errData = await response.json();
         throw new Error(errData.error?.message || "API Error");
      }

      const data = await response.json();
      const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsedData = JSON.parse(textResult);

      if (parsedData.subtitles) {
        setTracks(prev => prev.map(t => t.id === activeTrackId ? { ...t, subtitles: parsedData.subtitles.map((s: any, idx: number) => ({ ...s, id: Date.now() + idx })) } : t));
        setStatus({ type: 'success', message: 'Transcription Synced' });
      }
    } catch (e: any) {
      console.error(e);
      setStatus({ type: 'error', message: e.message || 'Neural Sync Failed' });
      alert(e.message || "Failed to transcribe. Ensure API Key is valid and file is supported.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAIRefine = async () => {
    if (activeSubtitles.length === 0) return;
    setIsProcessing(true);
    setStatus({ type: 'processing', message: '✨ Polishing Script...' });
    try {
      const prompt = `Refine grammar/flow. Keep timestamps identical. JSON format: { "subtitles": [...] }. Input: ${JSON.stringify(activeSubtitles)}`;
      const result = await callGemini(prompt, "Professional Script Editor.");
      const data = JSON.parse(result);
      if (data.subtitles) {
        setTracks(prev => prev.map(t => t.id === activeTrackId ? { ...t, subtitles: data.subtitles } : t));
        setStatus({ type: 'success', message: 'Track Polished' });
      }
    } catch (e) { setStatus({ type: 'error', message: 'Refinement Failed' }); }
    finally { setIsProcessing(false); }
  };

  const handleAITranslate = async (targetLang: string) => {
    if (activeSubtitles.length === 0) return;
    setIsProcessing(true);
    setStatus({ type: 'processing', message: `✨ Translating to ${targetLang}...` });
    try {
      const prompt = `Translate these subtitles to ${targetLang}. Preserve context and timing. Return JSON format: { "subtitles": [...] }. Input: ${JSON.stringify(activeSubtitles)}`;
      const result = await callGemini(prompt, "Professional Multilingual Translator.");
      const data = JSON.parse(result);
      if (data.subtitles) {
        const newTrackId = `track-${Date.now()}`;
        setTracks(prev => [...prev, { id: newTrackId, name: `${targetLang} Track`, subtitles: data.subtitles, active: true }]);
        setActiveTrackId(newTrackId);
        setStatus({ type: 'success', message: 'Translation Ready' });
      }
    } catch (e) { setStatus({ type: 'error', message: 'Translation Failed' }); }
    finally { setIsProcessing(false); }
  };

  const handleAIShiftTone = async (tone: string) => {
    if (activeSubtitles.length === 0) return;
    setIsProcessing(true);
    setStatus({ type: 'processing', message: `✨ Shifting Tone...` });
    try {
      const prompt = `Rewrite in ${tone} tone. Keep timing. Return JSON format: { "subtitles": [...] }. Input: ${JSON.stringify(activeSubtitles)}`;
      const result = await callGemini(prompt, "Creative Screenwriter.");
      const data = JSON.parse(result);
      if (data.subtitles) {
        setTracks(prev => prev.map(t => t.id === activeTrackId ? { ...t, subtitles: data.subtitles } : t));
        setStatus({ type: 'success', message: `Tone Shifted` });
      }
    } catch (e) { setStatus({ type: 'error', message: 'Tone Shift Failed' }); }
    finally { setIsProcessing(false); }
  };

  const handleAIGenerateHooks = async () => {
    if (activeSubtitles.length === 0) return;
    setIsProcessing(true);
    setStatus({ type: 'processing', message: '✨ Generating Hooks...' });
    try {
      const transcript = activeSubtitles.map(s => s.text).join(' ');
      const prompt = `Generate 3 viral social hooks and a 2-sentence summary based on this content: ${transcript}`;
      const result = await callGemini(prompt, "Expert Social Media Strategist.", false);
      setAiInsights(result);
      setActiveTab('insights');
      setStatus({ type: 'success', message: 'Insights Generated' });
    } catch (e) { setStatus({ type: 'error', message: 'Analysis Failed' }); }
    finally { setIsProcessing(false); }
  };

  const toggleLiveMode = () => {
    if (isLiveMode) {
      recognitionRef.current?.stop();
      setIsLiveMode(false);
      setStatus({ type: 'idle', message: 'Session Recorded' });
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech Recognition not supported in this browser.");
        return;
      }
      setIsLiveMode(true);
      setStatus({ type: 'processing', message: '✨ Listening Live...' });
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = async (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        if (event.results[event.results.length - 1].isFinal) {
           // Basic add for now to avoid rapid API calls in demo
           const newSub = { id: Date.now(), start: currentTime, end: currentTime + 3, text: transcript };
           setTracks(prev => prev.map(t => t.id === activeTrackId ? { ...t, subtitles: [...t.subtitles, newSub].sort((a,b) => a.start - b.start) } : t));
        }
      };
      recognition.start();
      recognitionRef.current = recognition;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      setVideoUrl(URL.createObjectURL(file));
      setVideoFile(file);
      setTracks(prev => prev.map(t => t.id === activeTrackId ? { ...t, subtitles: [] } : t));
      setStatus({ type: 'idle', message: `Loaded: ${file.name}` });
    }
  };

  const exportData = (format: 'SRT' | 'VTT') => {
    if (activeSubtitles.length === 0) return;
    const formatTime = (sec: number, type = 'SRT') => {
      const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = Math.floor(sec % 60), ms = Math.floor((sec % 1) * 1000);
      const pad = (n: number, l=2) => n.toString().padStart(l, '0');
      return type === 'VTT' ? `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}` : `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
    };
    let content = format === 'SRT' ? "" : "WEBVTT\n\n";
    activeSubtitles.forEach((s, i) => {
      if (format === 'SRT') content += `${i + 1}\n${formatTime(s.start)} --> ${formatTime(s.end)}\n${s.text}\n\n`;
      else content += `${formatTime(s.start, 'VTT')} --> ${formatTime(s.end, 'VTT')}\n${s.text}\n\n`;
    });
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `SubGEN_Export.${format.toLowerCase()}`; a.click();
  };

  const seekTo = (time: number) => {
      if (videoRef.current) {
          const newTime = Math.max(0, Math.min(time, duration));
          videoRef.current.currentTime = newTime;
          setCurrentTime(newTime);
      }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) videoRef.current.play(); else videoRef.current.pause();
    setIsPlaying(!videoRef.current.paused);
  };

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (['TEXTAREA', 'INPUT'].includes((document.activeElement as HTMLElement).tagName)) return;
      if (e.key === ' ') { e.preventDefault(); togglePlay(); }
      if (e.key.toLowerCase() === 'j') seekTo(currentTime - 5);
      if (e.key.toLowerCase() === 'l') seekTo(currentTime + 5);
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [currentTime, duration]);

  // --- Components ---
  const LiquidButton = ({ children, className = "", active = false, size = "md", onClick, disabled = false }: any) => {
    const sizeClasses = size === "sm" ? "w-9 h-9" : size === "lg" ? "w-12 h-12" : "w-10 h-10";
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          ${sizeClasses} flex items-center justify-center rounded-full transition-all duration-300 relative group shrink-0
          ${active
            ? 'bg-white/90 text-[#3A1C14] shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110'
            : 'bg-white/10 text-white/80 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 hover:scale-105 active:scale-95 disabled:opacity-30'
          }
          ${className}
        `}
      >
        {children}
      </button>
    );
  };

  const ToolPill = ({ icon: Icon, label, onClick }: any) => (
    <button onClick={onClick} className="w-full flex items-center justify-between p-7 bg-white/[0.03] rounded-[32px] border border-white/5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all group shadow-2xl">
      <span className="flex items-center gap-5 text-white/70"><Icon size={22} className="text-[#E5352B] group-hover:scale-125 transition-all duration-500" /> {label}</span>
      <ChevronRight size={18} className="text-white/20 group-hover:translate-x-3 transition-all duration-500" />
    </button>
  );

  const SliderBox = ({ label, value, min, max, onChange }: any) => (
    <div className="px-2">
      <div className="flex justify-between mb-5">
        <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">{label}</span>
        <span className="text-sm font-mono text-[#E5352B] font-black">{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e)=>onChange(Number(e.target.value))} className="w-full accent-[#E5352B]" />
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#0d0d0f] flex items-center justify-center p-4 lg:p-8 font-sans selection:bg-[#E5352B]/30 overflow-hidden relative">
      <main className="relative z-10 w-full max-w-[1600px] h-[92vh] bg-gradient-to-br from-[#3A1C14] to-[#1a0d0a] rounded-[48px] shadow-2xl overflow-hidden flex flex-col border border-white/10 isolation-isolate">

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 z-40 p-6 flex justify-between items-start pointer-events-none">
          <div className="flex items-center space-x-4 pointer-events-auto">
            <LiquidButton size="lg" className="!bg-[#4A241B]/80 !border-white/10" onClick={() => window.location.reload()}>
              <ArrowLeft size={24} />
            </LiquidButton>
            <div className="px-6 py-2.5 rounded-full bg-black/20 backdrop-blur-3xl border border-white/10 flex items-center justify-center space-x-4">
              <span className="text-white text-sm font-black tracking-tighter italic">SubGEN <span className="text-[#E5352B] not-italic">PRO</span></span>
              <div className="h-4 w-[1px] bg-white/20" />
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${isProcessing || isLiveMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest tabular-nums">{status.message}</span>
              </div>
            </div>
          </div>

          <div className="pointer-events-auto flex items-center space-x-4">
             <div className="flex bg-black/40 backdrop-blur-3xl border border-white/10 p-1.5 rounded-full">
                <button onClick={() => exportData('SRT')} className="px-5 py-2 text-[10px] font-black text-white/50 hover:text-white transition-all uppercase">SRT</button>
                <button onClick={() => exportData('VTT')} className="px-6 py-2 bg-white text-[#3A1C14] rounded-full text-[10px] font-black uppercase shadow-xl">VTT PRO</button>
             </div>
             <LiquidButton><Share2 size={18} /></LiquidButton>
             <LiquidButton><MoreHorizontal size={18} /></LiquidButton>
          </div>
        </div>

        {/* Sidebar Toolbar */}
        <div className="absolute top-32 left-8 z-40 flex flex-col space-y-6 pointer-events-auto">
          <LiquidButton active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} size="lg"><Layout size={20}/></LiquidButton>
          <LiquidButton active={activeTab === 'live'} onClick={() => setActiveTab('live')} size="lg"><Mic size={20}/></LiquidButton>
          <LiquidButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} size="lg"><Sparkles size={20}/></LiquidButton>
          <LiquidButton active={activeTab === 'styles'} onClick={() => setActiveTab('styles')} size="lg"><Type size={20}/></LiquidButton>
          <div className="h-[1px] w-8 bg-white/10 mx-auto" />
          <LiquidButton active={activeTab === 'prefs'} onClick={() => setActiveTab('prefs')} size="lg"><Settings size={20}/></LiquidButton>
        </div>

        {/* Content Canvas */}
        <div className="relative flex-1 w-full overflow-hidden flex">
          <div className="relative flex-1 flex flex-col items-center justify-center p-12">
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[48px] overflow-hidden shadow-2xl border border-white/10 group">
              {videoUrl ? (
                <>
                  <video ref={videoRef} src={videoUrl} className="w-full h-full object-contain pointer-events-none"
                    onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
                    onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                  />
                  {visibleSubtitle && (
                    <div className="absolute w-full px-16 z-20 pointer-events-none" style={{ top: `${globalStyles.verticalPosition}%`, textAlign: globalStyles.textAlign }}>
                      <span className="px-10 py-4 leading-relaxed inline-block shadow-2xl border border-white/20"
                        style={{
                          fontFamily: globalStyles.fontFamily, fontSize: `${globalStyles.fontSize}px`,
                          color: globalStyles.color, backgroundColor: globalStyles.backgroundColor,
                          borderRadius: `${globalStyles.borderRadius}px`, fontWeight: '600',
                          backdropFilter: 'blur(20px)'
                        }}
                      >
                        {visibleSubtitle.text}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-10 px-12 py-5 bg-black/80 backdrop-blur-3xl rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 pointer-events-auto">
                    <button onClick={() => seekTo(currentTime - 10)} className="text-white/40 hover:text-white transition-colors"><Rewind size={26}/></button>
                    <button onClick={togglePlay} className="w-16 h-16 bg-white text-[#3A1C14] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                      {isPlaying ? <Pause size={34} fill="currentColor" /> : <Play size={34} fill="currentColor" className="ml-1" />}
                    </button>
                    <button onClick={() => seekTo(currentTime + 10)} className="text-white/40 hover:text-white"><FastForward size={26}/></button>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-[40px] bg-white/5 flex items-center justify-center border border-white/10 shadow-inner mb-8">
                    <Upload size={40} className="text-white/20" />
                  </div>
                  <button onClick={() => document.getElementById('media-upload')?.click()} className="px-12 py-5 rounded-full bg-white/5 backdrop-blur-2xl border border-white/20 text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all pointer-events-auto">Import Master stream</button>
                  <input id="media-upload" type="file" hidden accept="video/*" onChange={handleFileUpload} />
                </div>
              )}
            </div>
          </div>

          {/* AI Inspector Hub */}
          <div className="w-[440px] h-[78%] absolute right-10 top-1/2 -translate-y-1/2 z-40 bg-[#2d150f]/90 backdrop-blur-[60px] rounded-[48px] border border-white/15 shadow-2xl p-10 flex flex-col isolation-isolate">
            <div className="flex justify-between items-center mb-10 shrink-0">
               <div className="flex items-center space-x-4 text-white font-black text-xs tracking-widest uppercase italic">
                  <Sparkles size={22} className="text-white" />
                  <span>Studio Hub</span>
               </div>
               <LiquidButton size="sm" onClick={() => setActiveTab('timeline')}><X size={18} /></LiquidButton>
            </div>

            <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar space-y-8">
              {activeTab === 'ai' ? (
                <div className="space-y-8">
                   <div className="p-8 bg-black/40 rounded-[32px] border border-white/10 relative overflow-hidden group shadow-2xl">
                      <h4 className="text-white font-black text-sm uppercase tracking-widest mb-3 italic">Neural Decipher</h4>
                      <p className="text-white/40 text-[11px] leading-relaxed mb-8">Deploy Gemini 2.0 Flash for high-accuracy subtitle segments.</p>
                      <button onClick={handleAITranscribe} disabled={isProcessing || !videoUrl} className="w-full py-5 bg-white text-[#3A1C14] font-black text-[11px] uppercase tracking-widest rounded-2xl transition-all disabled:opacity-30">Generate AI Track</button>
                   </div>
                   <div className="space-y-4">
                      <ToolPill icon={Wand2} label="Smart Refinement" onClick={handleAIRefine} />
                      <div className="flex gap-3 p-3 bg-white/[0.03] rounded-[32px] border border-white/5 shadow-2xl">
                        <select id="target-lang" className="flex-1 bg-transparent text-[11px] font-black p-2 border-none focus:ring-0 text-[#d69e2e] uppercase outline-none">
                          <option value="Spanish" className="text-black">Spanish</option>
                          <option value="French" className="text-black">French</option>
                          <option value="Japanese" className="text-black">Japanese</option>
                        </select>
                        <button onClick={() => handleAITranslate((document.getElementById('target-lang') as HTMLSelectElement).value)} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-2xl text-[9px] font-black uppercase transition-all">Translate</button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleAIShiftTone("Hype Viral")} className="py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[9px] font-black uppercase hover:border-[#d69e2e]">Hype Vibe</button>
                        <button onClick={() => handleAIShiftTone("Formal Cinematic")} className="py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[9px] font-black uppercase hover:border-[#d69e2e]">Formal Vibe</button>
                      </div>
                      <ToolPill icon={MessageSquare} label="Social Hooks Tool" onClick={handleAIGenerateHooks} />
                   </div>
                </div>
              ) : activeTab === 'insights' ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center px-2">
                    <h4 className="text-xs font-black uppercase text-[#d69e2e] tracking-widest">AI Insights</h4>
                    <button onClick={() => setActiveTab('ai')} className="text-[10px] font-bold text-zinc-600 hover:text-white transition-colors">BACK</button>
                  </div>
                  <div className="bg-black/60 rounded-[2.5rem] p-8 border border-white/5 shadow-inner">
                    <pre className="whitespace-pre-wrap font-sans text-xs text-zinc-300 leading-[1.8] font-medium italic">{aiInsights || "Synthesizing..."}</pre>
                  </div>
                  <button onClick={() => navigator.clipboard.writeText(aiInsights)} className="w-full py-5 bg-white/5 border border-white/10 rounded-[1.8rem] text-[11px] font-black tracking-widest uppercase">Copy Result</button>
                </div>
              ) : activeTab === 'styles' ? (
                <div className="space-y-10">
                  <SliderBox label="Base Size" value={globalStyles.fontSize} min={12} max={100} onChange={(v:number)=>setGlobalStyles(s=>({...s, fontSize: v}))} />
                  <SliderBox label="Y-Position" value={globalStyles.verticalPosition} min={0} max={100} onChange={(v:number)=>setGlobalStyles(s=>({...s, verticalPosition: v}))} />
                  <div className="flex bg-black/60 p-2 rounded-2xl border border-white/10 shadow-inner">
                    {['left', 'center', 'right'].map(align => (
                      <button key={align} onClick={()=>setGlobalStyles(s=>({...s, textAlign: align as any}))} className={`flex-1 py-4 rounded-xl flex justify-center transition-all ${globalStyles.textAlign === align ? 'bg-white text-[#3A1C14]' : 'text-white/30 hover:text-white'}`}>
                        {align === 'left' ? <AlignLeft size={24}/> : align === 'center' ? <AlignCenter size={24}/> : <AlignRight size={24}/>}
                      </button>
                    ))}
                  </div>
                </div>
              ) : activeTab === 'live' ? (
                 <div className="text-center pt-8">
                    <div className={`w-32 h-32 mx-auto rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-10 transition-all ${isLiveMode ? 'border-[#E5352B] shadow-[0_0_60px_rgba(229,53,43,0.3)] scale-110' : ''}`}>
                       <Mic className={isLiveMode ? 'text-[#E5352B] animate-pulse' : 'text-white/10'} size={48} />
                    </div>
                    <h3 className="text-white font-black text-2xl italic uppercase tracking-widest mb-4">Live Capture</h3>
                    <p className="text-white/40 text-[12px] mb-12 px-8 leading-[1.8]">Stream your voice directly into the timeline. Subtitles will be polished live by ✨ Gemini AI.</p>
                    <button onClick={toggleLiveMode} className={`w-full py-6 rounded-3xl font-black text-xs uppercase tracking-widest transition-all shadow-3xl ${isLiveMode ? 'bg-[#E5352B] text-white' : 'bg-white text-[#3A1C14]'}`}>{isLiveMode ? 'End Broadcast' : 'Initiate Session'}</button>
                 </div>
              ) : activeTab === 'prefs' ? (
                <div className="space-y-6">
                   <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">Preferences</h3>
                   <div className="space-y-2">
                      <label className="text-xs text-white/50 uppercase tracking-wider">Gemini API Key</label>
                      <input
                         type="password"
                         value={apiKey}
                         onChange={(e) => saveApiKey(e.target.value)}
                         className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs"
                         placeholder="Paste your API key here..."
                      />
                      <p className="text-[10px] text-white/30">Required for ASR, Translation and Refinement.</p>
                   </div>
                </div>
              ) : (
                <div className="space-y-4 pb-12">
                  {activeSubtitles.map((sub, idx) => (
                    <div key={sub.id} className={`p-6 rounded-[32px] border transition-all cursor-pointer group ${visibleSubtitle?.id === sub.id ? 'bg-[#E5352B]/20 border-[#E5352B]/40' : 'bg-black/30 border-white/5'}`} onClick={() => seekTo(sub.start)}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono font-black text-[#E5352B] bg-black/40 px-4 py-1 rounded-full shadow-inner tracking-widest">{new Date(sub.start * 1000).toISOString().substr(14, 5)}</span>
                        <button onClick={(e) => { e.stopPropagation(); setTracks(prev => prev.map(t => t.id === activeTrackId ? { ...t, subtitles: t.subtitles.filter(s => s.id !== sub.id) } : t)) }} className="text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={18}/></button>
                      </div>
                      <textarea value={sub.text} onChange={(e) => {
                        const newSubs = [...activeSubtitles]; newSubs[idx].text = e.target.value;
                        setTracks(prev => prev.map(t => t.id === activeTrackId ? { ...t, subtitles: newSubs } : t));
                      }} className="w-full bg-transparent border-none p-0 text-[14px] font-bold leading-[1.6] resize-none focus:ring-0 text-white/80" rows={2} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <LiquidButton size="sm" onClick={() => setShowSafetyZones(!showSafetyZones)} active={showSafetyZones}><Eye size={18} /></LiquidButton>
                <LiquidButton size="sm"><Activity size={18} /></LiquidButton>
              </div>
              <button className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-[#3A1C14] shadow-2xl hover:scale-110 active:scale-95 transition-all group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Send size={28} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Timeline Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-30 h-64 bg-gradient-to-t from-[#1a0d0a] via-[#3A1C14]/40 to-transparent backdrop-blur-xl p-10 flex flex-col justify-end pointer-events-none">
            <div className="relative w-full h-12 mb-10 px-4 pointer-events-auto">
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10" />
              <div ref={timelineContainerRef} className="absolute inset-0 overflow-x-auto no-scrollbar"
                   onMouseDown={(e) => {
                       if (timelineContainerRef.current) {
                           const rect = timelineContainerRef.current.getBoundingClientRect();
                           seekTo((e.clientX - rect.left + timelineContainerRef.current.scrollLeft) / (zoomLevel * 5));
                       }
                   }}
                   onMouseMove={(e) => {
                        if (!draggingSub && !resizingSub) return;
                        if (!timelineContainerRef.current) return;
                        const rect = timelineContainerRef.current.getBoundingClientRect();
                        const x = e.clientX - rect.left + timelineContainerRef.current.scrollLeft;
                        const timeAtMouse = x / (zoomLevel * 5);
                        setTracks(prev => prev.map(t => t.id === activeTrackId ? { ...t, subtitles: t.subtitles.map(s => {
                          if (draggingSub && s.id === draggingSub.id) {
                            const dur = s.end - s.start;
                            const newStart = Math.max(0, timeAtMouse - draggingSub.startOffset);
                            return { ...s, start: newStart, end: newStart + dur };
                          }
                          if (resizingSub && s.id === resizingSub.id) {
                            // Simple resize logic
                            return s;
                          }
                          return s;
                        })} : t));
                   }}
                   onMouseUp={() => { setDraggingSub(null); setResizingSub(null); }}
                   onMouseLeave={() => { setDraggingSub(null); setResizingSub(null); }}
              >
                <div className="h-full relative" style={{ width: `${Math.max(duration * zoomLevel * 5, 1000)}px` }}>
                   {Array.from({ length: Math.ceil(duration) }).map((_, i) => (
                      <div key={i} className="absolute bottom-0 flex flex-col items-center" style={{ left: `${i * zoomLevel * 5}px` }}>
                        <div className={`w-[1px] bg-white/20 ${i % 5 === 0 ? 'h-4' : 'h-2'}`} />
                      </div>
                   ))}
                   {activeSubtitles.map((sub) => (
                    <div key={sub.id}
                        onMouseDown={(e) => { e.stopPropagation(); setDraggingSub({ id: sub.id, startOffset: (e.clientX - e.currentTarget.getBoundingClientRect().left) / (zoomLevel * 5) }); }}
                        className={`absolute h-8 top-[-40px] rounded-xl border flex items-center justify-center px-5 cursor-grab transition-all ${visibleSubtitle?.id === sub.id ? 'bg-[#E5352B]/80 border-white' : 'bg-white/5 border-white/5 text-white/20'}`}
                        style={{ left: `${sub.start * zoomLevel * 5}px`, width: `${Math.max((sub.end - sub.start) * zoomLevel * 5, 20)}px` }}
                    >
                      <span className="text-[10px] font-black truncate uppercase select-none">{sub.text}</span>
                    </div>
                   ))}
                   <div className="absolute top-[-10px] bottom-[-10px] w-[3px] bg-white z-40" style={{ left: `${currentTime * zoomLevel * 5}px` }}>
                      <div className="absolute -top-1.5 -left-2.5 w-5 h-5 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
                   </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 h-16 pointer-events-auto">
              <div className="flex-1 flex items-center bg-black/50 backdrop-blur-3xl rounded-[32px] p-2.5 overflow-hidden border border-white/10 shadow-inner space-x-5">
                 {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className={`h-12 rounded-2xl overflow-hidden border border-white/5 ${i === 3 ? 'w-40 ring-4 ring-white/20 scale-105' : 'w-24 opacity-30'}`}>
                       <div className={`absolute inset-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-[#E5352B] to-[#1a0d0a]' : 'from-indigo-900 to-[#1a0d0a]'}`} />
                    </div>
                 ))}
              </div>
              <LiquidButton size="lg" className="!rounded-[28px] !w-24"><Plus size={28} /></LiquidButton>
            </div>
          </div>
        </div>

        {/* Transport Bar */}
        <div className="h-32 bg-[#0a0504]/90 backdrop-blur-[60px] border-t border-white/10 px-16 flex items-center justify-between shrink-0 pointer-events-auto">
          <div className="flex items-center space-x-8">
            <LiquidButton onClick={() => seekTo(currentTime - 5)}><SkipBack size={24} fill="currentColor" /></LiquidButton>
            <LiquidButton size="lg" className="!bg-white text-[#3A1C14] shadow-3xl" onClick={togglePlay}>
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </LiquidButton>
            <LiquidButton onClick={() => seekTo(currentTime + 5)}><SkipForward size={24} fill="currentColor" /></LiquidButton>
          </div>

          <div className="flex items-center space-x-6">
            <div className="h-12 px-8 rounded-full bg-white text-[#3A1C14] flex items-center space-x-3 shadow-2xl font-black text-xs uppercase tracking-[0.3em]">
              <Star size={16} fill="currentColor" /> <span>4K Cinematic</span>
            </div>
            <div className="h-12 px-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-[11px] font-black uppercase tracking-[0.2em] gap-3 shadow-inner">
               <span className="text-white/20">FPS</span> <span>60</span>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <LiquidButton><LayoutGrid size={22} /></LiquidButton>
            <LiquidButton active={activeTab === 'prefs'} onClick={() => setActiveTab('prefs')}><Settings size={22} /></LiquidButton>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 20px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        input[type=range] { -webkit-appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-runnable-track { height: 4px; background: rgba(255,255,255,0.05); border-radius: 10px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 22px; width: 22px; border-radius: 50%; background: #fff; margin-top: -9px; border: 4px solid #3A1C14; cursor: pointer; }
      `}} />
    </div>
  );
};

export default MainPanel;
