"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [csrf, setCsrf] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    fetch("/api/auth/csrf").then(r => r.json()).then(j => setCsrf(j.token)).catch(() => setCsrf(""))
  }, [])

  const submit = async () => {
    setLoading(true)
    setError("")
    setOk(false)
    try {
      const res = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json", "x-csrf-token": csrf }, body: JSON.stringify({ username, email, password, confirm }) })
      const j = await res.json()
      if (!res.ok) throw new Error(j.error || "Sign-up failed")
      setOk(true)
    } catch (e: any) {
      setError(e.message || "Sign-up failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="rounded-lg border p-6 bg-card">
        <div className="text-xl font-semibold mb-4">Admin Sign Up</div>
        {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>}
        {ok && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">Account created. You can now log in.</div>}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Admin username</Label>
            <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="min 8 chars" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@demo.com" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="12+ chars, mixed" />
          </div>
          <div className="space-y-2">
            <Label>Confirm password</Label>
            <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
          </div>
          <Button onClick={submit} disabled={loading} isLoading={loading} variant="admin">{loading ? "Creating..." : "Create Admin"}</Button>
        </div>
      </div>
    </div>
  )
}

