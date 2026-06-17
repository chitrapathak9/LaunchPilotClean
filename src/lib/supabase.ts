import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LeadData {
  name?: string;
  email: string;
  type: 'contact' | 'booking' | 'newsletter';
  details?: Record<string, any>;
}

export async function submitLead(lead: LeadData) {
  try {
    const cleanUrl = supabaseUrl.replace(/\/+$/, '');
    const response = await fetch(`${cleanUrl}/functions/v1/submit-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Apikey': supabaseAnonKey,
      },
      body: JSON.stringify(lead),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let parsedError = errorText;
      try {
        const json = JSON.parse(errorText);
        parsedError = json.error || errorText;
      } catch (e) {}
      throw new Error(parsedError || `Failed to submit lead: status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw error;
  }
}

