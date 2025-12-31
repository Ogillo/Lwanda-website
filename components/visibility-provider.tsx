"use client"
import type React from "react"
import { useEffect } from "react"

export default function VisibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement
    const setAttr = (name: string, value: string) => {
      try {
        root.setAttribute(name, value)
      } catch {}
    }

    const darkMQ = window.matchMedia("(prefers-color-scheme: dark)")
    const updateTheme = () => setAttr("data-theme", darkMQ.matches ? "dark" : "light")
    darkMQ.addEventListener("change", updateTheme)
    updateTheme()

    const contrastMQ = window.matchMedia("(prefers-contrast: more)")
    const updateContrast = () => setAttr("data-contrast", contrastMQ.matches ? "more" : "standard")
    contrastMQ.addEventListener("change", updateContrast)
    updateContrast()

    const hcmMQ = window.matchMedia("(forced-colors: active)")
    const updateHcm = () => setAttr("data-hcm", hcmMQ.matches ? "active" : "none")
    hcmMQ.addEventListener("change", updateHcm)
    updateHcm()

    let sensor: any
    const updateBrightness = (level: "low" | "medium" | "high") => setAttr("data-brightness", level)
    const startALS = async () => {
      try {
        const ALS = (window as any).AmbientLightSensor
        if (!ALS) {
          updateBrightness("medium")
          return
        }
        sensor = new ALS()
        sensor.addEventListener("reading", () => {
          const lux = sensor.illuminance ?? 100
          const level = lux < 50 ? "low" : lux < 300 ? "medium" : "high"
          updateBrightness(level)
        })
        sensor.addEventListener("error", () => updateBrightness("medium"))
        sensor.start()
      } catch {
        updateBrightness("medium")
      }
    }
    startALS()

    return () => {
      try {
        darkMQ.removeEventListener("change", updateTheme)
        contrastMQ.removeEventListener("change", updateContrast)
        hcmMQ.removeEventListener("change", updateHcm)
        sensor && sensor.stop && sensor.stop()
      } catch {}
    }
  }, [])

  return children as any
}
