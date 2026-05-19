/*
  # Reload schema cache
  Forces PostgREST schema cache refresh by touching the waitlist table.
*/

COMMENT ON TABLE waitlist IS 'Waitlist signups for the launch';
