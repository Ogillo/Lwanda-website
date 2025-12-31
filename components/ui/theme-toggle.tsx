"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "@/components/icons"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const curr = mounted ? (resolvedTheme || theme || "light") : "light"
  const isDark = curr === "dark"

  const toggle = () => {
    try {
      setTheme(isDark ? "light" : "dark")
      try {
        window.localStorage && window.localStorage.setItem("theme", isDark ? "light" : "dark")
      } catch {}
    } catch {
      try {
        const el = document.documentElement
        const next = isDark ? "light" : "dark"
        if (next === "dark") el.classList.add("dark")
        else el.classList.remove("dark")
      } catch {}
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      onClick={toggle}
      className="rounded-md"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}
