import { useRef, type ComponentPropsWithoutRef, type PointerEvent, type ReactNode } from 'react'
import { m } from 'framer-motion'
import { EASE_OUT, cn } from '../../lib/utils'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>
}

export function Tag({
  children,
  tone = 'default',
  className,
}: {
  children: ReactNode
  tone?: 'default' | 'accent' | 'muted'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-[3px] font-mono text-[11.5px] leading-none tracking-tight',
        tone === 'default' && 'border-line bg-white/[0.03] text-fg-muted',
        tone === 'accent' && 'border-accent/30 bg-accent-soft text-accent-strong',
        tone === 'muted' && 'border-dashed border-line text-fg-subtle',
        className,
      )}
    >
      {children}
    </span>
  )
}

type CardProps = ComponentPropsWithoutRef<'div'> & { interactive?: boolean }

/** Surface with a cursor-following glow on the fill and the border. */
export function Card({ className, children, interactive = true, onPointerMove, ...rest }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event)
    const el = ref.current
    if (!el || event.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }
  return (
    <div
      ref={ref}
      onPointerMove={interactive ? handleMove : onPointerMove}
      className={cn(
        'relative rounded-xl border border-line bg-ink-900/70 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)]',
        interactive && 'spotlight',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  )
}

/** Stroke-drawn "AK" mark — also used for the favicon. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'grid size-8 place-items-center rounded-lg border border-line-strong bg-ink-800 transition-colors group-hover:border-accent/50',
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-5" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M5.5 24 10.5 8l5 16M7.4 18h6.2" />
          <path d="M19.5 8v16M26.5 8l-7 8.2L26.5 24" />
        </g>
      </svg>
    </span>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase', className)}>{children}</p>
  )
}
