import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { StatCard } from "@/components/ui/stat-card"
import { CtaBanner } from "@/components/sections/cta-banner"
import { GraduationCap, Heart, BookOpen, Users, Star, Globe } from "lucide-react"

export default function SponsorshipPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Child Development through Sponsorship"
        subtitle="Transforming lives through one-to-one relationships and comprehensive support"
        description="Our flagship program connects children ages 3-18 with sponsors around the world, providing education, spiritual growth, life skills, and the love of a caring community."
        backgroundImage="/sponsored-children-in-kenya-classroom.png"
      />

      {/* About */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
              About Child Sponsorship
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="font-serif text-lg text-muted-foreground mb-6 max-w-[680px] mx-auto">
                Our Child Development through Sponsorship Program (CDSP) is the heart of our ministry, connecting
                vulnerable children with sponsors who provide not just financial support, but love, encouragement, and
                hope for the future. Through this program, children receive comprehensive support that addresses their
                physical, emotional, social, and spiritual needs.
              </p>
              <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
                Each sponsored child is enrolled in our program from age 3 through 18, receiving education support,
                healthcare, nutrition, life skills training, and spiritual development in a loving, Christ-centered
                environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Sponsorship Impact</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              See how child sponsorship is transforming lives and building hope in our community.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6 lg:col-span-3"><StatCard
              value="{# Sponsored}"
              label="Children Sponsored"
              description="Currently enrolled in our program"
              icon={<Heart className="w-6 h-6 text-primary" />}
            /></div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3"><StatCard
              value="15"
              label="Years of Growth"
              description="Average program participation"
              icon={<GraduationCap className="w-6 h-6 text-primary" />}
            /></div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3"><StatCard
              value="98%"
              label="School Completion"
              description="Sponsored children complete primary school"
              icon={<BookOpen className="w-6 h-6 text-primary" />}
            /></div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3"><StatCard
              value="{# Countries}"
              label="Sponsor Countries"
              description="Global community of supporters"
              icon={<Globe className="w-6 h-6 text-primary" />}
            /></div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">What Sponsorship Provides</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              Child sponsorship goes far beyond meeting basic needs - it provides comprehensive support for holistic
              development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Education Support</h3>
              <p className="font-serif text-muted-foreground">
                School fees, uniforms, books, supplies, tutoring, and educational enrichment activities.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Healthcare</h3>
              <p className="font-serif text-muted-foreground">
                Regular medical checkups, immunizations, treatment for illnesses, and health education.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Life Skills Training</h3>
              <p className="font-serif text-muted-foreground">
                Leadership development, vocational training, financial literacy, and social skills.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Spiritual Development</h3>
              <p className="font-serif text-muted-foreground">
                Bible study, worship, prayer, and Christian mentorship in a loving church environment.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Enrichment Activities</h3>
              <p className="font-serif text-muted-foreground">
                Sports, arts, music, field trips, and special programs that develop talents and interests.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Global Connection</h3>
              <p className="font-serif text-muted-foreground">
                Letters and communication with sponsors, building relationships that inspire and encourage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">How Sponsorship Works</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              Child sponsorship creates a meaningful relationship that transforms both the child and the sponsor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 font-sans font-bold text-xl">
                1
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Choose a Child</h3>
              <p className="font-serif text-muted-foreground">
                Browse profiles of children waiting for sponsors and choose the child you'd like to support.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 font-sans font-bold text-xl">
                2
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Build a Relationship</h3>
              <p className="font-serif text-muted-foreground">
                Exchange letters, photos, and updates with your sponsored child, building a meaningful connection.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 font-sans font-bold text-xl">
                3
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Watch Them Thrive</h3>
              <p className="font-serif text-muted-foreground">
                Receive regular updates on your child's progress and celebrate their achievements and milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8">Sponsorship Success</h2>
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-6"></div>
              <blockquote className="font-serif text-lg text-muted-foreground mb-6 italic">
                "When I was 5 years old, I was sponsored through KE 258. My sponsor not only helped pay for my education
                but also wrote me letters that encouraged me to dream big. Today, I'm a teacher in my community, and I'm
                helping other children believe in their potential just like my sponsor helped me believe in mine."
              </blockquote>
              <cite className="font-sans font-semibold text-foreground">- Mary, Former Sponsored Child</cite>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Sponsor a Child Today"
        description="Change a life forever through child sponsorship. For just $38 per month, you can provide a child with education, healthcare, spiritual development, and hope for the future."
        primaryCta={{ text: "Sponsor Now", href: "/donate" }}
        variant="primary"
      />

      <SiteFooter />
    </div>
  )
}
