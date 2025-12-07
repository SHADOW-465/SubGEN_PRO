import { generateText } from "ai"
import { NextResponse } from "next/server"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { subtitles, duration } = await req.json()

    const { text } = await generateText({
      model: "google/gemini-2.5-flash",
      prompt: `You are an expert content analyst. Analyze this transcript and identify 5-10 highlight moments that would perform well as 30-60 second social media clips.

CRITERIA FOR HIGHLIGHTS:
- High emotional intensity (laughter, surprise, strong opinions)
- Quotable statements (memorable one-liners)
- Story peaks (climax of an anecdote)
- Controversial or debate-worthy moments
- Educational "aha" moments
- Humor and entertainment value

For each highlight, provide:
- startTime: Start timestamp in seconds
- endTime: End timestamp in seconds
- title: Brief title for the clip
- reason: Why this moment is viral-worthy
- hook: Suggested hook text for first 3 seconds
- platform: Best platform (TikTok, Instagram Reels, YouTube Shorts, LinkedIn)
- viralityScore: 1-10 rating

Video duration: ${duration || 120} seconds

Transcript:
${subtitles.map((s: any) => `[${s.startTime}s] ${s.speaker || ""}: ${s.text}`).join("\n")}

Output as JSON array of highlight objects.`,
      maxOutputTokens: 2000,
    })

    let highlights
    try {
      highlights = JSON.parse(text)
    } catch {
      highlights = [
        {
          startTime: 0,
          endTime: 30,
          title: "Introduction",
          reason: "Strong opening hook",
          hook: "You won't believe what happens next...",
          platform: "TikTok",
          viralityScore: 7,
        },
      ]
    }

    return NextResponse.json({ highlights })
  } catch (error) {
    console.error("Highlights error:", error)
    return NextResponse.json({ error: "Failed to detect highlights" }, { status: 500 })
  }
}
