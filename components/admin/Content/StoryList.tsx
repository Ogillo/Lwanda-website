"use client"
import { useEffect, useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function StoryList() {
  const [items, setItems] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(25)
  const [q, setQ] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)
  const [sort, setSort] = useState<"recent_preview" | "recent_edit" | "status">("recent_preview")
  const [loading, setLoading] = useState(false)
  const [itemsVersion, setItemsVersion] = useState(0)
  const [editOpen, setEditOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [form, setForm] = useState<any>({ title: "", content: "", story_date: "", tag: "", status: "draft", excerpt: "" })
  const [saving, setSaving] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [originalImagePath, setOriginalImagePath] = useState<string>("")
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [newImagePath, setNewImagePath] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageError, setImageError] = useState<string>("")
  const [imageAlt, setImageAlt] = useState<string>("")

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const supabase = getSupabaseBrowser()
        const { data } = await supabase.auth.getSession()
        const token = data.session?.access_token
        const params = new URLSearchParams()
        if (q) params.set("q", q)
        params.set("page", String(page))
        params.set("limit", String(limit))
        if (statusFilter) params.set("status", statusFilter)
        const res = await fetch(`/api/admin/content/stories/list?${params.toString()}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
        const json = await res.json()
        let list = json.items || []
        if (sort === "recent_edit") {
          list = [...list].sort((a: any, b: any) => new Date(b.updated_at || b.created_at || 0).getTime() - new Date(a.updated_at || a.created_at || 0).getTime())
        } else if (sort === "status") {
          list = [...list].sort((a: any, b: any) => String(a.status || "").localeCompare(String(b.status || "")))
        }
        setItems(list)
        setTotal(json.total_count || list.length)
      } catch {}
      setLoading(false)
    }
    load()
  }, [q, page, limit, statusFilter, sort, itemsVersion])

  const openEdit = (it: any) => {
    setEditingItem(it)
    setForm({
      title: it.title || "",
      content: it.content || "",
      story_date: it.story_date ? String(it.story_date).slice(0, 10) : "",
      tag: it.tag || "",
      status: it.status || "draft",
      excerpt: it.excerpt || (typeof it.content === "string" ? it.content.slice(0, 160) : ""),
    })
    const path = typeof it.image_path === "string" ? it.image_path : ""
    setOriginalImagePath(path)
    setNewImagePath(null)
    setImageAlt(String(it.image_alt || ""))
    try {
      const supabase = getSupabaseBrowser()
      let url = ""
      if (path) {
        if (path.startsWith("http")) url = path
        else url = supabase.storage.from("stories").getPublicUrl(path).data.publicUrl
      }
      setPreviewUrl(url)
    } catch {
      setPreviewUrl("")
    }
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
        story_date: form.story_date || null,
        tag: form.tag || null,
        status: form.status || null,
        excerpt: form.excerpt || (typeof form.content === "string" ? form.content.slice(0, 160) : null),
        image_path: newImagePath !== null ? newImagePath : originalImagePath || null,
        image_alt: imageAlt || null,
      }
      const res = await fetch(`/api/stories/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok) throw new Error((json && json.error) || "Failed to update story")
      setMessage("Updated successfully")
      setEditOpen(false)
      const refreshed = await fetch(`/api/stories`)
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
      const res = await fetch(`/api/stories/${deletingId}`, { method: "DELETE" })
      const json = await res.json().catch(() => null)
      if (!res.ok) throw new Error((json && json.error) || "Failed to delete story")
      setItems((prev) => prev.filter((x) => x.id !== deletingId))
      setConfirmOpen(false)
      setDeletingId(null)
    } catch (e: any) {
      setError(e?.message || "Delete failed")
    }
  }

  const pickFile = () => {
    console.log("[StoryList] pickFile invoked")
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/png,image/jpeg,image/webp,image/gif"
    input.onchange = () => {
      const file = input.files && input.files[0]
      if (file) {
        console.log("[StoryList] file selected", { name: file.name, type: file.type, size: file.size })
        void handleSelectedFile(file)
      }
    }
    input.click()
  }

  const handleSelectedFile = async (file: File) => {
    setImageError("")
    if (file.size > 5 * 1024 * 1024) {
      setImageError("File too large (max 5MB)")
      console.warn("[StoryList] file too large")
      return
    }
    const typeOk = ["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type)
    if (!typeOk) {
      setImageError("Unsupported format")
      console.warn("[StoryList] unsupported format", file.type)
      return
    }
    const objUrl = URL.createObjectURL(file)
    const img = new Image()
    img.onload = async () => {
      if (img.width < 300 || img.height < 300) {
        setImageError("Image dimensions too small (min 300x300)")
        URL.revokeObjectURL(objUrl)
        console.warn("[StoryList] image too small", { w: img.width, h: img.height })
        return
      }
      setPreviewUrl(objUrl + `?v=${Date.now()}`)
      setUploadingImage(true)
      try {
        const supabase = getSupabaseBrowser()
        const { data } = await supabase.auth.getSession()
        const token = data.session?.access_token
        const fd = new FormData()
        fd.append("files", file)
        fd.append("bucket", "stories")
        console.log("[StoryList] uploading image to /api/admin/images/upload")
        const res = await fetch("/api/admin/images/upload", { method: "POST", headers: token ? { Authorization: `Bearer ${token}` } : {}, body: fd })
        const json = await res.json()
        const path = json?.files?.[0]?.path || json?.path
        if (!res.ok || !path) {
          console.error("[StoryList] upload failed", json)
          throw new Error(json?.error || "Upload failed")
        }
        setNewImagePath(String(path))
        console.log("[StoryList] upload success, path:", path)
      } catch (e: any) {
        setImageError(e?.message || "Upload failed")
        console.error("[StoryList] upload error", e)
      } finally {
        setUploadingImage(false)
      }
    }
    img.onerror = () => {
      setImageError("Failed to load image for validation")
      URL.revokeObjectURL(objUrl)
      console.error("[StoryList] failed to load image for validation")
    }
    img.src = objUrl
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files && e.dataTransfer.files[0]
    if (file) void handleSelectedFile(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const revertImage = () => {
    setNewImagePath(null)
    setImageError("")
    try {
      const supabase = getSupabaseBrowser()
      if (originalImagePath) {
        if (originalImagePath.startsWith("http")) setPreviewUrl(originalImagePath + `?v=${Date.now()}`)
        else setPreviewUrl(supabase.storage.from("stories").getPublicUrl(originalImagePath).data.publicUrl + `?v=${Date.now()}`)
      } else {
        setPreviewUrl("")
      }
    } catch {
      setPreviewUrl("")
    }
  }
  return (
    <div className="rounded-lg border p-4">
      <div className="font-medium mb-4">Stories</div>
      
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between">
            <div className="text-sm flex-1">
              <a href={it.id ? `/stories/${it.id}` : "/stories"} className="font-medium text-primary hover:underline">{it.title}</a>
              <div className="text-xs text-muted-foreground">Last modified {new Date(it.updated_at || it.created_at || Date.now()).toLocaleString()}</div>
              <div className="text-xs flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${it.status === "published" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>{it.status || "unknown"}{it.status === "published" ? " • previewing" : ""}</span>
                {it.locked_by && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700">Locked by {it.locked_by}</span>
                )}
                {it.author && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent text-accent-foreground">Author: {it.author}</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => openEdit(it)}>Edit</Button>
              <Button variant="outline" onClick={() => askDelete(it.id)}>Delete</Button>
            </div>
          </div>
        ))}
        {!items.length && <div className="text-sm text-muted-foreground">No stories</div>}
        {error && <div className="text-sm text-destructive">{error}</div>}
        {message && <div className="text-sm text-primary">{message}</div>}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">Total: {total}</div>
        <div className="flex items-center gap-2">
          <button className="border px-3 py-2 rounded-md" disabled={page <= 1 || loading} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
          <span className="text-sm">Page {page}</span>
          <button className="border px-3 py-2 rounded-md" disabled={loading || items.length < limit} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />
          <div className="relative bg-card text-card-foreground border border-border rounded-lg w-[90vw] max-w-xl p-6">
            <div className="text-lg font-semibold mb-4">Edit Story</div>
            <div className="space-y-3">
              <div
                className="w-full rounded-md border bg-muted flex items-center justify-center min-h-[300px] relative overflow-hidden"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                aria-label="Story image preview and drop area"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt={imageAlt || form.title || "Story image"} className="w-full h-[300px] object-cover" />
                ) : (
                  <div className="text-sm text-muted-foreground">No image</div>
                )}
                {uploadingImage && (
                  <div className="absolute bottom-2 right-2 bg-background/80 border rounded px-2 py-1 text-xs">Uploading...</div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={pickFile}>Change Image</Button>
                {newImagePath !== null && <Button variant="outline" onClick={revertImage}>Revert</Button>}
              </div>
              {imageError && <div className="text-sm text-destructive">{imageError}</div>}
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Image alt text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <textarea className="w-full border px-3 py-2 rounded-md h-28" placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              <input type="date" className="w-full border px-3 py-2 rounded-md" value={form.story_date} onChange={(e) => setForm({ ...form, story_date: e.target.value })} />
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Tag" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
              <select className="w-full border px-3 py-2 rounded-md" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="draft">draft</option>
                <option value="published">published</option>
              </select>
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Excerpt (auto-filled)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={closeEdit}>Cancel</Button>
              <Button onClick={async () => {
                console.log("[StoryList] saving story", { id: editingItem?.id, image_path: newImagePath ?? originalImagePath })
                await handleUpdate()
                setItemsVersion((v) => v + 1)
              }} isLoading={saving}>Save</Button>
              </div>
          </div>
        </div>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmOpen(false)} />
          <div className="relative bg-card text-card-foreground border border-border rounded-lg w-[90vw] max-w-md p-6">
            <div className="text-lg font-semibold mb-2">Delete Story</div>
            <div className="text-sm text-muted-foreground mb-4">Are you sure you want to delete this story?</div>
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
