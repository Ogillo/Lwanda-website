import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CtaBannerProps {
  title: string
  description: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  variant?: "default" | "primary" | "secondary"
}

export function CtaBanner({ title, description, primaryCta, secondaryCta, variant = "default" }: CtaBannerProps) {
  const bgClass = {
    default: "bg-card",
    primary: "bg-gradient-to-r from-secondary to-secondary/70 text-white",
    secondary: "bg-secondary text-secondary-foreground",
  }[variant]

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-sans text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="font-serif text-lg mb-8 opacity-90">{description}</p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg shadow-lg hover:scale-105 transition-transform">
              <Link href={primaryCta.href || "#sponsor"}>{primaryCta.text}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
