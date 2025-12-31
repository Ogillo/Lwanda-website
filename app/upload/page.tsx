"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getSupabase } from "@/lib/supabase/client"

export default function UserUploadPage() {
  const [selectedBucket, setSelectedBucket] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("")
  const [buckets, setBuckets] = useState<string[]>([])
  const [folders, setFolders] = useState<string[]>([])
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const resBuckets = await fetch("/api/storage/buckets")
        const jsonBuckets = await resBuckets.json()
        if (jsonBuckets.error) throw new Error(jsonBuckets.error)
        const bucketIds: string[] = (jsonBuckets.buckets || []).map((b: any) => b.id)
        setBuckets(bucketIds)
        const initialBucket = bucketIds[0] || ""
        setSelectedBucket(initialBucket)
        if (initialBucket) {
          const resFolders = await fetch(`/api/storage/folders?bucket=${encodeURIComponent(initialBucket)}&prefix=`)
          const jsonFolders = await resFolders.json()
          if (jsonFolders.error) throw new Error(jsonFolders.error)
          const folderList: string[] = jsonFolders.folders || []
          setFolders(folderList)
          const initialFolder = folderList[0] || ""
          setSelectedFolder(initialFolder)
        }
      } catch (e) {
        setErrorMsg("Failed to load storage configuration")
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setUploadedUrl(null)
    setErrorMsg(null)
  }

  const handleUpload = async () => {
    try {
      if (!file) return
      if (!selectedBucket) {
        setErrorMsg("Select a bucket")
        return
      }
      setUploading(true)
      const supabase = getSupabase()
      if (!supabase) throw new Error("Supabase not configured")
      const processed = await new Promise<{ blob: Blob; name: string; type: string }>((resolve, reject) => {
        const img = new Image()
        const reader = new FileReader()
        reader.onload = () => {
          img.onload = () => {
            const maxW = 1920
            const maxH = 1080
            let w = img.width
            let h = img.height
            const ratio = Math.min(1, Math.min(maxW / w, maxH / h))
            w = Math.round(w * ratio)
            h = Math.round(h * ratio)
            const canvas = document.createElement("canvas")
            canvas.width = w
            canvas.height = h
            const ctx = canvas.getContext("2d")
            if (!ctx) return reject(new Error("Canvas unsupported"))
            ctx.drawImage(img, 0, 0, w, h)
            const targetType = file.type === "image/webp" ? "image/webp" : file.type
            canvas.toBlob(
              (blob) => {
                if (!blob) return reject(new Error("Failed to create blob"))
                resolve({ blob, name: file.name, type: targetType })
              },
              targetType,
              0.9,
            )
          }
          img.onerror = () => reject(new Error("Invalid image"))
          img.src = reader.result as string
        }
        reader.onerror = () => reject(new Error("Failed to read file"))
        reader.readAsDataURL(file)
      })
      const path = selectedFolder ? `${selectedFolder}/${processed.name}` : processed.name
      const { error } = await supabase.storage.from(selectedBucket).upload(path, processed.blob, { upsert: false, contentType: processed.type })
      if (error) throw error
      const { data } = supabase.storage.from(selectedBucket).getPublicUrl(path)
      setUploadedUrl(data.publicUrl)
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Upload an Image</h1>
        <p className="text-muted-foreground mb-8">Select a bucket and folder, preview your image, then upload.</p>

        <Card className="p-6 space-y-6">
          {loading ? (
            <p className="text-muted-foreground">Loading storage configuration...</p>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bucket">Bucket</Label>
                  <select
                    id="bucket"
                    value={selectedBucket}
                    onChange={async (e) => {
                      const b = e.target.value
                      setSelectedBucket(b)
                      setFolders([])
                      setSelectedFolder("")
                      setUploadedUrl(null)
                      try {
                        const resFolders = await fetch(`/api/storage/folders?bucket=${encodeURIComponent(b)}&prefix=`)
                        const jsonFolders = await resFolders.json()
                        if (jsonFolders.error) throw new Error(jsonFolders.error)
                        const fList: string[] = jsonFolders.folders || []
                        setFolders(fList)
                        const first = fList[0] || ""
                        setSelectedFolder(first)
                      } catch (err) {
                        setErrorMsg("Failed to load folders")
                      }
                    }}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    {buckets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="folder">Folder</Label>
                  <select
                    id="folder"
                    value={selectedFolder}
                    onChange={(e) => setSelectedFolder(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    {folders.length === 0 ? (
                      <option value="">(root)</option>
                    ) : (
                      folders.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div>
                  <Label htmlFor="file">Select Image</Label>
                  <Input id="file" type="file" accept="image/*" onChange={handleSelect} className="mt-1" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-start">
                <div>
                  <div className="border rounded-lg p-3 flex items-center justify-center bg-muted h-48">
                    {preview ? (
                      <img src={preview} className="w-48 h-48 object-cover rounded-lg" />
                    ) : (
                      <span className="text-muted-foreground text-sm">No preview</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="button" onClick={handleUpload} disabled={!file || !selectedBucket || uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setPreview(null); setFile(null); setUploadedUrl(null) }}>Reset</Button>
                </div>
                <div>
                  <div className="border rounded-lg p-3 flex items-center justify-center bg-muted h-48">
                    {uploadedUrl ? (
                      <img src={uploadedUrl} className="w-48 h-48 object-cover rounded-lg" />
                    ) : (
                      <span className="text-muted-foreground text-sm">No uploaded image</span>
                    )}
                  </div>
                </div>
              </div>

              {errorMsg && <p className="text-destructive text-sm">{errorMsg}</p>}
            </>
          )}
        </Card>
      </div>
      <SiteFooter />
    </div>
  )
}
