import { projects } from '../../data/projects'
import { ProjectCard } from '../projects/ProjectCard'
import { Reveal } from '../ui/primitives'
import { Section } from '../ui/Section'

export function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Projects"
      title="Projects"
      description="A few things I built while learning. Open any one to read more about how it works. None of them are deployed, but the code is on GitHub."
    >
      {projects.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line p-10 text-center text-fg-muted">
          Projects are being written up — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06} className="h-full">
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
