import { cn } from './utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'icon' | 'icon-sm'

// One filled button per view (primary), the rest outlined or bare.
const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-fg text-paper hover:bg-fg/85',
  secondary: 'border border-line-strong bg-surface text-fg hover:border-fg-subtle',
  ghost: 'text-fg-muted hover:bg-sunken hover:text-fg',
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-10 px-4 text-sm',
  icon: 'size-10',
  'icon-sm': 'size-9',
}

export function buttonClasses({
  variant = 'secondary',
  size = 'md',
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap',
    'transition-colors duration-150',
    'disabled:pointer-events-none disabled:opacity-50',
    buttonVariants[variant],
    buttonSizes[size],
    className,
  )
}
