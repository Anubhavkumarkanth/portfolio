import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>
}

export function Tag({
  children,
  tone = 'default',
  className,
}: {
  children: ReactNode
  tone?: 'default' | 'strong' | 'muted'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-1.5 py-0.5 text-[12.5px] leading-snug',
        tone === 'default' && 'border-line text-fg-muted',
        tone === 'strong' && 'border-line-strong text-fg',
        tone === 'muted' && 'border-dashed border-line text-fg-subtle',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Plain bordered box. */
export function Card({ className, children, ...rest }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('relative rounded-md border border-line', className)} {...rest}>
      {children}
    </div>
  )
}

/** Link style for running text: underlined, so it reads as a link without colour. */
export const textLink =
  'text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:decoration-fg'
