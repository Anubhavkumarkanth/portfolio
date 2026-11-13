import { projectsByTrack } from '../../data/projects'
import type { Persona, Track } from '../../data/types'
import { ProjectBlock } from '../projects/ProjectBlock'
import { Section } from '../ui/Section'

export function Work({ track, copy }: { track: Track; copy: Persona['work'] }) {
  return (
    <Section id="work" eyebrow="Selected work" title={copy.title} description={copy.description}>
      <div className="space-y-20">
        {projectsByTrack[track].map((project, i) => (
          <ProjectBlock key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
