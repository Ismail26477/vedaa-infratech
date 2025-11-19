import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://pklocczcltxlcwppwfpu.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrbG9jY3pjbHR4bGN3cHB3ZnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDE4OTYsImV4cCI6MjA3ODk3Nzg5Nn0.RH3YFs4PRoUk2LIkgQWKTYRG_aU4pexwYK0D1Om1nGc"

export function createClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase credentials")
  }

  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
