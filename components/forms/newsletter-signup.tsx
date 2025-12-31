"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Check } from "@/components/icons"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h2 className="font-sans text-3xl font-bold text-foreground mb-4">Stay Connected</h2>
          <p className="font-serif text-muted-foreground mb-8">
            Get updates on our programs, success stories, and ways to make a difference in children's lives.
          </p>

          {isSubmitted ? (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-[16px] p-4 justify-center">
              <Check className="w-5 h-5 text-green-600" />
              <p className="font-serif text-green-700">Thank you for subscribing! Check your email to confirm.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border rounded-[10px] bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <Button type="submit" className="bg-primary text-primary-foreground">
                Subscribe
              </Button>
            </form>
          )}

          <p className="font-serif text-xs text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
