import { Button } from "@/components/ui/button"
type Message = { id: string; name: string; email: string; title?: string; subject?: string; message_preview?: string; date?: string }
export default function LatestMessages({ items = [] }: { items?: Message[] }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="font-medium mb-2">Latest messages</div>
      <div className="space-y-3">
        {items.map((m) => (
          <div key={m.id} className="flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium">{m.name}</div>
              <div className="text-muted-foreground">{m.message_preview}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Open</Button>
              <Button variant="outline">Mark read</Button>
            </div>
          </div>
        ))}
        {!items.length && <div className="text-sm text-muted-foreground">No messages</div>}
      </div>
    </div>
  )
}
