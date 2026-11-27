'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { demoReviews, modeLabel, type Review } from '@/lib/rental-data'
import { useInteractive } from '@/lib/use-interactive'

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className="review-card"
      aria-label={`Illustrative traveller story from ${review.name}`}
    >
      <div className="review-top">
        <span
          className="stars"
          role="img"
          aria-label={`${review.rating} out of 5 stars, illustrative rating`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={14}
              aria-hidden="true"
              fill={i < review.rating ? 'currentColor' : 'none'}
            />
          ))}
        </span>
        <span className="sample-tag">Sample story</span>
      </div>
      <blockquote>{`“${review.text}”`}</blockquote>
      <div className="review-author">
        <span className="review-avatar" aria-hidden="true">
          {review.avatar ? (
            <Image src={review.avatar} alt="" width={40} height={40} />
          ) : (
            review.name
              .split(' ')
              .map((part) => part[0])
              .join('')
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
  const rail = useRef<HTMLDivElement>(null)
  const ready = useInteractive()
  const change = (by: number) => {
    const track = rail.current
    if (!track) return
    const target = track.children[
      (index + by + demoReviews.length) % demoReviews.length
    ] as HTMLElement
    track.scrollTo({
      left: target.offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }
  return (
    <section className="section review-section" aria-label="Traveller stories">
      <div className="wrap">
        <div className="section-heading review-heading">
          <div>
            <p className="eyebrow">TRAVELLER NOTES</p>
            <h2>
              {standalone
                ? 'A closer look at the experience.'
                : 'From the passenger seat.'}
            </h2>
            <p className="section-description">
              Illustrative stories from three different kinds of rental. Not
              verified reviews.
            </p>
          </div>
          {!standalone && (
            <Link className="text-link" href="/reviews">
              All reviews <ArrowRight size={15} />
            </Link>
          )}
        </div>
        <div
          className="review-rail"
          ref={rail}
          role="region"
          aria-label="Traveller story carousel"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
              e.preventDefault()
              change(e.key === 'ArrowRight' ? 1 : -1)
            }
          }}
          onScroll={(e) => {
            const el = e.currentTarget
            const cards = Array.from(el.children) as HTMLElement[]
            const last = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2
            setIndex(
              last
                ? cards.length - 1
                : cards.reduce(
                    (best, c, i) =>
                      Math.abs(c.offsetLeft - el.scrollLeft) <
                      Math.abs(cards[best].offsetLeft - el.scrollLeft)
                        ? i
                        : best,
                    0,
                  ),
            )
          }}
        >
          {demoReviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
        <div className="carousel-controls review-rail-controls">
          <button
            type="button"
            className="icon-button"
            disabled={!ready}
            aria-label="Previous review"
            onClick={() => change(-1)}
          >
            <ArrowLeft size={16} />
          </button>
          <span aria-live="polite">
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(demoReviews.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            className="icon-button"
            disabled={!ready}
            aria-label="Next review"
            onClick={() => change(1)}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
