"use client"
import { useState } from "react"
import ImageUploader from "@/components/admin/Gallery/ImageUploader"
import ImageGrid from "@/components/admin/Gallery/ImageGrid"
import { getSupabaseBrowser } from "@/lib/supabase/client"

const PAGES = [
  { id: "home", label: "Home" },
  { id: "contact", label: "Contact" },
  { id: "donate", label: "Donate" }, // Changed from donation to donate to match user request "donate/"
  { id: "get_involved", label: "Get Involved" }, // Changed to underscore
  { id: "programs", label: "Programs" }, // simplified
  { id: "about", label: "About" },
  { id: "stories", label: "Stories" },
]

export default function HeroTab() {
  const [activePage, setActivePage] = useState(PAGES[0].id)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSetActive = async (path: string) => {
    try {
        const supabase = getSupabaseBrowser()
        const { data } = await supabase.auth.getSession()
        const token = data.session?.access_token
        const folder = `hero/${activePage}`
        // We'll just name it 'active' without extension for simplicity, 
        // assuming browser handles MIME type correctly.
        const toPath = `${folder}/active` 
        
        const res = await fetch("/api/admin/images/copy", { 
            method: "POST", 
            headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
            body: JSON.stringify({ bucket: "hero", fromPath: path, toPath }) 
        })
        
        if (res.ok) {
            // Force refresh
            setRefreshKey(k => k + 1)
        } else {
            alert("Failed to set active image")
        }
    } catch (e) {
        console.error(e)
        alert("Error setting active image")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
            {PAGES.map(page => (
                <button 
                    key={page.id} 
                    onClick={() => setActivePage(page.id)}
                    className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium ${activePage === page.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-accent'}`}
                >
                    {page.label}
                </button>
            ))}
      </div>

      <div className="space-y-6">
         <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Upload Hero Image for {PAGES.find(p => p.id === activePage)?.label}</h3>
            <ImageUploader preset="hero" bucket="hero" folder={`hero/${activePage}`} />
        </div>

        <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Manage Hero Images for {PAGES.find(p => p.id === activePage)?.label}</h3>
            <p className="text-sm text-muted-foreground mb-4">Set an image as "Active" to display it on the website.</p>
            <ImageGrid 
                key={`${activePage}-${refreshKey}`}
                bucket="hero" 
                folder={`hero/${activePage}`} 
                onSetActive={handleSetActive}
                activeImage={`hero/${activePage}/active`}
            />
        </div>
      </div>
    </div>
  )
}
