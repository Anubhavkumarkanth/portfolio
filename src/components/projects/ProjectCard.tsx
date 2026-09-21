import { ArrowRight, Check } from 'lucide-react'
import { useProjectModal } from '../../context/projectModal'
import type { Project } from '../../data/types'
import { buttonClasses } from '../../lib/button'
import { GitHubIcon } from '../ui/BrandIcons'
import { Card, Tag } from '../ui/primitives'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { openProject, prefetch } = useProjectModal()

  return (
    <Card className="group flex h-full flex-col p-6 sm:p-7" onPointerEnter={prefetch} onFocus={prefetch}>
      <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">
        <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
        <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
        {project.kind}
      </p>

      <h3 className="mt-3.5 text-xl font-semibold tracking-tight text-fg">
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

      <p className="mt-2.5 text-sm leading-relaxed text-pretty text-fg-muted">{project.tagline}</p>

      <ul className="mt-5 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-fg/90">
            <Check className="mt-[3px] size-3.5 shrink-0 text-accent" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
        {project.tags.map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-1 lg:mt-auto lg:pt-6">
        <span aria-hidden="true" className={buttonClasses({ variant: 'primary', size: 'sm' })}>
          Case study
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
            Code
            <span className="sr-only"> for {project.name} on GitHub</span>
          </a>
        )}
      </div>
    </Card>
  )
}
