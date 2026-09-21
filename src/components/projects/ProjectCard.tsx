import { useProjectModal } from '../../context/projectModal'
import type { Project } from '../../data/types'
import { Card, Tag } from '../ui/primitives'

export function ProjectCard({ project }: { project: Project }) {
  const { openProject, prefetch } = useProjectModal()

  return (
    <Card
      className="group flex h-full flex-col p-6 transition-colors hover:border-line-strong"
      onPointerEnter={prefetch}
      onFocus={prefetch}
    >
      <p className="text-sm text-fg-subtle">{project.kind}</p>

      <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg">
        {/* Stretched button: the whole card opens the case study. */}
        <button
          type="button"
          onClick={() => openProject(project.slug)}
          aria-haspopup="dialog"
          className="text-left after:absolute after:inset-0 after:rounded-md after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
        >
          {project.name}
        </button>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-pretty text-fg-muted">{project.tagline}</p>

      <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-fg/90 marker:text-fg-subtle">
        {project.highlights.map((h) => (
          <li key={h} className="pl-1">
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

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm lg:mt-auto lg:pt-6">
        <span aria-hidden="true" className="text-fg underline decoration-fg/30 underline-offset-4 group-hover:decoration-fg">
          Read case study
        </span>
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 text-fg-muted underline decoration-fg/20 underline-offset-4 transition-colors hover:text-fg hover:decoration-fg"
          >
            Code on GitHub
            <span className="sr-only"> for {project.name}</span>
          </a>
        )}
      </div>
    </Card>
  )
}
