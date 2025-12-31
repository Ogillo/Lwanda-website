import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { StatCard } from "@/components/ui/stat-card"
import { CtaBanner } from "@/components/sections/cta-banner"
import { TrendingUp, Users, Briefcase, Star, Target, Lightbulb } from "lucide-react"

export default function YouthDevelopmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Youth Development Program"
        subtitle="Empowering young adults to become leaders and change-makers"
        description="Our Youth Development Program equips young adults ages 12+ with vocational skills, leadership training, and opportunities to make a positive impact in their communities."
        backgroundImage="/young-adults-in-kenya-leadership-training.png"
      />

      {/* About */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Empowering the Next Generation
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="font-serif text-lg text-muted-foreground mb-6 max-w-[680px] mx-auto">
                Our Youth Development Program (YDP) serves as the bridge between childhood and adulthood, equipping
                young people with the skills, confidence, and opportunities they need to become productive members of
                society and leaders in their communities.
              </p>
              <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
                Many of our youth participants are graduates of our Child Development through Sponsorship Program, and
                we're proud to see them grow into mentors and role models for the next generation of children in our
                programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Youth Program Impact</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              See how our Youth Development Program is creating leaders and entrepreneurs in our community.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6 lg:col-span-3"><StatCard
              value="{# Youth}"
              label="Youth Participants"
              description="Currently in our program"
              icon={<Users className="w-6 h-6 text-primary" />}
            /></div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3"><StatCard
              value="85%"
              label="Employment Rate"
              description="Graduates finding meaningful work"
              icon={<Briefcase className="w-6 h-6 text-primary" />}
            /></div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3"><StatCard
              value="{# Businesses}"
              label="Businesses Started"
              description="Youth-led enterprises launched"
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
            /></div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3"><StatCard
              value="100%"
              label="Leadership Training"
              description="Participants complete leadership program"
              icon={<Star className="w-6 h-6 text-primary" />}
            /></div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Program Components</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              Our comprehensive approach prepares young adults for success in work, leadership, and life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Vocational Training</h3>
              <p className="font-serif text-muted-foreground">
                Hands-on training in marketable skills including tailoring, carpentry, computer skills, and agriculture.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Leadership Development</h3>
              <p className="font-serif text-muted-foreground">
                Leadership skills, public speaking, team building, and project management training.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Entrepreneurship</h3>
              <p className="font-serif text-muted-foreground">
                Business planning, financial literacy, marketing, and support for starting small businesses.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Mentorship</h3>
              <p className="font-serif text-muted-foreground">
                One-on-one mentoring relationships with successful community members and program alumni.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Community Service</h3>
              <p className="font-serif text-muted-foreground">
                Opportunities to give back through volunteering and leading community improvement projects.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Life Skills</h3>
              <p className="font-serif text-muted-foreground">
                Financial management, communication skills, conflict resolution, and personal development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Pathways */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">Success Pathways</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              Our youth graduates go on to make meaningful contributions in various fields and sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Employment</h3>
              <p className="font-serif text-muted-foreground">
                Graduates find meaningful employment in local businesses, schools, healthcare facilities, and
                organizations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Entrepreneurship</h3>
              <p className="font-serif text-muted-foreground">
                Many start their own businesses, creating jobs and economic opportunities in the community.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Leadership</h3>
              <p className="font-serif text-muted-foreground">
                Graduates become community leaders, serving in local government, churches, and civic organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8">Youth Success Story</h2>
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-6"></div>
              <blockquote className="font-serif text-lg text-muted-foreground mb-6 italic">
                "The Youth Development Program taught me that I could be more than just a beneficiary - I could be a
                leader and a solution to problems in my community. Today, I run a successful tailoring business and
                employ three other young people. I'm also mentoring children in the sponsorship program, showing them
                that their dreams are possible."
              </blockquote>
              <cite className="font-sans font-semibold text-foreground">- James, YDP Graduate & Entrepreneur</cite>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Invest in Youth Leadership"
        description="Support our Youth Development Program and help young adults become the leaders and change-makers their communities need."
        primaryCta={{ text: "Support Youth", href: "/donate" }}
        variant="primary"
      />

      <SiteFooter />
    </div>
  )
}
