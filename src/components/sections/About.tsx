import { profile } from '../../data/profile'
import { Section } from '../ui/Section'

export function About() {
  const [lead, ...paragraphs] = profile.about.paragraphs
  return (
    <Section id="about" title="About me">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
        <div className="space-y-5 text-[17px] leading-[1.75] text-pretty text-fg-muted">
          <p className="text-fg">{lead}</p>
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <h3 className="text-sm font-medium text-fg">At a glance</h3>
          <dl className="mt-4 divide-y divide-line">
            {profile.about.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <dt className="shrink-0 text-sm text-fg-subtle">{fact.label}</dt>
                <dd className="text-sm text-fg sm:text-right">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
