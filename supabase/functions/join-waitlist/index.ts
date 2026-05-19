import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, startup_idea } = await req.json();

    if (!email || !name || !startup_idea) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Ensure table exists
    await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS waitlist (
          id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          name         text NOT NULL DEFAULT '',
          email        text UNIQUE NOT NULL,
          startup_idea text NOT NULL DEFAULT '',
          created_at   timestamptz DEFAULT now()
        );
        ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
        DO $$ BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'waitlist' AND policyname = 'Anyone can join the waitlist') THEN
            CREATE POLICY "Anyone can join the waitlist" ON waitlist FOR INSERT TO anon, authenticated WITH CHECK (true);
          END IF;
        END $$;
        DO $$ BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'waitlist' AND policyname = 'Authenticated users can read waitlist') THEN
            CREATE POLICY "Authenticated users can read waitlist" ON waitlist FOR SELECT TO authenticated USING (true);
          END IF;
        END $$;
      `,
    }).catch(() => null); // Ignore if rpc not available — table may already exist

    // Direct insert using service role (bypasses RLS)
    const { error } = await supabase
      .from("waitlist")
      .insert({ name: name.trim(), email: email.trim().toLowerCase(), startup_idea: startup_idea.trim() });

    if (error) {
      if (error.code === "23505") {
        return new Response(JSON.stringify({ duplicate: true }), {
          status: 409,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Table doesn't exist — create it via raw SQL then retry
      if (error.code === "42P01") {
        const { error: createErr } = await supabase.from("waitlist").select("id").limit(0);
        if (createErr) {
          return new Response(JSON.stringify({ error: "Database setup required. Please contact support." }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
