import DashboardShell from "@/components/admin/Dashboard/DashboardShell"
import StatCard from "@/components/admin/Dashboard/StatCard"
import Sparkline from "@/components/admin/Dashboard/Sparkline"
import LatestMessages from "@/components/admin/Dashboard/LatestMessages"
import { cookies, headers } from "next/headers"

function getBaseUrl() {
  const h = headers()
  const host = h.get("x-forwarded-host") || h.get("host") || ""
  const proto = h.get("x-forwarded-proto") || "https"
  const envBase = process.env.NEXT_PUBLIC_SITE_URL || ""
  return envBase || (host ? `${proto}://${host}` : "")
}

async function getStats() {
  const token = cookies().get("sb-access-token")?.value
  const base = getBaseUrl()
  try {
    const res = await fetch(`${base}/api/admin/stats`, { cache: "no-store", headers: token ? { Authorization: `Bearer ${token}` } : {} })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function getLatest() {
  const token = cookies().get("sb-access-token")?.value
  const base = getBaseUrl()
  try {
    const res = await fetch(`${base}/api/admin/contact-latest?limit=3`, { cache: "no-store", headers: token ? { Authorization: `Bearer ${token}` } : {} })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const latest = await getLatest()
  return (
    <DashboardShell>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Contact messages" value={stats?.contact_total ?? 0} />
        <StatCard title="Last 7 days" value={stats?.contact_last_7_days ?? 0} />
        <StatCard title="Upcoming stories" value={stats?.upcoming_stories_count ?? 0} />
      </div>
      <div className="mt-6">
        <Sparkline daily={stats?.contact_trend_daily ?? []} weekly={stats?.contact_trend_weekly ?? []} />
      </div>
      <div className="mt-6">
        <LatestMessages items={latest ?? []} />
      </div>
    </DashboardShell>
  )
}
