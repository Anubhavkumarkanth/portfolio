import { ArrowUpRight, Award } from 'lucide-react'
import { certifications } from '../../data/certifications'
import type { Certification } from '../../data/types'
import { withBase } from '../../lib/utils'
import { Card, Reveal, Tag } from '../ui/primitives'
import { Section } from '../ui/Section'

export function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-10 place-items-center rounded-lg border border-line-strong bg-ink-800 text-accent">
          <Award className="size-5" aria-hidden="true" />
        </span>
        <span className="font-mono text-xs text-fg-subtle">{cert.date}</span>
      </div>
      <h3 className="mt-5 font-medium leading-snug text-fg">{cert.name}</h3>
      <p className="mt-1 text-sm text-accent-strong/90">{cert.issuer}</p>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{cert.description}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Skills">
        {cert.skills.map((skill) => (
          <li key={skill}>
            <Tag>{skill}</Tag>
          </li>
        ))}
      </ul>
      {cert.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-5">
          {cert.links.map((link) => (
            <a
              key={link.href}
              href={withBase(link.href)}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 text-sm text-fg-muted transition-colors hover:text-accent-strong"
            >
              {link.label}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </Card>
  )
}

export function Certifications() {
  return (
    <Section
      id="certifications"
      index="06"
      eyebrow="Certifications"
      title="Certifications"
      description="Courses I did alongside my degree."
    >
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {certifications.map((cert, i) => (
          <li key={cert.name}>
            <Reveal delay={i * 0.06} className="h-full">
              <CertificationCard cert={cert} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
