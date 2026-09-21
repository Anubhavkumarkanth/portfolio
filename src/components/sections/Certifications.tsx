import { ArrowUpRight } from 'lucide-react'
import { certifications } from '../../data/certifications'
import type { Certification } from '../../data/types'
import { withBase } from '../../lib/utils'
import { Card, Tag } from '../ui/primitives'
import { Section } from '../ui/Section'

export function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm text-fg-muted">{cert.issuer}</p>
        <p className="shrink-0 text-sm text-fg-subtle">{cert.date}</p>
      </div>
      <h3 className="mt-2 font-medium leading-snug text-fg">{cert.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{cert.description}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Skills">
        {cert.skills.map((skill) => (
          <li key={skill}>
            <Tag>{skill}</Tag>
          </li>
        ))}
      </ul>
      {cert.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
          {cert.links.map((link) => (
            <a
              key={link.href}
              href={withBase(link.href)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:decoration-fg"
            >
              {link.label}
              <ArrowUpRight className="size-3.5 text-fg-subtle" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </Card>
  )
}

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications" description="Courses I did alongside my degree.">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {certifications.map((cert) => (
          <li key={cert.name}>
            <CertificationCard cert={cert} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
