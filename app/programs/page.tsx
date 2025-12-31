import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { getHeroImage } from "@/lib/hero"
import { ProgramCard } from "@/components/ui/program-card"
import { StatCard } from "@/components/ui/stat-card"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Baby, GraduationCap, TrendingUp, Heart, Users, Target } from "lucide-react"

export default async function ProgramsPage() {
  const heroUrl = await getHeroImage("programs", "/children-learning-in-kenya-classroom.png")
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Our Programs"
        subtitle="Three comprehensive ministries working together to transform lives"
        description="From pregnancy through young adulthood, our programs provide holistic support that addresses physical, emotional, social, and spiritual needs of children and families in Lwanda."
        backgroundImage={heroUrl}
      />

      {/* Program Overview Stats */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Program Impact</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              See how our three core programs work together to create lasting transformation in our community.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <StatCard
              value="0-3"
              label="Child Survival"
              description="Supporting mothers and babies through critical early years"
              icon={<Baby className="w-6 h-6 text-primary" />}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <StatCard
              value="3-12"
              label="Child Development"
              description="Comprehensive education and spiritual growth"
              icon={<GraduationCap className="w-6 h-6 text-primary" />}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <StatCard
              value="12+"
              label="Youth Development"
              description="Leadership training and vocational skills"
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Program Cards */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Our Three Core Programs</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              Each program is designed to meet specific developmental needs while working together to create
              comprehensive support for children and families.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ProgramCard
              title="Child Survival Intervention"
              description="Supporting mothers and children from pregnancy through age 5 with healthcare, nutrition, early childhood development, and family support services."
              href="/programs/child-survival"
              icon={<Baby className="w-6 h-6 text-primary" />}
              stats="Ages 0-3 • Health & Nutrition Focus • Family Support"
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ProgramCard
              title="Child Development through Sponsorship"
              description="Comprehensive development for children ages 3-18 through education, spiritual growth, life skills training, and community engagement."
              href="/programs/sponsorship"
              icon={<GraduationCap className="w-6 h-6 text-primary" />}
              stats="Ages 3-12 • Education & Spiritual Growth • Sponsorship Model"
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ProgramCard
              title="Youth Development"
              description="Empowering young adults with vocational training, leadership skills, entrepreneurship opportunities, and community service projects."
              href="/programs/youth-development"
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              stats="Ages 12+ • Leadership & Skills Training • Community Impact"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How Programs Work Together */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">A Comprehensive Approach</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              Our programs are designed to work together, creating a seamless journey of support from birth through
              young adulthood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Holistic Development</h3>
              <p className="font-serif text-muted-foreground">
                Addressing physical, emotional, social, and spiritual needs at every stage of development.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Family-Centered</h3>
              <p className="font-serif text-muted-foreground">
                Involving families and communities to create sustainable change and lasting impact.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Faith-Based</h3>
              <p className="font-serif text-muted-foreground">
                Grounded in Christian values and supported by our partnership with FGCK and Compassion International.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Get Involved in Our Programs"
        description="Whether through sponsorship, volunteering, or partnership, there are many ways to support our comprehensive approach to child development."
        primaryCta={{ text: "Sponsor a Child", href: "/programs/sponsorship" }}
        secondaryCta={{ text: "Volunteer", href: "/get-involved" }}
        variant="primary"
      />

      <SiteFooter />
    </div>
  )
}
