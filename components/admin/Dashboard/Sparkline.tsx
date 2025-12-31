type Point = { date?: string; week_start?: string; count: number }
export default function Sparkline({ daily = [], weekly = [] }: { daily?: Point[]; weekly?: Point[] }) {
  const data = daily.length ? daily : weekly
  const max = Math.max(1, ...data.map((d) => d.count))
  const path = data
    .map((d, i) => {
      const x = (i / Math.max(1, data.length - 1)) * 300
      const y = 80 - (d.count / max) * 80
      return `${i === 0 ? "M" : "L"}${x},${y}`
    })
    .join(" ")
  return (
    <div className="rounded-lg border p-4">
      <svg width="300" height="80"><path d={path} stroke="var(--color-primary)" fill="none" /></svg>
    </div>
  )
}

