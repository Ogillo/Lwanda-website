import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { ProgramCard } from "@/components/ui/program-card"
import { StatCard } from "@/components/ui/stat-card"
import { StoryCard } from "@/components/ui/story-card"
import { Heart, Users, GraduationCap, Baby, Calendar, TrendingUp } from "@/components/icons"
import { getSupabase } from "@/lib/supabase/client"

export default async function HomePage() {
  const supabase = getSupabase()
  let data: any[] | null = null
  if (supabase) {
    const res = await supabase
      .from("stories")
      .select("id, title, content, excerpt, story_date, tag, image_path, status, created_at")
      .eq("status", "published")
      .order("story_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(3)
    data = res.data
  }


  const stories = (data || []).map((s: any) => {
    const imgPath = typeof s.image_path === "string" ? s.image_path : undefined
    let imageUrl: string | undefined = undefined
    if (imgPath) {
      if (imgPath.startsWith("http")) {
        imageUrl = imgPath
      } else if (supabase) {
        imageUrl = supabase.storage.from("stories").getPublicUrl(imgPath).data.publicUrl
      }
    }
    return {
      title: s.title,
      excerpt: typeof s.excerpt === "string" && s.excerpt.length ? s.excerpt : (typeof s.content === "string" ? s.content.slice(0, 160) : ""),
      href: s.id ? `/stories/${s.id}` : "/stories",
      date: s.story_date ? new Date(s.story_date).toLocaleDateString() : (s.created_at ? new Date(s.created_at).toLocaleDateString() : ""),
      category: typeof s.tag === "string" ? s.tag : undefined,
      imageUrl,
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <HeroSection
        title="Empowering Children, Transforming Communities"
        subtitle="Building hope and opportunity for vulnerable children in Lwanda, Kenya"
        description="Through faith-based programs in partnership with Compassion International and FGCK, we're raising a God-fearing generation equipped to break the cycle of poverty."
        primaryCta={{ text: "Sponsor a Child", href: "/programs/sponsorship" }}
        secondaryCta={{ text: "Learn Our Story", href: "/about" }}
        backgroundImage="https://ycqlttfhhcywpeagiabg.supabase.co/storage/v1/object/public/hero/hero_image.jpg"
      />

      {/* Impact Statistics */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground text-center mb-6">Our Impact Since 2015</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              See how God is working through our community to transform lives and build hope.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <StatCard
              value="497"
              label="Children Supported"
              description="Through our three core programs"
              icon={<Users className="w-6 h-6" />}
              />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <StatCard
              value="28"
              label="Mothers & Babies"
              description="In our Child Survival Program"
              icon={<Baby className="w-6 h-6" />}
              />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <StatCard
              value="12"
              label="University Students"
              description="Currently pursuing higher education"
              icon={<GraduationCap className="w-6 h-6" />}
              />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <StatCard
              value="15"
              label="Youth Leaders"
              description="Mentoring the next generation"
              icon={<TrendingUp className="w-6 h-6" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Programs */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground text-center mb-6">Our Core Programs</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              We serve children at every stage of development, from the womb through young adulthood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProgramCard
              title="Child Survival"
              description="Providing critical prenatal and postnatal care, nutrition, and support for mothers and babies."
              imageUrl="/mother-and-child-at-health-clinic-in-kenya.png"
              href="/programs/child-survival"
              icon={<Baby className="w-6 h-6" />}
            />
            <ProgramCard
              title="Child Sponsorship"
              description="Holistic development for children ages 3-18 through education, health care, and discipleship."
              imageUrl="/children-learning-in-classroom-lwanda-kenya.png"
              href="/programs/sponsorship"
              icon={<Users className="w-6 h-6" />}
            />
            <ProgramCard
              title="Youth Development"
              description="Empowering young adults with leadership skills, vocational training, and higher education."
              imageUrl="/young-adults-leading-community-meeting-in-kenya.png"
              href="/programs/youth-development"
              icon={<GraduationCap className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground text-center mb-6">Latest Stories</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              Read about the lives being transformed and the milestones we're celebrating together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {stories.map((story: any, i: number) => (
              <StoryCard key={i} {...story} />
            ))}
            {stories.length === 0 && (
               <div className="col-span-3 text-center text-muted-foreground">No stories yet.</div>
            )}
          </div>

          <div className="text-center">
            <CtaBanner
              title="Join Us in Making a Difference"
              description="Your support can change a child's life forever. Partner with us today."
              primaryCta={{ text: "Donate Now", href: "/donate" }}
              secondaryCta={{ text: "Get Involved", href: "/get-involved" }}
              variant="secondary"
            />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
