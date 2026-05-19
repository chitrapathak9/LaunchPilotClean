import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import postgres from "npm:postgres@3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { ssl: "require", max: 1 });

  try {
    const { name, email, startup_idea } = await req.json();

    if (!email || !name || !startup_idea) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS public.waitlist (
        id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name         text NOT NULL DEFAULT '',
        email        text UNIQUE NOT NULL,
        startup_idea text NOT NULL DEFAULT '',
        created_at   timestamptz DEFAULT now()
      )
    `;

    await sql`ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY`;

    await sql`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'waitlist' AND policyname = 'Anyone can join the waitlist'
        ) THEN
          CREATE POLICY "Anyone can join the waitlist"
            ON public.waitlist FOR INSERT TO anon, authenticated WITH CHECK (true);
        END IF;
      END $$
    `;

    await sql`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'waitlist' AND policyname = 'Authenticated users can read waitlist'
        ) THEN
          CREATE POLICY "Authenticated users can read waitlist"
            ON public.waitlist FOR SELECT TO authenticated USING (true);
        END IF;
      END $$
    `;

    // Insert the record
    await sql`
      INSERT INTO public.waitlist (name, email, startup_idea)
      VALUES (${name.trim()}, ${email.trim().toLowerCase()}, ${startup_idea.trim()})
    `;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    const isDuplicate = msg.includes("duplicate key") || msg.includes("unique constraint");

    return new Response(
      JSON.stringify(isDuplicate ? { duplicate: true } : { error: msg }),
      {
        status: isDuplicate ? 409 : 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } finally {
    await sql.end();
  }
});
