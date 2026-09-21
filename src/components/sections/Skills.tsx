import type { SkillCategory } from '../../data/types'
import { skillCategories } from '../../data/skills'
import { Card, Tag } from '../ui/primitives'
import { Section } from '../ui/Section'

function SkillList({ category }: { category: SkillCategory }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {category.items.map((skill) => (
        <li key={skill.name}>
          <Tag tone={skill.applied ? 'strong' : 'default'}>{skill.name}</Tag>
        </li>
      ))}
    </ul>
  )
}

export function Skills() {
  const pillars = skillCategories.filter((c) => c.tier === 'pillar')
  const support = skillCategories.filter((c) => c.tier !== 'pillar')

  return (
    <Section
      id="skills"
      title="Skills and tools"
      description="Four areas I work in, and the tools underneath them. The highlighted ones are what I’ve used in my internship or in a project."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((category) => (
          <Card key={category.id} className="flex flex-col p-5">
            <h3 className="text-lg font-medium text-fg">{category.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{category.description}</p>
            <SkillList category={category} />
            {category.appliedIn.length > 0 && (
              <p className="mt-auto pt-5 text-xs leading-relaxed text-fg-subtle">
                Used in: {category.appliedIn.join(', ')}
              </p>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {support.map((category) => (
          <div key={category.id}>
            <h3 className="font-medium text-fg">{category.title}</h3>
            <p className="mt-1 text-sm text-fg-muted">{category.description}</p>
            <SkillList category={category} />
          </div>
        ))}
      </div>
    </Section>
  )
}
