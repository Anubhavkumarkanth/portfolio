import { profile } from '../../data/profile'
import { Card, Reveal } from '../ui/primitives'
import { Section } from '../ui/Section'

export function About() {
  const [lead, ...paragraphs] = profile.about.paragraphs
  return (
    <Section id="about" index="01" eyebrow="About" title="About me">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
        <Reveal className="space-y-5 text-[17px] leading-[1.75] text-pretty text-fg-muted">
          <p className="text-fg">{lead}</p>
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-6 sm:p-7 lg:sticky lg:top-24">
            <p className="font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">At a glance</p>
            <dl className="mt-5 divide-y divide-line">
              {profile.about.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="shrink-0 text-sm text-fg-subtle">{fact.label}</dt>
                  <dd className="text-sm text-fg sm:text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex items-center gap-2.5 rounded-lg border border-ok/20 bg-ok/[0.06] px-3.5 py-2.5 text-sm text-fg">
              <span className="size-2 rounded-full bg-ok" aria-hidden="true" />
              {profile.availability}
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
