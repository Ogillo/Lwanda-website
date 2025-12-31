import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-24 max-w-[680px]">
        <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">1. Agreement to Terms</h2>
            <p className="font-serif text-muted-foreground">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">2. Use License</h2>
            <p className="font-serif text-muted-foreground mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on KE
              258 Lwanda Child Development Centre's website for personal, non-commercial transitory viewing only. This
              is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="font-serif text-muted-foreground space-y-2 ml-6">
              <li>• Modifying or copying the materials</li>
              <li>• Using the materials for any commercial purpose or for any public display</li>
              <li>• Attempting to decompile or reverse engineer any software contained on the website</li>
              <li>• Removing any copyright or other proprietary notations from the materials</li>
              <li>• Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">3. Disclaimer</h2>
            <p className="font-serif text-muted-foreground">
              The materials on KE 258 Lwanda Child Development Centre's website are provided on an 'as is' basis. KE 258
              Lwanda Child Development Centre makes no warranties, expressed or implied, and hereby disclaims and
              negates all other warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other
              violation of rights.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">4. Limitations</h2>
            <p className="font-serif text-muted-foreground">
              In no event shall KE 258 Lwanda Child Development Centre or its suppliers be liable for any damages
              (including, without limitation, damages for loss of data or profit, or due to business interruption)
              arising out of the use or inability to use the materials on the website.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">5. Accuracy of Materials</h2>
            <p className="font-serif text-muted-foreground">
              The materials appearing on KE 258 Lwanda Child Development Centre's website could include technical,
              typographical, or photographic errors. KE 258 Lwanda Child Development Centre does not warrant that any of
              the materials on the website are accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">6. Links</h2>
            <p className="font-serif text-muted-foreground">
              KE 258 Lwanda Child Development Centre has not reviewed all of the sites linked to its website and is not
              responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement
              by KE 258 Lwanda Child Development Centre of the site. Use of any such linked website is at the user's own
              risk.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">7. Modifications</h2>
            <p className="font-serif text-muted-foreground">
              KE 258 Lwanda Child Development Centre may revise these terms of service for the website at any time
              without notice. By using this website, you are agreeing to be bound by the then current version of these
              terms of service.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">8. Governing Law</h2>
            <p className="font-serif text-muted-foreground">
              These terms and conditions are governed by and construed in accordance with the laws of Kenya, and you
              irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <p className="font-serif text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
