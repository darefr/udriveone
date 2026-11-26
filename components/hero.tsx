import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  MountainSnow,
  UserRoundCheck,
} from 'lucide-react'
import { Wheel } from './brand'
import { RentalSearch } from './rental-search'

export function Hero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <picture className="hero-photo">
          <source
            media="(max-width: 640px)"
            srcSet="/images/himalayan-drive-mobile.webp"
          />
          <img
            src="/images/himalayan-drive.webp"
            alt="A silver Deepal crossover on a winding road beneath Himalayan peaks"
            fetchPriority="high"
            width="1250"
            height="500"
          />
        </picture>
        <div className="hero-shade" />
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">CAR RENTAL IN KATHMANDU</p>
            <h1 id="hero-title">
              Your journey.
              <br />
              Your car. <em>Your Nepal.</em>
            </h1>
            <p className="hero-description">
              Premium car rentals from Kathmandu to all of Nepal.
              <br className="desktop-break" /> Take the wheel, or let us do the
              driving.
            </p>
            <div className="action-row">
              <Link href="/booking" className="action primary">
                Book a Car <ArrowRight size={17} />
              </Link>
              <Link href="/fleet" className="action light-outline">
                Explore Fleet
              </Link>
            </div>
          </div>
          <Link href="/fleet/deepal-s05" className="hero-vehicle">
            <span />
            Deepal S05 <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
      <div className="wrap hero-search">
        <RentalSearch />
      </div>
    </>
  )
}
export function ValueStrip() {
  const values = [
    {
      title: 'Self Drive',
      text: 'Your route, your pace',
      icon: <Wheel size={29} />,
      href: '/self-drive',
    },
    {
      title: 'With Driver',
      text: 'Sit back and enjoy',
      icon: <UserRoundCheck />,
      href: '/with-driver',
    },
    {
      title: 'Kathmandu Based',
      text: 'Your local starting point',
      icon: <MapPin />,
      href: '/about',
    },
    {
      title: 'Nepal-Wide Service',
      text: 'Beyond the city limits',
      icon: <MountainSnow />,
      href: '/destinations',
    },
  ]
  return (
    <section className="value-strip" aria-label="Rental services and coverage">
      <div className="wrap value-grid">
        {values.map((v) => (
          <Link key={v.title} href={v.href} className="value-item">
            <span className="value-icon">{v.icon}</span>
            <span>
              <strong>{v.title}</strong>
              <small>{v.text}</small>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
