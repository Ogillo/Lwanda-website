"use client"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, FileIcon, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileInputProps {
  accept?: string
  multiple?: boolean
  onChange: (files: File[]) => void
  className?: string
  label?: string
  error?: string
  value?: File[]
}

export default function FileInput({ 
  accept = "image/*", 
  multiple = false, 
  onChange, 
  className,
  label = "Upload files",
  error,
  value = []
}: FileInputProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      onChange(multiple ? [...value, ...newFiles] : newFiles)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      onChange(multiple ? [...value, ...newFiles] : newFiles)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index)
    onChange(newFiles)
  }

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ease-in-out text-center cursor-pointer group",
          isDragging 
            ? "border-primary bg-primary/5 scale-[1.01]" 
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50",
          error && "border-destructive/50 bg-destructive/5"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
        />
        
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform duration-200">
            <Upload className={cn("w-6 h-6", isDragging ? "text-primary" : "text-muted-foreground")} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {isDragging ? "Drop files here" : "Click or drag to upload"}
            </p>
            <p className="text-xs text-muted-foreground">
              {accept.includes("image") ? "SVG, PNG, JPG or GIF" : "All file types accepted"}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive animate-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {value.length > 0 && (
        <div className="space-y-2 mt-4">
          {value.map((file, index) => (
            <div 
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 bg-card border rounded-md shadow-sm animate-in fade-in slide-in-from-bottom-2"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-primary/10 rounded">
                  <FileIcon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
