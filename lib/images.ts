import { getSupabase } from "@/lib/supabase/client"

export const ensureAdmin = async () => {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Supabase not configured")
  const { data } = await supabase.auth.getSession()
  const role = (data?.session?.user?.app_metadata as any)?.role || (data?.session?.user?.user_metadata as any)?.role
  if (role !== "admin") throw new Error("Not authorized: admin role required")
}

export const processImage = (file: File, maxW = 1920, maxH = 1080, targetType?: string): Promise<{ blob: Blob; width: number; height: number; type: string; name: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()
    reader.onload = () => {
      img.onload = () => {
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
        const outType = targetType || (file.type === "image/webp" ? "image/webp" : file.type)
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Failed to create blob"))
            resolve({ blob, width: w, height: h, type: outType, name: file.name })
          },
          outType,
          0.9,
        )
      }
      img.onerror = () => reject(new Error("Invalid image"))
      img.src = reader.result as string
    }
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsDataURL(file)
  })
}

export const uploadWithRetry = async (
  supabase: ReturnType<typeof getSupabase>,
  bucket: string,
  path: string,
  blob: Blob,
  contentType: string,
  retries = 2,
) => {
  let lastErr: any = null
  for (let i = 0; i <= retries; i++) {
    const { error } = await supabase!.storage.from(bucket).upload(path, blob, {
      upsert: false,
      contentType,
      cacheControl: "86400",
    })
    if (!error) return true
    lastErr = error
    await new Promise((r) => setTimeout(r, 500 * (i + 1)))
  }
  throw new Error(lastErr?.message || "Upload failed")
}
