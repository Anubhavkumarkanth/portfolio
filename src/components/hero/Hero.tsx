import { m, type Variants } from 'framer-motion'
import { ArrowRight, Briefcase, Download, GraduationCap, MapPin } from 'lucide-react'
import { education } from '../../data/education'
import { experience } from '../../data/experience'
import { profile } from '../../data/profile'
import { buttonClasses } from '../../lib/button'
import { EASE_OUT, formatMonth, withBase } from '../../lib/utils'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Container } from '../ui/primitives'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-20rem] left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(242_178_92/0.07),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-ink-950" />
    </div>
  )
}

export function Hero() {
  const school = education[0]
  const job = experience[0]
  const specialties = 'Java, Python & SQL'

  const meta = [
    { icon: GraduationCap, text: `B.E. ECE · NMIT Bangalore · Class of ${school.graduation}` },
    { icon: Briefcase, text: `${job.role} · ${formatMonth(job.start)}–${formatMonth(job.end)}` },
    { icon: MapPin, text: profile.location },
  ]

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36"
    >
      <HeroBackground />

      <Container>
        <m.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <m.p
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1 pr-3.5 pl-2.5 text-xs text-fg-muted"
          >
            <span className="size-2 rounded-full bg-ok" aria-hidden="true" />
            {profile.availability} · Class of {school.graduation}
          </m.p>

          <h1 id="home-heading" className="mt-6">
            <m.span
              variants={item}
              className="block pb-1 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em] text-fg sm:text-5xl lg:text-[3.5rem]"
            >
              {profile.name}
            </m.span>
            <m.span
              variants={item}
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-normal tracking-tight text-fg-muted sm:text-xl"
            >
              <span>{profile.role}</span>
              <span aria-hidden="true" className="hidden h-5 w-px bg-line-strong sm:block" />
              <span className="text-fg">{specialties}</span>
            </m.span>
          </h1>

          <m.p variants={item} className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-fg-muted sm:text-[17px]">
            {profile.intro}
          </m.p>

          <m.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className={buttonClasses({ variant: 'primary', className: 'group' })}>
              View projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href={withBase(profile.resume.href)}
              download={profile.resume.fileName}
              className={buttonClasses({ variant: 'secondary' })}
            >
              <Download className="size-4" aria-hidden="true" />
              Resume
            </a>
            <a
              href={profile.socials.github.href}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses({ variant: 'secondary' })}
            >
              <GitHubIcon className="size-[17px]" />
              GitHub
            </a>
            <a
              href={profile.socials.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses({ variant: 'secondary' })}
            >
              <LinkedInIcon className="size-[16px]" />
              LinkedIn
            </a>
          </m.div>

          <m.ul variants={item} className="mt-9 flex flex-col gap-2.5 text-sm text-fg-subtle sm:flex-row sm:flex-wrap sm:gap-x-6">
            {meta.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="size-4 shrink-0 text-fg-subtle/80" aria-hidden="true" />
                {text}
              </li>
            ))}
          </m.ul>
        </m.div>
      </Container>

      <Container className="mt-14 sm:mt-16">
        <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-6">
          <p className="shrink-0 font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">Core stack</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px] text-fg-muted" aria-label="Core stack">
            {profile.coreStack.map((tech, i) => (
              <li key={tech} className="flex items-center gap-5">
                {i > 0 && <span className="size-1 rounded-full bg-line-strong" aria-hidden="true" />}
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
