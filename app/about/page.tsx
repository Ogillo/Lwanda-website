import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { Button } from "@/components/ui/button"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Heart, Target, Eye, Users } from "lucide-react"
import { getHeroImage } from "@/lib/hero"
import { getSupabase } from "@/lib/supabase/client"
import Image from "next/image"

export const revalidate = 60

export default async function AboutPage() {
  const heroUrl = await getHeroImage("about", "/children-and-families-in-lwanda-kenya-community.png")

  const supabase = getSupabase()
  let leaders: any[] = []
  
  if (supabase) {
      const { data } = await supabase
        .from("leadership")
        .select("*")
        .eq("is_active", true)
      
      if (data) {
          const now = new Date()
          leaders = data.filter(l => !l.end_date || new Date(l.end_date) > now)
      }
  }

  // Define position order to sort correctly
  const positionOrder: Record<string, number> = {
      "Project Director": 1,
      "Project Accountant": 2,
      "Project Social Worker": 3,
      "Chairman": 4,
      "Patron / Pastor": 5
  }
  
  leaders.sort((a, b) => {
      const posA = positionOrder[a.position] || 99
      const posB = positionOrder[b.position] || 99
      return posA - posB
  })
  
  const getTransformedUrl = (publicUrl?: string, width: number = 160, quality: number = 85) => {
    if (!publicUrl || !supabase) return ""
    try {
      if (/^https?:\/\//i.test(publicUrl)) {
        const u = new URL(publicUrl)
        const idxLeaders = u.pathname.indexOf("/leaders/")
        const idxLeadership = u.pathname.indexOf("/leadership/")
        if (idxLeaders !== -1) {
          const storagePath = u.pathname.slice(idxLeaders + "/leaders/".length)
          const res = supabase.storage.from("leaders").getPublicUrl(storagePath, { transform: { width, height: width, quality, resize: "cover" } })
          return res.data.publicUrl || publicUrl
        }
        if (idxLeadership !== -1) {
          const storagePath = u.pathname.slice(idxLeadership + "/leadership/".length)
          const res = supabase.storage.from("leadership").getPublicUrl(storagePath, { transform: { width, height: width, quality, resize: "cover" } })
          return res.data.publicUrl || publicUrl
        }
        return publicUrl
      } else {
        const bucket = publicUrl.startsWith("leaders/") ? "leaders" : "leadership"
        const res = supabase.storage.from(bucket).getPublicUrl(publicUrl, { transform: { width, height: width, quality, resize: "cover" } })
        return res.data.publicUrl || publicUrl
      }
    } catch {
      return publicUrl || ""
    }
  }

  const getFallbackUrl = (name: string) => {
    const n = encodeURIComponent(name || "Leader")
    return `https://ui-avatars.com/api/?name=${n}&background=2E86C1&color=ffffff&size=160`
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Our Story"
        subtitle="Empowering vulnerable children in Lwanda, Kenya since 2015"
        description="KE 258 Lwanda Child Development Centre exists to see that vulnerable needy children in the community are empowered socially, economically and physically to release them from poverty in Jesus' name."
        backgroundImage={heroUrl}
      />

      {/* Our Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">Our Beginning</h2>
            <div className="prose prose-lg max-w-none">
              <p className="font-serif text-lg text-muted-foreground mb-6 max-w-[680px] mx-auto">
                KE 258 FGCK Lwanda Child Development Centre started in 2015 under FGCK Lwanda Local Church Assembly in
                partnership with Compassion International. What began as a vision to serve vulnerable children in our
                community has grown into a comprehensive ministry touching hundreds of lives.
              </p>
              <p className="font-serif text-lg text-muted-foreground mb-6 max-w-[680px] mx-auto">
                We began with the Child Development through Sponsorship Program and have since expanded to include three
                core ministries that address the holistic needs of children and families from pregnancy through young
                adulthood.
              </p>
              <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
                Our work is rooted in faith, driven by love, and sustained by the generous support of sponsors,
                partners, and community members who believe every child deserves hope and opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="font-serif text-muted-foreground">
                KE258 exists to see that vulnerable needy children in the community are empowered socially, economically
                and physically to release them from poverty in Jesus' name and are raised to be a God-fearing
                generation.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="font-serif text-muted-foreground">
                A community with morally and spiritually upright generation.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">Our Values</h3>
              <ul className="font-serif text-muted-foreground space-y-2">
                <li>• Integrity</li>
                <li>• Teamwork</li>
                <li>• Excellence</li>
                <li>• Servant Leadership</li>
                <li>• Commitment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">Leadership Team</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              Dedicated leaders committed to serving our community and empowering the next generation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-8xl mx-auto">
            {leaders.length > 0 ? (
                leaders.map((leader) => (
                        <div key={leader.id} className="bg-card rounded-lg p-6 text-center">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted mx-auto mb-4">
                            {leader.image_path ? (
                                <Image
                                    src={getTransformedUrl(leader.image_path)}
                                    alt={`Profile photo of ${leader.full_name}`}
                                    fill
                                    className="object-cover"
                                    sizes="45px"
                                />
                            ) : (
                                <Image
                                  src={getFallbackUrl(leader.full_name)}
                                  alt={`Profile photo of ${leader.full_name}`}
                                  fill
                                  className="object-cover"
                                  sizes="45px"
                                />
                            )}
                        </div>
                        <h3 className="font-sans text-xl font-semibold text-foreground mb-2">{leader.full_name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{leader.position}</p>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center text-muted-foreground">
                    <p>Leadership team information is currently being updated.</p>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">Partnerships</h2>
            <p className="font-serif text-lg text-muted-foreground">
              Our impact in Lwanda is made possible through strong collaborations. We work hand-in-hand with trusted
              partners to deliver holistic, Christ-centered support for children and families.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Compassion International */}
            <article className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://www.calvaryev.com/wp-content/uploads/2023/08/9.png"
                  alt="Compassion International Logo"
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="font-sans text-2xl font-bold text-foreground">Compassion International</h3>
              </div>
              <div className="space-y-4">
                <p className="font-serif text-muted-foreground leading-relaxed">
                  Together with Compassion International, we advance the mission of releasing children from poverty in
                  Jesus’ name. Our partnership focuses on sponsorship-based discipleship, education, health, and
                  family support, ensuring every child is known, loved, and protected.
                </p>
                <ul className="list-disc pl-6 font-serif text-muted-foreground">
                  <li>Over 400+ children supported through sponsorship and discipleship</li>
                  <li>Improved education outcomes and consistent school attendance</li>
                  <li>Access to healthcare, nutrition, and psychosocial support</li>
                </ul>
                <blockquote className="bg-muted/60 border border-border rounded-lg p-4">
                  <p className="font-serif text-sm md:text-base text-foreground">
                    “Our collaboration with Lwanda demonstrates the power of local church partnership—children are
                    flourishing, families are strengthened, and hope is restored.”
                  </p>
                  <cite className="block mt-2 text-xs text-muted-foreground">— Compassion International</cite>
                </blockquote>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.compassion.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    aria-label="Visit Compassion International"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </article>

            {/* FGCK */}
            <article className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://fullgospelzimmerman.org/wp-content/uploads/2022/07/1-FGCK%20Logo%20Icon%20no%20bg.png"
                  alt="Full Gospel Churches of Kenya (FGCK) Logo"
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="font-sans text-2xl font-bold text-foreground">Full Gospel Churches of Kenya (FGCK)</h3>
              </div>
              <div className="space-y-4">
                <p className="font-serif text-muted-foreground leading-relaxed">
                  As our founding church partner, FGCK Lwanda provides spiritual leadership, pastoral care, and
                  community integration. Through joint initiatives, we strengthen families, nurture faith, and build
                  resilient communities.
                </p>
                <ul className="list-disc pl-6 font-serif text-muted-foreground">
                  <li>Local church oversight and mentorship for youth and families</li>
                  <li>Community outreach programs and discipleship initiatives</li>
                  <li>Volunteer mobilization and pastoral support</li>
                </ul>
                <blockquote className="bg-muted/60 border border-border rounded-lg p-4">
                  <p className="font-serif text-sm md:text-base text-foreground">
                    “Partnering with Lwanda CDC enables the church to tangibly serve the vulnerable—bringing practical
                    help and the hope of the Gospel.”
                  </p>
                  <cite className="block mt-2 text-xs text-muted-foreground">— FGCK Lwanda Leadership</cite>
                </blockquote>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.fgckenya.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    aria-label="Visit FGCK"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Become a Partner CTA */}
          <div className="mt-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="font-sans text-2xl font-bold text-foreground mb-3">Become a Partner</h3>
              <p className="font-serif text-muted-foreground mb-6">
                We welcome mission-aligned organizations to collaborate with us in empowering children and families in
                Lwanda. Get in touch to explore partnership opportunities.
              </p>
              <div className="flex justify-center">
                <Button asChild variant="ghost">
                  <a
                    href="/contact"
                    aria-label="Contact us about partnerships"
                    className="about-contact-btn inline-flex items-center justify-center h-11 px-8 rounded-lg m-[15px] bg-[#2E86C1] text-white shadow-md hover:bg-[#2E86C1]/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition"
                  >
                    Contact Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
