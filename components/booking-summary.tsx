import Image from 'next/image'
import { CalendarDays, MapPin } from 'lucide-react'
import { modeLabel, money, type Vehicle } from '@/lib/rental-data'
import { daysBetween, displayDate, type Trip } from '@/lib/trip'

export function BookingSummary({
  vehicle,
  trip,
  delivery,
}: {
  vehicle: Vehicle
  trip: Trip
  delivery: string
}) {
  const days = daysBetween(trip.start, trip.end)
  return (
    <aside className="booking-summary" aria-labelledby="estimate-heading">
      <div className="summary-photo">
        <Image
          src={vehicle.image}
          loading="eager"
          alt={`${vehicle.name} rental vehicle`}
          width={508}
          height={508}
        />
        <span>YOUR SELECTED CAR</span>
      </div>
      <div className="summary-content">
        <p className="eyebrow">TRIP ESTIMATE</p>
        <h2 id="estimate-heading">{vehicle.name}</h2>
        <div className="summary-place">
          <MapPin size={14} />
          {trip.pickup}
        </div>
        <dl className="summary-lines">
          <div>
            <dt>Rental type</dt>
            <dd>{modeLabel(trip.mode)}</dd>
          </div>
          <div>
            <dt>Daily rate</dt>
            <dd>{money(vehicle.dailyRate)}</dd>
          </div>
          <div>
            <dt>Rental duration</dt>
            <dd>
              {days ? `${days} ${days === 1 ? 'day' : 'days'}` : 'Select dates'}
            </dd>
          </div>
          <div>
            <dt>Handover</dt>
            <dd>{delivery === 'delivery' ? 'Delivery requested' : 'Pickup'}</dd>
          </div>
          {trip.mode === 'with-driver' && (
            <div>
              <dt>Driver service</dt>
              <dd>To be agreed</dd>
            </div>
          )}
        </dl>
        {trip.start && trip.end && (
          <p className="summary-dates">
            <CalendarDays size={14} />
            {displayDate(trip.start)} – {displayDate(trip.end)}
          </p>
        )}
        <div className="estimated-total" aria-live="polite">
          <span>Estimated base total</span>
          <strong>
            {days ? money(days * vehicle.dailyRate) : 'Select dates'}
          </strong>
        </div>
        <p className="fine-print">
          Vehicle rental only. Driver service, delivery, and other applicable
          charges are confirmed separately. This estimate is not a reservation.
        </p>
      </div>
    </aside>
  )
}
