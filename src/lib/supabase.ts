import { createClient } from '@supabase/supabase-js';

// Custom Supabase project — do not change these to env vars,
// bolt.new's .env overrides them with the wrong project.
const supabaseUrl = 'https://ifdayehqhwtrhdfqnigq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZGF5ZWhxaHd0cmhkZnFuaWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzIxMDMsImV4cCI6MjA5NDc0ODEwM30.pm6q_UJuV9ii9qBbtP7bmQX9kXmvfedxb_LmuJFmMOo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
