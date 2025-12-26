import React, { createContext, useContext, useState, useRef, useMemo } from 'react';

// Types
interface Subtitle {
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
}

interface EditorContextType extends EditorState {
  setVideoFile: (file: File | null) => void;
  setVideoUrl: (url: string | null) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setActiveTab: (tab: string) => void;
  setSubtitles: (subs: Subtitle[]) => void;
  setIsProcessing: (processing: boolean) => void;
  setStatusMessage: (msg: string) => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('ai');
  const [subtitles, setSubtitles] = useState<Subtitle[]>([
     { id: 1, start: 5, end: 12, text: "WELCOME TO THE FUTURE" },
     { id: 2, start: 15, end: 22, text: "AI POWERED EDITING" },
     { id: 3, start: 25, end: 35, text: "PRECISION AND SPEED" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('SYSTEM LIVE');

  const togglePlay = () => setIsPlaying(prev => !prev);
  const seekTo = (time: number) => setCurrentTime(Math.max(0, Math.min(time, duration)));

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
    togglePlay,
    seekTo
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
