import { useRef, type PointerEvent } from 'react'
import { m, type Variants } from 'framer-motion'
import { ArrowRight, Briefcase, Download, GraduationCap, MapPin } from 'lucide-react'
import { education } from '../../data/education'
import { experience } from '../../data/experience'
import { profile } from '../../data/profile'
import { buttonClasses } from '../../lib/button'
import { EASE_OUT, withBase } from '../../lib/utils'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Container } from '../ui/primitives'
import { Terminal } from './Terminal'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-22rem] left-1/2 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(242_178_92/0.12),transparent)]" />
      <div className="mask-hero absolute inset-0">
        <div className="bg-grid absolute -inset-14 motion-safe:animate-grid-drift" />
        {/* Brighter grid revealed around the cursor */}
        <div className="mask-cursor absolute inset-0">
          <div className="bg-grid-accent absolute -inset-14 opacity-60 motion-safe:animate-grid-drift" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-ink-950" />
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const school = education[0]
  const job = experience[0]
  const [first, ...rest] = profile.specialties
  const specialties = rest.length ? `${[first, ...rest.slice(0, -1)].join(', ')} & ${rest[rest.length - 1]}` : first

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const el = sectionRef.current
    if (!el || event.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  const meta = [
    { icon: MapPin, text: profile.location },
    { icon: GraduationCap, text: `B.E. · ${school.institution.replace('Nitte Meenakshi Institute of Technology', 'NMIT Bangalore')} · ${school.graduation}` },
    { icon: Briefcase, text: `${job.type} · ${job.company.split(' ')[0]} · ${job.start.slice(0, 4)}` },
  ]

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      aria-labelledby="home-heading"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pt-28 lg:pb-12"
    >
      <HeroBackground />

      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <m.div variants={container} initial="hidden" animate="show">
          <m.p
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1 pr-3.5 pl-2.5 text-xs text-fg-muted backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-ok motion-safe:animate-pulse-ring" />
              <span className="relative size-2 rounded-full bg-ok" />
            </span>
            {profile.availability} · Class of {school.graduation}
          </m.p>

          <h1 id="home-heading" className="mt-7">
            <m.span
              variants={item}
              className="text-gradient block pb-1 text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-[4.1rem]"
            >
              {profile.name}
            </m.span>
            <m.span variants={item} className="mt-4 block text-xl font-normal tracking-tight text-fg-muted sm:text-2xl">
              {profile.role} — <span className="whitespace-nowrap text-fg">{specialties}.</span>
            </m.span>
          </h1>

          <m.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-fg-muted sm:text-[17px]">
            {profile.intro}
          </m.p>

          <m.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className={buttonClasses({ variant: 'primary', className: 'group' })}>
              View projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href={withBase(profile.resume.href)} download={profile.resume.fileName} className={buttonClasses({ variant: 'secondary' })}>
              <Download className="size-4" aria-hidden="true" />
              Download resume
            </a>
            <span className="mx-1 hidden h-6 w-px bg-line-strong sm:block" aria-hidden="true" />
            <a
              href={profile.socials.github.href}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className={buttonClasses({ variant: 'secondary', size: 'icon' })}
            >
              <GitHubIcon className="size-[18px]" />
            </a>
            <a
              href={profile.socials.linkedin.href}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className={buttonClasses({ variant: 'secondary', size: 'icon' })}
            >
              <LinkedInIcon className="size-[17px]" />
            </a>
          </m.div>

          <m.ul variants={item} className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-fg-subtle">
            {meta.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="size-4 text-fg-subtle/80" aria-hidden="true" />
                {text}
              </li>
            ))}
          </m.ul>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
        >
          <Terminal />
        </m.div>
      </Container>

      <Container className="mt-16 lg:mt-20">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-6"
        >
          <p className="shrink-0 font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">Core stack</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px] text-fg-muted" aria-label="Core stack">
            {profile.coreStack.map((tech, i) => (
              <li key={tech} className="flex items-center gap-5">
                {i > 0 && <span className="size-1 rounded-full bg-line-strong" aria-hidden="true" />}
                {tech}
              </li>
            ))}
          </ul>
        </m.div>
      </Container>
    </section>
  )
}
