import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Heart, Users, Briefcase, Clock, Globe, Shield, BookOpen, Hand as Hands } from "lucide-react"
import Link from "next/link"
import { getHeroImage } from "@/lib/hero"

export default async function GetInvolvedPage() {
  const heroUrl = await getHeroImage("get_involved", "/volunteers-working-with-children-in-kenya.png")

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Get Involved"
        subtitle="Join us in transforming lives and building hope in Lwanda"
        description="There are many meaningful ways to support our mission and make a lasting impact in the lives of vulnerable children and families. Find the perfect way for you to get involved."
        backgroundImage={heroUrl}
      />

      {/* Volunteer Opportunities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Volunteer Opportunities</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Make a direct impact by sharing your time, skills, and passion with our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Education Support</h3>
              <p className="font-serif text-muted-foreground mb-4">
                Help with tutoring, teaching assistance, library support, and educational activities.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <strong>Time Commitment:</strong> 4-6 hours per week
                </p>
                <p>
                  <strong>Skills Needed:</strong> Teaching experience preferred
                </p>
              </div>
              <Link href="/contact?reason=education" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Apply Now
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Healthcare Support</h3>
              <p className="font-serif text-muted-foreground mb-4">
                Assist with health screenings, nutrition programs, and community health education.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <strong>Time Commitment:</strong> 6-8 hours per week
                </p>
                <p>
                  <strong>Skills Needed:</strong> Medical or nursing background
                </p>
              </div>
              <Link href="/contact?reason=healthcare" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Apply Now
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Youth Mentoring</h3>
              <p className="font-serif text-muted-foreground mb-4">
                Mentor young adults in leadership development, vocational training, and life skills.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <strong>Time Commitment:</strong> 3-4 hours per week
                </p>
                <p>
                  <strong>Skills Needed:</strong> Leadership or professional experience
                </p>
              </div>
              <Link href="/contact?reason=mentoring" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Apply Now
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Administrative Support</h3>
              <p className="font-serif text-muted-foreground mb-4">
                Help with office tasks, data entry, communications, and program coordination.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <strong>Time Commitment:</strong> Flexible schedule
                </p>
                <p>
                  <strong>Skills Needed:</strong> Computer skills, organization
                </p>
              </div>
              <Link href="/contact?reason=admin" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
