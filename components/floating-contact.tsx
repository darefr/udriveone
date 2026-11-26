'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FloatingContact() {
  const pathname = usePathname()
  const [pastSearch, setPastSearch] = useState(false)
  useEffect(() => {
    const panel = document.querySelector('.hero-search')
    if (pathname !== '/' || !panel) return
    const observer = new IntersectionObserver(([entry]) => {
      setPastSearch(entry.boundingClientRect.bottom < 0)
    })
    observer.observe(panel)
    return () => observer.disconnect()
  }, [pathname])
  if (
    [
      '/booking',
      '/contact',
      '/sign-in',
      '/create-account',
      '/forgot-password',
    ].includes(pathname)
  )
    return null
  return (
    <Link
      href="/contact"
      className={cn(
        'floating-contact',
        pathname === '/' && !pastSearch && 'contact-after-search',
      )}
      aria-label="Contact U Drive"
      title="Contact U Drive"
    >
      <MessageCircle size={22} />
    </Link>
  )
}
