import { Info } from 'lucide-react'
import { Field, FieldLabel } from './ui/field'

export function FormField({
  id,
  label,
  optional = false,
  wide = false,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <Field className={wide ? 'form-field field-wide' : 'form-field'}>
      <FieldLabel htmlFor={id}>
        {label}
        {optional && <span className="optional-label">Optional</span>}
      </FieldLabel>
      {children}
    </Field>
  )
}
export function PreviewNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="preview-note">
      <Info size={16} aria-hidden="true" />
      <p>{children}</p>
    </div>
  )
}
