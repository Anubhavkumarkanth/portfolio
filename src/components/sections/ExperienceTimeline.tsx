import { experience } from '../../data/experience'
import { formatDuration, formatMonth } from '../../lib/utils'
import { Card, Tag } from '../ui/primitives'
import { Section } from '../ui/Section'

export function ExperienceTimeline() {
  return (
    <Section id="experience" title="Internship experience" description="Three months as a backend intern.">
      <ol className="space-y-6">
        {experience.map((job) => (
          <li key={`${job.company}-${job.start}`}>
            <Card className="p-6 sm:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-fg">{job.role}</h3>
                  <p className="mt-1 text-fg-muted">{job.company}</p>
                </div>
                <div className="text-sm md:text-right">
                  <p className="text-fg tabular-nums">
                    <time dateTime={job.start}>{formatMonth(job.start)}</time> –{' '}
                    <time dateTime={job.end}>{formatMonth(job.end)}</time>
                    <span className="text-fg-subtle"> · {formatDuration(job.start, job.end)}</span>
                  </p>
                  <p className="mt-0.5 text-fg-subtle">
                    {job.type} · {job.location}
                  </p>
                </div>
              </div>

              <p className="mt-5 leading-relaxed text-fg-muted">{job.summary}</p>

              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg-muted marker:text-fg-subtle">
                {job.highlights.map((h) => (
                  <li key={h} className="pl-1">
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
          </li>
        ))}
      </ol>
    </Section>
  )
}
