import { certifications } from '../../data/certifications'
import { education } from '../../data/education'
import { Card, textLink } from '../ui/primitives'
import { Section } from '../ui/Section'

export function Education() {
  return (
    <Section id="education" title="Where I studied">
      <div className="grid grid-cols-1 gap-4">
        {education.map((edu) => {
          const rows = [
            { label: 'Branch', value: edu.field },
            { label: 'Minor', value: edu.minor?.replace(/^Minor in /, '') },
            { label: 'University', value: edu.university },
            { label: 'Status', value: edu.status },
          ].filter((row): row is { label: string; value: string } => Boolean(row.value))

          return (
            <Card key={edu.institution}>
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
                <div className="flex flex-col p-6 sm:p-8">
                  <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{edu.degree}</h3>
                  <p className="mt-2 text-fg">{edu.institution}</p>
                  <p className="text-sm text-fg-subtle">{edu.location}</p>

                  <p className="mt-8 text-sm text-fg-muted">
                    <a href="#certifications" className={textLink}>
                      Plus {certifications.length} certifications
                    </a>{' '}
                    earned alongside the degree
                  </p>
                </div>

                <div className="border-t border-line p-6 sm:p-8 md:border-t-0 md:border-l">
                  <p className="text-sm text-fg-subtle">Class of</p>
                  <p className="mt-0.5 text-3xl font-semibold tracking-tight text-fg">{edu.graduation}</p>
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
          )
        })}
      </div>
    </Section>
  )
}
