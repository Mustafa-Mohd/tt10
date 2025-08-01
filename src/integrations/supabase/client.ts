// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://khpejboaxwonukqeolwf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtocGVqYm9heHdvbnVrcWVvbHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxODI0MDUsImV4cCI6MjA2ODc1ODQwNX0.l274puC2-H-H29I3_BZThNWC8r4wJb8tyGLZdDbam-s";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});