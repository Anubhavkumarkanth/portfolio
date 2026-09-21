import { projects } from '../../data/projects'
import { ProjectCard } from '../projects/ProjectCard'
import { Section } from '../ui/Section'

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      description="A few things I built while learning. Open any one to read more about how it works. None of them are deployed, but the code is on GitHub."
    >
      {projects.length === 0 ? (
        <p className="rounded-md border border-dashed border-line p-10 text-center text-fg-muted">
          Projects are being written up — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </Section>
  )
}
