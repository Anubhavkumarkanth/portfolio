import { ArrowRight, Download } from 'lucide-react'
import { education } from '../../data/education'
import { experience } from '../../data/experience'
import { profile } from '../../data/profile'
import { buttonClasses } from '../../lib/button'
import { formatMonth, withBase } from '../../lib/utils'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Container } from '../ui/primitives'

const iconLink = 'inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg'

/** Joins phrases so a narrow screen can only break the line between them, never inside one. */
function Phrases({ parts, separator }: { parts: string[]; separator: string }) {
  return parts.map((part, i) => (
    <span key={part}>
      <span className="whitespace-nowrap">
        {part}
        {i < parts.length - 1 && separator}
      </span>
      {i < parts.length - 1 && ' '}
    </span>
  ))
}

export function Hero() {
  const school = education[0]
  const job = experience[0]
  const specialties = 'Java · Python · SQL · Data Analytics'

  const meta = [
    ['B.E. ECE', 'NMIT Bangalore', `Class of ${school.graduation}`],
    [job.role, `${formatMonth(job.start)}–${formatMonth(job.end)}`],
    [profile.location],
  ]

  return (
    <section id="home" aria-labelledby="home-heading" className="pt-28 pb-12 sm:pt-36 sm:pb-16">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm text-fg-subtle">{profile.availability}</p>

          <h1 id="home-heading" className="mt-3">
            <span className="block text-4xl leading-tight font-semibold tracking-[-0.025em] text-fg sm:text-5xl">
              {profile.name}
            </span>
            <span className="mt-4 block text-lg leading-snug text-fg sm:text-xl">
              <Phrases parts={profile.role.split(' | ')} separator=" |" />
            </span>
            <span className="mt-1 block text-lg leading-snug text-fg-muted sm:text-xl">{specialties}</span>
          </h1>

          <p className="mt-6 max-w-2xl leading-relaxed text-pretty text-fg-muted sm:text-[17px]">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex flex-wrap gap-3">
              <a href="#projects" className={buttonClasses({ variant: 'primary' })}>
                View projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={withBase(profile.resume.href)}
                download={profile.resume.fileName}
                className={buttonClasses({ variant: 'secondary' })}
              >
                <Download className="size-4" aria-hidden="true" />
                Resume
              </a>
            </div>
            <div className="flex gap-6">
              <a href={profile.socials.github.href} target="_blank" rel="noreferrer" className={iconLink}>
                <GitHubIcon className="size-4" />
                GitHub
              </a>
              <a href={profile.socials.linkedin.href} target="_blank" rel="noreferrer" className={iconLink}>
                <LinkedInIcon className="size-4" />
                LinkedIn
              </a>
            </div>
          </div>

          <ul className="mt-10 space-y-1 text-sm text-fg-subtle">
            {meta.map((parts) => (
              <li key={parts[0]}>
                <Phrases parts={parts} separator=" ·" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-1.5 border-t border-line pt-5 text-sm sm:flex-row sm:gap-5">
          <p className="shrink-0 text-fg-subtle">Core stack</p>
          <ul className="flex flex-wrap gap-x-2 gap-y-1 text-fg-muted" aria-label="Core stack">
            {profile.coreStack.map((tech, i) => (
              <li key={tech} className="whitespace-nowrap">
                {tech}
                {i < profile.coreStack.length - 1 && (
                  <span aria-hidden="true" className="ml-2 text-fg-subtle">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
