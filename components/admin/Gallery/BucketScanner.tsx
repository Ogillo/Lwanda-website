"use client"
import { useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function BucketScanner() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const scan = async () => {
    setLoading(true)
    try {
      const supabase = getSupabaseBrowser()
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      const res = await fetch("/api/admin/images/scan-buckets", { method: "POST", headers: token ? { Authorization: `Bearer ${token}` } : {} })
      setResult(await res.json())
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex items-center gap-2">
      <Button onClick={scan} disabled={loading} variant="admin" isLoading={loading}>Scan existing bucket</Button>
      {result && <span className="text-sm text-muted-foreground">Done</span>}
    </div>
  )
}
