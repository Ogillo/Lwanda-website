"use client"
import { useState } from "react"
import GalleryShell from "@/components/admin/Gallery/GalleryShell"
import HeroTab from "./hero-tab"
import GalleryTab from "./gallery-tab"

export default function GalleryManagementPage() {
  const [tab, setTab] = useState<"hero" | "gallery">("hero")
  return (
    <GalleryShell>
      <div className="flex gap-2 border-b mb-4">
        <button className={`px-4 py-2 ${tab === "hero" ? "border-b-2 border-primary" : ""}`} onClick={() => setTab("hero")}>Hero Images</button>
        <button className={`px-4 py-2 ${tab === "gallery" ? "border-b-2 border-primary" : ""}`} onClick={() => setTab("gallery")}>Gallery Images</button>
      </div>
      {tab === "hero" ? <HeroTab /> : <GalleryTab />}
    </GalleryShell>
  )
}

