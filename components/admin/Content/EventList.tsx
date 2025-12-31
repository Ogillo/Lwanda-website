"use client"
import { useEffect, useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function EventList() {
  const [items, setItems] = useState<any[]>([])
  const [editOpen, setEditOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [form, setForm] = useState<any>({ title: "", content: "", event_date: "", event_time: "", location: "", excerpt: "" })
  const [saving, setSaving] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = getSupabaseBrowser()
        const { data } = await supabase.auth.getSession()
        const token = data.session?.access_token
        const res = await fetch(`/api/admin/content/events/list`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        const json = await res.json()
        setItems(Array.isArray(json) ? json : (json.items || []))
      } catch {}
    }
    load()
  }, [])

  const openEdit = (it: any) => {
    setEditingItem(it)
    setForm({
      title: it.title || "",
      content: it.content || "",
      event_date: it.event_date ? String(it.event_date).slice(0, 10) : "",
      event_time: it.event_time || "",
      location: it.location || "",
      excerpt: it.excerpt || (typeof it.content === "string" ? it.content.slice(0, 160) : ""),
    })
    setEditOpen(true)
    setError("")
    setMessage("")
  }

  const closeEdit = () => {
    setEditOpen(false)
    setEditingItem(null)
  }

  const handleUpdate = async () => {
    if (!editingItem) return
    setSaving(true)
    setError("")
    setMessage("")
    try {
      const payload: any = {
        title: form.title,
        content: form.content,
        event_date: form.event_date || null,
        event_time: form.event_time || null,
        location: form.location || null,
        excerpt: form.excerpt || (typeof form.content === "string" ? form.content.slice(0, 160) : null),
      }
      const supabase = getSupabaseBrowser()
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      const res = await fetch(`/api/admin/content/events/update?id=${editingItem.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          body: JSON.stringify(payload),
        }
      )
      const json = await res.json().catch(() => null)
      if (!res.ok) throw new Error((json && json.error) || "Failed to update event")
      setMessage("Updated successfully")
      setEditOpen(false)
      const refreshed = await fetch(`/api/admin/content/events/list`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      const rjson = await refreshed.json()
      setItems(Array.isArray(rjson) ? rjson : (rjson.items || []))
    } catch (e: any) {
      setError(e?.message || "Update failed")
    } finally {
      setSaving(false)
    }
  }

  const askDelete = (id: string) => {
    setDeletingId(id)
    setConfirmOpen(true)
  }

  const performDelete = async () => {
    if (!deletingId) return
    setError("")
    try {
      const supabase = getSupabaseBrowser()
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      const res = await fetch(`/api/admin/content/events/delete?id=${deletingId}`, { method: "DELETE", headers: token ? { Authorization: `Bearer ${token}` } : {} })
      const json = await res.json().catch(() => null)
      if (!res.ok) throw new Error((json && json.error) || "Failed to delete event")
      setItems((prev) => prev.filter((x) => x.id !== deletingId))
      setConfirmOpen(false)
      setDeletingId(null)
    } catch (e: any) {
      setError(e?.message || "Delete failed")
    }
  }
  return (
    <div className="rounded-lg border p-4">
      <div className="font-medium mb-2">Events</div>
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium">{it.title}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => openEdit(it)}>Edit</Button>
              <Button variant="outline" onClick={() => askDelete(it.id)}>Delete</Button>
            </div>
          </div>
        ))}
        {!items.length && <div className="text-sm text-muted-foreground">No events</div>}
        {error && <div className="text-sm text-destructive">{error}</div>}
        {message && <div className="text-sm text-primary">{message}</div>}
      </div>

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />
          <div className="relative bg-card text-card-foreground border border-border rounded-lg w-[90vw] max-w-xl p-6">
            <div className="text-lg font-semibold mb-4">Edit Event</div>
            <div className="space-y-3">
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <textarea className="w-full border px-3 py-2 rounded-md h-28" placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              <input type="date" className="w-full border px-3 py-2 rounded-md" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
              <input type="time" className="w-full border px-3 py-2 rounded-md" value={form.event_time} onChange={(e) => setForm({ ...form, event_time: e.target.value })} />
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Excerpt (auto-filled)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={closeEdit}>Cancel</Button>
              <Button onClick={handleUpdate} isLoading={saving}>Save</Button>
            </div>
          </div>
        </div>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmOpen(false)} />
          <div className="relative bg-card text-card-foreground border border-border rounded-lg w-[90vw] max-w-md p-6">
            <div className="text-lg font-semibold mb-2">Delete Event</div>
            <div className="text-sm text-muted-foreground mb-4">Are you sure you want to delete this event?</div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={performDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
