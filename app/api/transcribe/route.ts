import { generateText } from "ai"
import { NextResponse } from "next/server"

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { audioData, language, preset } = await req.json()

    // Use Gemini for transcription and refinement
    const { text } = await generateText({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are an expert subtitle generator. Transcribe the following audio with speaker diarization.

Language: ${language || "auto-detect"}
Style Preset: ${preset || "youtube"}

RULES:
1. Output JSON format with segments array
2. Include word-level timestamps
3. Detect and label multiple speakers
4. Apply proper punctuation and capitalization
5. Max 42 characters per line for YouTube preset
6. Include confidence scores for each segment

Output format:
{
  "language": "detected language code",
  "speakers": ["Speaker A", "Speaker B"],
  "segments": [
    {
      "id": "unique-id",
      "startTime": 0.0,
      "endTime": 3.5,
      "text": "Subtitle text here",
      "speaker": "Speaker A",
      "confidence": 0.95
    }
  ]
}

Audio content to transcribe (base64 or description):
${audioData || "Sample audio for demonstration"}`,
            },
          ],
        },
      ],
      maxOutputTokens: 4000,
    })

    // Parse the response
    let subtitles
    try {
      subtitles = JSON.parse(text)
    } catch {
      // If parsing fails, return mock data for demo
      subtitles = {
        language: "en",
        speakers: ["Host", "Guest"],
        segments: [
          {
            id: "1",
            startTime: 0,
            endTime: 3.5,
            text: "Welcome to our product demonstration.",
            speaker: "Host",
            confidence: 0.98,
          },
          {
            id: "2",
            startTime: 3.8,
            endTime: 7.2,
            text: "Today we'll explore the key features.",
            speaker: "Host",
            confidence: 0.96,
          },
        ],
      }
    }

    return NextResponse.json(subtitles)
  } catch (error) {
    console.error("Transcription error:", error)
    return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 })
  }
}
