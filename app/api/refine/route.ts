import { generateText } from "ai"
import { NextResponse } from "next/server"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { subtitles, preset, options } = await req.json()

    const { text } = await generateText({
      model: "google/gemini-2.5-flash",
      prompt: `You are an expert subtitle editor. Refine the following subtitles for optimal readability and viewer engagement.

STYLE PRESET: ${preset || "youtube"}

RULES:
1. Fix grammar, punctuation, capitalization (preserve original meaning)
2. Split long sentences into readable chunks (max 42 characters/line for YouTube)
3. Sync line breaks with natural speech pauses and emotional beats
4. Preserve speaker tone (formal vs casual, excited vs calm)
5. Keep technical terms and proper nouns intact
6. ${options?.removeFillers ? "Remove filler words (um, uh, like, you know)" : "Keep natural speech patterns"}
7. DO NOT add or remove information

Current subtitles:
${JSON.stringify(subtitles, null, 2)}

Output the refined subtitles in the same JSON format with improved text.`,
      maxOutputTokens: 4000,
    })

    let refinedSubtitles
    try {
      refinedSubtitles = JSON.parse(text)
    } catch {
      refinedSubtitles = subtitles
    }

    return NextResponse.json(refinedSubtitles)
  } catch (error) {
    console.error("Refinement error:", error)
    return NextResponse.json({ error: "Failed to refine subtitles" }, { status: 500 })
  }
}
