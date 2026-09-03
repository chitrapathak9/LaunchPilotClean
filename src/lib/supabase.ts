import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  rawSupabaseUrl && 
  rawSupabaseAnonKey && 
  !rawSupabaseUrl.includes('dummy') && 
  !rawSupabaseUrl.includes('placeholder') &&
  rawSupabaseAnonKey !== 'dummy_key'
);

const supabaseUrl = isSupabaseConfigured ? rawSupabaseUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = isSupabaseConfigured ? rawSupabaseAnonKey : 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LeadData {
  name?: string;
  email: string;
  type: 'contact' | 'booking' | 'newsletter';
  details?: Record<string, any>;
}

export async function submitLead(lead: LeadData) {
  // 1. Always store locally in localStorage so no messages/leads are lost
  const localLeadEntry = {
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    created_at: new Date().toISOString(),
    name: lead.name || 'Anonymous',
    email: lead.email,
    type: lead.type,
    details: lead.details || {},
  };

  try {
    const existing = JSON.parse(localStorage.getItem('launchpilot_leads') || '[]');
    existing.unshift(localLeadEntry);
    localStorage.setItem('launchpilot_leads', JSON.stringify(existing));
  } catch (e) {
    console.warn('LocalStorage lead save warning:', e);
  }

  // 2. If real Supabase credentials are present, attempt remote sync
  if (isSupabaseConfigured) {
    try {
      const cleanUrl = rawSupabaseUrl.replace(/\/+$/, '');
      const response = await fetch(`${cleanUrl}/functions/v1/submit-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${rawSupabaseAnonKey}`,
          'Apikey': rawSupabaseAnonKey,
        },
        body: JSON.stringify(lead),
      });
      
      if (response.ok) {
        return await response.json();
      }

      // If function fails, attempt direct table insert
      const { data, error } = await supabase.from('leads').insert([
        {
          name: lead.name,
          email: lead.email,
          type: lead.type,
          details: lead.details || {},
          created_at: new Date().toISOString()
        }
      ]);

      if (!error) {
        return { success: true, data };
      }
    } catch (error) {
      console.warn('Remote Supabase submission failed, lead stored locally:', error);
    }
  }

  // 3. Fallback for demo/development mode: simulate realistic async response
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { 
    success: true, 
    mode: 'local', 
    lead: localLeadEntry,
    message: 'Message saved successfully.' 
  };
}


