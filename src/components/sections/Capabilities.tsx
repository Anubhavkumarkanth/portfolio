import { capabilities } from '../../data/capabilities'
import { Card, Reveal } from '../ui/primitives'
import { ProofLink } from '../ui/ProofLink'
import { Section } from '../ui/Section'

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      index="07"
      eyebrow="What I can do"
      title="What I can take on from day one"
      description="Skills translated into work, each one linked to where I’ve already done it."
    >
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon
          return (
            <li key={cap.title}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <Card className="flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <Icon className="size-5 text-accent" aria-hidden="true" />
                    <span className="font-mono text-[11px] text-fg-subtle">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 font-medium text-fg">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{cap.description}</p>
                  <div className="mt-auto pt-5">
                    <p className="sr-only">Evidence:</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {cap.proof.map((target) => (
                        <li key={target.label}>
                          <ProofLink target={target} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
