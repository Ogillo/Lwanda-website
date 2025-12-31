"use client"

import { useState, useEffect } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Trash2, Edit2, Plus } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

type Leader = {
  id: string
  full_name: string
  position: string
  bio: string
  image_path: string
  start_date: string
  end_date: string | null
  is_active: boolean
}

const POSITIONS = [
  "Project Director",
  "Project Accountant",
  "Project Social Worker",
  "Chairman",
  "Patron / Pastor"
]

export default function LeadershipManager() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [needsAuth, setNeedsAuth] = useState<boolean>(false)
  const [authEmail, setAuthEmail] = useState<string>("")
  const [authPassword, setAuthPassword] = useState<string>("")
  
  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    position: "",
    bio: "",
    start_date: "",
    is_active: true
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [processedFile, setProcessedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  const supabase = getSupabaseBrowser()
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    checkAdmin()
    fetchLeaders()
  }, [])

  const checkAdmin = async () => {
    try {
      const { data } = await supabase.auth.getSession()
      const role =
        (data?.session?.user?.app_metadata as any)?.role ||
        (data?.session?.user?.user_metadata as any)?.role
      const ok = role === "admin"
      setIsAdmin(!!ok)
      setNeedsAuth(!ok)
    } catch {
      setIsAdmin(false)
      setNeedsAuth(true)
    }
  }

  const signInAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword,
      })
      if (error) {
        toast.error("Sign-in failed")
        return
      }
      const role =
        (data?.user?.app_metadata as any)?.role ||
        (data?.user?.user_metadata as any)?.role
      const ok = role === "admin"
      setIsAdmin(!!ok)
      setNeedsAuth(!ok)
      if (!ok) {
        toast.error("Admin role required")
      } else {
        toast.success("Signed in")
      }
    } catch {
      toast.error("Sign-in failed")
    }
  }

  const fetchLeaders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("leadership")
      .select("*")
      .order("position")
    
    if (error) {
      console.error("Error fetching leaders:", error)
      toast.error("Failed to load leaders")
    } else {
      setLeaders(data || [])
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePositionChange = (value: string) => {
    setFormData(prev => ({ ...prev, position: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0]
      const allowed = ["image/jpeg", "image/png", "image/webp"]
      if (!allowed.includes(f.type)) {
        toast.error("Only JPG, PNG, or WEBP images are allowed")
        return
      }
      const max = 5 * 1024 * 1024
      if (f.size > max) {
        toast.error("Image size must be 5MB or less")
        return
      }
      setImageFile(f)
      processImage(f).then(({ file, preview }) => {
        setProcessedFile(file)
        setPreviewUrl(preview)
      }).catch(() => {
        setProcessedFile(null)
        setPreviewUrl("")
      })
    }
  }

  const processImage = async (file: File): Promise<{ file: File; preview: string }> => {
    const url = URL.createObjectURL(file)
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image()
      i.onload = () => resolve(i)
      i.onerror = reject
      i.src = url
    })
    const iw = img.naturalWidth || img.width
    const ih = img.naturalHeight || img.height
    let sx = 0, sy = 0, sw = iw, sh = ih
    let faceBox: { x: number; y: number; width: number; height: number } | null = null
    const supportsFace = typeof (globalThis as any).FaceDetector !== "undefined"
    if (supportsFace) {
      try {
        const FaceDetectorCtor = (globalThis as any).FaceDetector
        const detector = new FaceDetectorCtor()
        const faces = await detector.detect(img)
        if (faces && faces.length > 0) {
          const f = faces[0].boundingBox || faces[0]
          faceBox = { x: Math.max(0, f.x || 0), y: Math.max(0, f.y || 0), width: Math.max(1, f.width || 1), height: Math.max(1, f.height || 1) }
        }
      } catch {}
    }
    if (faceBox) {
      const cx = faceBox.x + faceBox.width / 2
      const cy = faceBox.y + faceBox.height / 2
      const size = Math.max(faceBox.width, faceBox.height) * 2
      sw = Math.min(iw, Math.max(300, Math.floor(size)))
      sh = sw
      sx = Math.max(0, Math.floor(cx - sw / 2))
      sy = Math.max(0, Math.floor(cy - sh / 2))
      if (sx + sw > iw) sx = iw - sw
      if (sy + sh > ih) sy = ih - sh
      sx = Math.max(0, sx)
      sy = Math.max(0, sy)
    } else {
      const size = Math.min(iw, ih)
      sw = size
      sh = size
      sx = Math.floor((iw - size) / 2)
      sy = Math.floor((ih - size) / 2)
    }
    const outSize = Math.max(300, Math.min(1024, Math.floor(sw)))
    const canvas = document.createElement("canvas")
    canvas.width = outSize
    canvas.height = outSize
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    ctx.imageSmoothingEnabled = true
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outSize, outSize)
    const preview = canvas.toDataURL("image/webp", 0.9)
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.9))
    URL.revokeObjectURL(url)
    if (!blob) throw new Error("Failed to process image")
    const processed = new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" })
    return { file: processed, preview }
  }

  const mapPositionToFolder = (position: string): string => {
    const p = (position || "").toLowerCase().trim()
    if (p.includes("director")) return "Director"
    if (p.includes("account")) return "Accountant"
    if (p.includes("pastor") || p.includes("patron")) return "Pastor"
    if (p.includes("social")) return "Social worker"
    if (p.includes("chairman")) return "Chairman"
    return "Other"
  }

  const uploadProfileImage = async (leaderId: string, position: string, file: File): Promise<string> => {
    await checkAdmin()
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    if (!token) throw new Error("Admin session required")

    const initRes = await fetch("/api/admin/leadership/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        leaderId,
        position,
        filename: file.name,
        size: file.size,
        type: file.type,
      }),
    })
    if (!initRes.ok) {
      const j = await initRes.json().catch(() => ({}))
      throw new Error(j?.error || "Failed to initialize upload")
    }
    const { signedUrl, publicUrl } = await initRes.json()
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open("PUT", signedUrl)
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100)
          setProgress(pct)
        }
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve()
        else {
          if (xhr.status === 403) reject(new Error("Unauthorized upload"))
          else if (xhr.status === 413) reject(new Error("File too large"))
          else reject(new Error(`Upload failed: ${xhr.status}`))
        }
      }
      xhr.onerror = () => reject(new Error("Network error during upload"))
      xhr.setRequestHeader("Content-Type", file.type)
      xhr.send(file)
    })
    return publicUrl as string
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAdmin) {
      toast.error("Admin session required")
      setNeedsAuth(true)
      return
    }
    setUploading(true)
    setProgress(0)

    try {
      let image_path = editingLeader?.image_path || ""

      // Upload logic if new image selected
      if (imageFile) {
        // If editing, use existing ID. If new, we need a strategy.
        // Strategy: Insert/Update record first to get ID? 
        // Or if editing, use ID.
        // If creating, we can't upload to `id/` before we have `id`.
        // So for create: Insert (without image) -> Upload -> Update (with image).
      }

      const payload = {
        full_name: formData.full_name,
        position: formData.position,
        bio: formData.bio,
        start_date: formData.start_date,
        is_active: formData.is_active,
        // image_path handled separately below
      }

      if (editingLeader) {
        // EDIT MODE
        if (imageFile) {
             const f = processedFile || imageFile
             image_path = await uploadProfileImage(editingLeader.id, formData.position, f)
        }

        const { error } = await supabase
          .from("leadership")
          .update({ ...payload, image_path })
          .eq("id", editingLeader.id)
        
        if (error) throw error
        toast.success("Leader updated successfully")

      } else {
        // CREATE MODE
        // 1. Insert without image_path
        const { data: newLeader, error: insertError } = await supabase
          .from("leadership")
          .insert(payload)
          .select()
          .single()
        
        if (insertError) throw insertError
        
        // 2. Upload image if exists
        if (imageFile && newLeader) {
            const f = processedFile || imageFile
            const publicUrl = await uploadProfileImage(newLeader.id, formData.position, f)
            await supabase
              .from("leadership")
              .update({ image_path: publicUrl })
              .eq("id", newLeader.id)
        }
        toast.success("Leader created successfully")
      }

      setIsDialogOpen(false)
      fetchLeaders()
      resetForm()
    } catch (error: any) {
      console.error("Error saving leader:", error)
      toast.error(error.message || "Failed to save leader")
    } finally {
      setUploading(false)
    }
  }
  
  const resetForm = () => {
      setFormData({
        full_name: "",
        position: "",
        bio: "",
        start_date: new Date().toISOString().split('T')[0],
        is_active: true
      })
      setImageFile(null)
      setEditingLeader(null)
    }

  const openEdit = (leader: Leader) => {
      setEditingLeader(leader)
      setFormData({
          full_name: leader.full_name,
          position: leader.position,
          bio: leader.bio || "",
          start_date: leader.start_date,
          is_active: leader.is_active
      })
      setIsDialogOpen(true)
  }
  
  const handleDelete = async (id: string, imagePath: string | null) => {
      if (!confirm("Are you sure you want to delete this leader?")) return
      
      try {
          const { error } = await supabase.from("leadership").delete().eq("id", id)
          if (error) throw error
          
          if (imagePath) {
              try {
                const url = new URL(imagePath)
                const pathParts = url.pathname.split("/leadership/")
                if (pathParts.length > 1) {
                    const storagePath = pathParts[1]
                    await supabase.storage.from("leadership").remove([storagePath])
                }
              } catch (e) {
                  console.error("Error parsing image URL for deletion", e)
              }
          }
          
          toast.success("Leader deleted")
          fetchLeaders()
      } catch (error: any) {
          toast.error("Failed to delete leader")
      }
  }
  
  const handleRetire = async (leader: Leader) => {
      if (!confirm("Are you sure you want to end this leader's term?")) return
      
      try {
          const { error } = await supabase
            .from("leadership")
            .update({ 
                is_active: false,
                end_date: new Date().toISOString().split('T')[0]
            })
            .eq("id", leader.id)
            
          if (error) throw error
          toast.success("Leader term ended")
          fetchLeaders()
      } catch (error: any) {
          toast.error("Failed to update leader")
      }
  }

  const getTransformedUrl = (publicUrl?: string, width: number = 160, quality: number = 85) => {
    if (!publicUrl) return ""
    try {
      const u = new URL(publicUrl)
      const idx = u.pathname.indexOf("/leadership/")
      if (idx === -1) return publicUrl
      const storagePath = u.pathname.slice(idx + "/leadership/".length)
      const res = supabase.storage.from("leadership").getPublicUrl(storagePath, { transform: { width, height: width, quality, resize: "cover" } })
      return res.data.publicUrl || publicUrl
    } catch {
      return publicUrl
    }
  }

  const getFallbackUrl = (name: string) => {
    const n = encodeURIComponent(name || "Leader")
    return `https://ui-avatars.com/api/?name=${n}&background=2E86C1&color=ffffff&size=160`
  }

  const linkExistingImage = async (leader: Leader) => {
    try {
      const { data, error } = await supabase.storage.from("leadership").list(leader.id, { limit: 10 })
      if (error) throw error
      const files = (data || []).filter((f: any) => /\.(png|jpg|jpeg|webp)$/i.test(f.name))
      if (files.length === 0) {
        toast.error("No image found in storage for this leader")
        return
      }
      const file = files.find((f: any) => f.name.startsWith("profile")) || files[0]
      const path = `${leader.id}/${file.name}`
      const { data: pu } = supabase.storage.from("leadership").getPublicUrl(path)
      const url = pu.publicUrl
      const { error: upErr } = await supabase.from("leadership").update({ image_path: url }).eq("id", leader.id)
      if (upErr) throw upErr
      toast.success("Linked image from storage")
      fetchLeaders()
    } catch (e: any) {
      toast.error(e?.message || "Failed to link image")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leadership Team</h2>
        <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" /> Add Leader
        </Button>
      </div>

      {needsAuth && (
        <div className="rounded-md border border-border p-4">
          <p className="text-sm text-muted-foreground mb-3">Admin sign-in required to manage leaders.</p>
          <form onSubmit={signInAdmin} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="admin@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <div>
              <Button type="submit" variant="admin">Sign In</Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader) => (
            <Card key={leader.id} className={!leader.is_active ? "opacity-60" : ""}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted shrink-0">
                    {leader.image_path && !failedImages.has(leader.id) ? (
                      <Image
                        src={getTransformedUrl(leader.image_path)}
                        alt={leader.full_name}
                        fill
                        className="object-cover"
                        onError={() => setFailedImages(prev => { const next = new Set(prev); next.add(leader.id); return next })}
                        sizes="64px"
                        priority={false}
                      />
                    ) : (
                      <Image
                        src={getFallbackUrl(leader.full_name)}
                        alt={leader.full_name}
                        fill
                        className="object-cover"
                        sizes="64px"
                        priority={false}
                      />
                    )}
                </div>
                <div>
                    <CardTitle className="text-lg">{leader.full_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{leader.position}</p>
                    {!leader.is_active && <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Past</span>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{leader.bio}</p>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(leader)}>
                        <Edit2 className="h-4 w-4" />
                    </Button>
                    {!leader.image_path && (
                      <Button variant="secondary" size="sm" onClick={() => linkExistingImage(leader)} title="Link Image">
                        Link Image
                      </Button>
                    )}
                    {leader.is_active && (
                        <Button variant="secondary" size="sm" onClick={() => handleRetire(leader)} title="End Term">
                            End Term
                        </Button>
                    )}
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(leader.id, leader.image_path)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {leaders.length === 0 && !loading && (
              <div className="col-span-full text-center text-muted-foreground py-10">
                  No leaders found. Add one to get started.
              </div>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingLeader ? "Edit Leader" : "Add Leader"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {previewUrl && (
              <div className="flex items-center justify-center">
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                  <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                </div>
              </div>
            )}
            <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                    name="full_name" 
                    value={formData.full_name} 
                    onChange={handleInputChange} 
                    required 
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium">Position</label>
                <Select name="position" value={formData.position} onValueChange={handlePositionChange} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                        {POSITIONS.map(p => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input 
                    type="date"
                    name="start_date" 
                    value={formData.start_date} 
                    onChange={handleInputChange} 
                    required 
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleInputChange} 
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium">Profile Image</label>
                <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {editingLeader && editingLeader.image_path && !imageFile && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">Current: {editingLeader.image_path}</p>
                )}
            </div>
            
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={uploading}>
                    {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingLeader ? "Update" : "Create"}
                </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
