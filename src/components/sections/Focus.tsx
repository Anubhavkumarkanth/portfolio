import { focusAreas } from '../../data/capabilities'
import { profile } from '../../data/profile'
import { Card, Reveal } from '../ui/primitives'
import { ProofLink } from '../ui/ProofLink'
import { Section } from '../ui/Section'

export function Focus() {
  return (
    <Section
      id="focus"
      index="08"
      eyebrow="Career focus"
      title="Where I’m headed"
      description="The areas I’m building a career in, each backed by work above. Listed side by side, not ranked."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-12">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">Roles I’m applying for</p>
          <p className="mt-2 text-sm text-fg-muted">Entry-level, across software and data.</p>
          <div className="mt-5 space-y-5">
            {profile.targetRoles.map((group) => (
              <div key={group.group}>
                <p className="text-xs text-fg-subtle">{group.group}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.roles.map((role) => (
                    <li key={role} className="rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-sm text-fg">
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {focusAreas.map((area, i) => {
            const Icon = area.icon
            return (
              <li key={area.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <Card className="relative flex h-full flex-col overflow-hidden p-6">
                    <Icon
                      className="pointer-events-none absolute -right-5 -bottom-5 size-32 text-white/[0.03]"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                    <Icon className="size-5 text-accent" aria-hidden="true" />
                    <h3 className="mt-4 font-medium text-fg">{area.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{area.description}</p>
                    <div className="mt-auto pt-5">
                      <p className="text-xs text-fg-subtle">Backed by</p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {area.evidence.map((target) => (
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
      </div>
    </Section>
  )
}
