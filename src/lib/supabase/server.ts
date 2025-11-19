import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

let instance: ReturnType<typeof createClient> | null = null

export function getSupabaseServer() {
  if (!instance) {
    instance = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  }
  return instance
}
