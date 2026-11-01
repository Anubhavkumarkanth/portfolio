import { ArrowUpRight } from 'lucide-react'
import { certifications } from '../../data/certifications'
import { education } from '../../data/education'
import { experience } from '../../data/experience'
import { formatMonth, withBase } from '../../lib/utils'
import { textLink } from '../ui/primitives'
import { Section } from '../ui/Section'

const label = 'text-[13px] font-medium text-fg-subtle'

/** Internship, degree and certificates, side by side. */
export function Background() {
  const job = experience[0]
  const school = education[0]
  return (
    <Section id="background" eyebrow="Background" title="Experience, education and certificates.">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10">
        <div>
          <p className={label}>Experience</p>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg">{job.role}</h3>
          <p className="mt-1 text-[15px] text-fg-muted">{job.company}</p>
          <p className="mt-1 text-sm text-fg-subtle">
            {formatMonth(job.start)} – {formatMonth(job.end)} · {job.location}
          </p>
          <ul className="mt-4 space-y-2.5">
            {job.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                <span className="mt-2.5 size-1 shrink-0 rounded-full bg-fg-subtle" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={label}>Education</p>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg">
            {school.degree}, {school.field}
          </h3>
          <p className="mt-1 text-[15px] text-fg-muted">{school.institution}</p>
          <p className="mt-1 text-sm text-fg-subtle">
            {school.university} · {school.location} · {school.graduation}
          </p>
        </div>

        <div>
          <p className={label}>Certificates</p>
          <ul className="mt-3 space-y-6">
            {certifications.map((c) => (
              <li key={c.name}>
                <h3 className="text-[15px] font-semibold text-fg">{c.name}</h3>
                <p className="mt-0.5 text-sm text-fg-subtle">
                  {c.issuer} · {c.date}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{c.note}</p>
                {c.href && (
                  <a href={withBase(c.href)} target="_blank" rel="noreferrer" className={`mt-2 inline-flex items-center gap-1 text-sm ${textLink}`}>
                    View certificate
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
