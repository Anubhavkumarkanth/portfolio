import type { SkillGroup } from '../../data/types'
import { Tag } from '../ui/primitives'
import { Section } from '../ui/Section'

export function Toolbox({ groups, extras, description }: { groups: SkillGroup[]; extras?: string[]; description: string }) {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with, and what for." description={description}>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.title} className="bg-surface p-6 sm:p-7">
            <h3 className="text-lg font-semibold tracking-tight text-fg">{g.title}</h3>
            <p className="mt-1 text-[15px] text-fg-muted">{g.plain}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {extras && <p className="mt-5 text-sm text-fg-subtle">Also every day: {extras.join(', ')}.</p>}
    </Section>
  )
}
