'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronDown, Sparkles, X } from 'lucide-react'
import { fleet, money, whatsAppContact } from '@/lib/rental-data'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from './ui/popover'

export function FloatingContact() {
  const pathname = usePathname()
  const [greeting, setGreeting] = useState(true)
  const [open, setOpen] = useState(false)
  const dock = useRef<HTMLElement>(null)
  useEffect(() => {
    setOpen(false)
  }, [pathname])
  useEffect(() => {
    const el = dock.current
    if (!el) return
    const search =
      pathname === '/' ? document.querySelector('.hero-search') : null
    let frame = 0
    const place = () => {
      frame = 0
      const rect = search?.getBoundingClientRect()
      const height = window.innerHeight
      const lift =
        rect &&
        window.innerWidth <= 640 &&
        rect.top > 155 &&
        rect.top < height &&
        rect.bottom > height - el.offsetHeight - 26
      el.style.setProperty(
        '--support-lift',
        lift && rect ? `${Math.round(height - rect.top + 8)}px` : '0px',
      )
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(place)
    }
    const quietOnInteraction = (event: Event) => {
      if (!(event.target instanceof Node) || !el.contains(event.target))
        setGreeting(false)
    }
    place()
    const observer = search ? new ResizeObserver(schedule) : null
    if (search) observer?.observe(search)
    window.addEventListener('resize', schedule)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('scroll', quietOnInteraction, {
      passive: true,
      once: true,
    })
    document.addEventListener('focusin', quietOnInteraction, { once: true })
    return () => {
      observer?.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('scroll', quietOnInteraction)
      document.removeEventListener('focusin', quietOnInteraction)
    }
  }, [pathname])
  const toggle = (value: boolean) => {
    setOpen(value)
    setGreeting(false)
  }

  return (
    <aside
      ref={dock}
      className="support-dock"
      aria-label="U Drive rental support"
    >
      <div className="assistant-anchor">
        {greeting && (
          <div className="assistant-greeting">
            <button type="button" onClick={() => toggle(true)}>
              Hi! How can I help you?
            </button>
            <button
              type="button"
              aria-label="Dismiss assistant greeting"
              onClick={() => setGreeting(false)}
            >
              <X size={12} />
            </button>
          </div>
        )}
        <Popover open={open} onOpenChange={toggle}>
          <PopoverTrigger
            type="button"
            className="support-button assistant-button"
            aria-label={
              open ? 'Minimize U Drive assistant' : 'Open U Drive AI assistant'
            }
            title="U Drive assistant"
          >
            {open ? <ChevronDown size={21} /> : <Sparkles size={21} />}
          </PopoverTrigger>
          <PopoverContent
            align="end"
            side="top"
            sideOffset={10}
            className="assistant-panel"
            aria-label="U Drive rental assistant"
          >
            <PopoverHeader className="assistant-heading">
              <span className="assistant-heading-icon">
                <Sparkles size={17} />
              </span>
              <div>
                <PopoverTitle>U Drive assistant</PopoverTitle>
                <p>Rental help</p>
              </div>
              <button
                type="button"
                className="assistant-minimize"
                aria-label="Minimize assistant"
                onClick={() => toggle(false)}
              >
                <X size={16} />
              </button>
            </PopoverHeader>
            <div className="assistant-guide">
              <p>What would you like to know?</p>
              <details name="rental-help">
                <summary>
                  Fleet and daily rates <ChevronDown size={15} />
                </summary>
                <dl>
                  {fleet.map((v) => (
                    <div key={v.slug}>
                      <dt>
                        <Link href={`/fleet/${v.slug}`}>{v.name}</Link>
                      </dt>
                      <dd>{money(v.dailyRate)} / day</dd>
                    </div>
                  ))}
                </dl>
                <Link className="text-link" href="/fleet">
                  Compare the cars <ArrowRight size={13} />
                </Link>
              </details>
              <details name="rental-help">
                <summary>
                  Self drive or with a driver? <ChevronDown size={15} />
                </summary>
                <p>
                  Take the wheel with Self Drive, or request a chauffeur with
                  With Driver. The team confirms driver charges separately from
                  the listed car rate.
                </p>
                <Link className="text-link" href="/rental-options">
                  Compare rental options <ArrowRight size={13} />
                </Link>
              </details>
              <details name="rental-help">
                <summary>
                  Pickup and delivery <ChevronDown size={15} />
                </summary>
                <p>
                  Start in Kathmandu or request delivery elsewhere in Nepal. The
                  team confirms access, timing, and any delivery charge for your
                  route.
                </p>
                <Link className="text-link" href="/booking">
                  Plan your rental <ArrowRight size={13} />
                </Link>
              </details>
              <p className="assistant-disclosure">
                Rental guide mode. Live AI chat is not connected.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <a
        className="support-button whatsapp-button"
        href={whatsAppContact.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={whatsAppContact.label}
        title={whatsAppContact.label}
      >
        <img src="/images/whatsapp.svg" alt="" width={25} height={25} />
      </a>
    </aside>
  )
}
