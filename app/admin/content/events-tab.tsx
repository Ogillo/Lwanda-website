import EventList from "@/components/admin/Content/EventList"
import EventEditor from "@/components/admin/Content/EventEditor"

export default function EventsTab() {
  return (
    <div className="space-y-6">
      <EventList />
      <EventEditor />
    </div>
  )
}

