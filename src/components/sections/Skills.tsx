import { skillCategories } from '../../data/skills'
import { Card, Reveal, Tag } from '../ui/primitives'
import { Section } from '../ui/Section'

function Legend() {
  return (
    <p className="flex items-center gap-2.5 text-xs text-fg-subtle">
      <Tag tone="accent">Highlighted</Tag>
      used in my internship or projects
    </p>
  )
}

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="What I work with"
      description="Grouped by where each thing sits in a system. Highlighted items are ones I’ve used in my internship or in a project, not just read about."
      aside={<Legend />}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => {
          const Icon = category.icon
          return (
            <Reveal key={category.id} delay={(i % 3) * 0.05}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg border border-accent/20 bg-accent-soft text-accent">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <h3 className="font-medium text-fg">{category.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{category.description}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {category.items.map((skill) => (
                    <li key={skill.name}>
                      <Tag tone={skill.applied ? 'accent' : 'default'}>{skill.name}</Tag>
                    </li>
                  ))}
                </ul>

                {category.extra && (
                  <div className="mt-4">
                    <p className="text-xs text-fg-subtle">{category.extra.label}</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {category.extra.items.map((item) => (
                        <li key={item}>
                          <Tag>{item}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {category.appliedIn.length > 0 && (
                  <p className="mt-auto pt-5 font-mono text-[11px] leading-relaxed text-fg-subtle">
                    <span className="text-fg-subtle/70">evidence → </span>
                    {category.appliedIn.join(' · ')}
                  </p>
                )}
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
