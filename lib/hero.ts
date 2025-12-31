import { getSupabase } from "@/lib/supabase/client"

export async function getHeroImage(category: string, fallback?: string) {
  const supabase = getSupabase()
  const bucket = process.env.NEXT_PUBLIC_HERO_BUCKET || "hero"
  
  if (!supabase) return fallback

  // Construct the URL for the 'active' image in the category folder
  // Note: We rely on the admin panel to name the active image 'active' (no extension)
  // or we can list the directory and look for a file named 'active.*'
  
  const folder = `hero/${category}`
  const { data, error } = await supabase.storage.from(bucket).list(folder)
  
  if (error || !data) {
      return fallback
  }

  const activeFile = data.find(f => f.name.startsWith("active"))
  
  if (activeFile) {
      const path = `${folder}/${activeFile.name}`
      const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(path)
      return `${publicData.publicUrl}?t=${new Date().getTime()}` // Add timestamp to bust cache
  }

  return fallback
}
