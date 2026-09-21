import { ArrowRight, Check } from 'lucide-react'
import { useProjectModal } from '../../context/projectModal'
import type { Project } from '../../data/types'
import { buttonClasses } from '../../lib/button'
import { cn } from '../../lib/utils'
import { GitHubIcon } from '../ui/BrandIcons'
import { Card, Tag } from '../ui/primitives'
import { ProjectPreview } from './previews/Previews'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { openProject, prefetch } = useProjectModal()
  const flip = index % 2 === 1

  return (
    <Card className="group overflow-hidden" onPointerEnter={prefetch} onFocus={prefetch}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
        <div className={cn('flex flex-col p-6 sm:p-8 lg:p-10', flip && 'lg:order-2')}>
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            {project.kind}
          </p>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-[1.75rem]">
            {/* Stretched button: the whole card opens the case study. */}
            <button
              type="button"
              onClick={() => openProject(project.slug)}
              aria-haspopup="dialog"
              className="text-left transition-colors after:absolute after:inset-0 after:rounded-xl after:content-[''] group-hover:text-accent-strong focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent/70"
            >
              {project.name}
            </button>
          </h3>
          <p className="mt-3 max-w-prose leading-relaxed text-pretty text-fg-muted">{project.tagline}</p>

          <ul className="mt-6 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                <Check className="mt-[3px] size-4 shrink-0 text-accent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
            <span aria-hidden="true" className={buttonClasses({ variant: 'primary', size: 'sm' })}>
              Read case study
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className={buttonClasses({ variant: 'secondary', size: 'sm', className: 'relative z-10' })}
              >
                <GitHubIcon className="size-4" />
                Source
                <span className="sr-only"> code for {project.name} on GitHub</span>
              </a>
            )}
            {!project.links.demo && <span className="font-mono text-[11px] text-fg-subtle">Live demo · not deployed yet</span>}
          </div>
        </div>

        <div
          className={cn(
            'pointer-events-none border-t border-line bg-ink-950/50 p-4 sm:p-6 lg:border-t-0 lg:p-8',
            flip ? 'lg:order-1 lg:border-r' : 'lg:border-l',
          )}
        >
          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
            <ProjectPreview project={project} />
          </div>
        </div>
      </div>
    </Card>
  )
}
