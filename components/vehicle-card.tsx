import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, UserRound } from 'lucide-react'
import { money, type Vehicle } from '@/lib/rental-data'
import { tripHref, type Trip } from '@/lib/trip'
import { Wheel } from './brand'

export function VehicleCard({
  vehicle,
  trip = {},
}: {
  vehicle: Vehicle
  trip?: Partial<Trip>
}) {
  const details = tripHref(`/fleet/${vehicle.slug}`, trip)
  return (
    <article className="vehicle-card">
      <Link
        href={details}
        className="vehicle-photo"
        aria-label={`View ${vehicle.name} details`}
      >
        <Image
          src={vehicle.image}
          alt={`${vehicle.name}, front three-quarter exterior view`}
          width={508}
          height={508}
          sizes="(max-width: 640px) 80vw, (max-width: 950px) 44vw, 24vw"
        />
        <span className="image-open">
          <ArrowUpRight size={16} />
        </span>
      </Link>
      <div className="vehicle-content">
        <h3>
          <Link href={details}>{vehicle.name}</Link>
        </h3>
        <div className="vehicle-modes">
          <span>
            <Wheel size={14} />
            Self Drive
          </span>
          <i />
          <span>
            <UserRound size={14} />
            With Driver
          </span>
        </div>
        <p className="car-price">
          <strong>{money(vehicle.dailyRate)}</strong>
          <span> / day</span>
        </p>
        <div className="vehicle-actions">
          <Link href={details} className="text-link">
            View Details
            <ArrowRight size={14} />
          </Link>
          <Link
            className="small-book"
            href={tripHref('/booking', { ...trip, vehicle: vehicle.slug })}
          >
            Rent This Car
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  )
}
