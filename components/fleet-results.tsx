'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarDays, MapPin, SlidersHorizontal } from 'lucide-react'
import { fleet, modeLabel } from '@/lib/rental-data'
import { displayDate, type Trip } from '@/lib/trip'
import { VehicleCard } from './vehicle-card'

export function FleetResults({
  trip,
  searched,
}: {
  trip: Trip
  searched: boolean
}) {
  const [sort, setSort] = useState('featured')
  const cars = fleet.filter((v) => !trip.vehicle || v.slug === trip.vehicle)
  if (sort !== 'featured')
    cars.sort((a, b) =>
      sort === 'low' ? a.dailyRate - b.dailyRate : b.dailyRate - a.dailyRate,
    )
  return (
    <section className="content-section">
      <div className="wrap">
        <div className="results-toolbar">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>
              {searched ? 'Your matching vehicles' : 'Explore our vehicles'}
            </h2>
          </div>
          <label className="sort-control">
            <SlidersHorizontal size={15} />
            <span className="sr-only">Sort vehicles</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured first</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
        <div className="result-context">
          <span>
            {cars.length} {cars.length === 1 ? 'vehicle' : 'vehicles'}
          </span>
          {searched && (
            <>
              <span className="inline-icon">
                <MapPin size={13} />
                {trip.pickup}
              </span>
              <span>{modeLabel(trip.mode)}</span>
              {trip.start && trip.end && (
                <span className="inline-icon">
                  <CalendarDays size={13} />
                  {displayDate(trip.start)} – {displayDate(trip.end)}
                </span>
              )}
              <Link href="/fleet">Clear search</Link>
            </>
          )}
        </div>
        <div className="fleet-grid">
          {cars.map((v) => (
            <VehicleCard vehicle={v} key={v.slug} trip={trip} />
          ))}
        </div>
        <p className="fine-print">
          Published daily vehicle rates. Availability, driver service, and
          delivery are confirmed for your itinerary.
        </p>
      </div>
    </section>
  )
}
