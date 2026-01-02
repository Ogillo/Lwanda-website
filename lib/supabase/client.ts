import { createClient } from "@supabase/supabase-js"

let serverClient: ReturnType<typeof createClient> | null = null

export function getSupabase(): ReturnType<typeof createClient> | null {
  if (!serverClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return null
    serverClient = createClient(url, key)
  }
  return serverClient
}

export function getSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}
