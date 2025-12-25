"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Zap,
  Globe,
  FileText,
  ArrowRight,
  Play,
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
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  ready: {
    label: "Ready",
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  needs_review: {
    label: "Needs Review",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  error: {
    label: "Error",
    className: "bg-red-500/20 text-red-400 border-red-500/30",
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
    <div className="min-h-screen bg-[#090b0f] text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090b0f]/95 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#1a365d] to-[#1a365d]/50">
                <Sparkles className="h-5 w-5 text-[#d69e2e]" />
                <span className="text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  SubGEN PRO
                </span>
              </div>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                Projects
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                Templates
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                Glossaries
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:bg-white/10"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#d69e2e] to-[#d69e2e]/70 text-black font-bold">
                    J
                  </div>
                  <ChevronDown className="h-4 w-4 text-white/60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-[#0d1117] border-white/10"
              >
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-white/10 bg-[#0d1117]/50 backdrop-blur-xl md:block">
          <div className="flex h-[calc(100vh-4rem)] flex-col p-4">
            <Button
              onClick={() => setUploadModalOpen(true)}
              className="mb-6 gap-2 bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/80 text-black font-semibold hover:from-[#d69e2e]/90 hover:to-[#d69e2e]/70"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>

            <nav className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-white bg-white/5"
              >
                <Clock className="h-4 w-4 text-[#d69e2e]" />
                Recent
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-white/60 hover:text-white hover:bg-white/5"
              >
                <Star className="h-4 w-4" />
                Favorites
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-white/60 hover:text-white hover:bg-white/5"
              >
                <FolderOpen className="h-4 w-4" />
                All Projects
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-white/60 hover:text-white hover:bg-white/5"
              >
                <Trash2 className="h-4 w-4" />
                Trash
              </Button>
            </nav>

            <div className="mt-auto">
              <Card className="bg-gradient-to-br from-[#1a365d]/30 to-[#1a365d]/10 border-white/10">
                <CardContent className="p-4">
                  <div className="mb-2 text-sm font-medium text-white">
                    Usage This Month
                  </div>
                  <div className="mb-2 text-xs text-white/60">4 / 20 videos</div>
                  <Progress value={20} className="h-2 bg-white/10" />
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-3 h-auto p-0 text-xs text-[#d69e2e] hover:text-[#d69e2e]/80"
                  >
                    Upgrade Plan <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header Row */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Projects</h1>
              <p className="text-sm text-white/60">
                Manage your subtitle projects
              </p>
            </div>
            <Button
              onClick={() => setUploadModalOpen(true)}
              className="gap-2 md:hidden bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/80 text-black"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#d69e2e]"
              />
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-white/10 p-1 bg-white/5">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className={`h-8 w-8 ${viewMode === "grid"
                    ? "bg-[#1a365d] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className={`h-8 w-8 ${viewMode === "list"
                    ? "bg-[#1a365d] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Upload Drop Zone */}
          <motion.div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`mb-6 rounded-xl border-2 border-dashed p-8 text-center transition-all ${isDragOver
                ? "border-[#d69e2e] bg-[#d69e2e]/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
          >
            <Upload
              className={`mx-auto h-10 w-10 mb-4 ${isDragOver ? "text-[#d69e2e]" : "text-white/40"
                }`}
            />
            <p className="text-white/80 mb-1">
              Drag and drop your video here
            </p>
            <p className="text-sm text-white/40">
              or{" "}
              <button className="text-[#d69e2e] hover:underline">
                browse files
              </button>
            </p>
          </motion.div>

          {/* Projects Grid/List */}
          {filteredProjects.length === 0 ? (
            <Card className="border-dashed border-white/10 bg-white/5">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 rounded-full bg-white/10 p-4">
                  <Video className="h-8 w-8 text-white/40" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  No projects yet
                </h3>
                <p className="mb-4 text-center text-sm text-white/60">
                  Upload your first video to get started with AI subtitles.
                </p>
                <Button
                  onClick={() => setUploadModalOpen(true)}
                  className="gap-2 bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/80 text-black"
                >
                  <Upload className="h-4 w-4" />
                  Upload Video
                </Button>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            <div className="space-y-2">
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
      <Card className="group cursor-pointer overflow-hidden transition-all border-white/10 bg-[#0d1117]/50 hover:border-[#d69e2e]/50 hover:bg-[#0d1117]/80">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1a365d]/20 to-[#090b0f]">
          <img
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b0f] to-transparent" />
          <div className="absolute bottom-2 right-2 rounded-lg bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {project.duration}
          </div>
          {project.status === "processing" && project.progress && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#d69e2e] to-[#d69e2e]/50"
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
              />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-12 w-12 rounded-full bg-[#d69e2e] flex items-center justify-center">
              <Play className="h-5 w-5 text-black ml-0.5" />
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-medium text-white">
              {project.name}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-white/60 hover:text-white hover:bg-white/10"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#0d1117] border-white/10"
              >
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  Open Editor
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  Export
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={status.className}>
              {status.label}
            </Badge>
            <span className="text-xs text-white/50">
              {project.languages.join(", ")}
            </span>
          </div>
          <p className="mt-2 text-xs text-white/40">{project.updatedAt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function ProjectListItem({ project }: { project: Project }) {
  const status = statusConfig[project.status];

  return (
    <Link href={`/editor/${project.id}`}>
      <Card className="cursor-pointer transition-all border-white/10 bg-[#0d1117]/50 hover:border-[#d69e2e]/50 hover:bg-[#0d1117]/80">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#1a365d]/20 to-[#090b0f]">
            <img
              src={project.thumbnail || "/placeholder.svg"}
              alt={project.name}
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
              {project.duration}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-white">{project.name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="secondary" className={status.className}>
                {status.label}
              </Badge>
              <span className="text-xs text-white/50">
                {project.languages.join(", ")}
              </span>
            </div>
          </div>
          <div className="text-sm text-white/40">{project.updatedAt}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#0d1117] border-white/10"
            >
              <DropdownMenuItem className="text-white hover:bg-white/10">
                Open Editor
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10">
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10">
                Export
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </Link>
  );
}
