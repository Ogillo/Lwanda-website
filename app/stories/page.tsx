"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StoryCard } from "@/components/ui/story-card"
import { getSupabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export default function StoriesPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const page = Number(searchParams?.page || 1)
  const limit = 9
  const [data, setData] = useState<any[]>([])
  const [heroUrl, setHeroUrl] = useState("/graduation-ceremony-kenya-children.png")
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const load = async () => {
        setLoading(true)
        setErrorMsg("")
        const supabase = getSupabase()
        if (supabase) {
            const from = (page - 1) * limit
            const to = from + limit - 1
            const res = await supabase
            .from("stories")
            .select("id, title, content, excerpt, story_date, tag, image_path, status, created_at")
            .eq("status", "published")
            .order("story_date", { ascending: false })
            .order("created_at", { ascending: false })
            .range(from, to)
            if (res.error) {
              setErrorMsg(res.error.message || "Failed to load stories")
              setData([])
            } else {
              setData(res.data || [])
            }
        }
        
        setLoading(false)
    }
    load()
  }, [page])


  const items = (data || []).map((s: any) => {
    const imgPath = typeof s.image_path === "string" ? s.image_path : undefined
    let imageUrl: string | undefined = undefined
    const supabase = getSupabase()
    if (imgPath) {
      if (imgPath.startsWith("http")) {
        imageUrl = imgPath
      } else if (supabase) {
        imageUrl = supabase.storage.from("stories").getPublicUrl(imgPath).data.publicUrl
      }
    }
    return {
      id: s.id,
      title: s.title,
      excerpt: typeof s.excerpt === "string" && s.excerpt.length ? s.excerpt : (typeof s.content === "string" ? s.content.slice(0, 160) : ""),
      fullContent: typeof s.content === "string" ? s.content : undefined,
      href: s.id ? `/stories/${s.id}` : "/stories",
      date: s.story_date ? new Date(s.story_date).toLocaleDateString() : (s.created_at ? new Date(s.created_at).toLocaleDateString() : ""),
      author: undefined,
      category: typeof s.tag === "string" ? s.tag : undefined,
      imageUrl,
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page Header */}
      <section className="relative py-24 bg-muted text-center">
        {/* Hero Background */}
        <div className="absolute inset-0 -z-10">
            <img src={heroUrl} alt="Stories Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-6">Stories of Transformation</h1>
            <p className="font-serif text-lg text-white/90 max-w-[680px] mx-auto">
              Witness how God is working through our programs to transform lives, build hope, and create lasting change
              in our community. Each story represents a life touched by love and empowered for the future.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center h-48 text-muted-foreground">Loading stories...</div>
          ) : errorMsg ? (
            <div className="flex items-center justify-center h-48 text-destructive">{errorMsg}</div>
          ) : items.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-muted-foreground">No stories found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, i) => (
                <StoryCard
                  key={i}
                  id={item.id}
                  title={item.title}
                  excerpt={item.excerpt}
                  fullContent={item.fullContent}
                  href={item.href}
                  date={item.date}
                  author={item.author}
                  category={item.category}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-4 mt-12">
            {page > 1 && (
              <a href={`/stories?page=${page - 1}`} className="border border-border px-6 py-2 rounded-[10px] font-medium hover:bg-muted transition">
                Previous
              </a>
            )}
            {items.length === limit && (
              <a href={`/stories?page=${page + 1}`} className="bg-primary text-primary-foreground px-6 py-2 rounded-[10px] font-medium hover:bg-primary/90 transition">
                Next
              </a>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
