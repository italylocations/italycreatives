'use client'

import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { Turnstile } from '@marsidev/react-turnstile'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

// ─── style tokens ────────────────────────────────────────────────────────────

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, Georgia, serif)',
}
const sans: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans, system-ui, sans-serif)',
}
const fieldLabel: React.CSSProperties = {
  ...sans,
  color: 'var(--text-muted)',
  fontSize: '0.72rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '0.5rem',
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
const textareaBase: React.CSSProperties = {
  ...inputBase,
  resize: 'vertical',
  paddingTop: '0.6rem',
}

// ─── types ───────────────────────────────────────────────────────────────────

interface Credit {
  magazine: string
  issue: string
  link: string
}

interface ApplyFormData {
  // Section 1
  fullName: string
  specialization: string
  basedIn: string
  romeBasedOption: string
  phone: string
  email: string
  // Section 2
  portfolioUrl: string
  instagram: string
  credit1: Credit
  credit2: Credit
  credit3: Credit
  editorialsLast12Months: string
  workedInternationally: string
  internationalClients: string
  // Section 3
  dayRateMin: string
  availabilityPerMonth: string
  partitaIva: string
  insurance: string
  // Section 4
  englishLevel: string
  englishSelfDescription: string
  challengeResponse: string
  whyItalyCreatives: string
  // Section 5
  referralSource: string
  referralName: string
  accuracyConfirmed: boolean
  honeypot: string
  turnstileToken: string
}

const emptyCredit: Credit = { magazine: '', issue: '', link: '' }

const initial: ApplyFormData = {
  fullName: '',
  specialization: '',
  basedIn: '',
  romeBasedOption: '',
  phone: '',
  email: '',
  portfolioUrl: '',
  instagram: '',
  credit1: { ...emptyCredit },
  credit2: { ...emptyCredit },
  credit3: { ...emptyCredit },
  editorialsLast12Months: '',
  workedInternationally: '',
  internationalClients: '',
  dayRateMin: '',
  availabilityPerMonth: '',
  partitaIva: '',
  insurance: '',
  englishLevel: '',
  englishSelfDescription: '',
  challengeResponse: '',
  whyItalyCreatives: '',
  referralSource: '',
  referralName: '',
  accuracyConfirmed: false,
  honeypot: '',
  turnstileToken: '',
}

const TOTAL_STEPS = 5

const stepTitles = [
  'Who You Are',
  'Your Work',
  'Professional Standards',
  'English & Character',
  'Final Step',
]

// ─── reusable field components ───────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <label style={fieldLabel}>{label}</label>
      {children}
    </div>
  )
}

function ToggleGroup({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              ...sans,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              padding: '0.5rem 1.1rem',
              border: '1px solid',
              borderColor: active ? 'var(--accent-red)' : 'var(--card-border)',
              background: active ? 'var(--accent-red)' : 'transparent',
              color: active ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function ApplyFormPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<ApplyFormData>(initial)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof ApplyFormData>(field: K, value: ApplyFormData[K]) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  function setCredit(
    which: 'credit1' | 'credit2' | 'credit3',
    field: keyof Credit,
    value: string
  ) {
    setData((prev) => ({
      ...prev,
      [which]: { ...prev[which], [field]: value },
    }))
  }

  function txt(field: keyof ApplyFormData) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      set(field, e.target.value as ApplyFormData[typeof field])
  }

  function next() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return

    // Require Turnstile token when the widget is configured
    if (TURNSTILE_SITE_KEY && !data.turnstileToken) {
      setError('Please complete the spam check before submitting.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      let json: { success?: boolean; error?: string } = {}
      try {
        json = await res.json()
      } catch {
        throw new Error('Server returned an unreadable response')
      }

      if (!res.ok || json.success !== true) {
        throw new Error(json.error ?? `Request failed (${res.status})`)
      }

      // Navigate to thank-you — proxy rewrites /thank-you → /apply/thank-you on subdomain
      router.push('/thank-you')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  const progress = (step / TOTAL_STEPS) * 100

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Progress bar */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--card-border)' }}>
        <div
          style={{
            height: '3px',
            background: 'var(--accent-red)',
            width: `${progress}%`,
            transition: 'width 0.4s ease',
          }}
        />
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <p style={{ ...sans, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Step {step} of {TOTAL_STEPS} — {stepTitles[step - 1]}
          </p>
          <p style={{ ...sans, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Section heading */}
        <div className="mb-12">
          <p style={{ ...sans, color: 'var(--accent-red)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            {step} / {TOTAL_STEPS}
          </p>
          <h1
            style={{ ...serif, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: 'var(--text-primary)' }}
            className="italic leading-tight"
          >
            {stepTitles[step - 1]}
          </h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* Honeypot */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <input
              tabIndex={-1}
              autoComplete="off"
              value={data.honeypot}
              onChange={txt('honeypot')}
            />
          </div>

          {/* ── STEP 1 — Who You Are ──────────────────────────────────── */}
          {step === 1 && (
            <div>
              <Field label="Full Name *">
                <input required type="text" style={inputBase} placeholder="Your full name" value={data.fullName} onChange={txt('fullName')} />
              </Field>

              <Field label="Specialization *">
                <ToggleGroup
                  options={['Makeup Artist', 'Hair Stylist', 'Fashion Stylist', 'Filmmaker']}
                  value={data.specialization}
                  onChange={(v) => set('specialization', v)}
                />
              </Field>

              <Field label="Based In * (city + country)">
                <input required type="text" style={inputBase} placeholder="e.g. Rome, Italy" value={data.basedIn} onChange={txt('basedIn')} />
              </Field>

              <Field label="Rome-based? *">
                <ToggleGroup
                  options={['Yes', 'No', 'Available to travel to Rome regularly']}
                  value={data.romeBasedOption}
                  onChange={(v) => set('romeBasedOption', v)}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <label style={fieldLabel}>Phone *</label>
                  <input required type="tel" style={inputBase} placeholder="+39 …" value={data.phone} onChange={txt('phone')} />
                </div>
                <div>
                  <label style={fieldLabel}>Email *</label>
                  <input required type="email" style={inputBase} placeholder="you@domain.com" value={data.email} onChange={txt('email')} />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2 — Your Work ───────────────────────────────────────── */}
          {step === 2 && (
            <div>
              <Field label="Portfolio URL * (personal site or Behance — not Instagram-only)">
                <input required type="url" style={inputBase} placeholder="https://yourname.com" value={data.portfolioUrl} onChange={txt('portfolioUrl')} />
              </Field>

              <Field label="Instagram Handle (optional)">
                <input type="text" style={inputBase} placeholder="@yourusername" value={data.instagram} onChange={txt('instagram')} />
              </Field>

              <div className="mb-8">
                <p style={{ ...fieldLabel, marginBottom: '1rem' }}>
                  Your 3 Most Important Published Editorial Credits *
                </p>
                {(['credit1', 'credit2', 'credit3'] as const).map((key, i) => (
                  <div key={key} style={{ borderLeft: '2px solid var(--card-border)', paddingLeft: '1.2rem', marginBottom: '1.5rem' }}>
                    <p style={{ ...sans, color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                      Credit {i + 1}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                      <input
                        type="text" style={inputBase} placeholder="Magazine name"
                        value={data[key].magazine}
                        onChange={(e) => setCredit(key, 'magazine', e.target.value)}
                      />
                      <input
                        type="text" style={inputBase} placeholder="Issue / date"
                        value={data[key].issue}
                        onChange={(e) => setCredit(key, 'issue', e.target.value)}
                      />
                    </div>
                    <input
                      type="url" style={inputBase} placeholder="Verifiable link (https://…)"
                      value={data[key].link}
                      onChange={(e) => setCredit(key, 'link', e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <Field label="Editorials published in the last 12 months? *">
                <ToggleGroup
                  options={['0', '1–2', '3–5', '6–10', '10+']}
                  value={data.editorialsLast12Months}
                  onChange={(v) => set('editorialsLast12Months', v)}
                />
              </Field>

              <Field label="Have you worked with international productions before? *">
                <ToggleGroup
                  options={['Yes', 'No']}
                  value={data.workedInternationally}
                  onChange={(v) => set('workedInternationally', v)}
                />
              </Field>

              <Field label="List up to 3 international clients or campaigns (optional)">
                <textarea
                  rows={3}
                  style={textareaBase}
                  placeholder="e.g. Vogue Italia — Sept 2025, Gucci campaign 2024…"
                  value={data.internationalClients}
                  onChange={txt('internationalClients')}
                />
              </Field>
            </div>
          )}

          {/* ── STEP 3 — Professional Standards ─────────────────────────── */}
          {step === 3 && (
            <div>
              <Field label="Day Rate Minimum (EUR) *">
                <ToggleGroup
                  options={['<€300', '€300–500', '€500–800', '€800–1200', '€1200+']}
                  value={data.dayRateMin}
                  onChange={(v) => set('dayRateMin', v)}
                />
              </Field>

              <Field label="Average Availability per Month *">
                <ToggleGroup
                  options={['1–5 days', '6–10 days', '11–15 days', '15+ days']}
                  value={data.availabilityPerMonth}
                  onChange={(v) => set('availabilityPerMonth', v)}
                />
              </Field>

              <Field label="Are you registered as a freelancer / Partita IVA? *">
                <ToggleGroup
                  options={['Yes', 'No', 'In process']}
                  value={data.partitaIva}
                  onChange={(v) => set('partitaIva', v)}
                />
              </Field>

              <Field label="Can you provide proof of professional insurance? *">
                <ToggleGroup
                  options={['Yes', 'No', 'Can arrange']}
                  value={data.insurance}
                  onChange={(v) => set('insurance', v)}
                />
              </Field>
            </div>
          )}

          {/* ── STEP 4 — English & Character ────────────────────────────── */}
          {step === 4 && (
            <div>
              <Field label="English Level *">
                <ToggleGroup
                  options={['Basic', 'Conversational', 'Fluent', 'Native']}
                  value={data.englishLevel}
                  onChange={(v) => set('englishLevel', v)}
                />
              </Field>

              <Field label="Describe yourself as a professional in 3 sentences. Write in English. *">
                <textarea
                  required rows={5} style={textareaBase}
                  placeholder="This is your chance to introduce yourself. Write in English."
                  value={data.englishSelfDescription}
                  onChange={txt('englishSelfDescription')}
                />
              </Field>

              <Field label="Describe a challenging on-set situation and how you resolved it. *">
                <textarea
                  required rows={5} style={textareaBase}
                  placeholder="Be specific. What happened, what was your role, how did you handle it."
                  value={data.challengeResponse}
                  onChange={txt('challengeResponse')}
                />
              </Field>

              <Field label="Why do you want to be represented by ItalyCreatives? *">
                <textarea
                  required rows={4} style={textareaBase}
                  placeholder="Tell us what this representation means for your career."
                  value={data.whyItalyCreatives}
                  onChange={txt('whyItalyCreatives')}
                />
              </Field>
            </div>
          )}

          {/* ── STEP 5 — Final ──────────────────────────────────────────── */}
          {step === 5 && (
            <div>
              <Field label="How did you hear about us? *">
                <ToggleGroup
                  options={['LinkedIn', 'Direct referral', 'Google', 'Instagram', 'Other']}
                  value={data.referralSource}
                  onChange={(v) => set('referralSource', v)}
                />
              </Field>

              <Field label="Referral name (if applicable)">
                <input
                  type="text" style={inputBase} placeholder="Name of person who referred you"
                  value={data.referralName}
                  onChange={txt('referralName')}
                />
              </Field>

              {/* Turnstile */}
              <div className="mb-8">
                {TURNSTILE_SITE_KEY ? (
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={(token) => set('turnstileToken', token)}
                    onError={() => set('turnstileToken', '')}
                    onExpire={() => set('turnstileToken', '')}
                    options={{ theme: 'light', size: 'normal' }}
                  />
                ) : (
                  process.env.NODE_ENV === 'development' && (
                    <div
                      style={{
                        border: '1px solid var(--card-border)',
                        padding: '1rem',
                        background: 'var(--card-bg)',
                      }}
                    >
                      <p style={{ ...sans, color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        Spam protection (Cloudflare Turnstile) — add NEXT_PUBLIC_TURNSTILE_SITE_KEY to enable
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* Accuracy confirmation */}
              <div className="mb-10 flex items-start gap-3">
                <input
                  id="accuracy"
                  type="checkbox"
                  required
                  checked={data.accuracyConfirmed}
                  onChange={(e) => set('accuracyConfirmed', e.target.checked)}
                  style={{ marginTop: '0.15rem', accentColor: 'var(--accent-red)', flexShrink: 0 }}
                />
                <label
                  htmlFor="accuracy"
                  style={{ ...sans, color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, cursor: 'pointer' }}
                >
                  I confirm that all information provided in this application is accurate
                  and complete. I understand that misrepresentation may result in removal
                  from consideration. *
                </label>
              </div>

              {/* Error */}
              {error && (
                <p style={{ ...sans, color: 'var(--accent-red)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  {error}
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--card-border)' }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={back}
                style={{
                  ...sans,
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
                className="hover:opacity-70 transition-opacity"
              >
                <ChevronLeft size={14} strokeWidth={1.5} />
                Back
              </button>
            ) : (
              <span />
            )}

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={next}
                style={{
                  ...sans,
                  background: 'var(--accent-red)',
                  color: '#fff',
                  letterSpacing: '0.12em',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  padding: '0.9rem 2.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                className="hover:opacity-80 transition-opacity"
              >
                Continue
                <ChevronRight size={14} strokeWidth={1.5} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                style={{
                  ...sans,
                  background: submitting ? 'var(--text-muted)' : 'var(--accent-red)',
                  color: '#fff',
                  letterSpacing: '0.12em',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  padding: '0.9rem 2.5rem',
                  border: 'none',
                  cursor: submitting ? 'default' : 'pointer',
                }}
                className="hover:opacity-80 transition-opacity"
              >
                {submitting ? 'Submitting…' : 'Submit Application'}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  )
}
