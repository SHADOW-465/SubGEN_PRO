import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css" // Changed from ../styles/globals.css to ./globals.css as per list_files structure (app/globals.css exists)

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "SubGEN PRO - AI-Powered Subtitle Editor",
  description:
    "Transform raw transcripts into publish-ready subtitles with AI. Multi-speaker detection, 100+ languages, and intelligent refinement powered by Gemini 2.5.",
  generator: "SubGEN PRO",
  keywords: ["subtitles", "AI", "transcription", "video editing", "captions", "localization", "Gemini"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#141418" },
    { media: "(prefers-color-scheme: dark)", color: "#141418" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#141418] text-white overflow-hidden`}>
        {/* Global Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#22232A 1px, transparent 1px), linear-gradient(90deg, #22232A 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}>
        </div>

        <div className="relative z-10 w-full h-full">
            {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
