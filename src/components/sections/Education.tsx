import { ArrowRight, GraduationCap } from 'lucide-react'
import { certifications } from '../../data/certifications'
import { education } from '../../data/education'
import { Card, Reveal } from '../ui/primitives'
import { Section } from '../ui/Section'

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education" title="Where I studied" className="sm:py-24">
      <div className="grid grid-cols-1 gap-4">
        {education.map((edu) => {
          const rows = [
            { label: 'Branch', value: edu.field },
            { label: 'Minor', value: edu.minor?.replace(/^Minor in /, '') },
            { label: 'University', value: edu.university },
            { label: 'Status', value: edu.status },
          ].filter((row): row is { label: string; value: string } => Boolean(row.value))

          return (
            <Reveal key={edu.institution}>
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
                  <div className="flex flex-col p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-lg border border-accent/20 bg-accent-soft text-accent">
                        <GraduationCap className="size-5" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-fg sm:text-2xl">{edu.degree}</h3>
                    <p className="mt-2 text-fg">{edu.institution}</p>
                    <p className="text-sm text-fg-subtle">{edu.location}</p>

                    <a
                      href="#certifications"
                      className="group mt-8 inline-flex items-center gap-1.5 self-start text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      Plus {certifications.length} certifications earned alongside the degree
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  </div>

                  <div className="border-t border-line bg-ink-950/40 p-6 sm:p-8 md:border-t-0 md:border-l">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">Class of</p>
                    <p className="mt-1 font-mono text-5xl font-medium tracking-tight text-fg">{edu.graduation}</p>
                    <dl className="mt-6 divide-y divide-line">
                      {rows.map((row) => (
                        <div key={row.label} className="flex justify-between gap-6 py-2.5 text-sm">
                          <dt className="text-fg-subtle">{row.label}</dt>
                          <dd className="text-right text-fg-muted">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
