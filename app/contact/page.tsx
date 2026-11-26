import type { Metadata } from 'next'
import { PageIntro } from '@/components/shared'
import { ContactForm } from '@/components/contact-form'
import { getVehicle } from '@/lib/rental-data'
import { type Query } from '@/lib/trip'
export const metadata: Metadata = {
  title: 'Contact U Drive',
  description:
    'Plan a rental enquiry with U Drive Car Rental Kathmandu. Ask about the fleet, rental options, and pickup or delivery across Nepal.',
}
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Query>
}) {
  const { vehicle } = await searchParams
  const car = getVehicle(typeof vehicle === 'string' ? vehicle : undefined)
  return (
    <>
      <PageIntro
        current="Contact"
        eyebrow="CONTACT U DRIVE"
        title="Let’s talk about your trip."
        description="Have a vehicle in mind, an unusual route, or a question about delivery? Start with the details below."
      />
      <ContactForm vehicle={car?.name} />
    </>
  )
}
