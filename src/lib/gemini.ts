const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  "https://mfshjeyeqqiexluiujnd.supabase.co";
const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mc2hqZXllcXFpZXhsdWl1am5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDU3OTIsImV4cCI6MjA5NDQyMTc5Mn0.sTuW7uzF4Xfvz7xndm1V23Pzo2rZ2d4V8m0LTGkJswE";

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

export async function analyzeIdea(
  idea: string,
  signal?: AbortSignal
): Promise<AnalysisResult> {
  return _fetchAnalysis(idea, signal);
}

async function _fetchAnalysis(
  idea: string,
  signal?: AbortSignal
): Promise<AnalysisResult> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new AnalysisError(
      "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.",
      undefined,
      false
    );
  }

  const endpoint = `${SUPABASE_URL}/functions/v1/analyze-idea`;

  let res: Response;
  try {
    res = await fetch(endpoint, {
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
    const e = err as Error;
    if (e.name === "AbortError") {
      throw new AnalysisError("Request cancelled.", 408, false);
    }
    throw new AnalysisError(
      `Network error (${e.name}: ${e.message}). Check browser console for details.`,
      undefined,
      true
    );
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
    throw new AnalysisError(msg, res.status, res.status === 429 || res.status >= 500);
  }

  if (!data.analysis) {
    throw new AnalysisError("Received empty analysis from server.", res.status, true);
  }

  return data.analysis;
}
