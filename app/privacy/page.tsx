import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-24 max-w-[680px]">
        <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">1. Introduction</h2>
            <p className="font-serif text-muted-foreground">
              KE 258 Lwanda Child Development Centre ("we," "us," "our," or "Organization") is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">2. Information We Collect</h2>
            <p className="font-serif text-muted-foreground mb-4">
              We may collect information about you in a variety of ways. The information we may collect on the Site
              includes:
            </p>
            <ul className="font-serif text-muted-foreground space-y-2 ml-6">
              <li>• Personal identification information (name, email address, phone number, etc.)</li>
              <li>• Donation information (payment details, donation amount, designation)</li>
              <li>• Volunteer application information</li>
              <li>• Sponsorship information</li>
              <li>• Website usage data (IP address, browser type, pages visited, etc.)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">3. Use of Your Information</h2>
            <p className="font-serif text-muted-foreground mb-4">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized
              experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="font-serif text-muted-foreground space-y-2 ml-6">
              <li>• Process your donations and provide receipts</li>
              <li>• Manage your sponsorship relationship</li>
              <li>• Process volunteer applications</li>
              <li>• Send you updates about our programs and impact</li>
              <li>• Respond to your inquiries and requests</li>
              <li>• Improve our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">4. Disclosure of Your Information</h2>
            <p className="font-serif text-muted-foreground">
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              only with trusted partners who assist us in operating our website and conducting our business, subject to
              confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">5. Security of Your Information</h2>
            <p className="font-serif text-muted-foreground">
              We use administrative, technical, and physical security measures to protect your personal information.
              However, no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4 pt-12">6. Contact Us</h2>
            <p className="font-serif text-muted-foreground">
              If you have questions or comments about this Privacy Policy, please contact us at{" "}
              {"{privacy@ke258lwanda.org}"} or call {"{+254 XXX XXX XXX}"}.
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
