import StoryList from "@/components/admin/Content/StoryList"
import StoryEditor from "@/components/admin/Content/StoryEditor"

export default function StoriesTab() {
  return (
    <div className="space-y-6">
      <StoryList />
      <StoryEditor />
    </div>
  )
}

