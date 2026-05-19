import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string || 'https://ifdayehqhwtrhdfqnigq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZGF5ZWhxaHd0cmhkZnFuaWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzIxMDMsImV4cCI6MjA5NDc0ODEwM30.pm6q_UJuV9ii9qBbtP7bmQX9kXmvfedxb_LmuJFmMOo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
