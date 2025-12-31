"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "@/components/icons"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 w-full z-50 bg-card text-foreground shadow-sm border-b border-border transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 transition-colors">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="KE 258 Lwanda CYDC Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-sans font-semibold text-foreground">KE 258 Lwanda CYDC</div>
              <div className="font-serif text-xs text-muted-foreground"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link href="/" className={`px-4 py-2 font-serif text-foreground hover:text-primary transition-colors ${pathname === "/" ? "border-b-2 border-primary" : ""}`}>
              Home
            </Link>
            <Link href="/about" className={`px-4 py-2 font-serif text-foreground hover:text-primary transition-colors ${pathname?.startsWith("/about") ? "border-b-2 border-primary" : ""}`}>
              About
            </Link>

            {/* Programs Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                className="px-4 py-2 flex items-center space-x-1 font-serif text-foreground hover:text-primary transition-colors"
              >
                <span>Programs</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isProgramsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-card text-foreground border border-border rounded-[12px] shadow-xl py-2 transition-colors">
                  <Link
                    href="/programs/child-survival"
                    className="block px-4 py-2 font-serif text-sm text-foreground hover:bg-muted rounded-[10px] mx-2"
                  >
                    Child Survival Intervention
                  </Link>
                  <Link
                    href="/programs/sponsorship"
                    className="block px-4 py-2 font-serif text-sm text-foreground hover:bg-muted rounded-[10px] mx-2"
                  >
                    Child Development through Sponsorship
                  </Link>
                  <Link
                    href="/programs/youth-development"
                    className="block px-4 py-2 font-serif text-sm text-foreground hover:bg-muted rounded-[10px] mx-2"
                  >
                    Youth Development
                  </Link>
                </div>
              )}
            </div>

            <Link href="/get-involved" className={`px-4 py-2 font-serif text-foreground hover:text-primary transition-colors ${pathname?.startsWith("/get-involved") ? "border-b-2 border-primary" : ""}`}>
              Get Involved
            </Link>
            <Link href="/events" className={`px-4 py-2 font-serif text-foreground hover:text-primary transition-colors ${pathname?.startsWith("/events") ? "border-b-2 border-primary" : ""}`}>
              Events
            </Link>
            <Link href="/stories" className={`px-4 py-2 font-serif text-foreground hover:text-primary transition-colors ${pathname?.startsWith("/stories") ? "border-b-2 border-primary" : ""}`}>
              Stories
            </Link>
            <Link href="/gallery" className={`px-4 py-2 font-serif text-foreground hover:text-primary transition-colors ${pathname?.startsWith("/gallery") ? "border-b-2 border-primary" : ""}`}>
              Gallery
            </Link>
            <Link href="/contact" className={`px-4 py-2 font-serif text-foreground hover:text-primary transition-colors ${pathname?.startsWith("/contact") ? "border-b-2 border-primary" : ""}`}>
              Contact
            </Link>
          </nav>

          {/* Donate Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/donate"
              className="btn-primary"
            >
              Donate
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/60" onClick={() => setIsMenuOpen(false)} />
            <div className="fixed top-0 right-0 h-full w-80 bg-card text-foreground shadow-xl animate-slideInRight transition-colors">
              <nav className="flex flex-col gap-4 p-6">
                <Link href="/" className="font-serif text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/about" className="font-serif text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <Link href="/programs" className="font-serif text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Programs
                </Link>
                <Link href="/get-involved" className="font-serif text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Get Involved
                </Link>
                <Link href="/events" className="font-serif text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Events
                </Link>
                <Link href="/stories" className="font-serif text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Stories
                </Link>
                <Link href="/gallery" className="font-serif text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Gallery
                </Link>
                <Link href="/contact" className="font-serif text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
