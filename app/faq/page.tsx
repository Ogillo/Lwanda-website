"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between bg-card hover:bg-muted transition-colors"
      >
        <h3 className="font-sans font-semibold text-foreground text-left">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="p-6 bg-background border-t border-border">
          <p className="font-serif text-muted-foreground">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const faqs = [
    {
      category: "About Our Programs",
      items: [
        {
          question: "What is the Child Survival Intervention program?",
          answer:
            "Our Child Survival Intervention program focuses on maternal and early childhood health, nutrition, and development. We provide health screenings, nutritional support, and education to vulnerable mothers and children under five years old.",
        },
        {
          question: "How does the sponsorship program work?",
          answer:
            "Through our sponsorship program, individual sponsors are matched with children in our community. Sponsors provide financial support for education, healthcare, and basic needs while building a meaningful relationship with their sponsored child.",
        },
        {
          question: "What does the Youth Development program include?",
          answer:
            "Our Youth Development program provides leadership training, vocational skills training, and life skills education to young adults aged 15-25. We help them develop skills for employment and become positive leaders in their communities.",
        },
      ],
    },
    {
      category: "Sponsorship",
      items: [
        {
          question: "How much does it cost to sponsor a child?",
          answer:
            "Monthly sponsorship typically costs KES 2,500 (approximately USD 20). This covers education, healthcare, and basic needs support. You can also make one-time donations of any amount.",
        },
        {
          question: "Can I communicate with my sponsored child?",
          answer:
            "Yes! We encourage regular communication between sponsors and their sponsored children. You can exchange letters, photos, and updates. We also facilitate video calls when possible.",
        },
        {
          question: "What happens if I need to stop sponsoring?",
          answer:
            "We understand that circumstances change. You can pause or end your sponsorship at any time with notice. We'll work to transition your sponsored child to another sponsor to ensure continuity of support.",
        },
      ],
    },
    {
      category: "Volunteering",
      items: [
        {
          question: "Do I need to be in Kenya to volunteer?",
          answer:
            "While most volunteer opportunities are on-site in Lwanda, we do have remote opportunities for skills-based volunteering such as writing, design, and administrative support. Contact us to learn about remote options.",
        },
        {
          question: "What is the minimum time commitment for volunteers?",
          answer:
            "Time commitments vary by role. Most volunteer positions require 2-6 hours per week, though some are event-based or flexible. We work with you to find an arrangement that fits your schedule.",
        },
        {
          question: "Is there a background check required?",
          answer:
            "Yes, all volunteers working directly with children must undergo a background check. This is part of our child protection and safeguarding commitment. The process typically takes 1-2 weeks.",
        },
      ],
    },
    {
      category: "Donations",
      items: [
        {
          question: "Are donations tax-deductible?",
          answer:
            "Yes, KE 258 Lwanda CYDC is a registered non-profit organization. Donations may be tax-deductible depending on your country of residence. We provide receipts for all donations.",
        },
        {
          question: "How can I be sure my donation is used effectively?",
          answer:
            "We are committed to transparency and accountability. We publish annual financial reports and impact reports showing exactly how donations are used. You can request these reports at any time.",
        },
        {
          question: "Can I designate my donation to a specific program?",
          answer:
            "When you donate, you can choose to support a specific program (Child Survival, Sponsorship, or Youth Development) or let us direct it where it's needed most.",
        },
      ],
    },
    {
      category: "Child Protection",
      items: [
        {
          question: "How do you protect children's privacy and safety?",
          answer:
            "Child protection is our highest priority. We have strict safeguarding policies, background checks for all staff and volunteers, and secure data management practices. We never share children's personal information without consent.",
        },
        {
          question: "What is your child protection policy?",
          answer:
            "Our comprehensive child protection policy covers all aspects of our work with children. It includes prevention of abuse, reporting procedures, and support for affected children. You can read our full policy on our Safeguarding page.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our programs and how to get involved"
        description="Can't find what you're looking for? Contact us directly and we'll be happy to help."
        backgroundImage="/children-learning-in-kenya-classroom.png"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faqs.map((section) => (
              <div key={section.category} className="mb-12">
                <h2 className="font-sans text-2xl font-bold text-foreground mb-6">{section.category}</h2>
                <div className="space-y-4">
                  {section.items.map((item, index) => (
                    <FAQItem key={index} question={item.question} answer={item.answer} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Still Have Questions?"
        description="Our team is here to help. Reach out to us directly for more information."
        primaryCta={{ text: "Contact Us", href: "/contact" }}
        secondaryCta={{ text: "Learn More", href: "/about" }}
      />

      <SiteFooter />
    </div>
  )
}
