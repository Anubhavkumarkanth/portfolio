import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line bg-surface px-2.5 py-0.5 text-[12.5px] leading-snug text-fg-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** White panel with a hairline border and a soft shadow. */
export function Card({ className, children, ...rest }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('relative rounded-xl border border-line bg-surface shadow-soft', className)} {...rest}>
      {children}
    </div>
  )
}

/** Small label above a heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-[13px] font-medium tracking-wide text-accent', className)}>{children}</p>
}

/** Link style for running text. */
export const textLink =
  'text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent hover:text-accent'
