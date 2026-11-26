import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AboutPage, RentalGuide, ReviewsPage } from '@/components/company-pages'
import { RentalOptionPage, RentalComparison } from '@/components/rental-options'
import { FAQPage } from '@/components/faq-browser'

const pages: Record<string, { title: string; description: string }> = {
  about: {
    title: 'About U Drive',
    description:
      'Meet U Drive Car Rental Kathmandu: four distinct vehicles, two rental modes, and service across Nepal.',
  },
  'how-it-works': {
    title: 'How Car Rental Works',
    description:
      'Plan your U Drive rental in six clear steps, from choosing a vehicle to confirming pickup or delivery.',
  },
  reviews: {
    title: 'Traveller Reviews',
    description:
      'Explore the U Drive review experience. Sample reviews are clearly labelled until verified traveller feedback is supplied.',
  },
  'self-drive': {
    title: 'Self Drive Car Rental',
    description:
      'Explore Nepal at your own pace. Compare four self-drive rental vehicles and prepare your trip from Kathmandu.',
  },
  'with-driver': {
    title: 'Car Rental With Driver',
    description:
      'Choose a vehicle with a driver for your Nepal itinerary. Plan stops, dates, and pickup with U Drive Kathmandu.',
  },
  'rental-options': {
    title: 'Compare Rental Options',
    description:
      'Compare Self Drive and With Driver rentals, vehicle selection, pricing, and pickup options.',
  },
  faq: {
    title: 'Frequently Asked Questions',
    description:
      'Answers about rental prices, self-drive options, chauffeur service, vehicle delivery, and booking in Nepal.',
  },
}
export const generateStaticParams = () =>
  Object.keys(pages).map((section) => ({ section }))
export const dynamicParams = false
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>
}): Promise<Metadata> {
  return pages[(await params).section] ?? { title: 'Page not found' }
}
export default async function InformationPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params
  switch (section) {
    case 'about':
      return <AboutPage />
    case 'how-it-works':
      return <RentalGuide />
    case 'reviews':
      return <ReviewsPage />
    case 'self-drive':
    case 'with-driver':
      return <RentalOptionPage mode={section} />
    case 'rental-options':
      return <RentalComparison />
    case 'faq':
      return <FAQPage />
    default:
      notFound()
  }
}
