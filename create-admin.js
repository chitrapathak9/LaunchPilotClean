import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ravdrohyffusnbhitnsf.supabase.co', 'sb_publishable_t1cVSKmdKOVSu5K3nWobow_8iE9TPbm');

async function main() {
  const email = 'admin@launchpilot.ai';
  const password = 'LaunchAdmin2026!';
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('User created:', data.user?.id);
  }
}
main();
