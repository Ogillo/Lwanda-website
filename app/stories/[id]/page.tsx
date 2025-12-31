import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getSupabase } from "@/lib/supabase/client"

export default async function StoryDetailPage({ params }: { params: { id: string } }) {
  const supabase = getSupabase()
  let story: any | null = null
  if (supabase) {
    const res = await supabase.from("stories").select("id, title, content, excerpt, story_date, tag, image_path, status, created_at").eq("id", params.id).single()
    story = res.data
  }
  const imageUrl = (() => {
    if (!supabase || !story || !story.image_path) return undefined
    if (String(story.image_path).startsWith("http")) return String(story.image_path)
    return supabase.storage.from("stories").getPublicUrl(String(story.image_path)).data.publicUrl
  })()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative min-h-screen">
        {imageUrl && (
          <div className="fixed inset-0 -z-10">
            <img src={imageUrl} alt={story?.title || "Story"} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        <div className="relative z-10 h-screen overflow-y-auto scroll-smooth">
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-[680px]">
              <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">{story?.title || "Story"}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                {story?.story_date && <span>{new Date(story.story_date).toLocaleDateString()}</span>}
                {story?.tag && <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-[10px]">{story.tag}</span>}
              </div>
              <div className="prose max-w-[680px]">
                <div dangerouslySetInnerHTML={{ __html: story?.content || "" }} />
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      </section>
    </div>
  )
}
