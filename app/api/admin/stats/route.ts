import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function GET(req: Request) {
  try {
    const auth = await adminAuth(req)
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
    const supabase = getAdminSupabase()
    const today = new Date()
    const last7 = new Date()
    last7.setDate(today.getDate() - 7)
    const dailyStart = new Date()
    dailyStart.setDate(today.getDate() - 14)
    const weeklyStart = new Date()
    weeklyStart.setDate(today.getDate() - 7 * 12)

    const total = await supabase.from("contact_submissions").select("*", { count: "exact", head: true })
    const last7Res = await supabase.from("contact_submissions").select("*", { count: "exact", head: true }).gte("date", last7.toISOString())

    const dailyRows = { data: [] as any[] }
    const weeklyRows = { data: [] as any[] }

    const upcomingStories = await supabase.from("stories").select("*", { count: "exact", head: true }).gte("story_date", today.toISOString()).neq("status", "published")

    return NextResponse.json({
      contact_total: total.count ?? 0,
      contact_last_7_days: last7Res.count ?? 0,
      contact_trend_daily: (dailyRows.data as any[]) || [],
      contact_trend_weekly: (weeklyRows.data as any[]) || [],
      upcoming_stories_count: upcomingStories.count ?? 0,
    })
  } catch (e) {
    return NextResponse.json({ error: "Failed to compute stats" }, { status: 500 })
  }
}
