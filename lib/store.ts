// SubGEN PRO - Global State Types and Utilities

export interface Subtitle {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
  confidence: number;
  track: 'master' | 'translation';
}

export interface SubtitleTrack {
  id: string;
  name: string;
  language: string;
  subtitles: Subtitle[];
}

export interface StyleSettings {
  fontSize: number;
  yPosition: number;
  textAlign: 'left' | 'center' | 'right';
  bgOpacity: number;
  fontFamily: string;
  textColor: string;
  bgColor: string;
}

export interface AIState {
  isProcessing: boolean;
  currentTask: string | null;
  progress: number;
}

export const defaultStyleSettings: StyleSettings = {
  fontSize: 24,
  yPosition: 90,
  textAlign: 'center',
  bgOpacity: 80,
  fontFamily: 'Inter',
  textColor: '#ffffff',
  bgColor: '#000000',
};

// Format time as MM:SS:ms
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
}

// Parse time string back to seconds
export function parseTime(timeStr: string): number {
  const parts = timeStr.split(':');
  if (parts.length === 3) {
    const mins = parseInt(parts[0], 10);
    const secs = parseInt(parts[1], 10);
    const ms = parseInt(parts[2], 10);
    return mins * 60 + secs + ms / 100;
  }
  return 0;
}

// Exponential backoff for AI fetch simulations
export async function simulateAIFetch<T>(
  mockData: T,
  baseDelay: number = 1000,
  maxRetries: number = 3
): Promise<T> {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      // Simulate network delay with exponential backoff
      const delay = baseDelay * Math.pow(2, retries);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Simulate occasional failures (10% chance)
      if (Math.random() < 0.1 && retries < maxRetries - 1) {
        throw new Error('Simulated network error');
      }
      
      return mockData;
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        throw error;
      }
    }
  }
  
  return mockData;
}

// Generate SRT format
export function generateSRT(subtitles: Subtitle[]): string {
  return subtitles
    .map((sub, index) => {
      const startTime = formatSRTTime(sub.startTime);
      const endTime = formatSRTTime(sub.endTime);
      return `${index + 1}\n${startTime} --> ${endTime}\n${sub.text}\n`;
    })
    .join('\n');
}

// Generate VTT format
export function generateVTT(subtitles: Subtitle[]): string {
  const header = 'WEBVTT\n\n';
  const content = subtitles
    .map((sub) => {
      const startTime = formatVTTTime(sub.startTime);
      const endTime = formatVTTTime(sub.endTime);
      return `${startTime} --> ${endTime}\n${sub.text}\n`;
    })
    .join('\n');
  return header + content;
}

// Generate ASS format
export function generateASS(subtitles: Subtitle[], styles: StyleSettings): string {
  const header = `[Script Info]
Title: SubGEN PRO Export
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, BackColour, Bold, Italic, Alignment, MarginV
Style: Default,${styles.fontFamily},${styles.fontSize},&H00FFFFFF,&H80000000,0,0,2,${100 - styles.yPosition}

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

  const events = subtitles
    .map((sub) => {
      const startTime = formatASSTime(sub.startTime);
      const endTime = formatASSTime(sub.endTime);
      return `Dialogue: 0,${startTime},${endTime},Default,,0,0,0,,${sub.text}`;
    })
    .join('\n');

  return header + events;
}

function formatSRTTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
}

function formatVTTTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

function formatASSTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const cs = Math.floor((seconds % 1) * 100);
  return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
}

// Mock AI responses
export const mockAIResponses = {
  transcribe: (duration: number): Subtitle[] => {
    const subtitles: Subtitle[] = [];
    const phrases = [
      "Welcome to our product demonstration.",
      "Today we'll explore the key features.",
      "Let's start with the main dashboard.",
      "You can see all your projects here.",
      "Click on any project to open the editor.",
      "The AI transcription is incredibly accurate.",
      "It supports over 100 languages.",
      "Multi-speaker detection works automatically.",
      "You can edit any subtitle in real-time.",
      "Export to SRT, VTT, or ASS formats.",
    ];
    
    let currentTime = 0;
    const avgDuration = Math.min(4, duration / phrases.length);
    
    phrases.forEach((text, i) => {
      if (currentTime < duration) {
        subtitles.push({
          id: `sub-${i}`,
          startTime: currentTime,
          endTime: Math.min(currentTime + avgDuration - 0.3, duration),
          text,
          speaker: i % 3 === 0 ? 'Host' : i % 3 === 1 ? 'Guest' : undefined,
          confidence: 0.85 + Math.random() * 0.15,
          track: 'master',
        });
        currentTime += avgDuration;
      }
    });
    
    return subtitles;
  },
  
  refine: (subtitles: Subtitle[]): Subtitle[] => {
    return subtitles.map(sub => ({
      ...sub,
      text: sub.text
        .replace(/\bi\b/g, 'I')
        .replace(/\s+/g, ' ')
        .trim(),
      confidence: Math.min(1, sub.confidence + 0.05),
    }));
  },
  
  translate: (subtitles: Subtitle[], targetLang: string): Subtitle[] => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        "Welcome to our product demonstration.": "Bienvenido a nuestra demostración del producto.",
        "Today we'll explore the key features.": "Hoy exploraremos las características clave.",
        "Let's start with the main dashboard.": "Empecemos con el panel principal.",
      },
      ja: {
        "Welcome to our product demonstration.": "製品デモンストレーションへようこそ。",
        "Today we'll explore the key features.": "今日は主な機能を探ります。",
        "Let's start with the main dashboard.": "メインダッシュボードから始めましょう。",
      },
    };
    
    return subtitles.map(sub => ({
      ...sub,
      id: `trans-${sub.id}`,
      text: translations[targetLang]?.[sub.text] || `[${targetLang.toUpperCase()}] ${sub.text}`,
      track: 'translation' as const,
    }));
  },
  
  shiftTone: (subtitles: Subtitle[], tone: 'hype' | 'formal' | 'dramatic'): Subtitle[] => {
    const toneModifiers: Record<string, (text: string) => string> = {
      hype: (text) => `🔥 ${text.toUpperCase()}! 🚀`,
      formal: (text) => text.replace(/!/g, '.').replace(/\?+/g, '?'),
      dramatic: (text) => `... ${text} ...`,
    };
    
    return subtitles.map(sub => ({
      ...sub,
      text: toneModifiers[tone]?.(sub.text) || sub.text,
    }));
  },
  
  generateHooks: (subtitles: Subtitle[]): { hook: string; summary: string; hashtags: string[] } => {
    const fullText = subtitles.map(s => s.text).join(' ');
    return {
      hook: "🎬 You won't believe what this AI can do with your videos!",
      summary: `This video covers: ${fullText.slice(0, 100)}...`,
      hashtags: ['#AI', '#VideoEditing', '#Subtitles', '#ContentCreator', '#SubGENPRO'],
    };
  },
};
