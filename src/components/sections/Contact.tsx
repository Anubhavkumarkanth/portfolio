import { useState, type FormEvent } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Check, CircleAlert, Copy, Download, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import { site } from '../../config/site'
import { profile } from '../../data/profile'
import { buttonClasses } from '../../lib/button'
import { cn, withBase } from '../../lib/utils'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Card, Reveal } from '../ui/primitives'
import { Section } from '../ui/Section'

type Fields = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'sent' | 'handoff' | 'error'

const EMPTY: Fields = { name: '', email: '', message: '' }

function validate(fields: Fields): Errors {
  const errors: Errors = {}
  if (fields.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) errors.email = 'Please enter a valid email address.'
  if (fields.message.trim().length < 10) errors.message = 'A sentence or two helps — at least 10 characters.'
  return errors
}

function mailtoHref({ name, email, message }: Fields) {
  const subject = `Hello from ${name.trim()}`
  const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function CopyButton({ value, label, fallbackHref }: { value: string; label: string; fallbackHref: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = fallbackHref
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={buttonClasses({ variant: 'ghost', size: 'icon-sm' })}
      aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
    >
      {copied ? <Check className="size-4 text-ok" /> : <Copy className="size-4" />}
    </button>
  )
}

const inputClass =
  'mt-2 w-full rounded-lg border bg-ink-950/60 px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle/70 transition-colors focus:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25'

export function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [trap, setTrap] = useState('')

  const update = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = (Object.keys(found) as (keyof Fields)[])[0]
      document.getElementById(`contact-${first}`)?.focus()
      return
    }
    if (trap) return // honeypot filled: silently drop

    if (!site.contactEndpoint) {
      window.location.href = mailtoHref(fields)
      setStatus('handoff')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`)
      setStatus('sent')
      setFields(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const channels = [
    {
      icon: <Mail className="size-4" aria-hidden="true" />,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      extra: <CopyButton value={profile.email} label="Email address" fallbackHref={`mailto:${profile.email}`} />,
    },
    {
      icon: <Phone className="size-4" aria-hidden="true" />,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phoneHref}`,
      extra: <CopyButton value={profile.phone} label="Phone number" fallbackHref={`tel:${profile.phoneHref}`} />,
    },
    {
      icon: <LinkedInIcon className="size-4" />,
      label: 'LinkedIn',
      value: `in/${profile.socials.linkedin.handle}`,
      href: profile.socials.linkedin.href,
    },
    {
      icon: <GitHubIcon className="size-4" />,
      label: 'GitHub',
      value: `@${profile.socials.github.handle}`,
      href: profile.socials.github.href,
    },
    { icon: <MapPin className="size-4" aria-hidden="true" />, label: 'Location', value: profile.location },
  ]

  const field = (key: keyof Fields) => ({
    id: `contact-${key}`,
    name: key,
    value: fields[key],
    'aria-invalid': Boolean(errors[key]) || undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
    className: cn(inputClass, errors[key] ? 'border-danger/60' : 'border-line-strong'),
  })

  return (
    <Section
      id="contact"
      index="09"
      eyebrow="Contact"
      title={
"Get in touch"
      }
      description="I’m looking for entry-level software, backend, full-stack and data roles. If you’re hiring or want to talk through something I’ve built, my inbox is open."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal>
          <ul className="divide-y divide-line rounded-xl border border-line">
            {channels.map((c) => (
              <li key={c.label} className="flex items-center gap-4 px-5 py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03] text-fg-muted">
                  {c.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-fg-subtle">{c.label}</p>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
                      className="block truncate text-sm text-fg transition-colors hover:text-accent-strong"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="truncate text-sm text-fg">{c.value}</p>
                  )}
                </div>
                {c.extra}
              </li>
            ))}
          </ul>
          <a
            href={withBase(profile.resume.href)}
            download={profile.resume.fileName}
            className={buttonClasses({ variant: 'secondary', className: 'mt-5 w-full' })}
          >
            <Download className="size-4" aria-hidden="true" />
            Download resume (PDF)
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <Card interactive={false} className="p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'sent' || status === 'handoff' ? (
                <m.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex min-h-[22rem] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="grid size-12 place-items-center rounded-full border border-ok/30 bg-ok/10 text-ok">
                    <Check className="size-6" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-lg font-medium text-fg">
                    {status === 'sent' ? 'Message sent — thank you.' : 'Your email app should now be open.'}
                  </p>
                  <p className="mt-2 max-w-sm text-sm text-fg-muted">
                    {status === 'sent' ? (
                      'I’ll get back to you soon.'
                    ) : (
                      <>
                        The message is pre-filled — just hit send. If nothing opened, write to{' '}
                        <a href={`mailto:${profile.email}`} className="text-accent-strong underline-offset-4 hover:underline">
                          {profile.email}
                        </a>
                        .
                      </>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className={buttonClasses({ variant: 'ghost', size: 'sm', className: 'mt-6' })}
                  >
                    Write another message
                  </button>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="grid grid-cols-1 gap-5"
                  aria-label="Contact form"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="text-sm text-fg-muted">
                        Name
                      </label>
                      <input
                        {...field('name')}
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        onChange={(e) => update('name')(e.target.value)}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-danger">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-sm text-fg-muted">
                        Email
                      </label>
                      <input
                        {...field('email')}
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="you@company.com"
                        onChange={(e) => update('email')(e.target.value)}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-1.5 text-xs text-danger">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="text-sm text-fg-muted">
                      Message
                    </label>
                    <textarea
                      {...field('message')}
                      rows={6}
                      placeholder="What are you working on?"
                      onChange={(e) => update('message')(e.target.value)}
                      className={cn(field('message').className, 'resize-y')}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-1.5 text-xs text-danger">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Honeypot for bots — hidden from people and assistive tech */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Company
                      <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                    </label>
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="flex gap-2.5 rounded-lg border border-danger/30 bg-danger/10 px-3.5 py-3 text-sm text-fg">
                      <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
                      <span>
                        That didn’t go through. Try again, or{' '}
                        <a href={mailtoHref(fields)} className="text-accent-strong underline underline-offset-4">
                          send it from your email app
                        </a>
                        .
                      </span>
                    </p>
                  )}

                  <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-fg-subtle">
                      {site.contactEndpoint ? 'Goes straight to my inbox.' : 'Opens your email app with the message ready to send.'}
                    </p>
                    <button type="submit" disabled={status === 'sending'} className={buttonClasses({ variant: 'primary' })}>
                      {status === 'sending' ? (
                        <>
                          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <Send className="size-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                </m.form>
              )}
            </AnimatePresence>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
