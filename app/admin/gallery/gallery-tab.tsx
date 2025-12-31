"use client"
import { useState } from "react"
import BucketScanner from "@/components/admin/Gallery/BucketScanner"
import ImageGrid from "@/components/admin/Gallery/ImageGrid"
import ImageUploader from "@/components/admin/Gallery/ImageUploader"

const CATEGORIES = [
  { id: "education", label: "Education" },
  { id: "sponsorship", label: "Sponsorship" },
  { id: "community_work", label: "Community Work" },
  { id: "celebration", label: "Celebration" },
]

export default function GalleryTab() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id)

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-2">
        <BucketScanner />
      </div>
      
      <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
                <button 
                    key={cat.id} 
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium ${activeCategory === cat.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-accent'}`}
                >
                    {cat.label}
                </button>
            ))}
      </div>
        
      <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Upload to {CATEGORIES.find(c => c.id === activeCategory)?.label}</h3>
                <ImageUploader preset="gallery" bucket="gallery" folder={activeCategory} />
            </div>
            
            <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Manage {CATEGORIES.find(c => c.id === activeCategory)?.label} Images</h3>
                <ImageGrid bucket="gallery" folder={activeCategory} />
            </div>
      </div>
    </div>
  )
}
