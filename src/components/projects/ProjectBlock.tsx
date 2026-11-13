import { useId, useState, type ReactNode } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import type { Project } from '../../data/types'
import { buttonClasses } from '../../lib/button'
import { cn, withBase } from '../../lib/utils'
import { GitHubIcon } from '../ui/BrandIcons'
import { Tag } from '../ui/primitives'
import { EvaluationTable } from './previews/Previews'
import { SipPlayground } from './previews/SipPlayground'

export function Shot({ shot }: { shot: Project['shots'][number] }) {
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
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-fg-subtle">{shot.caption}</figcaption>
    </figure>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h4 className="font-serif text-xl font-medium text-fg">{title}</h4>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function List({ items, numbered = false }: { items: string[]; numbered?: boolean }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
          <span className="w-5 shrink-0 text-center text-fg-subtle tabular-nums" aria-hidden="true">
            {numbered ? `${i + 1}.` : '–'}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

/** Opens when the page is reached through an old `?project=<slug>` link. */
const linkedSlug = () => new URLSearchParams(window.location.search).get('project')

interface ProjectBlockProps {
  project: Project
  index: number
  /** Extra button next to the live and code links (none today). */
  action?: ReactNode
}

/**
 * One project: hook, short story, three numbers, why the tools and a screenshot.
 * The full case study opens in place, underneath.
 */
export function ProjectBlock({ project, index, action }: ProjectBlockProps) {
  const headingId = `${project.slug}-title`
  const panelId = useId()
  const [open, setOpen] = useState(() => linkedSlug() === project.slug)
  const findingsTitle = project.findingsTitle ?? 'What the data showed'

  return (
    <article
      id={project.slug}
      aria-labelledby={headingId}
      className="scroll-mt-24 grid grid-cols-1 gap-8 border-t border-line pt-12 lg:grid-cols-[13rem_1fr] lg:gap-12"
    >
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
          <ul className="mt-3 space-y-3">
            {project.choices.map((c) => (
              <li key={c.pick} className="text-[15px] leading-relaxed text-fg-muted">
                <span className="font-medium text-fg">{c.pick}</span>
                <span className="text-fg-subtle"> instead of {c.over}: </span>
                {c.because}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-9">
          <Shot shot={project.shots[0]} />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className={buttonClasses({ variant: 'primary', size: 'sm' })}
          >
            {open ? 'Hide the case study' : 'Read the case study'}
            <ChevronDown className={cn('size-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
          </button>
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
              Open it live
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          )}
          {action}
          <a href={project.links.github} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'ghost', size: 'sm' })}>
            <GitHubIcon className="size-4" />
            Code
          </a>
        </div>

        <div id={panelId} hidden={!open} className="mt-10 animate-fade-in space-y-11 rounded-2xl border border-line bg-surface p-5 sm:p-8">
          <Block title="The question">
            <p className="text-[17px] leading-relaxed text-pretty text-fg-muted">{project.question}</p>
          </Block>

          <Block title="What I did">
            <List items={project.steps} numbered />
          </Block>

          <Block title={findingsTitle}>
            <List items={project.findings} />
          </Block>

          {project.evaluation && (
            <Block title="How the models compared">
              <div className="rounded-xl border border-line p-5 sm:p-6">
                <EvaluationTable evaluation={project.evaluation} />
              </div>
            </Block>
          )}

          {open && project.extra === 'sip-playground' && (
            <Block title="Try it yourself">
              <SipPlayground />
            </Block>
          )}

          {project.shots.slice(1).map((shot) => (
            <Shot key={shot.src} shot={shot} />
          ))}

          <Block title="What it can’t do">
            <List items={project.limits} />
            {project.credit && (
              <p className="mt-5 border-l-2 border-line-strong pl-4 text-sm leading-relaxed text-fg-subtle">{project.credit}</p>
            )}
          </Block>

          <button
            type="button"
            onClick={() => {
              setOpen(false)
              document.getElementById(project.slug)?.scrollIntoView({ block: 'start' })
            }}
            aria-controls={panelId}
            className={buttonClasses({ variant: 'ghost', size: 'sm', className: '-ml-3' })}
          >
            Hide the case study
            <ChevronDown className="size-3.5 rotate-180" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
