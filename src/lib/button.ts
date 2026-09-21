import { cn } from './utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent-outline'
type ButtonSize = 'sm' | 'md' | 'icon' | 'icon-sm'

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-ink-950 hover:bg-accent-strong shadow-[0_0_0_1px_rgb(242_178_92/0.35),0_10px_30px_-10px_rgb(242_178_92/0.55)]',
  secondary: 'border border-line-strong bg-white/[0.03] text-fg hover:border-white/25 hover:bg-white/[0.07]',
  ghost: 'text-fg-muted hover:bg-white/[0.06] hover:text-fg',
  'accent-outline':
    'border border-accent/40 bg-accent-soft text-accent-strong hover:border-accent/70 hover:bg-accent/[0.18]',
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-[13px]',
  md: 'h-11 px-5 text-sm',
  icon: 'size-11',
  'icon-sm': 'size-9',
}

export function buttonClasses({
  variant = 'secondary',
  size = 'md',
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-50',
    buttonVariants[variant],
    buttonSizes[size],
    className,
  )
}
