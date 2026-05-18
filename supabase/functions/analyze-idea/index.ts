import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

// Models to try in order — fall back if one is exhausted
const GEMINI_MODELS = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-1.0-pro",
];

const PROMPT_TEMPLATE = (idea: string) => `
You are an expert startup analyst. Analyze the following startup idea and return a structured JSON response.

Startup Idea: "${idea}"

Return ONLY valid JSON (no markdown, no code blocks, no extra text) with this exact structure:
{
  "marketOpportunity": {
    "summary": "2-3 sentence overview of the market opportunity",
    "tam": "Total Addressable Market estimate with dollar figure",
    "sam": "Serviceable Addressable Market estimate with dollar figure",
    "som": "Serviceable Obtainable Market estimate with dollar figure",
    "cagr": "Market CAGR percentage",
    "keyTrends": ["trend 1", "trend 2", "trend 3"]
  },
  "targetAudience": {
    "primary": "Primary customer segment description",
    "secondary": "Secondary customer segment description",
    "painPoints": ["pain point 1", "pain point 2", "pain point 3"],
    "demographics": "Age range, role, company size, etc."
  },
  "competitorAnalysis": [
    { "name": "Competitor 1", "threat": "High", "pct": 85, "weakness": "Key weakness" },
    { "name": "Competitor 2", "threat": "Medium", "pct": 60, "weakness": "Key weakness" },
    { "name": "Competitor 3", "threat": "Low", "pct": 35, "weakness": "Key weakness" }
  ],
  "risks": [
    { "title": "Risk title", "level": "High", "mitigation": "How to mitigate" },
    { "title": "Risk title", "level": "Medium", "mitigation": "How to mitigate" },
    { "title": "Risk title", "level": "Low", "mitigation": "How to mitigate" }
  ],
  "mvpFeatures": [
    { "feature": "Feature name", "priority": "Must Have", "effort": "Low" },
    { "feature": "Feature name", "priority": "Must Have", "effort": "Medium" },
    { "feature": "Feature name", "priority": "Should Have", "effort": "Medium" },
    { "feature": "Feature name", "priority": "Nice to Have", "effort": "High" }
  ],
  "launchStrategy": {
    "phase1": { "name": "Week 1-2", "actions": ["action 1", "action 2", "action 3"] },
    "phase2": { "name": "Week 3-6", "actions": ["action 1", "action 2", "action 3"] },
    "phase3": { "name": "Month 2-3", "actions": ["action 1", "action 2", "action 3"] },
    "channels": [
      { "channel": "Channel name", "score": 90, "rationale": "Why this channel" },
      { "channel": "Channel name", "score": 75, "rationale": "Why this channel" },
      { "channel": "Channel name", "score": 60, "rationale": "Why this channel" }
    ]
  }
}
`;

async function callGemini(model: string, idea: string, signal: AbortSignal): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
  console.log(`[gemini] Trying model: ${model}`);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: PROMPT_TEMPLATE(idea) }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
    }),
    signal,
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[gemini] ${model} responded ${res.status}:`, body);
    const err = new Error(`${res.status}::${body}`);
    (err as Error & { status: number }).status = res.status;
    throw err;
  }

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

async function callGeminiWithRetry(idea: string, signal: AbortSignal): Promise<string> {
  const MAX_RETRIES = 3;

  for (const model of GEMINI_MODELS) {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const text = await callGemini(model, idea, signal);
        console.log(`[gemini] Success with ${model} on attempt ${attempt + 1}`);
        return text;
      } catch (err: unknown) {
        const e = err as Error & { status?: number };
        lastError = e;

        if (signal.aborted) throw e;

        const status = e.status ?? 0;

        // 429 = rate limited — wait with exponential backoff then retry
        if (status === 429) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 8000);
          console.warn(`[gemini] 429 on ${model} attempt ${attempt + 1}, retrying in ${delay}ms`);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }

        // 4xx (not 429) — no point retrying this model
        if (status >= 400 && status < 500) {
          console.warn(`[gemini] Non-retryable ${status} on ${model}, skipping model`);
          break;
        }

        // 5xx or network — short backoff then retry
        const delay = Math.min(500 * Math.pow(2, attempt), 4000);
        console.warn(`[gemini] Error on ${model} attempt ${attempt + 1}, retrying in ${delay}ms`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }

    console.warn(`[gemini] ${model} exhausted after ${MAX_RETRIES} attempts`);
    if (lastError) console.error(`[gemini] Last error for ${model}:`, lastError.message);
  }

  throw new Error(
    "All Gemini models are currently unavailable. This is likely a quota issue — please enable billing on your Google Cloud project or wait for the quota to reset."
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (!GEMINI_API_KEY) {
      console.error("[edge] GEMINI_API_KEY secret is not set");
      return new Response(
        JSON.stringify({ error: "Server configuration error: GEMINI_API_KEY is not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { idea } = await req.json();
    if (!idea || typeof idea !== "string" || idea.trim().length < 5) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid startup idea (at least 5 characters)." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 25-second timeout for the entire Gemini call chain
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);

    let rawText: string;
    try {
      rawText = await callGeminiWithRetry(idea.trim(), controller.signal);
    } finally {
      clearTimeout(timeout);
    }

    // Strip markdown fences if present
    const cleaned = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let analysis;
    try {
      analysis = JSON.parse(cleaned);
    } catch {
      console.error("[edge] JSON parse failed. Raw:", rawText);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    const e = err as Error;
    console.error("[edge] Unhandled error:", e);

    if (e.name === "AbortError") {
      return new Response(
        JSON.stringify({ error: "Request timed out. Please try again." }),
        { status: 504, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: e.message || "An unexpected error occurred." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
