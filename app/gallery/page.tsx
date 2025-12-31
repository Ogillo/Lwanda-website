"use client"

import { useEffect, useMemo, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Loader2, Image as ImageIcon } from "lucide-react"

type GalleryItem = { title: string; url: string; path: string; alt: string }

const CATEGORIES = [
  { key: "education", label: "Education", folder: "education" },
  { key: "sponsorship", label: "Sponsorship", folder: "sponsorship" },
  { key: "communitywork", label: "Community Work", folder: "community_work" },
  { key: "celebration", label: "Celebrations", folder: "celebration" },
]

export default function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].key)
  const [imagesByCat, setImagesByCat] = useState<Record<string, GalleryItem[]>>({})
  const [loadingByCat, setLoadingByCat] = useState<Record<string, boolean>>({})
  const [errorByCat, setErrorByCat] = useState<Record<string, string | null>>({})

  const fetchCategory = async (catKey: string, folder: string) => {
    if (imagesByCat[catKey]?.length) return // Already loaded

    setLoadingByCat((prev) => ({ ...prev, [catKey]: true }))
    setErrorByCat((prev) => ({ ...prev, [catKey]: null }))
    try {
      const supabase = getSupabaseBrowser()
      const bucket = "gallery" // User specified "gallery" bucket
      
      // Recursive fetch to get images in folder
      const { data, error } = await supabase.storage.from(bucket).list(folder, { 
        limit: 100, 
        sortBy: { column: 'name', order: 'desc' } 
      })
      
      if (error) throw error
      
      const mapped: GalleryItem[] = (data || [])
        .filter((f) => f.name && /\.(png|jpe?g|webp|gif|svg)$/i.test(f.name)) // Filter images
        .map((f) => {
          const path = `${folder}/${f.name}`
          const url = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
          return { 
            title: f.name, 
            url, 
            path, 
            alt: `${CATEGORIES.find(c => c.key === catKey)?.label} - ${f.name}` 
          }
        })
      
      setImagesByCat((prev) => ({ ...prev, [catKey]: mapped }))
    } catch (err: any) {
      console.error(err)
      setErrorByCat((prev) => ({ ...prev, [catKey]: err?.message || "Failed to load images" }))
      setImagesByCat((prev) => ({ ...prev, [catKey]: [] }))
    } finally {
      setLoadingByCat((prev) => ({ ...prev, [catKey]: false }))
    }
  }

  useEffect(() => {
    const cat = CATEGORIES.find((c) => c.key === activeCategory)
    if (cat) {
      fetchCategory(cat.key, cat.folder)
    }
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section for Gallery */}
      <section className="relative py-20 text-center">
        <div className="absolute inset-0 -z-10">
          <img src="/children-performing-at-kenya-community-event.png" alt="Gallery Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">Our Gallery</h1>
            <p className="text-white/90 max-w-2xl mx-auto">
                Explore moments captured from our various programs and community activities.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 hover:bg-secondary text-secondary-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="min-h-[400px]">
          {loadingByCat[activeCategory] ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading images...</p>
            </div>
          ) : errorByCat[activeCategory] ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">Unable to load images</h3>
              <p className="text-muted-foreground">{errorByCat[activeCategory]}</p>
              <button 
                onClick={() => {
                    const cat = CATEGORIES.find((c) => c.key === activeCategory)
                    if(cat) fetchCategory(cat.key, cat.folder)
                }}
                className="mt-4 text-primary hover:underline"
              >
                Try Again
              </button>
            </div>
          ) : imagesByCat[activeCategory]?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagesByCat[activeCategory]?.map((item) => (
                <div 
                    key={item.path} 
                    className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer"
                    onClick={() => setSelectedMedia(item)}
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
          {selectedMedia && (
            <div className="relative flex items-center justify-center h-full w-full">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.alt}
                className="max-h-[85vh] max-w-full rounded-md shadow-2xl"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  )
}
