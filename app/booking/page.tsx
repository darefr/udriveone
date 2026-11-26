import type { Metadata } from 'next'
import { BookingForm } from '@/components/booking-form'
import { PageIntro } from '@/components/shared'
import { destinations } from '@/lib/rental-data'
import { readTrip, type Query } from '@/lib/trip'
export const metadata: Metadata = {
  title: 'Plan Your Booking',
  description:
    'Choose your vehicle, rental mode, pickup location, and dates. Calculate your daily rental estimate and prepare your U Drive booking request.',
}
export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<Query>
}) {
  const query = await searchParams
  const initial = readTrip(query)
  const destination = destinations.find(
    (d) => d.slug === query.destination,
  )?.name
  return (
    <>
      <PageIntro
        current="Booking"
        eyebrow="PLAN YOUR RENTAL"
        title="Your next journey starts here."
        description="Choose your car and dates, check the estimate, then review your booking request. No account needed."
      />
      <BookingForm
        key={JSON.stringify([initial, destination])}
        initial={initial}
        destination={destination}
      />
    </>
  )
}
