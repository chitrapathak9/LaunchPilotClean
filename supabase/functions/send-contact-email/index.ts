import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') ?? 'launchpilotai41@gmail.com'
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'noreply@launchpilot.ai'
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://launchpilot.ai'

interface ContactPayload {
  name: string
  email: string
  topic: string
  message: string
  company?: string
  phone?: string
}

async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `LaunchPilot <${FROM_EMAIL}>`,
      to: [to],
      subject,
      html,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Resend error: ${err}`)
  }

  return response.json()
}

function userThankYouEmail(data: ContactPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We got your message!</title>
</head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#8B5CF6,#6D28D9);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#FFFFFF;font-size:26px;font-weight:800;letter-spacing:-0.5px;">LaunchPilot</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">AI-Powered Startup Launch Platform</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 16px;color:#0F172A;font-size:22px;font-weight:700;">Thanks, ${data.name}! ✉️</h2>
              <p style="margin:0 0 20px;color:#475569;font-size:16px;line-height:1.7;">
                We've received your message and will get back to you <strong>within 24 hours</strong> (Mon–Fri).
              </p>

              <!-- Message recap -->
              <div style="background:#F8FAFC;border-radius:12px;padding:24px;border-left:4px solid #8B5CF6;margin:24px 0;">
                <p style="margin:0 0 8px;color:#8B5CF6;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Your message</p>
                <p style="margin:0 0 8px;color:#0F172A;font-size:14px;font-weight:600;">Topic: ${data.topic}</p>
                <p style="margin:0;color:#475569;font-size:14px;line-height:1.7;">${data.message.replace(/\n/g, '<br>')}</p>
              </div>

              <p style="margin:0 0 32px;color:#475569;font-size:15px;line-height:1.7;">
                While you wait, feel free to check out our <a href="${SITE_URL}/blog" style="color:#8B5CF6;text-decoration:none;font-weight:600;">founder playbooks</a> or <a href="${SITE_URL}/skills" style="color:#8B5CF6;text-decoration:none;font-weight:600;">AI skill catalog</a>.
              </p>

              <a href="${SITE_URL}" style="display:inline-block;background:#8B5CF6;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:10px;">
                Visit LaunchPilot →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F8FAFC;padding:24px 40px;text-align:center;border-top:1px solid #E2E8F0;">
              <p style="margin:0;color:#94A3B8;font-size:12px;">
                © ${new Date().getFullYear()} LaunchPilot · <a href="${SITE_URL}/privacy" style="color:#94A3B8;">Privacy Policy</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function adminNotificationEmail(data: ContactPayload): string {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#1E293B;border-radius:16px;overflow:hidden;border:1px solid #334155;">
          
          <tr>
            <td style="background:#8B5CF6;padding:24px 32px;">
              <h1 style="margin:0;color:#FFFFFF;font-size:18px;font-weight:800;">🔔 New Contact Submission</h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC</p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #334155;">
                    <span style="color:#94A3B8;font-size:12px;text-transform:uppercase;font-weight:600;">Name</span><br>
                    <span style="color:#F1F5F9;font-size:15px;font-weight:600;">${data.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #334155;">
                    <span style="color:#94A3B8;font-size:12px;text-transform:uppercase;font-weight:600;">Email</span><br>
                    <a href="mailto:${data.email}" style="color:#A78BFA;font-size:15px;font-weight:600;text-decoration:none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #334155;">
                    <span style="color:#94A3B8;font-size:12px;text-transform:uppercase;font-weight:600;">Topic</span><br>
                    <span style="color:#F1F5F9;font-size:15px;font-weight:600;">${data.topic}</span>
                  </td>
                </tr>
                ${data.company ? `<tr><td style="padding:8px 0;border-bottom:1px solid #334155;"><span style="color:#94A3B8;font-size:12px;text-transform:uppercase;font-weight:600;">Company</span><br><span style="color:#F1F5F9;font-size:15px;">${data.company}</span></td></tr>` : ''}
                <tr>
                  <td style="padding:16px 0 0;">
                    <span style="color:#94A3B8;font-size:12px;text-transform:uppercase;font-weight:600;">Message</span>
                    <div style="margin-top:8px;background:#0F172A;border-radius:10px;padding:16px;border-left:3px solid #8B5CF6;">
                      <p style="margin:0;color:#CBD5E1;font-size:14px;line-height:1.7;">${data.message.replace(/\n/g, '<br>')}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <div style="margin-top:24px;">
                <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.topic)}" style="display:inline-block;background:#8B5CF6;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;margin-right:10px;">
                  Reply to ${data.name}
                </a>
                <a href="${SITE_URL}/admin/contacts" style="display:inline-block;background:#1E293B;color:#94A3B8;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:8px;border:1px solid #334155;">
                  View in Admin
                </a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }

  try {
    const data: ContactPayload = await req.json()

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: 'name, email, and message are required' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      })
    }

    // Save to Supabase (using service role to bypass RLS issues from edge fn)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { error: dbError } = await supabaseAdmin.from('contacts').insert({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      topic: data.topic ?? 'General question',
      message: data.message.trim(),
      company: data.company?.trim() || null,
      phone: data.phone?.trim() || null,
    })

    if (dbError) {
      console.error('DB insert error:', dbError)
      // Don't fail — still send emails
    }

    // Send emails in parallel
    await Promise.allSettled([
      sendEmail(
        data.email,
        `We got your message, ${data.name}! 👋`,
        userThankYouEmail(data),
      ),
      sendEmail(
        ADMIN_EMAIL,
        `🔔 New Contact: ${data.name} — ${data.topic}`,
        adminNotificationEmail(data),
      ),
    ])

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('send-contact-email error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }
})
