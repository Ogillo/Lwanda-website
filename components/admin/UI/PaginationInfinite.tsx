"use client"
import { useEffect } from "react"

export default function PaginationInfinite({ onLoadMore }: { onLoadMore: () => void }) {
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) onLoadMore()
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [onLoadMore])
  return null
}

