import Link from 'next/link'

export function RoadMark() {
  return (
    <svg
      className="road-mark"
      viewBox="0 0 48 44"
      fill="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M8 3h10l-5.9 22.7c-.8 3.1.8 5.2 4.2 5.2h4.4l-2.6 9H13C3.7 39.9-.4 34.4 2 25.5L8 3Z"
      />
      <path
        fill="currentColor"
        d="M25 3h8.9l-7.4 27.8h-9.1L25 3Zm14.3 0H48l-7.7 28.2c-1.5 5.5-5.3 8.7-11.5 8.7h-7.9l2.4-8.9h3.8c2.6 0 4.1-1.3 4.8-3.9L39.3 3Z"
      />
    </svg>
  )
}
export function Brand({ onNavigate }: { onNavigate?: () => void } = {}) {
  return (
    <Link
      className="brand"
      href="/"
      onClick={onNavigate}
      aria-label="U Drive Car Rental Kathmandu — home"
    >
      <RoadMark />
      <span className="brand-words">
        <span className="wordmark">U DRIVE</span>
        <span className="brand-descriptor">RENTAL CAR KATHMANDU</span>
      </span>
    </Link>
  )
}
export function Wheel({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.4" />
      <circle cx="12" cy="12" r="2.1" />
      <path d="m3.1 8.9 6.9 2.2m10.9-2.2L14 11.1M12 14.2v7.2M5.1 14.7l3.6.5 1.3 5.7m8.9-6.2-3.6.5-1.3 5.7" />
    </svg>
  )
}
