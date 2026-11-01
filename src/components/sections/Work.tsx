import { projects } from '../../data/projects'
import { useProjectModal } from '../../context/projectModal'
import { ProjectBlock } from '../projects/ProjectBlock'
import { Section } from '../ui/Section'

export function Work() {
  const { openProject, prefetch } = useProjectModal()
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Four projects, each starting with a real question."
      description="Every one uses public data, is tested before anything is published, and is live for you to open. The most relevant to a data analyst role come first."
    >
      <div className="space-y-20">
        {projects.map((project, i) => (
          <ProjectBlock
            key={project.slug}
            project={project}
            index={i}
            onOpen={() => openProject(project.slug)}
            onPrefetch={prefetch}
          />
        ))}
      </div>
    </Section>
  )
}
