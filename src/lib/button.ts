import { cn } from './utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'icon' | 'icon-sm'

// Primary and secondary are deliberately close: both are bordered, neutral
// buttons. Primary only gets a slightly lighter fill and brighter text.
const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'border border-line-strong bg-white/[0.08] text-fg hover:bg-white/[0.12]',
  secondary: 'border border-line-strong text-fg-muted hover:bg-white/[0.04] hover:text-fg',
  ghost: 'text-fg-muted hover:bg-white/[0.06] hover:text-fg',
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
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap',
    'transition-colors duration-150',
    'disabled:pointer-events-none disabled:opacity-50',
    buttonVariants[variant],
    buttonSizes[size],
    className,
  )
}
