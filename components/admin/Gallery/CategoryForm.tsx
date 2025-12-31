"use client"
import { useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function CategoryForm() {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [parent, setParent] = useState("")
  const submit = async () => {
    const supabase = getSupabaseBrowser()
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    await fetch("/api/admin/images/create-category", { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ bucket: "gallery", name, slug, parent }) })
    setName("")
    setSlug("")
    setParent("")
  }
  return (
    <div className="rounded-lg border p-4">
      <div className="flex gap-2">
        <input className="border px-2 py-1 rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border px-2 py-1 rounded" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
        <input className="border px-2 py-1 rounded" placeholder="Parent" value={parent} onChange={(e) => setParent(e.target.value)} />
        <Button onClick={submit}>Create category</Button>
      </div>
    </div>
  )
}
