import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mfshjeyeqqiexluiujnd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mc2hqZXllcXFpZXhsdWl1am5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDU3OTIsImV4cCI6MjA5NDQyMTc5Mn0.sTuW7uzF4Xfvz7xndm1V23Pzo2rZ2d4V8m0LTGkJswE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
