import React, { createContext, useContext, useState, useRef, useMemo } from 'react';

// Types
export interface Subtitle {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface EditorState {
  videoFile: File | null;
  videoUrl: string | null;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  activeTab: string;
  subtitles: Subtitle[];
  isProcessing: boolean;
  statusMessage: string;
  zoomLevel: number;
}

interface EditorContextType extends EditorState {
  setVideoFile: (file: File | null) => void;
  setVideoUrl: (url: string | null) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setActiveTab: (tab: string) => void;
  setSubtitles: (subs: Subtitle[] | ((prev: Subtitle[]) => Subtitle[])) => void;
  setIsProcessing: (processing: boolean) => void;
  setStatusMessage: (msg: string) => void;
  setZoomLevel: (zoom: number) => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  addSubtitle: (sub: Subtitle) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('ai');
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('SYSTEM LIVE');
  const [zoomLevel, setZoomLevel] = useState(25);

  const togglePlay = () => setIsPlaying(prev => !prev);
  const seekTo = (time: number) => setCurrentTime(Math.max(0, Math.min(time, duration || 60))); // Default duration if 0

  const addSubtitle = (sub: Subtitle) => {
    setSubtitles(prev => [...prev, sub].sort((a, b) => a.start - b.start));
  };

  const value = {
    videoFile, setVideoFile,
    videoUrl, setVideoUrl,
    duration, setDuration,
    currentTime, setCurrentTime,
    isPlaying, setIsPlaying,
    activeTab, setActiveTab,
    subtitles, setSubtitles,
    isProcessing, setIsProcessing,
    statusMessage, setStatusMessage,
    zoomLevel, setZoomLevel,
    togglePlay,
    seekTo,
    addSubtitle
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
