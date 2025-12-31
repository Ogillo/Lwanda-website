import type React from "react"
import Link from "next/link"
import { ArrowRight } from "@/components/icons"

interface ProgramCardProps {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
  stats?: string
  coverImage?: string
}

export function ProgramCard({ title, description, href, icon, stats, coverImage }: ProgramCardProps) {
  return (
    <div className="bg-card border border-border rounded-[16px] p-6 hover:shadow-lg transition-shadow">
      {coverImage ? (
        <div className="mb-4">
          <img src={coverImage} alt={title} className="w-full h-40 object-cover rounded-[12px]" />
        </div>
      ) : icon ? (
        <div className="w-12 h-12 bg-primary/10 rounded-[12px] flex items-center justify-center mb-4">{icon}</div>
      ) : null}

      <h3 className="font-sans text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="font-serif text-muted-foreground mb-4">{description}</p>

      {stats && (
        <div className="bg-muted rounded-lg p-3 mb-4">
          <span className="font-sans text-sm font-medium text-foreground">{stats}</span>
        </div>
      )}

      <Link href={href} className="inline-flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors">
        <span className="font-serif font-medium">Learn more →</span>
      </Link>
    </div>
  )
}
