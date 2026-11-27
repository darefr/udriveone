import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  CheckCheck,
  ClipboardList,
  KeyRound,
  MapPin,
  UserRoundCheck,
} from 'lucide-react'
import { journeySteps } from '@/lib/rental-data'
import { PageIntro } from './shared'
import { RentalPrinciples, StorySection } from './home-sections'
import { ReviewCarousel } from './review-carousel'
import { CTA } from './footer'

export function AboutPage() {
  return (
    <>
      <PageIntro
        current="About"
        eyebrow="ABOUT U DRIVE"
        title="A local start. An open road."
        description="U Drive Car Rental Kathmandu connects a modern vehicle collection with the freedom to explore Nepal your way."
      />
      <StorySection full />
      <RentalPrinciples />
      <CTA />
    </>
  )
}
export function RentalGuide() {
  const icons = [
    CarFront,
    UserRoundCheck,
    CalendarDays,
    ClipboardList,
    CheckCheck,
    KeyRound,
  ]
  return (
    <>
      <PageIntro
        current="How It Works"
        eyebrow="THE RENTAL GUIDE"
        title="Your journey, step by step."
        description="From comparing your first car to collecting the keys, here is how to plan a U Drive rental."
      />
      <section className="section">
        <div className="wrap guide-layout">
          <ol className="detailed-steps">
            {journeySteps.map((s, i) => {
              const Icon = icons[i]
              return (
                <li key={s.title}>
                  <span className="step-number">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <Icon size={19} />
                    <h2>{s.title}</h2>
                    <p>{s.text}</p>
                  </div>
                </li>
              )
            })}
          </ol>
          <aside className="guide-aside">
            <Image
              src="/images/deepal-s05.webp"
              alt="Silver Deepal S05 on a mountain road"
              width={508}
              height={508}
            />
            <div>
              <p className="eyebrow">BEFORE YOU START</p>
              <h3>Have a trip in mind?</h3>
              <p>
                Bring your dates, a pickup location, and a rough route. You can
                compare the vehicle estimate without an account.
              </p>
              <Link href="/booking" className="action primary">
                Plan your rental
                <ArrowRight size={16} />
              </Link>
              <p className="fine-print">
                Send your reviewed request on WhatsApp. The Kathmandu team
                confirms the car, final price, and handover with you.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <CTA />
    </>
  )
}
export function ReviewsPage() {
  return (
    <>
      <PageIntro
        current="Reviews"
        eyebrow="U DRIVE REVIEWS"
        title="Stories from the road."
        description="A space for traveller perspectives, with the vehicle and rental mode behind every story."
      />
      <ReviewCarousel standalone />
      <section className="section">
        <div className="wrap review-disclosure">
          <MapPin size={26} />
          <div>
            <h2>A note on our reviews.</h2>
            <p>
              The traveller profiles, ratings, and stories shown here are
              illustrative examples, not verified customer endorsements.
            </p>
            <Link href="/contact" className="text-link">
              Ask about a rental <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}
