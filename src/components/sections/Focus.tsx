import { profile } from '../../data/profile'
import { textLink } from '../ui/primitives'
import { Section } from '../ui/Section'

export function Focus() {
  return (
    <Section
      id="focus"
      title="Roles I’m applying for"
      description="I’m open to both of these."
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {profile.targetRoles.map((group) => (
          <div key={group.group}>
            <h3 className="text-lg font-medium text-fg">{group.group}</h3>
            {group.note && <p className="mt-1 text-sm leading-relaxed text-fg-muted">{group.note}</p>}
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {group.roles.map((role) => (
                <li key={role} className="py-2.5 text-fg">
                  {role}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 text-fg-muted">
        I graduate in 2026 and can start full time after that.{' '}
        <a href="#contact" className={textLink}>
          Get in touch
        </a>
      </p>
    </Section>
  )
}
