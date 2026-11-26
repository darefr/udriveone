'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  MapPin,
  Menu,
  MountainSnow,
  UserRound,
  X,
} from 'lucide-react'
import { Brand } from './brand'
import { navLinks } from '@/lib/rental-data'
import { cn } from '@/lib/utils'

function MobileMenu({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const pathname = usePathname()
  useEffect(() => {
    const d = dialog.current
    d?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
      d?.close()
    }
  }, [])
  return (
    <dialog
      ref={dialog}
      className="mobile-drawer"
      aria-labelledby="mobile-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose()
      }}
    >
      <div className="drawer-content">
        <div className="drawer-head">
          <Brand onNavigate={onClose} />
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X />
          </button>
        </div>
        <h2 id="mobile-title" className="sr-only">
          Main navigation
        </h2>
        <nav className="mobile-links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              onClick={onClose}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
              <ArrowUpRight size={17} />
            </Link>
          ))}
          <div className="mobile-rental-links">
            <Link href="/self-drive" onClick={onClose}>
              Self Drive
            </Link>
            <Link href="/with-driver" onClick={onClose}>
              With Driver
            </Link>
          </div>
        </nav>
        <div className="drawer-account" aria-label="Your U Drive account">
          <Link onClick={onClose} href="/sign-in" className="action primary">
            <UserRound size={16} />
            Sign In
          </Link>
          <Link
            onClick={onClose}
            href="/create-account"
            className="action outline"
          >
            Create Account <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </dialog>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [mobile, setMobile] = useState(false)
  const [rental, setRental] = useState(false)
  const menuTrigger = useRef<HTMLButtonElement>(null)
  const closeMobile = () => {
    setMobile(false)
    requestAnimationFrame(() => menuTrigger.current?.focus())
  }
  const trigger = useRef<HTMLButtonElement>(null)
  const drop = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!rental) return
    const outside = (e: PointerEvent) => {
      if (!drop.current?.contains(e.target as Node)) setRental(false)
    }
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setRental(false)
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [rental])
  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="wrap utility-inner">
          <span>
            <MapPin size={13} /> Kathmandu, Nepal{' '}
            <span className="utility-div" /> <span>Nepal-wide service</span>
          </span>
          <div className="utility-right">
            <MountainSnow size={15} />
            <span>From the valley to the mountains</span>
            <span className="utility-div" />
            <Link href="/faq">
              <CircleHelp size={13} /> FAQs
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-wrap">
        <div className="wrap nav-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.href === '/rental-options' ? (
                <div
                  className="rental-nav"
                  key={link.href}
                  ref={drop}
                  onBlur={(e) => {
                    if (
                      !e.currentTarget.contains(e.relatedTarget as Node | null)
                    )
                      setRental(false)
                  }}
                >
                  <button
                    ref={trigger}
                    onClick={() => setRental(!rental)}
                    aria-expanded={rental}
                    aria-controls="rental-navigation"
                    className={cn(
                      'nav-item',
                      [
                        '/self-drive',
                        '/with-driver',
                        '/rental-options',
                      ].includes(pathname) && 'active',
                    )}
                  >
                    Rental Options
                    <ChevronDown size={13} />
                  </button>
                  {rental && (
                    <div className="nav-dropdown" id="rental-navigation">
                      {[
                        ['/self-drive', 'Self Drive'],
                        ['/with-driver', 'With Driver'],
                        ['/rental-options', 'Compare options'],
                      ].map(([url, label]) => (
                        <Link
                          key={url}
                          href={url}
                          onClick={() => setRental(false)}
                        >
                          {label}
                          <ArrowUpRight size={15} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  className={cn(
                    'nav-item',
                    (link.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(link.href)) && 'active',
                  )}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  key={link.href}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
          <div className="nav-actions">
            <Link className="sign-in-link" href="/sign-in">
              <UserRound size={16} />
              Sign In
            </Link>
            <Link className="action primary nav-book" href="/booking">
              Rent Now
              <ArrowUpRight size={16} />
            </Link>
            <button
              ref={menuTrigger}
              className="icon-button menu-button"
              aria-label="Open navigation"
              aria-expanded={mobile}
              onClick={() => setMobile(true)}
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </div>
      {mobile && <MobileMenu onClose={closeMobile} />}
    </header>
  )
}
