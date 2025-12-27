"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Plus,
  Search,
  Grid3X3,
  List,
  MoreVertical,
  FolderOpen,
  Star,
  Clock,
  Trash2,
  Upload,
  Video,
  Settings,
  CreditCard,
  LogOut,
  ChevronDown,
  ArrowRight,
  Play,
  Zap
} from "lucide-react";

// Mock data
interface Project {
  id: string;
  name: string;
  status: "processing" | "ready" | "needs_review" | "error";
  duration: string;
  languages: string[];
  updatedAt: string;
  thumbnail: string;
  progress?: number;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Marketing Webinar Q3",
    status: "ready",
    duration: "45:32",
    languages: ["EN", "ES", "FR"],
    updatedAt: "2 hours ago",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "2",
    name: "Product Demo Video",
    status: "processing",
    duration: "12:15",
    languages: ["EN"],
    updatedAt: "10 minutes ago",
    thumbnail: "/placeholder.svg?height=180&width=320",
    progress: 67,
  },
  {
    id: "3",
    name: "Interview with CEO",
    status: "needs_review",
    duration: "28:45",
    languages: ["EN", "HI"],
    updatedAt: "1 day ago",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "4",
    name: "Tutorial: Getting Started",
    status: "ready",
    duration: "15:00",
    languages: ["EN", "ES", "DE", "JA"],
    updatedAt: "3 days ago",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
];

const statusConfig = {
  processing: {
    label: "Processing",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20 pill-box px-3 py-1 text-[10px] font-black uppercase tracking-wider",
  },
  ready: {
    label: "Ready",
    className: "bg-green-500/10 text-green-400 border-green-500/20 pill-box px-3 py-1 text-[10px] font-black uppercase tracking-wider",
  },
  needs_review: {
    label: "Review",
    className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 pill-box px-3 py-1 text-[10px] font-black uppercase tracking-wider",
  },
  error: {
    label: "Error",
    className: "bg-red-500/10 text-red-400 border-red-500/20 pill-box px-3 py-1 text-[10px] font-black uppercase tracking-wider",
  },
};

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const filteredProjects = mockProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file upload
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white overflow-y-auto">

      {/* Top Navigation - Glass Strip */}
      <header className="sticky top-4 z-50 px-6 pointer-events-none">
        <div className="glass-panel rounded-full h-20 flex items-center justify-between px-8 shadow-2xl pointer-events-auto max-w-[1600px] mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
               <div className="w-10 h-10 rounded-full bg-[#E5352B]/10 border border-[#E5352B]/20 flex items-center justify-center group-hover:bg-[#E5352B]/20 transition-all">
                  <Sparkles className="h-5 w-5 text-[#E5352B]" />
               </div>
               <span className="text-sm font-black tracking-widest uppercase italic text-white">
                  SubGEN <span className="text-[#E5352B] not-italic">PRO</span>
               </span>
            </Link>
            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
            <nav className="hidden items-center gap-4 md:flex">
               {['Projects', 'Templates', 'Glossaries'].map((item, i) => (
                  <button key={i} className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all
                    ${i === 0
                        ? 'bg-white text-[#3A1C14] shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </button>
               ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                    type="text"
                    placeholder="SEARCH PROJECTS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 w-64 rounded-full bg-black/20 border border-white/10 pl-10 pr-4 text-[10px] font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-[#E5352B]/50 transition-all uppercase tracking-wider"
                />
             </div>

             <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all">
                <Settings className="w-4 h-4" />
             </button>

             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E5352B] to-[#1a0d0a] border border-[#E5352B]/50 flex items-center justify-center font-black text-xs shadow-[0_0_10px_rgba(229,53,43,0.4)]">
                J
             </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1600px] mx-auto pt-8 px-6 pb-10 gap-8">

        {/* Floating Sidebar */}
        <aside className="hidden w-64 flex-col gap-6 md:flex sticky top-28 h-[calc(100vh-8rem)]">
           <button
              onClick={() => setUploadModalOpen(true)}
              className="w-full py-4 bg-[#E5352B] rounded-[24px] text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(229,53,43,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Plus className="h-4 w-4" /> New Project
           </button>

           <div className="glass-panel flex-1 rounded-[32px] p-6 flex flex-col gap-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 px-2">Library</h3>
              {[
                  { icon: Clock, label: "Recent", active: true },
                  { icon: Star, label: "Favorites", active: false },
                  { icon: FolderOpen, label: "All Files", active: false },
                  { icon: Trash2, label: "Trash", active: false }
              ].map((item, i) => (
                  <button key={i} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all
                      ${item.active
                        ? 'bg-white/10 text-white border border-white/10 shadow-lg'
                        : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                  >
                      <item.icon className={`w-4 h-4 ${item.active ? 'text-[#E5352B]' : 'opacity-50'}`} />
                      {item.label}
                  </button>
              ))}

              <div className="mt-auto pt-6 border-t border-white/5">
                 <div className="bg-gradient-to-br from-[#3A1C14] to-[#1a0d0a] rounded-2xl p-5 border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Zap className="w-12 h-12 text-[#E5352B]" />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Usage</div>
                    <div className="flex items-end gap-1 mb-2">
                        <span className="text-2xl font-black text-white">4</span>
                        <span className="text-xs font-bold text-white/40 mb-1">/ 20</span>
                    </div>
                    <Progress value={20} className="h-1.5 bg-black/40 mb-4" />
                    <button className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E5352B] hover:text-white transition-colors flex items-center gap-1">
                        Upgrade Plan <ArrowRight className="w-3 h-3" />
                    </button>
                 </div>
              </div>
           </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col gap-8">

          {/* Header Row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
                 Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5352B] to-[#d69e2e]">Studio</span>
              </h1>
              <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
                Manage your subtitle projects
              </p>
            </div>

            <div className="flex items-center gap-3 bg-black/20 p-1.5 rounded-full border border-white/10">
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Upload Drop Zone - Liquid Style */}
          <motion.div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
            className={`relative rounded-[32px] border-2 border-dashed p-10 text-center transition-all overflow-hidden group cursor-pointer
                ${isDragOver
                ? "border-[#E5352B] bg-[#E5352B]/5"
                : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${isDragOver ? 'bg-[#E5352B]/20 text-[#E5352B]' : 'bg-white/5 text-white/30 group-hover:text-white group-hover:bg-white/10'}`}>
                <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white uppercase italic tracking-wider mb-2">Drop Master Video</h3>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              or <span className="text-[#E5352B] underline decoration-[#E5352B]/50 hover:text-white transition-colors">Browse Files</span> to upload
            </p>
          </motion.div>

          {/* Projects Grid/List */}
          {filteredProjects.length === 0 ? (
            <div className="glass-panel p-12 rounded-[32px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                   <Video className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="text-lg font-black text-white uppercase italic tracking-wider mb-2">No Projects</h3>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-8 max-w-md">
                  Upload your first video to unlock the power of the Neural Engine.
                </p>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="pill-box px-8 py-3 bg-[#E5352B] text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#c92a20]"
                >
                  Create Project
                </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProjectListItem project={project} />
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status];

  return (
    <Link href={`/editor/${project.id}`}>
      <div className="group cursor-pointer relative rounded-[32px] p-2 bg-white/[0.03] border border-white/5 hover:border-[#E5352B]/30 hover:bg-white/[0.06] transition-all duration-500 shadow-2xl hover:scale-[1.02]">

        {/* Thumbnail Container */}
        <div className="relative aspect-video rounded-[24px] overflow-hidden mb-4 bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3A1C14] to-[#1a0d0a] opacity-60 mix-blend-overlay z-10" />
          <img
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
          />

          <div className="absolute top-3 right-3 z-20">
             <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[9px] font-black text-white tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#d69e2e]" /> {project.duration}
             </div>
          </div>

          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-[#E5352B]/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(229,53,43,0.5)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
               <Play className="w-6 h-6 text-white ml-1 fill-white" />
            </div>
          </div>

          {project.status === "processing" && project.progress && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
              <motion.div
                className="h-full bg-[#E5352B]"
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-2 pb-2">
          <div className="flex justify-between items-start mb-3">
             <div>
                <h3 className="font-bold text-white text-sm mb-1 line-clamp-1 group-hover:text-[#E5352B] transition-colors">{project.name}</h3>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{project.updatedAt}</p>
             </div>
             <button className="text-white/30 hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
             </button>
          </div>

          <div className="flex items-center gap-2">
            <div className={status.className}>
                {status.label}
            </div>
            {project.languages.map(lang => (
                <div key={lang} className="px-2 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold text-white/50">{lang}</div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ProjectListItem({ project }: { project: Project }) {
  const status = statusConfig[project.status];

  return (
    <Link href={`/editor/${project.id}`}>
      <div className="group cursor-pointer rounded-[24px] p-3 bg-white/[0.03] border border-white/5 hover:border-[#E5352B]/30 hover:bg-white/[0.06] transition-all flex items-center gap-6">

        {/* Thumbnail */}
        <div className="relative w-32 aspect-video rounded-xl overflow-hidden shrink-0 bg-black">
           <img
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.name}
            className="h-full w-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-[#E5352B]/20 mix-blend-overlay" />
          <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-black text-white tracking-widest">
            {project.duration}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
           <h3 className="font-bold text-white text-sm mb-1 group-hover:text-[#E5352B] transition-colors truncate">{project.name}</h3>
           <div className="flex items-center gap-2">
             <div className={status.className}>{status.label}</div>
             <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">{project.updatedAt}</span>
           </div>
        </div>

        {/* Metadata */}
        <div className="hidden sm:flex gap-1">
           {project.languages.map(lang => (
                <div key={lang} className="px-2 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold text-white/50">{lang}</div>
            ))}
        </div>

        <button className="p-2 rounded-full hover:bg-white/10 text-white/30 hover:text-white transition-colors">
            <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </Link>
  );
}
