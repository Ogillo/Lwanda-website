"use client"
import Link from "next/link"
import { useRef, useState } from "react"
import { Calendar } from "@/components/icons"
import { Button } from "@/components/ui/button"

interface StoryCardProps {
  title: string
  excerpt: string
  href?: string
  date: string
  author?: string
  imageUrl?: string
  category?: string
  fullContent?: string
  id?: string | number
}

export function StoryCard({ title, excerpt, href, date, author, imageUrl, category, fullContent, id }: StoryCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const onReadClick = async () => {
    try {
      if (!expanded) {
        setLoading(false)
        setExpanded(true)
        const hash = typeof id !== "undefined" ? `story-${id}` : title ? `story-${title.replace(/\s+/g, "-").toLowerCase()}` : "story"
        if (typeof window !== "undefined") {
          try {
            const url = new URL(window.location.href)
            url.hash = hash
            window.history.pushState({}, "", url.toString())
          } catch {}
        }
        if (contentRef.current) {
          contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      } else {
        setExpanded(false)
        if (typeof window !== "undefined") {
          try {
            const url = new URL(window.location.href)
            url.hash = ""
            window.history.pushState({}, "", url.toString())
          } catch {}
        }
      }
    } catch {}
  }

  return (
    <article className="bg-card border border-border rounded-[16px] overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="bg-muted">
          <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-64 object-cover" />
        </div>
      )}

      <div className="p-6">
        {category && (
          <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-[10px] text-xs font-medium mb-3">
            {category}
          </span>
        )}

        <h3 className="font-sans text-xl font-semibold text-foreground mb-3 line-clamp-2">
          {href ? (
            <Link href={href} className="hover:text-primary transition-colors" aria-label={`Open story: ${title}`}>
              {title}
            </Link>
          ) : (
            <span>{title}</span>
          )}
        </h3>

        <div ref={contentRef} id={typeof id !== "undefined" ? `story-content-${id}` : undefined}>
          {!expanded && <p className="font-serif text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>}
          {expanded && (
            <div className="font-serif text-muted-foreground mb-4">
              {fullContent ? (
                <div dangerouslySetInnerHTML={{ __html: fullContent }} />
              ) : (
                <p>{excerpt}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span className="font-serif">{date}</span>
            </div>
          </div>

          {fullContent ? (
            <Button
              variant="default"
              size="sm"
              onClick={onReadClick}
              isLoading={loading}
              aria-label={expanded ? "Collapse story" : "Read Story"}
              aria-expanded={expanded}
              aria-controls={typeof id !== "undefined" ? `story-content-${id}` : undefined}
            >
              {expanded ? "Reading" : "Read Story"}
            </Button>
          ) : (
            <Link
              href={href || "/stories"}
              className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              role="button"
              aria-label="Go to stories"
            >
              Read Stories
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
