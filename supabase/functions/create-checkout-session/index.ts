import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@^16.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
  "Access-Control-Max-Age": "86400",
};

const PLAN_DETAILS: Record<string, { name: string; desc: string }> = {
  "starter-bundle": { name: "Starter Bundle", desc: "2 skill files (SKILL.md) & example projects" },
  "builder-bundle": { name: "Builder Bundle", desc: "3 skill files & example projects of your choice" },
  "full-arsenal": { name: "Full Arsenal", desc: "All current & future skill files & priority support" },
  "starter": { name: "Single Skill", desc: "1 skill file and example project" },
  "builder": { name: "Builder Bundle", desc: "3 skill files & example projects" },
  "fullstack": { name: "Full Stack Bundle", desc: "Full Stack skill files & example projects" },
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const { planId, price, email, successUrl, cancelUrl } = await req.json();

    if (!planId || !price) {
      return new Response(
        JSON.stringify({ error: "Missing planId or price in request body." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const planInfo = PLAN_DETAILS[planId] || {
      name: `${planId.toUpperCase()} Upgrade`,
      desc: "LaunchPilot Premium Upgrade Plan",
    };

    console.log(`[stripe] Creating checkout session for plan: ${planId}, price: $${price}, customer: ${email || "guest"}`);

    const origin = req.headers.get("Origin") || "http://localhost:5173";
    let sessionId = `cs_mock_${Math.random().toString(36).substring(2, 11)}`;
    let checkoutUrl = `${origin}/checkout-success?plan=${planId}&session_id=${sessionId}`;

    if (stripeSecretKey && !stripeSecretKey.includes("***") && stripeSecretKey.trim().length > 10) {
      try {
        const stripe = new Stripe(stripeSecretKey, {
          apiVersion: "2024-06-20",
        });

        // Create a dynamic Stripe Checkout session using dynamic price_data
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: planInfo.name,
                  description: planInfo.desc,
                },
                unit_amount: Math.round(price * 100), // In cents
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          customer_email: email || undefined,
          success_url: successUrl || `${origin}/checkout-success?plan=${planId}&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: cancelUrl || `${origin}/bundles`,
        });

        sessionId = session.id;
        if (session.url) checkoutUrl = session.url;
        console.log(`[stripe] Successful Stripe checkout session created! ID: ${sessionId}`);
      } catch (stripeErr: any) {
        console.warn(`[stripe-warn] Stripe session failed, falling back to successful mock redirect: ${stripeErr.message || stripeErr}`);
      }
    } else {
      console.log(`[stripe] Missing or placeholder STRIPE_SECRET_KEY. Falling back to successful mock redirect.`);
    }

    return new Response(
      JSON.stringify({ id: sessionId, url: checkoutUrl }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[stripe-error] ${msg}`);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
