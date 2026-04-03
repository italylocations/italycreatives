'use client'

import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
}
const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}
const lbl: React.CSSProperties = {
  ...sans,
  color: 'var(--text-muted)',
  letterSpacing: '0.3em',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
}

const inputBase: React.CSSProperties = {
  ...sans,
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--card-border)',
  outline: 'none',
  color: 'var(--text-primary)',
  fontSize: '0.95rem',
  padding: '0.6rem 0',
  lineHeight: 1.6,
}

const fieldLabel: React.CSSProperties = {
  ...sans,
  color: 'var(--text-muted)',
  fontSize: '0.72rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '0.4rem',
}

type FormData = {
  companyName: string
  contactName: string
  email: string
  phone: string
  projectType: string
  crewNeeded: string[]
  numberOfPeople: string
  shootingDates: string
  locationItaly: string
  budgetRange: string
  notes: string
  referral: string
  honeypot: string
}

const initialData: FormData = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  projectType: '',
  crewNeeded: [],
  numberOfPeople: '',
  shootingDates: '',
  locationItaly: '',
  budgetRange: '',
  notes: '',
  referral: '',
  honeypot: '',
}

const crewOptions = ['Makeup', 'Hair', 'Styling', 'Film']
const projectTypes = ['Editorial', 'Advertising', 'Fashion Film', 'Commercial', 'Other']
const budgetRanges = ['<€500/day', '€500–1500/day', '€1500+/day', 'Prefer not to say']

export default function ContactPage() {
  const [data, setData] = useState<FormData>(initialData)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  function toggleCrew(option: string) {
    setData((prev) => ({
      ...prev,
      crewNeeded: prev.crewNeeded.includes(option)
        ? prev.crewNeeded.filter((c) => c !== option)
        : [...prev.crewNeeded, option],
    }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error ?? 'Request failed')
      }

      setStatus('success')
      setData(initialData)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div
        style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}
        className="flex items-center justify-center px-6"
      >
        <div className="max-w-lg text-center">
          <div style={{ width: '2rem', height: '1px', background: 'var(--accent-red)', margin: '0 auto 2rem' }} />
          <h1
            style={{ ...serif, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--text-primary)' }}
            className="italic leading-tight mb-6"
          >
            Inquiry received.
          </h1>
          <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
            Thank you for reaching out to ItalyCreatives. We have received your production
            brief and will respond within 24 hours with crew availability and next steps.
          </p>
          <p style={{ ...sans, color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '1rem' }}>
            For urgent requests:{' '}
            <a
              href="mailto:info@italycreatives.com"
              style={{ color: 'var(--accent-red)', textDecoration: 'none' }}
            >
              info@italycreatives.com
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* Header */}
      <section
        style={{ borderBottom: '1px solid var(--card-border)' }}
        className="px-6 py-28"
      >
        <div className="max-w-3xl mx-auto">
          <p style={lbl} className="mb-6">Contact</p>
          <h1
            style={{ ...serif, fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-primary)' }}
            className="italic leading-tight mb-6"
          >
            Tell us about your
            <br />
            production.
          </h1>
          <p style={{ ...sans, color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem', maxWidth: '36rem' }}>
            Fill in the brief below and we will respond within 24 hours with crew
            availability, rates and next steps. All fields marked * are required.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} noValidate>

            {/* Honeypot — hidden from humans */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                tabIndex={-1}
                autoComplete="off"
                value={data.honeypot}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('honeypot', e.target.value)}
              />
            </div>

            {/* Production company */}
            <div className="mb-10">
              <label style={fieldLabel}>Production Company *</label>
              <input
                required
                type="text"
                style={inputBase}
                placeholder="Company name"
                value={data.companyName}
                onChange={(e) => set('companyName', e.target.value)}
              />
            </div>

            {/* Contact name + email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
              <div>
                <label style={fieldLabel}>Contact Name *</label>
                <input
                  required
                  type="text"
                  style={inputBase}
                  placeholder="Your name"
                  value={data.contactName}
                  onChange={(e) => set('contactName', e.target.value)}
                />
              </div>
              <div>
                <label style={fieldLabel}>Email *</label>
                <input
                  required
                  type="email"
                  style={inputBase}
                  placeholder="you@company.com"
                  value={data.email}
                  onChange={(e) => set('email', e.target.value)}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-10">
              <label style={fieldLabel}>Phone (optional)</label>
              <input
                type="tel"
                style={inputBase}
                placeholder="+1 212 000 0000"
                value={data.phone}
                onChange={(e) => set('phone', e.target.value)}
              />
            </div>

            {/* Project type */}
            <div className="mb-10">
              <label style={fieldLabel}>Project Type *</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => set('projectType', type)}
                    style={{
                      ...sans,
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.5rem 1rem',
                      border: '1px solid',
                      borderColor: data.projectType === type ? 'var(--accent-red)' : 'var(--card-border)',
                      background: data.projectType === type ? 'var(--accent-red)' : 'transparent',
                      color: data.projectType === type ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Crew needed */}
            <div className="mb-10">
              <label style={fieldLabel}>Crew Needed * (select all that apply)</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {crewOptions.map((option) => {
                  const active = data.crewNeeded.includes(option)
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleCrew(option)}
                      style={{
                        ...sans,
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '0.5rem 1rem',
                        border: '1px solid',
                        borderColor: active ? 'var(--accent-red)' : 'var(--card-border)',
                        background: active ? 'var(--accent-red)' : 'transparent',
                        color: active ? '#fff' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Number of people + dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
              <div>
                <label style={fieldLabel}>Number of People Needed *</label>
                <input
                  required
                  type="text"
                  style={inputBase}
                  placeholder="e.g. 2"
                  value={data.numberOfPeople}
                  onChange={(e) => set('numberOfPeople', e.target.value)}
                />
              </div>
              <div>
                <label style={fieldLabel}>Shooting Dates *</label>
                <input
                  required
                  type="text"
                  style={inputBase}
                  placeholder="e.g. 15–18 June 2026"
                  value={data.shootingDates}
                  onChange={(e) => set('shootingDates', e.target.value)}
                />
              </div>
            </div>

            {/* Location */}
            <div className="mb-10">
              <label style={fieldLabel}>Location in Italy *</label>
              <input
                required
                type="text"
                style={inputBase}
                placeholder="City / Region"
                value={data.locationItaly}
                onChange={(e) => set('locationItaly', e.target.value)}
              />
            </div>

            {/* Budget range */}
            <div className="mb-10">
              <label style={fieldLabel}>Budget Range per Day (optional)</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {budgetRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => set('budgetRange', range)}
                    style={{
                      ...sans,
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.5rem 1rem',
                      border: '1px solid',
                      borderColor: data.budgetRange === range ? 'var(--accent-red)' : 'var(--card-border)',
                      background: data.budgetRange === range ? 'var(--accent-red)' : 'transparent',
                      color: data.budgetRange === range ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-10">
              <label style={fieldLabel}>Additional Notes</label>
              <textarea
                rows={4}
                style={{
                  ...inputBase,
                  borderBottom: '1px solid var(--card-border)',
                  resize: 'vertical',
                  paddingTop: '0.6rem',
                }}
                placeholder="Brief description of the project, specific requirements, references..."
                value={data.notes}
                onChange={(e) => set('notes', e.target.value)}
              />
            </div>

            {/* How did you find us */}
            <div className="mb-12">
              <label style={fieldLabel}>How did you find us? (optional)</label>
              <input
                type="text"
                style={inputBase}
                placeholder="Google / LinkedIn / Referral / Other"
                value={data.referral}
                onChange={(e) => set('referral', e.target.value)}
              />
            </div>

            {/* Turnstile placeholder */}
            <div
              style={{
                border: '1px solid var(--card-border)',
                borderRadius: '2px',
                padding: '1rem',
                marginBottom: '2.5rem',
                background: 'var(--card-bg)',
              }}
            >
              <p style={{ ...sans, color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                Spam protection will appear here (Cloudflare Turnstile — requires site key)
              </p>
            </div>

            {/* Error */}
            {status === 'error' && (
              <p
                style={{ ...sans, color: 'var(--accent-red)', fontSize: '0.85rem', marginBottom: '1.5rem' }}
              >
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                ...sans,
                background: status === 'sending' ? 'var(--text-muted)' : 'var(--accent-red)',
                color: '#fff',
                letterSpacing: '0.12em',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                padding: '1rem 3rem',
                border: 'none',
                cursor: status === 'sending' ? 'default' : 'pointer',
                transition: 'opacity 0.15s',
              }}
              className="hover:opacity-80"
            >
              {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
            </button>

          </form>
        </div>
      </section>

    </div>
  )
}
