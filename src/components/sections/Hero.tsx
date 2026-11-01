import type { ReactNode } from 'react'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import type { Persona } from '../../data/types'
import { buttonClasses } from '../../lib/button'
import { withBase } from '../../lib/utils'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Container } from '../ui/primitives'

const iconLink = 'inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg'

/** Name, role, one big line, the resume, and a small visual on the right. */
export function Hero({ persona, aside }: { persona: Persona; aside: ReactNode }) {
  return (
    <section id="home" aria-labelledby="home-heading" className="pt-28 pb-6 sm:pt-36 sm:pb-8">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="animate-rise">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-fg-muted">
            <span className="inline-flex items-center gap-2 font-medium text-fg">
              <span className="size-2 rounded-full bg-good" aria-hidden="true" />
              {persona.role}
            </span>
            <span aria-hidden="true">·</span>
            <span>{profile.location}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.availability}</span>
          </p>

          <h1 id="home-heading" className="mt-6">
            <span className="sr-only">
              {profile.name}, {persona.role}.{' '}
            </span>
            <span className="block font-serif text-[2.6rem] leading-[1.08] font-medium tracking-[-0.02em] text-balance text-fg sm:text-6xl">
              {persona.headline}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-fg-muted">
            I’m {profile.name}, a 2026 graduate in Bengaluru. {persona.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className={buttonClasses({ variant: 'primary' })}>
              See my work
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a
              href={withBase(persona.resume.href)}
              download={persona.resume.fileName}
              className={buttonClasses({ variant: 'secondary' })}
            >
              <Download className="size-4" aria-hidden="true" />
              {persona.resume.label}
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            <a href={profile.socials.linkedin.href} target="_blank" rel="noreferrer" className={iconLink}>
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
            <a href={profile.socials.github.href} target="_blank" rel="noreferrer" className={iconLink}>
              <GitHubIcon className="size-4" />
              GitHub
            </a>
            <a href={`mailto:${profile.email}`} className={iconLink}>
              <Mail className="size-4" aria-hidden="true" />
              Email
            </a>
          </div>
        </div>

        <div className="animate-fade-in">{aside}</div>
      </Container>

      <Container className="mt-16 sm:mt-20">
        <dl className="grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {persona.stats.map((s) => (
            <div key={s.label} className="py-5 sm:px-6 sm:first:pl-0">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-3xl text-fg tabular-nums">{s.value}</dd>
              <dd className="mt-1 text-sm text-fg-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
