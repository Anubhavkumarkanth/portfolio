import { ArrowRight } from 'lucide-react'
import { profile } from '../../data/profile'
import { Reveal } from '../ui/primitives'
import { Section } from '../ui/Section'

export function Focus() {
  return (
    <Section
      id="focus"
      index="07"
      eyebrow="Career focus"
      title="Roles I’m applying for"
      description="Two tracks, and I’d be glad to take either. Building software in Java or Python, or working with data in SQL, Python and Power BI."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {profile.targetRoles.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.06} className="h-full">
            <div className="flex h-full flex-col rounded-xl border border-line p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">{group.group}</p>
              {group.note && <p className="mt-3 text-sm leading-relaxed text-fg-muted">{group.note}</p>}
              <ul className="mt-5 flex flex-col gap-2.5">
                {group.roles.map((role) => (
                  <li
                    key={role}
                    className="rounded-lg border border-line bg-white/[0.02] px-4 py-3 text-sm text-fg transition-colors hover:border-line-strong"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-dashed border-line-strong p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-fg-muted">
            Graduating in 2026 and available to start full time. Happy to talk about any of these.
          </p>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm text-accent-strong hover:text-accent"
          >
            Get in touch
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
