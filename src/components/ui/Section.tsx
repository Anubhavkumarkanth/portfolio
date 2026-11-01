import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Container, Eyebrow } from './primitives'

interface SectionProps {
  id: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn('py-20 sm:py-24', className)}>
      <Container>
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2
            id={headingId}
            className="mt-2 font-serif text-3xl leading-tight font-medium tracking-[-0.01em] text-balance text-fg sm:text-4xl"
          >
            {title}
          </h2>
          {description && <p className="mt-4 text-[17px] leading-relaxed text-pretty text-fg-muted">{description}</p>}
        </div>
        <div className="mt-10 sm:mt-12">{children}</div>
      </Container>
    </section>
  )
}
