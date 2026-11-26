'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  MapPin,
} from 'lucide-react'
import { FormField, PreviewNote } from './form-parts'
import { FieldGroup } from './ui/field'
import { Input } from './ui/input'
import { Breadcrumbs } from './shared'

type AuthMode = 'sign-in' | 'create-account' | 'forgot-password'
function PasswordField({
  id,
  label,
  create = false,
}: {
  id: string
  label: string
  create?: boolean
}) {
  const [show, setShow] = useState(false)
  return (
    <FormField id={id} label={label}>
      <div className="password-input">
        <Input
          id={id}
          name={id}
          type={show ? 'text' : 'password'}
          required
          minLength={create ? 8 : 1}
          maxLength={128}
          autoComplete="off"
          placeholder={
            create ? 'At least 8 characters' : 'Enter a sample password'
          }
        />
        <button
          type="button"
          aria-label={`${show ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
          aria-pressed={show}
          onClick={() => setShow((x) => !x)}
        >
          {show ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </FormField>
  )
}
export function AuthForm({ mode }: { mode: AuthMode }) {
  const create = mode === 'create-account'
  const reset = mode === 'forgot-password'
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const status = useRef<HTMLParagraphElement>(null)
  useEffect(() => setReady(true), [])
  useEffect(() => {
    if (message) status.current?.focus()
  }, [message])
  const title = create
    ? 'Create your account.'
    : reset
      ? 'Reset your password.'
      : 'Welcome back.'
  const current = create
    ? 'Create Account'
    : reset
      ? 'Forgot Password'
      : 'Sign In'
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')
    const form = event.currentTarget
    const data = new FormData(form)
    if (create && String(data.get('name') ?? '').trim().length < 2) {
      setError('Enter a full name of at least two characters.')
      return
    }
    if (
      create &&
      (String(data.get('phone') ?? '').replace(/\D/g, '').length < 7 ||
        /[^+\d\s()-]/.test(String(data.get('phone'))))
    ) {
      setError('Enter a valid sample phone number.')
      return
    }
    if (create && data.get('password') !== data.get('confirm-password')) {
      setError(
        'The passwords do not match. Enter the same sample password in both fields.',
      )
      return
    }
    form.reset()
    setMessage(
      reset
        ? 'Password recovery is not connected in this demo. No reset email was sent.'
        : create
          ? 'Account creation is not connected in this demo. No account was created and no credentials were sent.'
          : 'Sign-in is not connected in this demo. No credentials were sent and no session was created.',
    )
  }
  return (
    <section className="wrap account-page">
      <Breadcrumbs items={[{ label: current }]} />
      <div className="auth-layout">
        <div className="auth-photo">
          <Image
            src="/images/hero-mobile.webp"
            alt="A silver car on a Himalayan road"
            priority
            width={1024}
            height={1024}
          />
          <div className="auth-photo-shade" />
          <div>
            <p className="eyebrow">U DRIVE KATHMANDU</p>
            <h2>
              Your Nepal.
              <br />
              Your way.
            </h2>
            <p className="inline-icon">
              <MapPin size={15} />
              From Kathmandu, across Nepal
            </p>
          </div>
        </div>
        <div className="auth-panel">
          <span className="auth-lock">
            <LockKeyhole size={19} />
          </span>
          <p className="eyebrow">YOUR U DRIVE ACCOUNT</p>
          <h1>{title}</h1>
          <p className="auth-subtitle">
            {create
              ? 'Set up your traveller profile.'
              : reset
                ? 'Enter the email address for your account.'
                : 'Sign in to your traveller account.'}
          </p>
          <PreviewNote>
            Account preview only. Authentication is not connected. Use sample
            details, not a real password.
          </PreviewNote>
          <form method="post" onSubmit={submit} data-ready={ready}>
            <FieldGroup
              className={create ? 'auth-fields create-fields' : 'auth-fields'}
            >
              {create && (
                <FormField id="account-name" label="Full name">
                  <Input
                    id="account-name"
                    name="name"
                    autoComplete="off"
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="Sample full name"
                  />
                </FormField>
              )}
              <FormField id="account-email" label="Email address">
                <Input
                  id="account-email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  required
                  maxLength={254}
                  placeholder="you@example.com"
                />
              </FormField>
              {create && (
                <FormField id="account-phone" label="Phone number">
                  <Input
                    id="account-phone"
                    type="tel"
                    name="phone"
                    autoComplete="off"
                    required
                    minLength={7}
                    maxLength={25}
                    placeholder="Sample phone number"
                  />
                </FormField>
              )}
              {!reset && (
                <PasswordField id="password" label="Password" create={create} />
              )}{' '}
              {create && (
                <PasswordField
                  id="confirm-password"
                  label="Confirm password"
                  create
                />
              )}
            </FieldGroup>
            {mode === 'sign-in' && (
              <div className="forgot-link">
                <Link href="/forgot-password">Forgot password?</Link>
              </div>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            {message && (
              <p
                ref={status}
                tabIndex={-1}
                className="form-response"
                role="status"
              >
                {message}
              </p>
            )}
            <button
              className="action primary auth-submit"
              type="submit"
              disabled={!ready}
            >
              {reset ? 'Request password reset' : current}
              <ArrowRight size={16} />
            </button>
          </form>
          <p className="auth-switch">
            {create
              ? 'Already have an account? '
              : reset
                ? 'Remember your password? '
                : 'New to U Drive? '}
            <Link href={create || reset ? '/sign-in' : '/create-account'}>
              {create || reset ? 'Sign In' : 'Create Account'}
            </Link>
          </p>
          <Link className="guest-link" href="/booking">
            <ArrowLeft size={14} />
            Plan a trip without an account
          </Link>
        </div>
      </div>
    </section>
  )
}
