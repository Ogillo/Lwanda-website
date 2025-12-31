import type React from "react"
interface StatCardProps {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
}

export function StatCard({ value, label, description, icon }: StatCardProps) {
  return (
    <div className="bg-primary/10 rounded-[16px] p-6 text-center">
      {icon && (
        <div className="w-12 h-12 bg-white rounded-[10px] border border-border flex items-center justify-center mx-auto mb-4">{icon}</div>
      )}

      <div className="font-sans text-4xl font-bold text-primary mb-2">{value}</div>
      <div className="font-sans font-semibold text-foreground mb-1">{label}</div>

      {description && <p className="font-serif text-sm text-muted-foreground max-w-[680px] mx-auto">{description}</p>}
    </div>
  )
}
