// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const superbaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // This is a local variable
const superbaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!superbaseUrl || !superbaseAnonKey) {
  console.error("Supabase URL or Anon Key are not set in environment variables.");
}

export const superbase = createClient(superbaseUrl, superbaseAnonKey); // Only 'superbase' is exported