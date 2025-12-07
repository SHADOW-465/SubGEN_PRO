import { generateText } from "ai"
import { NextResponse } from "next/server"

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { subtitles, targetLanguages, mode } = await req.json()

    const translations: Record<string, any> = {}

    for (const lang of targetLanguages) {
      const { text } = await generateText({
        model: "google/gemini-2.5-flash",
        prompt: `You are an expert translator and localizer. Translate these subtitles to ${lang}.

TRANSLATION MODE: ${mode || "localized"}

${
  mode === "localized"
    ? `
LOCALIZATION RULES:
- Adapt idioms and cultural references (don't translate literally)
- Use region-appropriate slang and expressions
- Preserve humor and emotional tone
- Keep technical terms in original language if commonly used in target market
- Maintain subtitle timing and line length constraints
`
    : mode === "simplified"
      ? `
SIMPLIFICATION RULES:
- Use simpler vocabulary (Grade 5-7 reading level)
- Shorter sentences
- Avoid complex idioms
- Keep meaning intact but easier to understand
`
      : `
LITERAL TRANSLATION RULES:
- Direct word-for-word translation
- Preserve original sentence structure where possible
- Keep technical terms translated literally
`
}

Current subtitles:
${JSON.stringify(subtitles, null, 2)}

Output the translated subtitles in the same JSON format.`,
        maxOutputTokens: 4000,
      })

      try {
        translations[lang] = JSON.parse(text)
      } catch {
        translations[lang] = subtitles.map((s: any) => ({
          ...s,
          text: `[${lang}] ${s.text}`,
        }))
      }
    }

    return NextResponse.json({ translations })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Failed to translate subtitles" }, { status: 500 })
  }
}
