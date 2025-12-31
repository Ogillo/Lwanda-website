"use client"
import { useState, useRef } from "react"
import { Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  id?: string | number
  title: string
  description?: string
  image_url?: string
  date?: string
  time?: string
  location?: string
}

export function EventCard({ id, title, description, image_url, date, time, location }: EventCardProps) {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const onReadClick = () => {
    setExpanded((prev) => !prev)
    // Intentionally do NOT scroll or change URL/hash to preserve page position
  }

  const excerpt = typeof description === "string" ? description : ""

  return (
    <article className="bg-card border border-border rounded-[16px] overflow-hidden hover:shadow-lg transition-shadow">
      {image_url && (
        <div className="bg-muted">
          <img src={image_url || "/placeholder.svg"} alt={title} className="w-full h-64 object-cover" />
        </div>
      )}

      <div className="p-6">
        <h3 className="font-sans text-xl font-semibold text-foreground mb-3 break-words">
          {title}
        </h3>

        <div ref={contentRef} id={typeof id !== "undefined" ? `event-content-${id}` : undefined}>
          {!expanded && (
            <p className="font-serif text-muted-foreground mb-4 break-words whitespace-normal leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          )}
          {expanded && (
            <div className="font-serif text-muted-foreground mb-4 break-words whitespace-pre-line leading-relaxed">
              {excerpt}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center flex-wrap gap-4">
            {date && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="font-serif">{date}</span>
              </div>
            )}
            {time && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span className="font-serif">{time}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span className="font-serif break-words">{location}</span>
              </div>
            )}
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={onReadClick}
            aria-label={expanded ? "Collapse event" : "Read More"}
            aria-expanded={expanded}
            aria-controls={typeof id !== "undefined" ? `event-content-${id}` : undefined}
          >
            {expanded ? "Reading" : "Read More"}
          </Button>
        </div>
      </div>
    </article>
  )
}

