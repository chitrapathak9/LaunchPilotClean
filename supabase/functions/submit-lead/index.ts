import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
  "Access-Control-Max-Age": "86400",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const slackWebhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");
    const discordWebhookUrl = Deno.env.get("DISCORD_WEBHOOK_URL");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing database environment configuration.");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { name, email, type, details } = await req.json();

    if (!email || !type) {
      return new Response(JSON.stringify({ error: "Email and Type are required fields." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Insert lead into the database
    const { data: leadRecord, error: dbError } = await supabase
      .from("leads")
      .insert({
        name: (name || "").trim(),
        email: email.trim().toLowerCase(),
        type: type.trim(),
        details: details || {}
      })
      .select()
      .single();

    if (dbError) {
      console.error("[submit-lead] Database insert error:", dbError);
      return new Response(JSON.stringify({ error: dbError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[submit-lead] Saved lead to database: ${leadRecord.id} (${type})`);

    // 2. Prepare Notification Payloads
    const adminEmail = "launchpilotai41@gmail.com";
    const displayName = name ? name.trim() : "Anonymous User";
    const leadTypeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
    const dateFormatted = new Date().toLocaleString();

    let detailsHtml = "";
    let detailsMarkdown = "";
    if (details && Object.keys(details).length > 0) {
      detailsHtml = `<h3>Lead Details:</h3><ul>` + 
        Object.entries(details).map(([key, val]) => `<li><strong>${key}:</strong> ${typeof val === 'object' ? JSON.stringify(val) : val}</li>`).join("") + 
        `</ul>`;

      detailsMarkdown = `\n**Details:**\n` +
        Object.entries(details).map(([key, val]) => `• **${key}:** ${typeof val === 'object' ? JSON.stringify(val) : val}`).join("\n");
    }

    // A. Trigger Resend Email Notification
    let emailSent = false;
    if (resendApiKey) {
      try {
        const subject = `[LaunchPilot Lead] New ${leadTypeCapitalized} from ${email}`;
        const html = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #fafafa;">
            <h2 style="color: #8b5cf6; margin-top: 0;">New Lead Captured!</h2>
            <p>A new visitor has filled out a form on LaunchPilot.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 120px;">Form Type:</td>
                <td style="padding: 6px 0;"><span style="background: #ece9fc; color: #8b5cf6; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: bold;">${leadTypeCapitalized}</span></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Name:</td>
                <td style="padding: 6px 0;">${displayName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Email:</td>
                <td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Date/Time:</td>
                <td style="padding: 6px 0;">${dateFormatted}</td>
              </tr>
            </table>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            ${detailsHtml}
            <div style="margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center;">
              This notification was generated automatically by LaunchPilot Supabase Edge Functions.
            </div>
          </div>
        `;

        const mailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "LaunchPilot Alerts <onboarding@resend.dev>",
            to: [adminEmail],
            subject: subject,
            html: html,
          }),
        });

        if (mailRes.ok) {
          emailSent = true;
          console.log("[submit-lead] Email notification successfully sent via Resend.");
        } else {
          const errText = await mailRes.text();
          console.warn("[submit-lead] Resend failed to send email:", errText);
        }
      } catch (mailErr) {
        console.error("[submit-lead] Email dispatch failed:", mailErr);
      }
    } else {
      console.log("[submit-lead] Skipping email notification: RESEND_API_KEY environment variable is not configured.");
    }

    // B. Trigger Slack Notification Webhook
    let slackSent = false;
    if (slackWebhookUrl) {
      try {
        const slackPayload = {
          text: `🔔 *New LaunchPilot Lead Captured!* (${leadTypeCapitalized})\n• *Name:* ${displayName}\n• *Email:* ${email}\n• *Time:* ${dateFormatted}${detailsMarkdown}`
        };

        const slackRes = await fetch(slackWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slackPayload),
        });
        if (slackRes.ok) {
          slackSent = true;
          console.log("[submit-lead] Slack notification sent successfully.");
        }
      } catch (slackErr) {
        console.error("[submit-lead] Slack webhook dispatch failed:", slackErr);
      }
    }

    // C. Trigger Discord Notification Webhook
    let discordSent = false;
    if (discordWebhookUrl) {
      try {
        const discordPayload = {
          content: `🔔 **New LaunchPilot Lead Captured!** (${leadTypeCapitalized})\n• **Name:** ${displayName}\n• **Email:** ${email}\n• **Time:** ${dateFormatted}${detailsMarkdown}`
        };

        const discordRes = await fetch(discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(discordPayload),
        });
        if (discordRes.ok) {
          discordSent = true;
          console.log("[submit-lead] Discord notification sent successfully.");
        }
      } catch (discordErr) {
        console.error("[submit-lead] Discord webhook dispatch failed:", discordErr);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      id: leadRecord.id,
      notifications: {
        email: emailSent,
        slack: slackSent,
        discord: discordSent
      }
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[submit-lead] Error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
