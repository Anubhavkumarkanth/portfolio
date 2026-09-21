import type { SkillCategory } from '../../data/types'
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

function SkillCard({ category, compact = false }: { category: SkillCategory; compact?: boolean }) {
  const Icon = category.icon
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg border border-accent/20 bg-accent-soft text-accent">
          <Icon className="size-[18px]" aria-hidden="true" />
        </span>
        <h3 className={compact ? 'font-medium text-fg' : 'text-lg font-medium text-fg'}>{category.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{category.description}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {category.items.map((skill) => (
          <li key={skill.name}>
            <Tag tone={skill.applied ? 'accent' : 'default'}>{skill.name}</Tag>
          </li>
        ))}
      </ul>

      {category.appliedIn.length > 0 && (
        <p className="mt-auto pt-5 font-mono text-[11px] leading-relaxed text-fg-subtle">
          <span className="text-fg-subtle/70">evidence → </span>
          {category.appliedIn.join(' · ')}
        </p>
      )}
    </Card>
  )
}

export function Skills() {
  const pillars = skillCategories.filter((c) => c.tier === 'pillar')
  const support = skillCategories.filter((c) => c.tier !== 'pillar')

  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="Skills and tools"
      description="Four areas I work in, and the tools underneath them. The highlighted ones are what I’ve used in my internship or in a project."
      aside={<Legend />}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((category, i) => (
          <Reveal key={category.id} delay={(i % 4) * 0.05} className="h-full">
            <SkillCard category={category} />
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {support.map((category, i) => (
          <Reveal key={category.id} delay={i * 0.05} className="h-full">
            <SkillCard category={category} compact />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
