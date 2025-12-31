type Props = { title: string; value: number | string }
export default function StatCard({ title, value }: Props) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
    </div>
  )
}

