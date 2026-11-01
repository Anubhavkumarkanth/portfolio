import { useEffect, useRef, type ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { projects } from '../../data/projects'
import type { Project } from '../../data/types'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useScrollLock } from '../../hooks/useScrollLock'
import { buttonClasses } from '../../lib/button'
import { cn } from '../../lib/utils'
import { GitHubIcon } from '../ui/BrandIcons'
import { Choices, Shot } from './ProjectBlock'
import { EvaluationTable } from './previews/Previews'
import { SipPlayground } from './previews/SipPlayground'

interface ProjectModalProps {
  project: Project
  onClose: () => void
  onSwitch: (slug: string) => void
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="font-serif text-xl font-medium text-fg">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function List({ items, numbered = false }: { items: string[]; numbered?: boolean }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
          <span className={cn('w-5 shrink-0 text-fg-subtle tabular-nums', !numbered && 'text-center')} aria-hidden="true">
            {numbered ? `${i + 1}.` : '–'}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

/** The case study: the question, what I did, what I found, and the honest limits. */
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
      <div className="absolute inset-0 animate-fade-in bg-black/45 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-hook"
        tabIndex={-1}
        className="relative flex max-h-[94dvh] w-full max-w-3xl animate-rise flex-col overflow-hidden rounded-t-2xl border border-line bg-paper shadow-soft focus:outline-none sm:max-h-[90dvh] sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-8">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-accent">Case study</p>
            <h2 id="project-modal-title" className="mt-0.5 text-lg font-semibold tracking-tight text-fg">
              {project.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            aria-label="Close case study"
            className={buttonClasses({ variant: 'ghost', size: 'icon-sm', className: '-mr-2' })}
          >
            <X className="size-5" />
          </button>
        </header>

        <div ref={bodyRef} className="scrollbar-thin flex-1 overflow-y-auto overscroll-contain">
          <div key={project.slug} className="space-y-12 px-5 py-8 sm:px-8 sm:py-10">
            <div>
              <p id="project-modal-hook" className="font-serif text-2xl leading-snug text-balance text-fg sm:text-[1.7rem]">
                {project.hook}
              </p>
              <p className="mt-5 text-[17px] leading-relaxed text-pretty text-fg-muted">{project.question}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'primary', size: 'sm' })}>
                    Open it live
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                )}
                <a href={project.links.github} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
                  <GitHubIcon className="size-4" />
                  Code and README
                </a>
              </div>
            </div>

            <Block title="What I did">
              <List items={project.steps} numbered />
            </Block>

            <Block title="What the data showed">
              <List items={project.findings} />
            </Block>

            {project.evaluation && (
              <Block title="How the models compared">
                <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
                  <EvaluationTable evaluation={project.evaluation} />
                </div>
              </Block>
            )}

            {project.extra === 'sip-playground' && (
              <Block title="Try it yourself">
                <SipPlayground />
              </Block>
            )}

            <div className="space-y-8">
              {project.shots.map((shot) => (
                <Shot key={shot.src} shot={shot} />
              ))}
            </div>

            <Block title="Why these tools">
              <Choices choices={project.choices} />
            </Block>

            <Block title="What it can’t do">
              <List items={project.limits} />
              {project.credit && (
                <p className="mt-5 border-l-2 border-line-strong pl-4 text-sm leading-relaxed text-fg-subtle">{project.credit}</p>
              )}
            </Block>
          </div>
        </div>

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
      </div>
    </div>
  )
}
