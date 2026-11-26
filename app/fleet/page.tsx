import type { Metadata } from 'next'
import { PageIntro } from '@/components/shared'
import { RentalSearch } from '@/components/rental-search'
import { FleetResults } from '@/components/fleet-results'
import { CTA } from '@/components/footer'
import { readTrip, type Query } from '@/lib/trip'

export const metadata: Metadata = {
  title: 'Our Fleet & Daily Rental Rates',
  description:
    'Compare the Deepal S05, BYD Atto 3, Tata Nexon, and BYD Atto 1. Explore daily rental prices, self drive, and chauffeur options in Nepal.',
}
export default async function FleetPage({
  searchParams,
}: {
  searchParams: Promise<Query>
}) {
  const query = await searchParams
  const trip = readTrip(query)
  return (
    <>
      <PageIntro
        current="Fleet"
        eyebrow="U DRIVE COLLECTION"
        title="The U Drive fleet."
        description="Four distinctive vehicles, transparent daily rates, and the freedom to choose how you travel."
      />
      <div className="catalogue-search">
        <div className="wrap">
          <RentalSearch key={JSON.stringify(trip)} initial={trip} />
        </div>
      </div>
      <FleetResults trip={trip} searched={Object.keys(query).length > 0} />
      <CTA />
    </>
  )
}
