"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ImageDetailModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>Open details</Button>
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-card p-4 rounded-lg w-[90vw] max-w-xl">
            <div className="flex justify-end"><Button variant="outline" onClick={() => setOpen(false)}>Close</Button></div>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
