"use client"
import { useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import FileInput from "@/components/admin/UI/FileInput"

export default function EventEditor() {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [content, setContent] = useState("")
  const [media, setMedia] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const save = async () => {
    if (!title) {
      setError("Title is required")
      return
    }
    
    setUploading(true)
    setError("")
    setMessage("")
    
    try {
      const supabase = getSupabaseBrowser()
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      
      let media_path = ""
      
      // Upload media if present
      if (media.length > 0) {
        const fd = new FormData()
        fd.append("files", media[0])
        fd.append("bucket", "events")
        
        const uploadRes = await fetch("/api/admin/images/upload", {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: fd
        })
        
        const uploadJson = await uploadRes.json()
        if (!uploadRes.ok) {
            throw new Error(uploadJson?.error || "Failed to upload image")
        }
        media_path = uploadJson.files?.[0]?.path || ""
        if (!media_path && uploadJson.path) media_path = uploadJson.path
      }

      const res = await fetch("/api/admin/content/events/create", { 
        method: "POST", 
        headers: { 
          "Content-Type": "application/json", 
          ...(token ? { Authorization: `Bearer ${token}` } : {}) 
        }, 
        body: JSON.stringify({ 
          title, 
          event_date: date || null,
          event_time: time || null,
          location,
          content,
          media_path,
          excerpt: typeof content === "string" ? content.slice(0, 160) : null,
        }) 
      })
      
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Failed to create event")
      
      // Reset form
      setTitle("")
      setDate("")
      setTime("")
      setLocation("")
      setContent("")
      setMedia([])
      setMessage("Event created successfully!")
    } catch (e: any) {
      console.error(e)
      setError(e.message || "An error occurred")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="rounded-lg border p-4 bg-card">
      <div className="font-medium mb-4 text-lg">Create New Event</div>
      
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {error}
        </div>
      )}
      {message && (
        <div className="mb-4 p-3 bg-primary/10 text-primary rounded-md text-sm">
          {message}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title *</label>
          <input 
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="Event Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input 
                    type="date"
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <input 
                    type="time"
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <input 
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="e.g., Community Hall"
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                />
            </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea 
            className="w-full border px-3 py-2 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="Event details..." 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Event Image</label>
          <FileInput 
            onChange={setMedia} 
            value={media}
            accept="image/*"
            label="Upload event image"
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={save} disabled={uploading} isLoading={uploading} variant="admin">
            {uploading ? "Creating..." : "Create Event"}
          </Button>
        </div>
      </div>
    </div>
  )
}
