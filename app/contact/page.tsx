"use client"
import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { getSupabase } from "@/lib/supabase/client"
import { getHeroImage } from "@/lib/hero"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [heroUrl, setHeroUrl] = useState("/children-playing-in-kenya-community-center.png")

  useEffect(() => {
      getHeroImage("contact", "/children-playing-in-kenya-community-center.png").then(setHeroUrl)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)
    const supabase = getSupabase()
    if (!supabase) {
      setStatus("Configuration error. Please try again later.")
      setSubmitting(false)
      return
    }
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject,
      message,
    })
    if (error) {
      setStatus("Failed to send. Please try again.")
    } else {
      setStatus("Message sent successfully.")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Contact Us"
        subtitle="We'd love to hear from you"
        description="Have questions about our programs, want to volunteer, or need more information? Get in touch with our team."
        backgroundImage={heroUrl}
      />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Location</h3>
                    <p className="font-serif text-muted-foreground">Lwanda, Kenya</p>
                  </div>
                </div>

                <div className="rounded-[16px] overflow-hidden border">
                  <iframe
                    title="Lwanda Map"
                    src="https://www.google.com/maps?q=David%20Obonyo%2C%20Lwanda%2C%20Kenya&output=embed"
                    className="w-full h-64"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <div className="p-3 text-center">
                    <a
                      href="https://www.google.com/maps/place/David+Obonyo/@-0.3584478,34.4662081,3a,75y,120.54h,98.71t/data=!3m7!1e1!3m5!1sS78XpVfscTCw0wDizO4Dxg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-8.709590297882201%26panoid%3DS78XpVfscTCw0wDizO4Dxg%26yaw%3D120.5400303433392!7i16384!8i8192!4m15!1m8!3m7!1s0x19d52c86aab96fad:0xd7f57c125948fbfd!2sHoma+Lime+Kowuor!3b1!8m2!3d-0.4300102!4d34.4756349!16s%2Fm%2F0brzkn4!3m5!1s0x19d533b21dd1d94d:0xd80de7a532053017!8m2!3d-0.3620589!4d34.4663042!16s%2Fg%2F11nrx3xpfb?entry=ttu"
                      className="font-serif text-sm text-muted-foreground hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Email</h3>
                    <a href="mailto:info@ke258lwanda.org" className="font-serif text-muted-foreground hover:text-primary">
                      ke258fgcklwandacdc@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Phone</h3>
                    <a href="tel:+254700000000" className="font-serif text-muted-foreground hover:text-primary">
                      +254 723 783 472
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Office Hours</h3>
                    <p className="font-serif text-muted-foreground">Mon - Fri: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-[16px] p-8">
              <h3 className="font-sans text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="volunteer">Volunteering</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
                {status && (
                  <p className={`text-center text-sm ${status.includes("success") ? "text-green-600" : "text-red-600"}`}>
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
