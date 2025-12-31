import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { Shield, Heart, Users, AlertCircle, CheckCircle } from "lucide-react"

export default function SafeguardingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Child Protection & Safeguarding"
        subtitle="Our commitment to protecting vulnerable children"
        description="The safety, dignity, and wellbeing of children is at the heart of everything we do. We maintain the highest standards of child protection."
        backgroundImage="/mother-and-child-at-health-clinic-in-kenya.png"
      />

      {/* Our Commitment */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">Our Safeguarding Commitment</h2>
              <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
                We are committed to creating a safe environment where every child can thrive and reach their full
                potential.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Prevention</h3>
                <p className="font-serif text-muted-foreground">
                  We implement comprehensive prevention strategies including staff training, background checks, and
                  clear policies to prevent abuse and exploitation.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Reporting</h3>
                <p className="font-serif text-muted-foreground">
                  We have clear procedures for reporting concerns and allegations. All reports are taken seriously and
                  investigated promptly.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Support</h3>
                <p className="font-serif text-muted-foreground">
                  We provide comprehensive support to children who have experienced abuse or exploitation, including
                  counseling and rehabilitation services.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Accountability</h3>
                <p className="font-serif text-muted-foreground">
                  We hold ourselves accountable to the highest standards and regularly review our policies and practices
                  to ensure continuous improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Policies */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
              Our Safeguarding Policies
            </h2>

            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans text-xl font-semibold text-foreground mb-2">Code of Conduct</h3>
                    <p className="font-serif text-muted-foreground">
                      All staff, volunteers, and partners must adhere to our Code of Conduct which outlines expected
                      behavior and professional standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans text-xl font-semibold text-foreground mb-2">Background Screening</h3>
                    <p className="font-serif text-muted-foreground">
                      All individuals working with children undergo thorough background checks and reference
                      verification before employment or volunteering.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans text-xl font-semibold text-foreground mb-2">Training & Awareness</h3>
                    <p className="font-serif text-muted-foreground">
                      All staff and volunteers receive regular training on child protection, safeguarding procedures,
                      and recognizing signs of abuse.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans text-xl font-semibold text-foreground mb-2">Data Protection</h3>
                    <p className="font-serif text-muted-foreground">
                      We maintain strict confidentiality and secure data management practices to protect children's
                      personal information and privacy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans text-xl font-semibold text-foreground mb-2">Incident Reporting</h3>
                    <p className="font-serif text-muted-foreground">
                      We have clear procedures for reporting and investigating any concerns or allegations of abuse,
                      exploitation, or misconduct.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans text-xl font-semibold text-foreground mb-2">Survivor Support</h3>
                    <p className="font-serif text-muted-foreground">
                      We provide comprehensive support services to children who have experienced abuse, including
                      counseling, medical care, and rehabilitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Concerns */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-[16px] p-8">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">Reporting Concerns</h2>
              <p className="font-serif text-muted-foreground mb-6">
                If you have concerns about a child's safety or suspect abuse, please report it immediately. All reports
                are treated confidentially and investigated thoroughly.
              </p>
              <div className="space-y-3">
                <p className="font-serif text-muted-foreground">
                  <strong>Email:</strong> {"ke258fgcklwandacdc@gmail.com"}
                </p>
                <p className="font-serif text-muted-foreground">
                  <strong>Phone:</strong> {"+254 723 783 472"}
                </p>
                <p className="font-serif text-muted-foreground">
                  <strong>In-person:</strong> Visit our office in Lwanda
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
