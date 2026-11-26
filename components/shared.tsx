import Link from 'next/link'
import { ArrowRight, ChevronRight, Plus } from 'lucide-react'
import { type FAQItem } from '@/lib/rental-data'

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkText,
}: {
  eyebrow?: string
  title: string
  description?: string
  href?: string
  linkText?: string
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="text-balance">{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="text-link">
          {linkText}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumbs">
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            <ChevronRight size={13} />
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
export function PageIntro({
  eyebrow,
  title,
  description,
  current,
}: {
  eyebrow: string
  title: string
  description: string
  current: string
}) {
  return (
    <div className="page-intro">
      <div className="wrap">
        <Breadcrumbs items={[{ label: current }]} />
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="text-balance">{title}</h1>
        <p className="intro-description text-pretty">{description}</p>
      </div>
    </div>
  )
}
export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details className="faq-row" key={item.question}>
          <summary>
            {item.question}
            <Plus size={18} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
