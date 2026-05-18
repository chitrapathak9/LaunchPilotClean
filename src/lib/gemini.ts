const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export interface AnalysisResult {
  marketOpportunity: {
    summary: string;
    tam: string;
    sam: string;
    som: string;
    cagr: string;
    keyTrends: string[];
  };
  targetAudience: {
    primary: string;
    secondary: string;
    painPoints: string[];
    demographics: string;
  };
  competitorAnalysis: { name: string; threat: string; pct: number; weakness: string }[];
  risks: { title: string; level: string; mitigation: string }[];
  mvpFeatures: { feature: string; priority: string; effort: string }[];
  launchStrategy: {
    phase1: { name: string; actions: string[] };
    phase2: { name: string; actions: string[] };
    phase3: { name: string; actions: string[] };
    channels: { channel: string; score: number; rationale: string }[];
  };
}

export class AnalysisError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly retryable = false
  ) {
    super(message);
    this.name = "AnalysisError";
  }
}

// Keep GeminiError as an alias so App.tsx imports don't break
export const GeminiError = AnalysisError;

// In-flight request deduplication: key = idea text
const inFlight = new Map<string, Promise<AnalysisResult>>();

export async function analyzeIdea(
  idea: string,
  signal?: AbortSignal
): Promise<AnalysisResult> {
  const key = idea.trim().toLowerCase();

  const existing = inFlight.get(key);
  if (existing) {
    console.debug("[analyze] Deduplicating in-flight request for:", key.slice(0, 60));
    return existing;
  }

  const promise = _fetchAnalysis(idea, signal).finally(() => {
    inFlight.delete(key);
  });

  inFlight.set(key, promise);
  return promise;
}

async function _fetchAnalysis(
  idea: string,
  externalSignal?: AbortSignal
): Promise<AnalysisResult> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new AnalysisError(
      "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set these in your environment and redeploy.",
      undefined,
      false
    );
  }

  // 30-second client-side timeout
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), 30_000);

  const signal = externalSignal
    ? anySignal([externalSignal, timeoutController.signal])
    : timeoutController.signal;

  console.debug("[analyze] Starting analysis for:", idea.slice(0, 60));

  let res: Response;
  try {
    res = await fetch(`${SUPABASE_URL}/functions/v1/analyze-idea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ idea: idea.trim() }),
      signal,
    });
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const e = err as Error;
    if (e.name === "AbortError") {
      throw new AnalysisError("Request timed out. Please try again.", 408, true);
    }
    throw new AnalysisError(
      "Could not reach the analysis server. Check your internet connection.",
      undefined,
      true
    );
  } finally {
    clearTimeout(timeoutId);
  }

  let data: { analysis?: AnalysisResult; error?: string };
  try {
    data = await res.json();
  } catch {
    throw new AnalysisError(
      `Server returned invalid response (${res.status}).`,
      res.status,
      res.status >= 500
    );
  }

  if (!res.ok || data.error) {
    const msg = data.error ?? `Server error (${res.status}). Please try again.`;
    console.error("[analyze] API error:", msg);
    throw new AnalysisError(msg, res.status, res.status === 429 || res.status >= 500);
  }

  if (!data.analysis) {
    throw new AnalysisError("Received empty analysis from server.", res.status, true);
  }

  console.debug("[analyze] Analysis received successfully.");
  return data.analysis;
}

function anySignal(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();
  for (const s of signals) {
    if (s.aborted) {
      controller.abort();
      break;
    }
    s.addEventListener("abort", () => controller.abort(), { once: true });
  }
  return controller.signal;
}
