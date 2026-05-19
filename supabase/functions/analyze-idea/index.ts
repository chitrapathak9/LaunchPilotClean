import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://launchaipilot.com",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

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
  console.log("[openai] Request start, idea length:", idea.length);

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
        { role: "user", content: PROMPT_TEMPLATE(idea) },
      ],
      temperature: 0.7,
      max_tokens: 2048,
      response_format: { type: "json_object" },
    }),
    signal,
  });

  const bodyText = await res.text();

  if (!res.ok) {
    console.error(`[openai] HTTP ${res.status}:`, bodyText.slice(0, 400));
    const err = new Error(`openai_${res.status}::${bodyText}`) as Error & { status: number };
    err.status = res.status;
    throw err;
  }

  let parsed: { choices?: { message?: { content?: string } }[] };
  try {
    parsed = JSON.parse(bodyText);
  } catch {
    console.error("[openai] Non-JSON response:", bodyText.slice(0, 400));
    throw new Error("OpenAI returned a non-JSON response.");
  }

  const content = parsed?.choices?.[0]?.message?.content ?? "";
  console.log("[openai] Content length:", content.length);
  return content;
}

async function callWithRetry(idea: string, signal: AbortSignal): Promise<string> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await callOpenAI(idea, signal);
    } catch (err: unknown) {
      const e = err as Error & { status?: number };
      if (signal.aborted) throw e;

      const status = e.status ?? 0;
      console.warn(`[openai] Attempt ${attempt + 1} failed — status ${status}: ${e.message}`);

      if (status === 402 || e.message?.includes("quota")) {
        throw new Error("OpenAI quota exceeded. Please check your billing.");
      }
      if (status >= 400 && status < 500 && status !== 429) {
        throw new Error(`OpenAI request failed (${status}). Please try again.`);
      }

      const delay = status === 429
        ? Math.min(1000 * Math.pow(2, attempt), 8000)
        : Math.min(500 * Math.pow(2, attempt), 4000);

      console.warn(`[openai] Retrying in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("OpenAI is currently unavailable. Please try again in a moment.");
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("Origin") ?? "no-origin";
  console.log(`[edge] ${req.method} — Origin: ${origin}`);

  // Must be first — no other logic before this
  if (req.method === "OPTIONS") {
    console.log("[edge] Preflight OK");
    return new Response(null, { status: 200, headers: CORS_HEADERS });
  }

  if (req.method === "GET") {
    return json({ status: "ok", key_set: !!OPENAI_API_KEY });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  try {
    if (!OPENAI_API_KEY) {
      console.error("[edge] OPENAI_API_KEY not configured");
      return json({ error: "Server configuration error: AI service is not configured." }, 500);
    }

    let body: { idea?: unknown };
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON in request body." }, 400);
    }

    const { idea } = body;
    if (!idea || typeof idea !== "string" || idea.trim().length < 5) {
      return json({ error: "Please provide a valid startup idea (at least 5 characters)." }, 400);
    }

    console.log("[edge] Analyzing:", idea.trim().slice(0, 80));

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      console.warn("[edge] Timeout after 25s");
      controller.abort();
    }, 25_000);

    let rawText: string;
    try {
      rawText = await callWithRetry(idea.trim(), controller.signal);
    } finally {
      clearTimeout(timeout);
    }

    let analysis: unknown;
    try {
      analysis = JSON.parse(rawText);
    } catch {
      console.error("[edge] JSON parse failed. Raw:", rawText.slice(0, 500));
      return json({ error: "Failed to parse AI response. Please try again." }, 500);
    }

    console.log("[edge] Success — returning analysis");
    return json({ analysis });

  } catch (err: unknown) {
    const e = err as Error;
    console.error("[edge] Unhandled:", e.name, e.message);

    if (e.name === "AbortError") {
      return json({ error: "Request timed out. Please try again." }, 504);
    }
    if (e.message?.toLowerCase().includes("quota")) {
      return json({ error: "AI service quota exceeded. Please try again later." }, 429);
    }
    return json({ error: e.message || "An unexpected error occurred. Please try again." }, 500);
  }
});
