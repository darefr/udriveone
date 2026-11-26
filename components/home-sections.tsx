import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, MapPin } from 'lucide-react'
import { destinations, fleet, journeySteps } from '@/lib/rental-data'
import { SectionHeading } from './shared'
import { VehicleCard } from './vehicle-card'
import { DestinationCard } from './destination-card'
import { Stats } from './stats'

export function FeaturedFleet() {
  return (
    <section className="section featured-section">
      <div className="wrap">
        <SectionHeading
          eyebrow="OUR FLEET"
          title="Find your kind of drive."
          href="/fleet"
          linkText="View full fleet"
        />
        <div
          className="fleet-grid home-fleet"
          aria-label="Featured rental vehicles"
        >
          {fleet.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} />
          ))}
        </div>
        <p className="swipe-hint">
          Swipe to explore all four vehicles <ArrowRight size={13} />
        </p>
      </div>
    </section>
  )
}
export function ExploreNepal() {
  return (
    <section className="section surface">
      <div className="wrap">
        <SectionHeading
          eyebrow="THE NEPAL ROADBOOK"
          title="Where will the road take you?"
          description="From valley streets to lakeside escapes. Discover Nepal by car."
          href="/destinations"
          linkText="All destinations"
        />
        <div className="destination-grid">
          {destinations.slice(0, 3).map((d) => (
            <DestinationCard destination={d} key={d.slug} />
          ))}
        </div>
      </div>
    </section>
  )
}
export function RentalExperiences() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading
          eyebrow="RENTAL OPTIONS"
          title="Two ways to take the road."
          description="Choose the experience that suits your journey."
        />
        <div className="experience-grid">
          {[
            {
              slug: 'self-drive',
              title: 'Self Drive',
              copy: 'Your playlist. Your stops. Your way.',
            },
            {
              slug: 'with-driver',
              title: 'With Driver',
              copy: 'Take in the views. Leave the driving to us.',
            },
          ].map((s) => (
            <Link
              className={`experience-tile experience-${s.slug}`}
              key={s.slug}
              href={`/${s.slug}`}
            >
              <Image
                src={`/images/${s.slug}.webp`}
                alt={
                  s.slug === 'self-drive'
                    ? 'A driver taking a winding road through the hills'
                    : 'A chauffeur beside a silver vehicle'
                }
                width={508}
                height={1024}
                sizes="(max-width:640px) 90vw, 46vw"
              />
              <div className="experience-shade" />
              <div className="experience-caption">
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
                <span>
                  Discover {s.title.toLowerCase()} <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
export function HowItWorks() {
  return (
    <section className="section timeline-section">
      <div className="wrap">
        <SectionHeading
          eyebrow="HOW IT WORKS"
          title="From first click to open road."
          href="/how-it-works"
          linkText="Read the guide"
        />
        <ol className="timeline">
          {journeySteps.map((s, i) => (
            <li key={s.title}>
              <span className="step-number">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{s.title}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
export function StorySection({ full = false }: { full?: boolean }) {
  return (
    <section className="section">
      <div className="wrap story-layout">
        <figure className="story-photo">
          <Image
            src="/images/nagarkot.webp"
            alt="Terraced hills and the Himalayan skyline in Nepal"
            width={508}
            height={508}
            sizes="(max-width:800px) 90vw, 44vw"
          />
          <figcaption>
            <MapPin size={14} />
            Nagarkot, Nepal
          </figcaption>
        </figure>
        <div className="story-copy">
          <p className="eyebrow">{full ? 'OUR PHILOSOPHY' : 'ABOUT U DRIVE'}</p>
          <h2>
            Rooted in Kathmandu.
            <br />
            Ready for Nepal.
          </h2>
          <p>
            There is more than one way to see Nepal. U Drive brings together a
            focused fleet and two rental options, so the vehicle fits your
            journey—not the other way around.
          </p>
          <p>
            Start in Kathmandu, choose your car, and plan the pickup or delivery
            that works for you.
          </p>
          {full ? (
            <div className="check-list">
              <span>
                <Check />A clearly listed daily rate
              </span>
              <span>
                <Check />
                Self drive or with a driver
              </span>
              <span>
                <Check />
                Service across Nepal
              </span>
            </div>
          ) : (
            <Link className="text-link" href="/about">
              The U Drive story <ArrowRight size={16} />
            </Link>
          )}
          <Stats />
        </div>
      </div>
    </section>
  )
}
