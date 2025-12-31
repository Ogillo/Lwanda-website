import type React from "react"
import type { Metadata } from "next"
import { Inter_Tight, Manrope } from "next/font/google"
import "./globals.css"
import VisibilityProvider from "@/components/visibility-provider"

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "KE 258 Lwanda Child Development Centre",
  description:
    "Empowering vulnerable children in Lwanda, Kenya through faith-based programs in partnership with Compassion International and FGCK",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${manrope.variable} antialiased dark`}>
      <head />
      <body>
        <VisibilityProvider>{children}</VisibilityProvider>
      </body>
    </html>
  )
}
