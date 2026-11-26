'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Download,
  FileCheck2,
  UserRound,
} from 'lucide-react'
import {
  fleet,
  getVehicle,
  money,
  modeLabel,
  pickupLocations,
  rentalModes,
  type RentalMode,
} from '@/lib/rental-data'
import {
  daysBetween,
  displayDate,
  downloadText,
  nextDay,
  todayInNepal,
  type Trip,
} from '@/lib/trip'
import { BookingSummary } from './booking-summary'
import { DatePicker } from './date-picker'
import { FormField, PreviewNote } from './form-parts'
import { FieldGroup, FieldLegend, FieldSet } from './ui/field'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Wheel } from './brand'

type Customer = {
  name: string
  email: string
  phone: string
  message: string
  address: string
}
export function BookingForm({
  initial,
  destination,
}: {
  initial: Trip
  destination?: string
}) {
  const [trip, setTrip] = useState<Trip>({
    ...initial,
    vehicle: initial.vehicle || fleet[0].slug,
  })
  const [delivery, setDelivery] = useState('pickup')
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    message: destination
      ? `I would like to plan a trip to ${destination}.`
      : '',
    address: '',
  })
  const [review, setReview] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const reviewHeading = useRef<HTMLHeadingElement>(null)
  const formHeading = useRef<HTMLHeadingElement>(null)
  useEffect(() => setReady(true), [])
  useEffect(() => {
    if (review) reviewHeading.current?.focus()
  }, [review])
  const v = getVehicle(trip.vehicle) ?? fleet[0]
  const days = daysBetween(trip.start, trip.end)
  const needsAddress =
    delivery === 'delivery' || trip.pickup === 'Other location in Nepal'
  const update = (key: keyof Trip, value: string) => {
    setTrip((old) => ({
      ...old,
      [key]: value,
      ...(key === 'start' && old.end <= value ? { end: '' } : {}),
    }))
    setError('')
  }
  const contact = (key: keyof Customer, value: string) => {
    setCustomer((old) => ({ ...old, [key]: value }))
    setError('')
  }
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!days || trip.start < todayInNepal()) {
      setError(
        'Select a pickup date from today onward and a later return date.',
      )
      return
    }
    if (customer.name.trim().length < 2) {
      setError('Enter a full name with at least two characters.')
      return
    }
    const digits = customer.phone.replace(/\D/g, '')
    if (
      digits.length < 7 ||
      digits.length > 15 ||
      /[^+\d\s()-]/.test(customer.phone)
    ) {
      setError(
        'Enter a phone number with 7–15 digits, including your country code if needed.',
      )
      return
    }
    if (needsAddress && customer.address.trim().length < 4) {
      setError('Add a meeting address or landmark for the handover.')
      return
    }
    setReview(true)
  }
  const rows = [
    ['Vehicle', v.name],
    ['Rental type', modeLabel(trip.mode)],
    ['Pickup location', trip.pickup],
    [
      'Handover',
      delivery === 'delivery'
        ? 'Delivery requested'
        : 'Pickup at an agreed point',
    ],
    ...(needsAddress ? [['Address / landmark', customer.address.trim()]] : []),
    ['Pickup date', displayDate(trip.start)],
    ['Return date', displayDate(trip.end)],
    ['Rental duration', `${days} ${days === 1 ? 'day' : 'days'}`],
    ['Daily rate', money(v.dailyRate)],
    ['Estimated base total', money(v.dailyRate * days)],
    ['Name', customer.name.trim()],
    ['Phone', customer.phone.trim()],
    ['Email', customer.email.trim()],
    ...(customer.message.trim()
      ? [['Additional message', customer.message.trim()]]
      : []),
  ]
  const download = () =>
    downloadText(
      'u-drive-booking-request.txt',
      [
        'U DRIVE CAR RENTAL KATHMANDU',
        'BOOKING REQUEST DRAFT — NOT SUBMITTED',
        '',
        ...rows.map(([k, val]) => `${k}: ${val}`),
        '',
        'Vehicle rate only. Driver, delivery, and other applicable charges are not included.',
        'This locally prepared request is not a confirmed reservation. Final availability, charges, and terms require confirmation from U Drive.',
      ].join('\n'),
    )
  return (
    <section className="section booking-section">
      <div className="wrap booking-layout">
        {review ? (
          <div className="request-review">
            <span className="review-file-icon">
              <FileCheck2 size={25} />
            </span>
            <p className="eyebrow">REQUEST PREVIEW</p>
            <h2 ref={reviewHeading} tabIndex={-1}>
              Your request is prepared.
            </h2>
            <p>
              Review the details below and download a copy. Nothing has been
              sent, and no vehicle has been reserved.
            </p>
            <dl className="review-details">
              {rows.map(([key, val]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{val}</dd>
                </div>
              ))}
            </dl>
            <div className="action-row">
              <button className="action primary" onClick={download}>
                <Download size={16} />
                Download request
              </button>
              <button
                className="action outline"
                onClick={() => {
                  setReview(false)
                  requestAnimationFrame(() => formHeading.current?.focus())
                }}
              >
                <ArrowLeft size={15} />
                Edit details
              </button>
            </div>
          </div>
        ) : (
          <form
            method="post"
            onSubmit={submit}
            className="booking-form"
            data-ready={ready}
          >
            <div className="form-section-heading">
              <span>01</span>
              <h2 ref={formHeading} tabIndex={-1}>
                Your rental details
              </h2>
            </div>
            <FieldGroup className="form-grid">
              <FormField id="booking-vehicle" label="Vehicle" wide>
                <select
                  id="booking-vehicle"
                  className="form-select"
                  value={trip.vehicle}
                  onChange={(e) => update('vehicle', e.target.value)}
                >
                  {fleet.map((c) => (
                    <option value={c.slug} key={c.slug}>
                      {c.name} — {money(c.dailyRate)} / day
                    </option>
                  ))}
                </select>
              </FormField>
              <FieldSet className="field-wide mode-group">
                <FieldLegend>Rental type</FieldLegend>
                <div className="mode-choices">
                  {rentalModes.map((m) => (
                    <label key={m.value}>
                      <input
                        type="radio"
                        name="rental-type"
                        value={m.value}
                        checked={trip.mode === m.value}
                        onChange={() => update('mode', m.value as RentalMode)}
                      />
                      {m.value === 'self-drive' ? (
                        <Wheel size={17} />
                      ) : (
                        <UserRound size={17} />
                      )}
                      <span>{m.label}</span>
                    </label>
                  ))}
                </div>
              </FieldSet>
              <FormField id="booking-pickup" label="Pickup location">
                <select
                  id="booking-pickup"
                  className="form-select"
                  value={trip.pickup}
                  onChange={(e) => update('pickup', e.target.value)}
                >
                  {pickupLocations.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </FormField>
              <FormField id="booking-handover" label="Delivery option">
                <select
                  id="booking-handover"
                  className="form-select"
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                >
                  <option value="pickup">Collect at agreed point</option>
                  <option value="delivery">Request delivery</option>
                </select>
              </FormField>
              {needsAddress && (
                <FormField
                  id="booking-address"
                  label="Address or meeting landmark"
                  wide
                >
                  <Input
                    id="booking-address"
                    required
                    maxLength={300}
                    value={customer.address}
                    onChange={(e) => contact('address', e.target.value)}
                    placeholder="Location, street, or nearby landmark"
                    autoComplete="off"
                  />
                </FormField>
              )}
              <FormField id="booking-start" label="Pickup date">
                <DatePicker
                  id="booking-start"
                  label="Pickup date"
                  min={todayInNepal()}
                  value={trip.start}
                  onChange={(value) => update('start', value)}
                />
              </FormField>
              <FormField id="booking-end" label="Return date">
                <DatePicker
                  id="booking-end"
                  label="Return date"
                  min={nextDay(trip.start || todayInNepal())}
                  value={trip.end}
                  onChange={(value) => update('end', value)}
                />
              </FormField>
            </FieldGroup>
            <div className="mobile-estimate" aria-live="polite">
              <span>
                Estimated base total
                {days ? ` · ${days} ${days === 1 ? 'day' : 'days'}` : ''}
              </span>
              <strong>
                {days ? money(days * v.dailyRate) : 'Select dates'}
              </strong>
            </div>
            <div className="form-section-heading second-heading">
              <span>02</span>
              <h2>Your contact details</h2>
            </div>
            <FieldGroup className="form-grid">
              <FormField id="booking-name" label="Full name" wide>
                <Input
                  id="booking-name"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  minLength={2}
                  maxLength={100}
                  value={customer.name}
                  onChange={(e) => contact('name', e.target.value)}
                />
              </FormField>
              <FormField id="booking-phone" label="Phone number">
                <Input
                  id="booking-phone"
                  autoComplete="tel"
                  type="tel"
                  placeholder="Include country code"
                  required
                  maxLength={25}
                  value={customer.phone}
                  onChange={(e) => contact('phone', e.target.value)}
                />
              </FormField>
              <FormField id="booking-email" label="Email address">
                <Input
                  id="booking-email"
                  autoComplete="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                  value={customer.email}
                  onChange={(e) => contact('email', e.target.value)}
                />
              </FormField>
              <FormField
                id="booking-note"
                label="Additional message"
                optional
                wide
              >
                <Textarea
                  id="booking-note"
                  placeholder="Your route, planned stops, or questions for the team"
                  maxLength={2000}
                  value={customer.message}
                  onChange={(e) => contact('message', e.target.value)}
                />
              </FormField>
            </FieldGroup>
            <PreviewNote>
              This demo prepares a request for you to review and download. It
              does not send your details or reserve a vehicle.
            </PreviewNote>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <button disabled={!ready} type="submit" className="action primary">
              Review rental request <ArrowRight size={16} />
            </button>
          </form>
        )}
        <BookingSummary trip={trip} vehicle={v} delivery={delivery} />
      </div>
    </section>
  )
}
