'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Star, UserRound } from 'lucide-react'
import { demoReviews, modeLabel, type Review } from '@/lib/rental-data'

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card">
      <div className="review-top">
        <span
          className="stars"
          aria-label={`${review.rating} out of 5 stars, illustrative rating`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={15}
              fill={i < review.rating ? 'currentColor' : 'none'}
            />
          ))}
        </span>
        <span className="sample-tag">Sample review</span>
      </div>
      <blockquote>{`“${review.text}”`}</blockquote>
      <div className="review-author">
        <span className="review-avatar">
          {review.avatar ? (
            <Image src={review.avatar} alt="" width={40} height={40} />
          ) : (
            <UserRound size={20} />
          )}
        </span>
        <div>
          <strong>{review.name}</strong>
          <p>
            {modeLabel(review.rentalType)}
            <span>·</span>
            {review.vehicle}
          </p>
        </div>
      </div>
    </article>
  )
}
export function ReviewCarousel({
  standalone = false,
}: {
  standalone?: boolean
}) {
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  const change = (by: number) =>
    setIndex((i) => (i + by + demoReviews.length) % demoReviews.length)
  return (
    <section className="section review-section">
      <div className="wrap review-layout">
        <div className="review-intro">
          <p className="eyebrow">TRAVELLER NOTES</p>
          <h2>
            {standalone
              ? 'A closer look at the experience.'
              : 'From the passenger seat.'}
          </h2>
          <p>
            Our review collection is being prepared. These sample profiles
            illustrate how future customer stories will appear.
          </p>
          {!standalone && (
            <Link href="/reviews" className="text-link">
              Explore reviews <ArrowRight size={15} />
            </Link>
          )}
          <div className="carousel-controls">
            <button
              className="icon-button"
              disabled={!ready}
              aria-label="Previous review"
              onClick={() => change(-1)}
            >
              <ArrowLeft size={16} />
            </button>
            <span>
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(demoReviews.length).padStart(2, '0')}
            </span>
            <button
              className="icon-button"
              disabled={!ready}
              aria-label="Next review"
              onClick={() => change(1)}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <div
          aria-live="polite"
          aria-atomic="true"
          className="review-stage"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') change(-1)
            if (e.key === 'ArrowRight') change(1)
          }}
          tabIndex={0}
          role="region"
          aria-label="Illustrative customer reviews"
        >
          <ReviewCard key={index} review={demoReviews[index]} />
        </div>
      </div>
    </section>
  )
}
