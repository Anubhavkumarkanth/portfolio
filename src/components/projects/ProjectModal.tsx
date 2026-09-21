import { useEffect, useRef, type ReactNode } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, CircleAlert, X } from 'lucide-react'
import { projects } from '../../data/projects'
import type { Project } from '../../data/types'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useScrollLock } from '../../hooks/useScrollLock'
import { buttonClasses } from '../../lib/button'
import { cn } from '../../lib/utils'
import { GitHubIcon } from '../ui/BrandIcons'
import { Tag } from '../ui/primitives'
import { EvaluationTable } from './previews/Previews'
import { OmsWalkthrough } from './previews/OmsWalkthrough'
import { SqlBlock } from './previews/SqlBlock'
import { SipPlayground } from './previews/SipPlayground'

interface ProjectModalProps {
  project: Project
  onClose: () => void
  onSwitch: (slug: string) => void
}

function Block({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      <h3 className="font-medium text-fg">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  )
}

export default function ProjectModal({ project, onClose, onSwitch }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  useScrollLock(true)
  useFocusTrap(panelRef, true, onClose)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
  }, [project.slug])

  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(currentIndex + 1) % projects.length]

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 animate-fade-in bg-black/70" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-summary"
        tabIndex={-1}
        className="relative flex max-h-[94dvh] w-full max-w-4xl animate-fade-in flex-col overflow-hidden rounded-t-lg border border-line-strong bg-ink-900 focus:outline-none sm:max-h-[90dvh] sm:rounded-lg"
      >
        {/* Header */}
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-8 sm:py-5">
          <div className="min-w-0">
            <p className="text-sm text-fg-subtle">{project.kind} · Case study</p>
            <h2 id="project-modal-title" className="mt-1.5 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
              {project.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            aria-label="Close case study"
            className={buttonClasses({ variant: 'ghost', size: 'icon-sm', className: '-mr-2 shrink-0' })}
          >
            <X className="size-5" />
          </button>
        </header>

        {/* Body */}
        <div ref={bodyRef} className="scrollbar-thin flex-1 overflow-y-auto overscroll-contain">
          <div key={project.slug} className="space-y-12 px-5 py-7 sm:px-8 sm:py-9">
            <div>
              <p className="text-lg leading-relaxed text-pretty text-fg-muted">{project.tagline}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'primary', size: 'sm' })}>
                    <GitHubIcon className="size-4" />
                    View source
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                )}
                {project.links.demo ? (
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
                    Live demo
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <Tag tone="muted">Live demo · not deployed yet</Tag>
                )}
              </div>
            </div>

            <div id="project-modal-summary" className="border-l-2 border-line-strong pl-5">
              <p className="text-sm text-fg-subtle">The 20-second version</p>
              <p className="mt-2 leading-relaxed text-pretty text-fg">{project.summary}</p>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <Block title="The problem">
                <p className="leading-relaxed text-pretty text-fg-muted">{project.problem}</p>
              </Block>
              <Block title="How it works">
                <ol className="space-y-3">
                  {project.howItWorks.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                      <span className="w-4 shrink-0 text-fg-subtle tabular-nums">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </Block>
            </div>

            <Block title="Architecture">
              <ol className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-0">
                {project.architecture.map((node, i) => (
                  <li key={node.title} className="flex flex-col items-stretch lg:flex-row lg:items-center">
                    <div className="flex-1 rounded-md border border-line p-4">
                      <p className="text-sm font-medium text-fg">{node.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-fg-subtle">{node.detail}</p>
                    </div>
                    {i < project.architecture.length - 1 && (
                      <span aria-hidden="true" className="grid place-items-center py-1 text-fg-subtle lg:px-1.5 lg:py-0">
                        <ArrowDown className="size-4 lg:hidden" />
                        <ArrowRight className="hidden size-4 lg:block" />
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </Block>

            {project.preview === 'sip' && (
              <Block title="Try the engine">
                <SipPlayground />
              </Block>
            )}
            {project.queries && (
              <Block title="Reporting queries">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
                  {project.sql && (
                    <div className="rounded-md border border-line bg-ink-950/60 p-4 sm:p-5">
                      <SqlBlock code={project.sql.code} />
                      <p className="mt-3 text-[11px] leading-relaxed text-fg-subtle">{project.sql.caption}</p>
                    </div>
                  )}
                  <ol className="divide-y divide-line self-start rounded-md border border-line">
                    {project.queries.map((q, i) => (
                      <li key={q.title} className="flex gap-3 px-4 py-3">
                        <span className="w-4 shrink-0 text-sm text-fg-subtle tabular-nums">{i + 1}.</span>
                        <div>
                          <p className="text-sm text-fg">{q.title}</p>
                          <p className="mt-0.5 font-mono text-[11px] text-fg-subtle">{q.concepts}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Block>
            )}
            {project.preview === 'oms' && (
              <Block title="Walk through the transaction">
                <OmsWalkthrough />
              </Block>
            )}
            {project.evaluation && (
              <Block title="Model evaluation">
                <div className="rounded-md border border-line p-5 sm:p-6">
                  <EvaluationTable evaluation={project.evaluation} size="lg" />
                </div>
              </Block>
            )}

            <Block title="Key features">
              <ul className="grid list-disc grid-cols-1 gap-x-10 gap-y-2 pl-5 text-sm leading-relaxed text-fg-muted marker:text-fg-subtle sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="pl-1">
                    {f}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Engineering decisions">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.engineering.map((item) => (
                  <div key={item.title} className="rounded-md border border-line p-4 sm:p-5">
                    <p className="text-sm font-medium text-fg">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.detail}</p>
                  </div>
                ))}
              </div>
            </Block>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr]">
              <Block title="My contribution">
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg-muted marker:text-fg-subtle">
                  {project.contribution.map((c) => (
                    <li key={c} className="pl-1">
                      {c}
                    </li>
                  ))}
                </ul>
                {project.contributionNote && (
                  <p className="mt-4 border-l-2 border-line-strong pl-4 text-sm leading-relaxed text-fg-subtle italic">
                    {project.contributionNote}
                  </p>
                )}
              </Block>
              <Block title="Tech stack">
                <dl className="space-y-4">
                  {project.stack.map((group) => (
                    <div key={group.group}>
                      <dt className="text-xs text-fg-subtle">{group.group}</dt>
                      <dd className="mt-2 flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <Tag key={item}>{item}</Tag>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Block>
            </div>

            <Block title="Known limitations">
              <ul className="space-y-3">
                {project.limitations.map((l) => (
                  <li key={l} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                    <CircleAlert className="mt-[3px] size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>

        {/* Footer */}
        {projects.length > 1 && (
          <footer className="flex items-center justify-between gap-4 border-t border-line px-5 py-3 sm:px-8">
            <p className="hidden text-xs text-fg-subtle sm:block">
              {currentIndex + 1} of {projects.length}
            </p>
            <button
              type="button"
              onClick={() => onSwitch(next.slug)}
              className={cn(buttonClasses({ variant: 'ghost', size: 'sm' }), 'ml-auto')}
            >
              Next: {next.name}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </footer>
        )}
      </div>
    </div>
  )
}
