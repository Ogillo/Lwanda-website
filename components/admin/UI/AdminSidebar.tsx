export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="p-4 space-y-2 bg-sidebar text-sidebar-foreground transition-colors">
      <a className="block px-3 py-2 rounded hover:bg-muted transition-colors" href="/admin" onClick={onNavigate}>Dashboard</a>
      <a className="block px-3 py-2 rounded hover:bg-muted transition-colors" href="/admin/gallery" onClick={onNavigate}>Gallery</a>
      <a className="block px-3 py-2 rounded hover:bg-muted transition-colors" href="/admin/content" onClick={onNavigate}>Content</a>
    </nav>
  )
}
