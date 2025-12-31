"use client"
import { useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { Button } from "@/components/ui/button"
import FileInput from "@/components/admin/UI/FileInput"

export default function TipTapEditor({ value, onChange, onUpload }: { value: string; onChange: (v: string) => void; onUpload: (file: File) => Promise<string> }) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value, false)
  }, [editor, value])

  return (
    <div className="rounded border p-2 space-y-2">
      <div className="flex gap-2 items-center">
        <Button variant="outline" size="sm" type="button" onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</Button>
        <div className="flex-1"></div>
        <FileInput 
          className="w-auto"
          label=""
          onChange={async (files) => {
            const file = files[0]
            if (!file) return
            const url = await onUpload(file)
            editor?.chain().focus().setImage({ src: url }).run()
          }}
        />
      </div>
      <EditorContent editor={editor} className="min-h-[200px] prose max-w-none p-4 border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2" />
    </div>
  )
}
