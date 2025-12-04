import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ajzyampentdafvdccinx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqenlhbXBlbnRkYWZ2ZGNjaW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTQ5ODgsImV4cCI6MjA4MDE5MDk4OH0.Y9EBDd_oL73jZw0XQOqs2gwZLYkbs89Xqe1RrYhdLMI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
