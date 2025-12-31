import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Calendar, MapPin, Clock } from "lucide-react"
import { EventCard } from "@/components/ui/event-card"
import { getSupabase } from "@/lib/supabase/client"

export default async function EventsPage() {
  const supabase = getSupabase()
  let data: any[] | null = null
  if (supabase) {
    const res = await supabase
      .from("events")
      .select("title, content, excerpt, event_time, event_date, location, media_path")
      .order("event_date", { ascending: true })
    data = res.data
  }

  const today = new Date()
  const upcoming = (data || []).filter((e: any) => e.event_date && new Date(e.event_date) >= today)
  const past = (data || []).filter((e: any) => e.event_date && new Date(e.event_date) < today).reverse()

  const toPublicUrl = (path?: string) => {
    if (!path) return undefined
    if (!supabase) return undefined
    const { data } = supabase.storage.from("events").getPublicUrl(path)
    return data.publicUrl
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page Header */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Community Events</h1>
            <p className="font-serif text-lg text-muted-foreground">
              Join us for special events, celebrations, and community gatherings that bring our families together and
              showcase the amazing work happening in our programs.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((e: any, i: number) => {
              const imageUrl = toPublicUrl(e.media_path) || "/placeholder.svg"
              const dateStr = e.event_date ? new Date(e.event_date).toLocaleDateString() : ""
              const timeStr = e.event_time || ""
              const desc = typeof e.content === "string" ? e.content : (e.excerpt || "")
              return (
                <EventCard
                  key={i}
                  id={e.id}
                  title={e.title}
                  description={desc}
                  image_url={imageUrl}
                  date={dateStr}
                  time={timeStr}
                  location={e.location}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8">Recent Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {past.map((e: any, i: number) => (
              <div key={i} className="bg-card border border-border rounded-[16px] overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted">
                  <img
                    src={toPublicUrl(e.media_path) || "/placeholder.svg"}
                    alt={e.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-sans text-lg md:text-xl font-semibold text-foreground mb-2 break-words">{e.title}</h3>
                  <p className="font-serif text-sm md:text-base text-muted-foreground max-w-[680px] break-words whitespace-normal leading-relaxed">{e.excerpt || (typeof e.content === "string" ? e.content.slice(0, 160) : "")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
