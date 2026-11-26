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
          src="/images/pokhara.webp"
          alt="Colorful boats on Phewa Lake, Pokhara"
          fill
          priority
          sizes="100vw"
        />
        <div className="banner-scrim" />
        <div className="wrap">
          <Breadcrumbs items={[{ label: 'Destinations' }]} />
          <p className="eyebrow">DESTINATION COLLECTION</p>
          <h1>The Nepal roadbook.</h1>
          <p>
            City courtyards, quiet lakes, and mountain horizons.
            <br />
            Find a destination worth the drive.
          </p>
        </div>
      </section>
      <DestinationBrowser />
      <CTA />
    </>
  )
}
