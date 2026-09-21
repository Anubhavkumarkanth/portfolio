import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Container } from './primitives'

interface SectionProps {
  id: string
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
  /** Extra element aligned to the right of the heading on wide screens. */
  aside?: ReactNode
}

export function Section({ id, title, description, children, className, aside }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn('py-16 sm:py-20', className)}>
      <Container>
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-balance text-fg sm:text-[1.75rem]">
              {title}
            </h2>
            {description && <p className="mt-3 leading-relaxed text-pretty text-fg-muted">{description}</p>}
          </div>
          {aside}
        </div>
        <div className="mt-8 sm:mt-10">{children}</div>
      </Container>
    </section>
  )
}
