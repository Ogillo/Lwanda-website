import Link from "next/link"
import { Facebook, Tiktok, Youtube } from "@/components/icons"

export function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Organization Info */}
          <div className="w-full">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">KE</span>
              </div>
              <div className="text-center">
                <div className="font-sans font-semibold text-foreground">KE 258 Lwanda CYDC</div>
                <div className="font-serif text-sm text-muted-foreground">Child Youth Development Centre</div>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Tiktok className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-sm text-muted-foreground">
            © 2025 KE 258 Lwanda Child Youth Development Centre. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="font-serif text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-serif text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/safeguarding" className="font-serif text-sm text-muted-foreground hover:text-primary">
              Safeguarding
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
