import { Hero, ValueStrip } from '@/components/hero'
import { StructuredData } from '@/components/structured-data'
import {
  FeaturedFleet,
  ExploreNepal,
  RentalExperiences,
  HowItWorks,
  StorySection,
} from '@/components/home-sections'
import { ReviewCarousel } from '@/components/review-carousel'
import { CTA } from '@/components/footer'

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <ValueStrip />
      <FeaturedFleet />
      <ExploreNepal />
      <RentalExperiences />
      <HowItWorks />
      <StorySection />
      <ReviewCarousel />
      <CTA />
    </>
  )
}
