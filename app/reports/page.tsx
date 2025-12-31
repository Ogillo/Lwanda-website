import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FileText, Download, Calendar } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      year: 2024,
      title: "Annual Report 2024",
      description: "Comprehensive overview of our programs, impact, and financial performance for 2024.",
      type: "Annual Report",
      date: "March 2024",
    },
    {
      year: 2024,
      title: "Financial Report 2024",
      description: "Detailed financial statements and fund allocation for 2024.",
      type: "Financial Report",
      date: "March 2024",
    },
    {
      year: 2024,
      title: "Impact Report 2024",
      description: "Stories and statistics showing the impact of our programs on children and families.",
      type: "Impact Report",
      date: "March 2024",
    },
    {
      year: 2023,
      title: "Annual Report 2023",
      description: "Comprehensive overview of our programs, impact, and financial performance for 2023.",
      type: "Annual Report",
      date: "March 2023",
    },
    {
      year: 2023,
      title: "Financial Report 2023",
      description: "Detailed financial statements and fund allocation for 2023.",
      type: "Financial Report",
      date: "March 2023",
    },
    {
      year: 2023,
      title: "Impact Report 2023",
      description: "Stories and statistics showing the impact of our programs on children and families.",
      type: "Impact Report",
      date: "March 2023",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Reports & Publications"
        subtitle="Transparency and accountability in our work"
        description="We are committed to transparency and regularly publish reports on our programs, impact, and financial performance."
        backgroundImage="/young-adults-leading-community-meeting-in-kenya.png"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-sans text-3xl font-bold text-foreground mb-4">Our Reports</h2>
              <p className="font-serif text-lg text-muted-foreground">
                Download our annual reports, financial statements, and impact reports to learn more about our work.
              </p>
            </div>

            <div className="space-y-4">
              {reports.map((report, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-sans text-lg font-semibold text-foreground mb-1">{report.title}</h3>
                        <p className="font-serif text-muted-foreground mb-3">{report.description}</p>
                        <div className="flex gap-4 text-sm">
                          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                            {report.type}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {report.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex-shrink-0">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
