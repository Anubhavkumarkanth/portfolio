import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Container, Reveal } from './primitives'

interface SectionProps {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
  /** Extra element aligned to the right of the heading on wide screens. */
  aside?: ReactNode
}

export function Section({ id, index, eyebrow, title, description, children, className, aside }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn('relative py-20 sm:py-28', className)}>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase">
              <span className="text-accent">{index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              <span className="text-fg-subtle">{eyebrow}</span>
            </p>
            <h2
              id={headingId}
              className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-balance text-fg sm:text-[2.5rem] sm:leading-[1.1]"
            >
              {title}
            </h2>
            {description && <p className="mt-4 text-base leading-relaxed text-pretty text-fg-muted">{description}</p>}
          </Reveal>
          {aside && <Reveal delay={0.1}>{aside}</Reveal>}
        </div>
        <div className="mt-10 sm:mt-14">{children}</div>
      </Container>
    </section>
  )
}
