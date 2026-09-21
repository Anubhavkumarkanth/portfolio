import { ArrowRight } from 'lucide-react'
import { profile } from '../../data/profile'
import { Reveal } from '../ui/primitives'
import { Section } from '../ui/Section'

export function Focus() {
  const roles = profile.targetRoles.flatMap((group) => group.roles)

  return (
    <Section
      id="focus"
      index="07"
      eyebrow="Career focus"
      title="Roles I’m applying for"
      description="Entry-level positions across software and data. I’m most comfortable on the backend, in Java or Python."
    >
      <Reveal>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <li
              key={role}
              className="rounded-lg border border-line bg-white/[0.02] px-4 py-3.5 text-sm text-fg transition-colors hover:border-line-strong"
            >
              {role}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-dashed border-line-strong p-6 sm:flex-row sm:items-center sm:justify-between">
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
