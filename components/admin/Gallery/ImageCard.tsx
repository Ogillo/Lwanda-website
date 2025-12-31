import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash, Eye, Check, X, Copy } from "lucide-react"

export default function ImageCard({ 
  item, 
  onDelete, 
  onRename, 
  onSetActive,
  isActive 
}: { 
  item: any, 
  onDelete?: (path: string) => void, 
  onRename?: (path: string, newName: string) => void,
  onSetActive?: (path: string) => void,
  isActive?: boolean
}) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [newName, setNewName] = useState(item.path.split('/').pop())

  const handleRename = () => {
    if (newName && newName !== item.path.split('/').pop() && onRename) {
      onRename(item.path, newName)
    }
    setIsRenaming(false)
  }

  return (
    <div className={`rounded-lg border p-2 relative group bg-card ${isActive ? 'ring-2 ring-primary' : ''}`}>
      {isActive && <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium">Active</div>}
      <div className="relative aspect-video mb-2 bg-muted rounded overflow-hidden">
          <img src={item.thumbUrl || item.url} alt={item.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button size="icon" variant="secondary" onClick={() => window.open(item.url, '_blank')} title="View Full Image">
                <Eye className="size-4" />
            </Button>
             <Button size="icon" variant="secondary" onClick={() => {
                navigator.clipboard.writeText(item.url)
             }} title="Copy URL">
                <Copy className="size-4" />
            </Button>
          </div>
      </div>
      
      {isRenaming ? (
        <div className="flex gap-1 items-center mb-2">
            <Input value={newName} onChange={e => setNewName(e.target.value)} className="h-8 text-sm" autoFocus />
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleRename}><Check className="size-4 text-green-500" /></Button>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setIsRenaming(false)}><X className="size-4 text-red-500" /></Button>
        </div>
      ) : (
          <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium truncate flex-1" title={item.name}>{item.name}</span>
              {onRename && (
                <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setIsRenaming(true)}>
                    <Pencil className="size-3" />
                </Button>
              )}
          </div>
      )}

      <div className="flex gap-2">
        {onSetActive && (
             <Button 
                variant={isActive ? "secondary" : "outline"} 
                size="sm" 
                className="flex-1 text-xs"
                onClick={() => onSetActive(item.path)}
                disabled={isActive}
            >
                {isActive ? "Active" : "Set Active"}
            </Button>
        )}
        {onDelete && (
            <Button variant="destructive" size="sm" className={onSetActive ? "w-auto px-2" : "flex-1"} onClick={() => onDelete(item.path)}>
                {onSetActive ? <Trash className="size-4" /> : "Delete"}
            </Button>
        )}
      </div>
    </div>
  )
}
