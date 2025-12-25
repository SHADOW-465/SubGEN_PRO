import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "../styles/globals.css"

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
    { media: "(prefers-color-scheme: light)", color: "#090b0f" },
    { media: "(prefers-color-scheme: dark)", color: "#090b0f" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#090b0f]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

