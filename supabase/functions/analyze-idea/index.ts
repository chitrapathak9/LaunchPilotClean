import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Anthropic from "npm:@anthropic-ai/sdk@0.52.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      console.error("[edge] ANTHROPIC_API_KEY secret is not set");
      return new Response(
        JSON.stringify({ error: "Server configuration error: ANTHROPIC_API_KEY is not configured." }),
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

    console.log(`[edge] Analyzing idea: "${idea.trim().slice(0, 80)}..."`);

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 4096,
      thinking: { type: "adaptive" },
      messages: [
        {
          role: "user",
          content: PROMPT_TEMPLATE(idea.trim()),
        },
      ],
    });

    console.log(`[edge] Claude responded. stop_reason=${message.stop_reason}`);

    // Extract text from response content
    let rawText = "";
    for (const block of message.content) {
      if (block.type === "text") {
        rawText = block.text;
        break;
      }
    }

    if (!rawText) {
      console.error("[edge] No text block in Claude response. Content:", JSON.stringify(message.content));
      return new Response(
        JSON.stringify({ error: "AI returned an empty response. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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
    const e = err as Error & { status?: number; headers?: Record<string, string> };
    console.error("[edge] Unhandled error:", e.message ?? e);

    // Pass through rate limit / auth errors with context
    if (e.status === 429) {
      return new Response(
        JSON.stringify({ error: "AI service is currently busy. Please try again in a moment." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (e.status === 401) {
      return new Response(
        JSON.stringify({ error: "Invalid API key. Please check your ANTHROPIC_API_KEY secret." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: e.message || "An unexpected error occurred." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
