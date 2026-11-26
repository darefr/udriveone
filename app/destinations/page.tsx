import type { Metadata } from 'next'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/shared'
import { DestinationBrowser } from '@/components/destination-browser'
import { CTA } from '@/components/footer'
export const metadata: Metadata = {
  title: 'Destinations — The Nepal Roadbook',
  description:
    'Explore Kathmandu, Pokhara, Nagarkot, and Chitwan with a U Drive rental. Find trip ideas and plan your route through Nepal.',
}
export default function DestinationsPage() {
  return (
    <>
      <section className="photo-banner">
        <Image
          src="/images/showcase-byd-atto-3.webp"
          alt="A BYD Atto 3 on an open road through the Nepal foothills"
          fill
          priority
          sizes="100vw"
        />
        <div className="banner-scrim" />
        <div className="wrap">
          <Breadcrumbs items={[{ label: 'Destinations' }]} />
          <p className="eyebrow">THE U DRIVE ROADBOOK</p>
          <h1>Your car. Your route. Your Nepal.</h1>
          <p>
            From Kathmandu streets to open ridge roads.
            <br />
            Choose a route for your next rental.
          </p>
        </div>
      </section>
      <DestinationBrowser />
      <CTA />
    </>
  )
}
