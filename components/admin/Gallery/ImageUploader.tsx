"use client"
import { useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import FileInput from "@/components/admin/UI/FileInput"
import { Button } from "@/components/ui/button"

export default function ImageUploader({ preset, bucket, folder }: { preset: "hero" | "gallery"; bucket: string; folder?: string }) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [previews, setPreviews] = useState<Array<{ path: string; url?: string; thumbUrl?: string }>>([])
  
  const upload = async () => {
    setUploading(true)
    try {
      setProgress(5)
      setMessage("")
      setError("")
      const supabase = getSupabaseBrowser()
      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData.session?.access_token
      if (!token) {
        setError("Admin access required. Please sign in.")
        return
      }
      const allowed = ["image/jpeg", "image/png", "image/gif"]
      const valid = files.filter((f) => allowed.includes(f.type) && f.size <= 5 * 1024 * 1024)
      if (!valid.length) {
        setError("No valid files. Allowed: JPG, PNG, GIF. Max size: 5MB")
        return
      }
      const fd = new FormData()
      valid.forEach((f) => fd.append("files", f))
      fd.append("bucket", bucket)
      if (folder) fd.append("folder", folder)
      const res = await fetch("/api/admin/images/upload", { method: "POST", headers: token ? { Authorization: `Bearer ${token}` } : {}, body: fd })
      const json = await res.json()
      if (res.ok) {
        setProgress(100)
        setFiles([])
        const uploaded = json.uploaded ?? (json.files?.length || 0)
        const failed = json.failed ?? 0
        const loc = folder ? `${bucket}/${folder}` : bucket
        setMessage(`Uploaded ${uploaded} file(s) to ${loc}. ${failed ? failed + " failed." : ""}`)
        const okFiles = (json.files || []).filter((f: any) => !f.error)
        setPreviews(okFiles.map((f: any) => ({ path: f.path, url: f.url, thumbUrl: f.thumbUrl })))


        try {
          await fetch("/api/admin/log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "upload",
              entityType: "image",
              metadata: { bucket, folder, uploaded, failed }
            })
          })
        } catch {}
      }
      if (!res.ok) {
        const err = json?.error || "Upload failed"
        setError(err)
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && <div className="p-2 text-destructive bg-destructive/10 rounded-md text-sm">{error}</div>}
      {message && (
        <div className="p-2 text-primary bg-primary/10 rounded-md text-sm">
          {message}
          {previews.length > 0 && (
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {previews.map((p, i) => (
                <div key={i} className="rounded-md overflow-hidden border">
                  <img src={p.thumbUrl || p.url || "/placeholder.svg"} alt={p.path} className="w-full h-24 object-cover" />
                  <div className="px-2 py-1 text-[11px] text-muted-foreground truncate">{p.path}</div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-2 text-xs text-muted-foreground">
            If the image does not appear, ensure it is set as Active for the page and that your account has permission to write to the storage bucket.
          </div>
        </div>
      )}
      <FileInput 
        multiple 
        onChange={setFiles} 
        value={files}
        accept="image/*"
        label={`Upload ${preset === 'hero' ? 'Hero' : 'Gallery'} Images`}
      />
      <Button
        className="w-full sm:w-auto"
        onClick={() => void upload()}
        disabled={!files.length || uploading}
        isLoading={uploading}
        variant="admin"
      >
        {uploading ? "Uploading..." : "Start Upload"}
      </Button>
      {uploading && (
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      )}
    </div>
  )
}
