import { m } from 'framer-motion'
import { Briefcase, MapPin } from 'lucide-react'
import { experience } from '../../data/experience'
import { EASE_OUT, formatDuration, formatMonth } from '../../lib/utils'
import { Card, Reveal, Tag } from '../ui/primitives'
import { Section } from '../ui/Section'

export function ExperienceTimeline() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="Internship experience"
      description="Three months on a backend team, working in Java and Spring Boot."
    >
      <div className="relative">
        {/* Rail */}
        <m.div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-linear-to-b from-accent/70 via-line-strong to-transparent sm:left-[15px]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
        />

        <ol className="space-y-10">
          {experience.map((job) => (
            <li key={`${job.company}-${job.start}`} className="relative pl-10 sm:pl-14">
              <span className="absolute top-1 left-0 grid size-6 place-items-center rounded-full border border-accent/40 bg-ink-950 sm:size-8">
                <Briefcase className="size-3 text-accent sm:size-3.5" aria-hidden="true" />
              </span>

              <Reveal>
                <Card className="p-6 sm:p-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-fg">{job.role}</h3>
                      <p className="mt-1 text-fg-muted">{job.company}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 md:items-end">
                      <p className="font-mono text-[13px] text-fg">
                        <time dateTime={job.start}>{formatMonth(job.start)}</time> –{' '}
                        <time dateTime={job.end}>{formatMonth(job.end)}</time>
                        <span className="text-fg-subtle"> · {formatDuration(job.start, job.end)}</span>
                      </p>
                      <p className="flex items-center gap-3 text-xs text-fg-subtle">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5" aria-hidden="true" />
                          {job.location}
                        </span>
                        <Tag>{job.type}</Tag>
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 leading-relaxed text-fg-muted">{job.summary}</p>


                  <ul className="mt-6 space-y-3">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {job.tech.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </li>
          ))}

        </ol>
      </div>
    </Section>
  )
}
