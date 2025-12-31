"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ConfirmDialog({ onConfirm, children }: { onConfirm: () => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>{children}</Button>
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-card p-4 rounded-lg w-[90vw] max-w-sm">
            <div className="mb-4">Are you sure?</div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => { onConfirm(); setOpen(false) }}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
