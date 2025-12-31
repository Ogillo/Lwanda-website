import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { StatCard } from "@/components/ui/stat-card"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Heart, Shield, FileText, Smartphone, Building, CheckCircle } from "lucide-react"
import { getHeroImage } from "@/lib/hero"

export default async function DonatePage() {
  const heroUrl = await getHeroImage("donate", "/children-celebrating-in-kenya-community.png")

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Support Our Mission"
        subtitle="Your generosity transforms lives and builds hope for vulnerable children"
        description="Every donation makes a direct impact in the lives of children and families in Lwanda. Join us in breaking the cycle of poverty through faith-based development programs."
        backgroundImage={heroUrl}
      />

      {/* Impact Statistics */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Your Impact</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              See how your donations are making a real difference in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <StatCard
              value="KES 5,000"
              label="Provides"
              description="One month of nutritious meals for a child"
              icon={<Heart className="w-6 h-6 text-primary" />}
            />
            <StatCard
              value="KES 7,500"
              label="Covers"
              description="School fees and supplies for one term"
              icon={<FileText className="w-6 h-6 text-primary" />}
            />
            <StatCard
              value="KES 12,000"
              label="Supports"
              description="Healthcare for a family for six months"
              icon={<Shield className="w-6 h-6 text-primary" />}
            />
            <StatCard
              value="KES 20,000"
              label="Funds"
              description="Vocational training for one youth"
              icon={<CheckCircle className="w-6 h-6 text-primary" />}
            />
          </div>
        </div>
      </section>

      {/* Donation */}
      <section className="py-24" id="donation-form">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">Make a Donation</h2>
              <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
                Use the details below to give via M-Pesa Paybill. Payment is completed in your M-Pesa app.
              </p>
            </div>
            <div className="bg-card border border-border rounded-[16px] p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="text-sm font-serif text-muted-foreground">Paybill Number</div>
                  <div className="font-sans text-2xl font-bold text-foreground">303030</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="text-sm font-serif text-muted-foreground">Account Number</div>
                  <div className="font-sans text-2xl font-bold text-foreground">2032984005</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="text-sm font-serif text-muted-foreground">Recipient</div>
                  <div className="font-sans text-xl font-semibold text-foreground">Lwanda FGCK CDC...</div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-sans text-xl font-semibold text-foreground">How to Pay via M-Pesa</h3>
                <ol className="list-decimal pl-5 text-muted-foreground font-serif">
                  <li>Open M-Pesa and choose Paybill.</li>
                  <li>Enter Paybill <span className="font-sans font-semibold text-foreground">303030</span>.</li>
                  <li>Enter Account <span className="font-sans font-semibold text-foreground">2032984005</span>.</li>
                  <li>Enter your chosen amount and confirm recipient “Lwanda FGCK CDC...”.</li>
                  <li>Complete payment and save your confirmation.</li>
                </ol>
                <p className="text-sm text-muted-foreground">Thank you for partnering with us.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
