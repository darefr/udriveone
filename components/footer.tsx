import Link from 'next/link'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { Brand } from './brand'
import { business, fleet } from '@/lib/rental-data'

export function CTA() {
  return (
    <section className="booking-cta">
      <div className="wrap cta-inner">
        <div>
          <p className="eyebrow">YOUR NEXT JOURNEY</p>
          <h2>Ready to explore Nepal?</h2>
        </div>
        <div className="action-row">
          <Link href="/booking" className="action primary">
            Book Your Car <ArrowRight size={17} />
          </Link>
          <Link href="/contact" className="action light-outline">
            Contact U Drive <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  )
}
export { FloatingContact } from './floating-contact'

export function Footer() {
  const groups = [
    {
      title: 'Our fleet',
      links: fleet.map((v) => [v.name, `/fleet/${v.slug}`]),
    },
    {
      title: 'Explore',
      links: [
        ['Self Drive', '/self-drive'],
        ['With Driver', '/with-driver'],
        ['Destinations', '/destinations'],
        ['How It Works', '/how-it-works'],
      ],
    },
    {
      title: 'U Drive',
      links: [
        ['About Us', '/about'],
        ['Reviews', '/reviews'],
        ['FAQs', '/faq'],
        ['Contact', '/contact'],
      ],
    },
    {
      title: 'Your journey',
      links: [
        ['Book a Car', '/booking'],
        ['View Fleet', '/fleet'],
        ['Sign In', '/sign-in'],
        ['Create Account', '/create-account'],
      ],
    },
  ]
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>{business.description}</p>
            <span className="inline-icon">
              <MapPin size={15} />
              Kathmandu, Nepal
            </span>
          </div>
          {groups.map((g) => (
            <nav
              className="footer-column"
              key={g.title}
              aria-label={`${g.title} footer links`}
            >
              <h3>{g.title}</h3>
              {g.links.map(([name, url]) => (
                <Link key={url} href={url}>
                  {name}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} U Drive Car Rental Kathmandu.
          </span>
          <span>Based in Kathmandu. Built for Nepal.</span>
        </div>
      </div>
    </footer>
  )
}
