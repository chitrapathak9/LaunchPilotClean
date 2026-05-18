import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

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

async function callOpenAI(idea: string, signal: AbortSignal): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert startup analyst. Return only valid JSON, no markdown or code blocks.",
        },
        {
          role: "user",
          content: PROMPT_TEMPLATE(idea),
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
      response_format: { type: "json_object" },
    }),
    signal,
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[openai] ${res.status}:`, body);
    const err = new Error(`${res.status}::${body}`) as Error & { status: number };
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

async function callWithRetry(idea: string, signal: AbortSignal): Promise<string> {
  const MAX_RETRIES = 3;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const text = await callOpenAI(idea, signal);
      console.log(`[openai] Success on attempt ${attempt + 1}`);
      return text;
    } catch (err: unknown) {
      const e = err as Error & { status?: number };

      if (signal.aborted) throw e;

      const status = e.status ?? 0;

      if (status === 429) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 8000);
        console.warn(`[openai] 429 rate limit, retrying in ${delay}ms`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      // Non-retryable client error
      if (status >= 400 && status < 500) {
        throw new Error(`OpenAI request failed (${status}). Please try again.`);
      }

      // 5xx — short backoff
      const delay = Math.min(500 * Math.pow(2, attempt), 4000);
      console.warn(`[openai] Server error on attempt ${attempt + 1}, retrying in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  throw new Error("OpenAI is currently unavailable. Please try again in a moment.");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  // Health check
  if (req.method === "GET") {
    return new Response(
      JSON.stringify({ status: "ok", key_set: !!OPENAI_API_KEY }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    if (!OPENAI_API_KEY) {
      console.error("[edge] OPENAI_API_KEY secret is not set");
      return new Response(
        JSON.stringify({ error: "Server configuration error: OPENAI_API_KEY is not configured." }),
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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);

    let rawText: string;
    try {
      rawText = await callWithRetry(idea.trim(), controller.signal);
    } finally {
      clearTimeout(timeout);
    }

    let analysis;
    try {
      analysis = JSON.parse(rawText);
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
