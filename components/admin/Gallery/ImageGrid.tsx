"use client"
import { useEffect, useState, useCallback } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import ImageCard from "./ImageCard"

export default function ImageGrid({ 
    bucket, 
    folder,
    onSetActive,
    activeImage
}: { 
    bucket: string, 
    folder?: string,
    onSetActive?: (path: string) => void,
    activeImage?: string
}) {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const supabase = getSupabaseBrowser()
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      const query = new URLSearchParams({ bucket, folder: folder || "" })
      const res = await fetch(`/api/admin/images/list?${query}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      const json = await res.json()
      setItems(json.items || [])
    } finally {
      setLoading(false)
    }
  }, [bucket, folder])

  useEffect(() => {
    load()
  }, [load])

  const handleDelete = async (path: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return
    try {
        const supabase = getSupabaseBrowser()
        const { data } = await supabase.auth.getSession()
        const token = data.session?.access_token
        const res = await fetch("/api/admin/images/delete", { 
            method: "POST", 
            headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
            body: JSON.stringify({ bucket, path })
        })
        if (res.ok) {
            load()
        } else {
            alert("Failed to delete image")
        }
    } catch (e) {
        console.error(e)
        alert("Error deleting image")
    }
  }

  const handleRename = async (path: string, newName: string) => {
    try {
        const supabase = getSupabaseBrowser()
        const { data } = await supabase.auth.getSession()
        const token = data.session?.access_token
        const fromPath = path
        const toPath = folder ? `${folder}/${newName}` : newName
        
        const res = await fetch("/api/admin/images/rename", { 
            method: "POST", 
            headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
            body: JSON.stringify({ bucket, fromPath, toPath })
        })
        if (res.ok) {
            load()
        } else {
            alert("Failed to rename image")
        }
    } catch (e) {
        console.error(e)
        alert("Error renaming image")
    }
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((it) => (
        <ImageCard 
            key={it.path} 
            item={it} 
            onDelete={handleDelete}
            onRename={handleRename}
            onSetActive={onSetActive}
            isActive={activeImage === it.path}
        />
      ))}
      {items.length === 0 && !loading && (
        <div className="col-span-full text-center py-10 text-muted-foreground">
            No images found in this folder.
        </div>
      )}
    </div>
  )
}
