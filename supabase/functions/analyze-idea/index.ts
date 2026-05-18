import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ALLOWED_ORIGINS = [
  "https://launchaipilot.com",
  "https://www.launchaipilot.com",
];

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") ?? "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(req: Request, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...getCorsHeaders(req),
      "Content-Type": "application/json",
    },
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
  console.log("[openai] Sending request for idea:", idea.slice(0, 60));

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

  const body = await res.text();

  if (!res.ok) {
    console.error(`[openai] HTTP ${res.status}:`, body.slice(0, 300));
    const err = new Error(`${res.status}::${body}`) as Error & { status: number };
    err.status = res.status;
    throw err;
  }

  let data: { choices?: { message?: { content?: string } }[] };
  try {
    data = JSON.parse(body);
  } catch {
    console.error("[openai] Failed to parse response body:", body.slice(0, 300));
    throw new Error("OpenAI returned non-JSON response.");
  }

  const content = data?.choices?.[0]?.message?.content ?? "";
  console.log("[openai] Response content length:", content.length);
  return content;
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

      if (signal.aborted) {
        console.warn("[openai] Request aborted, stopping retries.");
        throw e;
      }

      const status = e.status ?? 0;
      console.warn(`[openai] Attempt ${attempt + 1} failed with status ${status}: ${e.message}`);

      if (status === 429) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 8000);
        console.warn(`[openai] Rate limited — retrying in ${delay}ms`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      if (status === 402 || (status === 429 && e.message.includes("quota"))) {
        throw new Error("OpenAI quota exceeded. Please check your billing.");
      }

      if (status >= 400 && status < 500) {
        throw new Error(`OpenAI request failed (${status}). Please try again.`);
      }

      const delay = Math.min(500 * Math.pow(2, attempt), 4000);
      console.warn(`[openai] Server error — retrying in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  throw new Error("OpenAI is currently unavailable. Please try again in a moment.");
}

Deno.serve(async (req: Request) => {
  const { method, url } = req;
  const origin = req.headers.get("Origin") ?? "unknown";
  console.log(`[edge] ${method} ${url} — Origin: ${origin}`);

  if (method === "OPTIONS") {
    console.log("[edge] Preflight OK");
    return new Response(null, { status: 200, headers: getCorsHeaders(req) });
  }

  if (method === "GET") {
    return json(req, { status: "ok", key_set: !!OPENAI_API_KEY });
  }

  if (method !== "POST") {
    return json(req, { error: "Method not allowed." }, 405);
  }

  try {
    if (!OPENAI_API_KEY) {
      console.error("[edge] OPENAI_API_KEY is not set");
      return json(req, { error: "Server configuration error: AI service is not configured." }, 500);
    }

    let body: { idea?: unknown };
    try {
      body = await req.json();
    } catch {
      console.error("[edge] Failed to parse request body");
      return json(req, { error: "Invalid JSON in request body." }, 400);
    }

    const { idea } = body;
    if (!idea || typeof idea !== "string" || idea.trim().length < 5) {
      return json(req, { error: "Please provide a valid startup idea (at least 5 characters)." }, 400);
    }

    console.log("[edge] Analyzing idea:", idea.trim().slice(0, 80));

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      console.warn("[edge] Request timed out after 25s");
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
      console.error("[edge] JSON parse failed. Raw output:", rawText.slice(0, 500));
      return json(req, { error: "Failed to parse AI response. Please try again." }, 500);
    }

    console.log("[edge] Analysis complete, returning response.");
    return json(req, { analysis });

  } catch (err: unknown) {
    const e = err as Error;
    console.error("[edge] Unhandled error:", e.name, e.message);

    if (e.name === "AbortError") {
      return json(req, { error: "Request timed out. Please try again." }, 504);
    }

    if (e.message?.toLowerCase().includes("quota")) {
      return json(req, { error: "AI service quota exceeded. Please try again later." }, 429);
    }

    return json(req, { error: e.message || "An unexpected error occurred. Please try again." }, 500);
  }
});
