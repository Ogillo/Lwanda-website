"use client"
import { useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import FileInput from "@/components/admin/UI/FileInput"

export default function StoryEditor() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [storyDate, setStoryDate] = useState("")
  const [tag, setTag] = useState("education")
  const [status, setStatus] = useState("draft")
  const [media, setMedia] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const save = async () => {
    if (!title) {
      setError("Title is required")
      return
    }
    if (!content || content.trim().length < 10) {
      setError("Content is required (min 10 characters)")
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
        fd.append("files", media[0]) // Changed to "files" to match API
        fd.append("bucket", "stories") // Changed to "stories" bucket as requested
        // No folder specified means root of bucket, or we can organize by date/id if needed
        
        const uploadRes = await fetch("/api/admin/images/upload", {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: fd
        })
        
        const uploadJson = await uploadRes.json()
        if (!uploadRes.ok) {
            throw new Error(uploadJson?.error || "Failed to upload image")
        }
        // API returns { files: [{ path: ... }] } or similar. Need to verify API response structure.
        // Assuming API returns { success: true, files: [{ path: "..." }] }
        media_path = uploadJson.files?.[0]?.path || ""
        
        if (!media_path && uploadJson.path) media_path = uploadJson.path
      }

      const res = await fetch("/api/admin/content/stories/create", { 
      
        method: "POST", 
        headers: { 
          "Content-Type": "application/json", 
          ...(token ? { Authorization: `Bearer ${token}` } : {}) 
        }, 
        body: JSON.stringify({ 
          title,
          content,
          story_date: storyDate || null,
          tag,
          status,
          image_path: media_path || null
        }) 
      })
      
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Failed to create story")
      
      // Reset form
      setTitle("")
      setContent("")
      setStoryDate("")
      setTag("education")
      setStatus("draft")
      setMedia([])
      setMessage("Story created successfully!")
    } catch (e: any) {
      console.error(e)
      setError(e.message || "An error occurred")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="rounded-lg border p-4 bg-card">
      <div className="font-medium mb-4 text-lg">Create New Story</div>
      
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
            placeholder="Story Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
             <label className="text-sm font-medium">Date</label>
             <input 
                type="date"
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                value={storyDate} 
                onChange={(e) => setStoryDate(e.target.value)} 
              />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-medium">Status</label>
             <select 
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
             >
               <option value="draft">Draft</option>
               <option value="published">Published</option>
             </select>
          </div>
        </div>

         <div className="space-y-2">
             <label className="text-sm font-medium">Category</label>
             <select 
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
             >
               <option value="education">Education</option>
               <option value="sponsorship">Sponsorship</option>
               <option value="community">Community</option>
               <option value="health">Health</option>
             </select>
          </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <textarea 
            className="w-full border px-3 py-2 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="Write story content here..." 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Featured Image</label>
          <FileInput 
            onChange={setMedia} 
            value={media}
            accept="image/*"
            label="Upload featured image"
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={save} disabled={uploading} isLoading={uploading} variant="admin">
            {uploading ? "Creating..." : "Create Story"}
          </Button>
        </div>
      </div>
    </div>
  )
}
