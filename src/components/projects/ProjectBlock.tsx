import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/types'
import { buttonClasses } from '../../lib/button'
import { withBase } from '../../lib/utils'
import { GitHubIcon } from '../ui/BrandIcons'
import { Tag } from '../ui/primitives'

export function Shot({ shot, priority = false }: { shot: Project['shots'][number]; priority?: boolean }) {
  // Tall screenshots are capped so they aren't blown up past their real size.
  const portrait = shot.height > shot.width
  return (
    <figure style={portrait ? { maxWidth: Math.min(shot.width, 520) } : undefined}>
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
        <img
          src={withBase(shot.src)}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-fg-subtle">{shot.caption}</figcaption>
    </figure>
  )
}

export function Choices({ choices }: { choices: Project['choices'] }) {
  return (
    <ul className="space-y-3">
      {choices.map((c) => (
        <li key={c.pick} className="text-[15px] leading-relaxed text-fg-muted">
          <span className="font-medium text-fg">{c.pick}</span>
          <span className="text-fg-subtle"> instead of {c.over}: </span>
          {c.because}
        </li>
      ))}
    </ul>
  )
}

interface ProjectBlockProps {
  project: Project
  index: number
  /** Opens the case study. Omitted on pages without one. */
  onOpen?: () => void
  onPrefetch?: () => void
}

/** One project on the page: hook, short story, three numbers, why the tools, then the picture. */
export function ProjectBlock({ project, index, onOpen, onPrefetch }: ProjectBlockProps) {
  const headingId = `${project.slug}-title`
  return (
    <article aria-labelledby={headingId} className="grid grid-cols-1 gap-8 border-t border-line pt-12 lg:grid-cols-[13rem_1fr] lg:gap-12">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <p className="font-mono text-sm text-fg-subtle">{String(index + 1).padStart(2, '0')}</p>
        <h3 id={headingId} className="mt-2 text-lg font-semibold tracking-tight text-fg">
          {project.name}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools used">
          {project.tools.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      </div>

      <div className="min-w-0">
        <p className="font-serif text-[1.75rem] leading-snug font-medium tracking-[-0.01em] text-balance text-fg sm:text-[2.1rem]">
          {project.hook}
        </p>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-pretty text-fg-muted">{project.summary}</p>

        <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {project.results.map((r) => (
            <div key={r.label} className="bg-surface p-5">
              <dt className="sr-only">{r.label}</dt>
              <dd className="font-serif text-2xl text-fg tabular-nums">{r.value}</dd>
              <dd className="mt-1 text-sm leading-snug text-fg-muted">{r.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <h4 className="text-sm font-medium text-fg">Why these tools</h4>
          <div className="mt-3">
            <Choices choices={project.choices} />
          </div>
        </div>

        <div className="mt-9">
          <Shot shot={project.shots[0]} />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          {onOpen && (
            <button
              type="button"
              onClick={onOpen}
              onPointerEnter={onPrefetch}
              onFocus={onPrefetch}
              className={buttonClasses({ variant: 'primary', size: 'sm' })}
            >
              Read the case study
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          )}
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
              Open it live
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          )}
          <a href={project.links.github} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'ghost', size: 'sm' })}>
            <GitHubIcon className="size-4" />
            Code
          </a>
        </div>
      </div>
    </article>
  )
}
