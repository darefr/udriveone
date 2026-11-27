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
        description="Compare cars by body style, budget, and daily rate. Choose a vehicle that fits the way you want to see Nepal."
      />
      <div className="catalogue-search">
        <div className="wrap">
          <RentalSearch key={JSON.stringify(trip)} initial={trip} />
        </div>
      </div>
      <FleetResults
        key={JSON.stringify(trip)}
        trip={trip}
        searched={Object.keys(trip).some((key) => Boolean(query[key]))}
      />
      <CTA />
    </>
  )
}
