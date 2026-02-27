"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [csrf, setCsrf] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/auth/csrf").then(r => r.json()).then(j => setCsrf(j.token)).catch(() => setCsrf(""))
  }, [])

  const submit = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json", "x-csrf-token": csrf }, body: JSON.stringify({ identifier, password, remember }) })
      const contentType = res.headers.get("content-type") || ""
      let j: any = null
      if (contentType.includes("application/json")) {
        j = await res.json()
      } else {
        const txt = await res.text()
        throw new Error("Unexpected server response. Please try again.")
      }
      if (!res.ok) throw new Error(j?.error || "Login failed")
      const next = new URLSearchParams(window.location.search).get("next") || "/admin"
      window.location.href = next
    } catch (e: any) {
      setError(e?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="rounded-lg border p-6 bg-card">
        <div className="text-xl font-semibold mb-4">Admin Login</div>
        {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Username or Email</Label>
            <Input value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="admin_demo or admin@demo.com" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me</label>
            <a href="#" className="text-sm underline">Forgot password?</a>
          </div>
          <Button onClick={submit} disabled={loading} isLoading={loading} variant="admin">{loading ? "Signing in..." : "Sign In"}</Button>
          <div className="text-sm">Demo: admin_demo / admin@demo.com / DemoAdmin@1234</div>
        </div>
      </div>
    </div>
  )
}
