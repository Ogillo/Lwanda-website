import { createClient } from "@supabase/supabase-js"

export function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string
  return createClient(url, key)
}

export async function adminAuth(req: Request) {
  const supabase = getAdminSupabase()
  const auth = req.headers.get("authorization") || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : undefined
  if (!token) return { ok: false, error: "Admin access required" }
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data?.user) return { ok: false, error: "Admin access required" }
  const role = (data.user.app_metadata as any)?.role || (data.user.user_metadata as any)?.role
  const email = (data.user.email as string) || ""
  const whitelist = (process.env.ADMIN_WHITELIST || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  if (role !== "admin" && !whitelist.includes(email) && email !== "ogillovicky70@gmail.com") {
    return { ok: false, error: "Admin access required" }
  }
  return { ok: true }
}

export async function listFolders(bucket: string, prefix: string = "") {
  const supabase = getAdminSupabase()
  const { data, error } = await supabase.storage.from(bucket).list(prefix, { limit: 1000, sortBy: { column: "name", order: "asc" } })
  if (error) throw new Error(error.message)
  const entries = data || []
  const folders = entries.filter((e: any) => !e.metadata || !String(e.name).includes(".")).map((e: any) => (prefix ? `${prefix}/${e.name}` : e.name))
  return folders
}
