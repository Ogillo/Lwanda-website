"use client"
import { useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setError("")
    if (!email || !password) {
      setError("Email and password are required")
      return
    }
    setLoading(true)
    try {
      const supabase = getSupabaseBrowser()
      const loginEmail = email.includes("@") ? email : `${email}@companydomain.com`
      let res = await supabase.auth.signInWithPassword({ email: loginEmail, password })
      if (res.error) {
        try {
          const boot = await fetch("/api/admin/bootstrap-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: loginEmail, password })
          })
          if (boot.ok) {
            res = await supabase.auth.signInWithPassword({ email: loginEmail, password })
          }
        } catch {}
      }
      if (res.error) {
        setError("Invalid credentials")
        return
      }
      const { data: userData } = await supabase.auth.getUser()
      const role = (userData.user?.app_metadata as any)?.role || (userData.user?.user_metadata as any)?.role
      if (role !== "admin") {
        setError("Admin access required")
        return
      }
      window.location.href = "/admin"
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-card border rounded-xl p-6">
        <h1 className="text-xl font-bold mb-4">Admin Sign In</h1>
        {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Email or Username</label>
            <input
              className="w-full border px-3 py-2 rounded-md"
              type="email"
              placeholder="your@email.com or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              className="w-full border px-3 py-2 rounded-md"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={submit} disabled={loading} isLoading={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
