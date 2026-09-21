import { projects } from '../../data/projects'
import { ProjectCard } from '../projects/ProjectCard'
import { Reveal } from '../ui/primitives'
import { Section } from '../ui/Section'

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Projects"
      title="Selected engineering work"
      description="Built end to end and documented honestly. Open any project for the architecture, the engineering decisions behind it, and its known limitations."
    >
      {projects.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line p-10 text-center text-fg-muted">
          Projects are being written up — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
