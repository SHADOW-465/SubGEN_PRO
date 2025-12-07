"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
} from "lucide-react"
import { UploadModal } from "@/components/upload-modal"

interface Project {
  id: string
  name: string
  status: "processing" | "ready" | "needs_review" | "error"
  duration: string
  languages: string[]
  updatedAt: string
  thumbnail: string
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
]

const statusConfig = {
  processing: { label: "Processing", className: "bg-blue-500/10 text-blue-500" },
  ready: { label: "Ready", className: "bg-green-500/10 text-green-500" },
  needs_review: { label: "Needs Review", className: "bg-yellow-500/10 text-yellow-500" },
  error: { label: "Error", className: "bg-red-500/10 text-red-500" },
}

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const filteredProjects = mockProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SubtitleAI</span>
            </Link>
            <nav className="hidden items-center gap-4 md:flex">
              <Button variant="ghost" size="sm" className="text-foreground">
                Projects
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Templates
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Glossaries
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    J
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
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
        <aside className="hidden w-60 border-r border-border bg-muted/30 md:block">
          <div className="flex h-[calc(100vh-4rem)] flex-col p-4">
            <Button onClick={() => setUploadModalOpen(true)} className="mb-6 gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>

            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2 text-foreground">
                <Clock className="h-4 w-4" />
                Recent
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                <Star className="h-4 w-4" />
                Favorites
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                <FolderOpen className="h-4 w-4" />
                All Projects
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                <Trash2 className="h-4 w-4" />
                Trash
              </Button>
            </nav>

            <div className="mt-auto">
              <Card className="bg-card">
                <CardContent className="p-4">
                  <div className="mb-2 text-sm font-medium">Usage This Month</div>
                  <div className="mb-1 text-xs text-muted-foreground">4 / 20 videos</div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[20%] bg-primary" />
                  </div>
                  <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs">
                    Upgrade Plan
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
              <h1 className="text-2xl font-bold">Projects</h1>
              <p className="text-sm text-muted-foreground">Manage your subtitle projects</p>
            </div>
            <Button onClick={() => setUploadModalOpen(true)} className="gap-2 md:hidden">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-1 rounded-md border border-border p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Projects Grid/List */}
          {filteredProjects.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <Video className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">No projects yet</h3>
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  Upload your first video to get started with AI subtitles.
                </p>
                <Button onClick={() => setUploadModalOpen(true)} className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Video
                </Button>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProjects.map((project) => (
                <ProjectListItem key={project.id} project={project} />
              ))}
            </div>
          )}
        </main>
      </div>

      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status]

  return (
    <Link href={`/editor/${project.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 rounded bg-background/80 px-1.5 py-0.5 text-xs font-medium backdrop-blur">
            {project.duration}
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-medium">{project.name}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Open Editor</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={status.className}>
              {status.label}
            </Badge>
            <span className="text-xs text-muted-foreground">{project.languages.join(", ")}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{project.updatedAt}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function ProjectListItem({ project }: { project: Project }) {
  const status = statusConfig[project.status]

  return (
    <Link href={`/editor/${project.id}`}>
      <Card className="cursor-pointer transition-all hover:border-primary/50">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
            <img
              src={project.thumbnail || "/placeholder.svg"}
              alt={project.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-1 right-1 rounded bg-background/80 px-1 py-0.5 text-[10px] font-medium backdrop-blur">
              {project.duration}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{project.name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="secondary" className={status.className}>
                {status.label}
              </Badge>
              <span className="text-xs text-muted-foreground">{project.languages.join(", ")}</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{project.updatedAt}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Open Editor</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </Link>
  )
}
