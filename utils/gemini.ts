import { Subtitle } from "@/components/video-editor/EditorContext";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";
// Fallback if 2.5 is not yet publicly routable or named differently, but user requested 2.5.
// I will try to use the string provided by user if possible, but 'gemini-2.0-flash-exp' is the latest confirmed experimental flash model publicly available in some regions.
// However, the user said "gemini 2.5 flash". I will try to respect that but it might fail.
// Strategy: I will define a constant for the model name that can be easily swapped.
// Update: Checking documentation, 2.5 is not a standard public endpoint yet.
// I will use `gemini-1.5-flash` as a safe default for "Flash" class, but will attempt to construct the URL dynamically if needed.
// actually, I'll use the environment variable or a default.

const MODEL_NAME = "gemini-1.5-flash"; // Safe default that definitely works for audio.
// If the user *really* has access to 2.5, they might need a custom endpoint.
// I'll stick to 1.5-flash for reliability in this demo unless I can verify 2.5 exists.
// Wait, I did a google search and found "Gemini 2.5 Flash" in the snippets!
// "Model ID, gemini-2.5-flash". Okay, I will use that!

const REAL_MODEL_NAME = "gemini-2.5-flash"; // From search result snippet.

export async function transcribeMedia(apiKey: string, audioBase64: string): Promise<Subtitle[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${REAL_MODEL_NAME}:generateContent?key=${apiKey}`;

  const prompt = `
    You are a professional subtitle generator.
    Analyze the audio and generate accurate subtitles.
    Output ONLY valid JSON in the following format:
    [
      { "id": 1, "start": 0.0, "end": 2.5, "text": "Hello world" }
    ]
    Timestamps should be in seconds (float).
    Do not include markdown formatting (like \`\`\`json). Just the raw JSON array.
  `;

  const payload = {
    contents: [{
      parts: [
        { text: prompt },
        {
          inline_data: {
            mime_type: "audio/wav",
            data: audioBase64
          }
        }
      ]
    }],
    generationConfig: {
      response_mime_type: "application/json"
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Gemini API Error");
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) throw new Error("No transcription generated.");

    // Clean up potential markdown formatting if the model ignores the "no markdown" instruction
    const jsonString = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    const parsed = JSON.parse(jsonString);

    // Validate and sanitize
    return parsed.map((item: any, index: number) => ({
      id: Date.now() + index,
      start: parseFloat(item.start),
      end: parseFloat(item.end),
      text: item.text
    }));

  } catch (error) {
    console.error("Transcription failed:", error);
    throw error;
  }
}
